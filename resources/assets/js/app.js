
import style from '../sass/app.scss';

require('./vendor/common.js')

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
