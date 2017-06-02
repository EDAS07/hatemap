window.AjaxCall = function(type, url, data, scb, ecb) {
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
                if (response.data.ReturnCode == 0x00000000) {
                    scb(response.data);
                }
            }
        )
        .catch(
            error => {
                let er = Object.assign({}, error);
                if (er.response.status == 401) {
                    location.href = "login";
                }

                if (isFunction(ecb)) {
                    ecb();
                }

            }
        );
}

window.Event = new class {

    constructor() {
        this.vue = new Vue();
    }

    fire(event, data = null) {
        this.vue.$emit(event, data);
    }

    listen(event, callback) {
        this.vue.$on(event, callback);
    }

}