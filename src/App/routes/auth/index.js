 import AuthPage from './AuthPage';
 import getData from './getData';

 export default {
   children: [
     {
       path: '/(login|)',
       action({ ctx }) {
         return {
           title: 'Cabinet',
           component: <AuthPage type="login" />,
         };
       },
     },
     {
       path: '/passport',
       async action(params) {
         const { appStore, query } = params;
        //  console.log({query});
        // if (__SERVER__) {
        //   return {
        //     title: '',
        //     component: <div>Loading</div>,
        //   };
        // }
        // if (!__SERVER__) {
        //  if (!query.p) {
        //    return {
        //      redirect: '/auth/login',
        //    };
        //  }
         let passport;
         try {
           passport = (await getData(params)).passport;
         } catch (err) {
           console.log({ err });
           return {
             component: <div>err</div>,
            //  redirect: '/auth/login',
           };
         }
         if (passport.user) {
           if (__SERVER__) {
             return {
               title: 'Загрузка',
               component: <h1>Загрузка...</h1>,
             };
           }
           const res = await appStore.auth.loginPassport(passport, query);
           if (res) {
             return { redirect: '/' }
           } else {
             throw 'Непонятнаяошибка >_<'
           }
         }
         return {
           title: 'Авторизация через соц. сеть',
           component: <AuthPage type="signupPassport" passport={passport} query={query} />,
         };
        // }
       },
     },

     {
       path: '/recovery',
       action({ ctx }) {
         return {
           title: 'recovery',
           component: <AuthPage type="recovery" />,
         };
       },
     },
     {
       path: '/signup',
       action({ ctx }) {
         return {
           title: 'signup',
           component: <AuthPage type="signup" />,
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
