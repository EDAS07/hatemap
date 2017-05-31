import style from '@sass/app.scss';
import main from '@components/pages/main.vue';

require('./vendor/common.js');
require('./vendor/utilities.js');

Vue.use(VueRouter);

const routes = [
    { path: '/', component: main }
]

const router = new VueRouter({
    routes // short for routes: routes
})

const app = new Vue({
    el: '#app',
    router,
    mounted() {
        window.loaded = false;

        function initMap() {
            window.loaded = true;
        }
        window.initMap = initMap;
    }
});
