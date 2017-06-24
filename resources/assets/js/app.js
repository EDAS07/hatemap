import style from '@sass/app.scss';
import main from '@components/pages/main.vue';

import auth from '@components/services/auth';


require('./vendor/common.js');
require('./vendor/utilities.js');

Vue.use(VueRouter);

//Use directives
// This directive is never used, just for test.
// Vue.directive('inputClear', require('@components/directives/inputClear.vue'));

const routes = [
    { path: '/', component: main }
]

export const router = new VueRouter({
    routes // short for routes: routes
})

auth.checkAuth();

const app = new Vue({
    el: '#app',
    router,
    mounted: function(){
        window.loaded = false;
        function initMap() {
            window.loaded = true;
        }
        window.initMap = initMap;
    }
});
