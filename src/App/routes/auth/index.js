 import AuthPage from './AuthPage';

 export default {
   children: [
     {
       path: '/(login|)',
       action({ ctx }) {
         return {
           title: 'Cabinet',
           component: <AuthPage type="login" siteTitle={ctx.config.siteTitle} />,
         };
       },
     },
     {
       path: '/recovery',
       action({ ctx }) {
         return {
           title: 'recovery',
           component: <AuthPage type="recovery" siteTitle={ctx.config.siteTitle} />,
         };
       },
     },
     {
       path: '/signup',
       action({ ctx }) {
         return {
           title: 'signup',
           component: <AuthPage type="signup" siteTitle={ctx.config.siteTitle} />,
         };
       },
     },
     {
       path: '/logout',
       action({ appStore }) {
         if (__SERVER__) {
           return {
             component: <div>Loading</div>,
           };
         }
         appStore.auth.logout();
         //  console.log('appStore', appStore);
         return { redirect: '/' };
         //  return {
         //    title: 'signup',
         //    component: <AuthPage type="signup" />,
         //  };
       },
     },
    //  {
    //    path: '/profile',
    //    action() {
    //     //  return {
    //     //    title: 'signup',
    //     //    component: <AuthPage type="signup" />,
    //     //  };
    //    },
    //  },
   ],
 };
