/* global window */
declare global {
  interface Window {
    env: any;
    __DEV__: boolean;
    __STAGE__: boolean;
  }
}
// @ts-ignore
export const globalStore = typeof window !== 'undefined' ? window : global;

export const globalLyfecycleEvent = async (
  m: any,
  eventName: string,
  eventDate: Date
) => {
  // @ts-ignore
  if (globalStore && globalStore.__lskGlobalLyfecycleHook) {
    // @ts-ignore
    globalStore.__lskGlobalLyfecycleHook(m, eventName, eventDate);
  }
};
export default globalLyfecycleEvent;
