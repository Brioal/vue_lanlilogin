import Vue from 'vue'
import axios from 'axios'
Vue.use(axios);

import App from './App'
import router from './router'
import store from './store'

// ElementUI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI);

// iView
import iView from 'iview'
import 'iview/dist/styles/iview.css'

Vue.use(iView);


if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
