import Vue from 'vue';
import App from './App.vue';

import VueClickOutside from 'vue-click-outside'

Vue.config.productionTip = false;

Vue.directive('clickOutside', VueClickOutside)

new Vue({
    render: (h) => h(App),
}).$mount('#app');
