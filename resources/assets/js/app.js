
/**
 * First we will load all of this project's JavaScript dependencies which
 * include Vue and Vue Resource. This gives a great starting point for
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

window.Event = new class {

	constructor(){
		this.vue = new Vue();
	}

	fire(event, data = null){
		this.vue.$emit(event, data);
	}

	listen(event, callback){
		this.vue.$on(event, callback);
	}

}

Vue.component('mapcontent', require('./components/mapcontent.vue'));

Vue.component('Coupon', require('./components/Coupon.vue'));

/*
Vue.component('coupon', {

	methods:{
		onCouponApplied(){
			Event.fire('applied');
		}
	}


});*/

const app = new Vue({
    el: '#app'
});

