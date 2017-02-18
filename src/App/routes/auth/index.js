 import AuthPage from './AuthPage';
 export default {
   children: [
     {
       path: '/(login|)',
       action({appStore}) {
         console.log('appStore', appStore.auth);
         return {
           title: 'Cabinet',
           component: <AuthPage type="login" />,
         };
       },
     },
     {
       path: '/recovery',
       action() {
         return {
           title: 'recovery',
           component: <AuthPage type="recovery" />,
         };
       },
     },
     {
       path: '/signup',
       action() {
         return {
           title: 'signup',
           component: <AuthPage type="signup" />,
         };
       },
     },
     {
       path: '/logout',
       action({ appStore }) {
         if (__SERVER__) return {
           component: <div>Loading</div>
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
