import React from "react"
// @ts-ignore
import { observer, MobXProviderContext } from "mobx-react"
// import { observer } from "mobx-react/dist/observer"
// import { copyStaticProperties } from "mobx-react/dist/utils/utils"
// import { MobXProviderContext } from "mobx-react/dist/Provider"
import { IReactComponent } from "mobx-react/dist/types/IReactComponent"
import { IValueMap } from "mobx-react/dist/types/IValueMap"
import { IWrappedComponent } from "mobx-react/dist/types/IWrappedComponent"
import { IStoresToProps } from "mobx-react/dist/types/IStoresToProps"

// based on https://github.com/mridgway/hoist-non-react-statics/blob/master/src/index.js
const hoistBlackList = {
    $$typeof: 1,
    render: 1,
    compare: 1,
    type: 1,
    childContextTypes: 1,
    contextType: 1,
    contextTypes: 1,
    defaultProps: 1,
    getDefaultProps: 1,
    getDerivedStateFromError: 1,
    getDerivedStateFromProps: 1,
    mixins: 1,
    propTypes: 1
}

export function copyStaticProperties(base: object, target: object): void {
    const protoProps = Object.getOwnPropertyNames(Object.getPrototypeOf(base))
    Object.getOwnPropertyNames(base).forEach(key => {
        if (!hoistBlackList[key] && protoProps.indexOf(key) === -1) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(base, key)!)
        }
    })
}

/**
 * Store Injection
 */
function createStoreInjector(
    grabStoresFn: IStoresToProps,
    component: IReactComponent<any>,
    injectNames: string,
    makeReactive: boolean
): IReactComponent<any> {
    // Support forward refs
    let Injector: IReactComponent<any> = React.forwardRef((props, ref) => {
        const newProps = { ...props }
        const context = React.useContext(MobXProviderContext)
        // @ts-ignore
        Object.assign(newProps, grabStoresFn(context || {}, newProps) || {})

        if (ref) {
            newProps.ref = ref
        }

        return React.createElement(component, newProps)
    })

    if (makeReactive) Injector = observer(Injector)
    Injector["isMobxInjector"] = true // assigned late to suppress observer warning

    // Static fields from component should be visible on the generated Injector
    copyStaticProperties(component, Injector)
    Injector["wrappedComponent"] = component
    Injector.displayName = getInjectName(component, injectNames)
    return Injector
}

function getInjectName(component: IReactComponent<any>, injectNames: string): string {
    let displayName
    const componentName =
        component.displayName ||
        component.name ||
        (component.constructor && component.constructor.name) ||
        "Component"
    if (injectNames) displayName = "inject-with-" + injectNames + "(" + componentName + ")"
    else displayName = "inject(" + componentName + ")"
    return displayName
}

function grabStoresByName(
    storeNames: Array<string>
): (baseStores: IValueMap, nextProps: React.Props<any>) => React.PropsWithRef<any> | undefined {
    return function (baseStores, nextProps) {
        storeNames.forEach(function (storeName) {
            if (
                storeName in nextProps // prefer props over stores
            )
                return
            if (!(storeName in baseStores)) {
                const err = new Error(
                    "MobX injector: Store '" +
                        storeName +
                        "' is not available! Make sure it is provided by some Provider"
                );
                console.error('Mobx @inject', err)
                nextProps[storeName] = null;
                return;
            }
            nextProps[storeName] = baseStores[storeName]
        })
        return nextProps
    }
}

export function inject(
    ...stores: Array<string>
): <T extends IReactComponent<any>>(
    target: T
) => T & (T extends IReactComponent<infer P> ? IWrappedComponent<P> : never)
export function inject<S, P, I, C>(
    fn: IStoresToProps<S, P, I, C>
): <T extends IReactComponent>(target: T) => T & IWrappedComponent<P>

/**
 * higher order component that injects stores to a child.
 * takes either a varargs list of strings, which are stores read from the context,
 * or a function that manually maps the available stores from the context to props:
 * storesToProps(mobxStores, props, context) => newProps
 */
export function inject(/* fn(stores, nextProps) or ...storeNames */ ...storeNames: Array<any>) {
    if (typeof arguments[0] === "function") {
        let grabStoresFn = arguments[0]
        return (componentClass: React.ComponentClass<any, any>) =>
            createStoreInjector(grabStoresFn, componentClass, grabStoresFn.name, true)
    } else {
        return (componentClass: React.ComponentClass<any, any>) =>
            createStoreInjector(
                grabStoresByName(storeNames),
                componentClass,
                storeNames.join("-"),
                false
            )
    }
}