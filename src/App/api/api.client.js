import ApiClientBase from 'lego-starter-kit/CoreApp/api/api.client'
import _ from 'lodash'

export default class ApiClient extends ApiClientBase {
  throwError({ err }) {
    console.log('throwError', err);
    const message = err && err.message || err;
    const error = new Error(_.isPlainObject(message) ? JSON.stringify(message) : message);

    const title = err && err.statusText || 'Ошибка';
    const text = err && err.data && err.data.message || error.message;

    global.toast({
      title,
      text,
    });

    // throw error;
  }

  // async authSignup(params) {
  //   const body = {
  //     first_name: params.name,
  //     email: params.email,
  //     password: params.password,
  //   };
  //   const res = await this.fetch('/users/registration/post/', {
  //     method: 'POST',
  //     body,
  //   });
  //   return this.authLogin({
  //     token: res.token,
  //   });
  // }
  //
  // async authLogin(params) {
  //   let token;
  //   if (!params.token) {
  //     const body = {
  //       username: params.email,
  //       password: params.password,
  //     };
  //     // console.log({body});
  //     const data = await this.fetch('/users/token/post/', {
  //       method: 'POST',
  //       body,
  //     });
  //     token = data.token;
  //   } else {
  //     token = params.token;
  //   }
  //
  //   // const data2 = await this.fetch('/users/login/post/', {
  //   //   method: 'POST',
  //   //   headers: {
  //   //     Authorization:`Token ${token}`
  //   //   },
  //   //   body,
  //   // })
  //   // console.log({data2});
  //   //
  //   const user = await this.fetch('/users/me/', {
  //     method: 'GET',
  //     headers: {
  //       Authorization: `Token ${token}`,
  //     },
  //   });
  //   return {
  //     token,
  //     user,
  //   };
  //   // console.log({data2});
  //
  //   // data.token =
  //   // const res = await this.fetch('/users/registration/post/', {
  //   //   method: 'POST',
  //   //   body,
  //   // })
  //   // const json = await res.json()
  //   // return json
  // }
}
