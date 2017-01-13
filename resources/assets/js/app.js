/**
 * First we will load all of this project's JavaScript dependencies which
 * include Vue and Vue Resource. This gives a great starting point for
 * building robust, powerful web applications using Vue and Laravel.
 */

//require('./bootstrap');

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

//import Vue from 'vue';

/*
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
*/
Vue.component('mapcontent', require('./components/mapcontent.vue'));

window.AjaxCall = function(type, url, data, scb, ecb){
	axios({
			method: type,
			url: url,
			data: data,
			headers: {
				'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
			}
		})
		.then(
			response => {
				if(response.data.ReturnCode == 0x00000000){
					scb(response.data);
				}
			}
		)
		.catch(
			error => {
				console.log(error);
				ecb();
			}
		);
}

const app = new Vue({
    el: '#app',

    mounted() {
        window.loaded = false;

        function initMap() {
            window.loaded = true;
        }
        window.initMap = initMap;
    }
});
