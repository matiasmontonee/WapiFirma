import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './assets/css/style.css';

import vue3GoogleLogin from 'vue3-google-login';
// luis: 687160459640-codhvqgaivi057tcl5pbk3pldr7vuvi3.apps.googleusercontent.com
// mati: 402252794021-lou3mjb7gft8fgq6ubtcu9oqhpsqcap5.apps.googleusercontent.com
const CLIENT_ID = "687160459640-codhvqgaivi057tcl5pbk3pldr7vuvi3.apps.googleusercontent.com";


createApp(App)
  .use(router) 
  .use(vue3GoogleLogin, {
    clientId: CLIENT_ID,
  })
  .mount('#app');