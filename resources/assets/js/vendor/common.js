import InfoWindow from '../components/InfoWindow.vue';

window.CenterControl = function CenterControl(controlDiv, map) {
  // Set CSS for the control border.
  var controlUI = document.createElement('div');
  controlUI.style.cursor = 'pointer';
  controlUI.style.margin = '10px';
  controlUI.title = 'Click to recenter the map';
  controlDiv.appendChild(controlUI);

  var elem = document.createElement("img");
  elem.src = 'images/target.png';
  elem.setAttribute("height", "25");
  controlUI.appendChild(elem);

  elem.addEventListener('mouseover', function() {
    elem.setAttribute("height", "30");
  });
  elem.addEventListener('mouseleave', function() {
    elem.setAttribute("height", "25");
  });

}

window.createMarker = function createMarker(place, _this) {
    var placeLoc = new google.maps.LatLng(place.lat, place.lng);
    let getStoreUrl = function(){
        if(place.comments.length > 0){
            return 'images/black-shop.jpg';
        }else{
            return 'images/bluemarker.ico';    
        }
    }
    let image = {
        url: getStoreUrl(),
        scaledSize: new google.maps.Size(30, 30),
        origin: new google.maps.Point(0,0),
        anchor: new google.maps.Point(0,20)
    };
    var marker = new google.maps.Marker({
        map: _this.map,
        icon: image,
        position: placeLoc
    });
    
    google.maps.event.addListener(marker, 'click', function() {
        if(_this.selectedMarker != null){
            _this.selectedMarker.setAnimation(null);
        }
        if(marker.getAnimation() === undefined){
            marker.setAnimation(null);
        }
        _this.userMarker.setAnimation(null);
        
        _this.setSelectedMarker(marker);
        _this.setSelectedPlace(place);

        if(marker.getAnimation() !== null){
            marker.setAnimation(null);
        }else{
            marker.setAnimation(google.maps.Animation.BOUNCE);
        }
        console.log('createmarker new click event');
        _this.infowindow.setContent('<cus-content></cus-content>');
        _this.infowindow.open(map, this);
        console.log('createmarker open InfoWindow');
        _this.map.panTo(marker.position);
        Event.fire('updateComments', place.comments);
    });

    return marker;
}

window.initMapEvent = function initMapEvent(_this){
    google.maps.event.addListener(_this.map, 'click',function(){
        _this.infowindow.close();
        if(_this.selectedMarker != null) _this.selectedMarker.setAnimation(null)
    })

    google.maps.event.addListener(_this.map, 'drag',function(){
        let iwOuter = $('.gm-style-iw');
        iwOuter.parent().parent().css({
            'display': 'none'
        });
    })

    google.maps.event.addListener(_this.map, 'dragend',function(){
        let iwOuter = $('.gm-style-iw');
        iwOuter.parent().parent().css({
            'display': 'block'
        });
    })

    google.maps.event.addListener(_this.infowindow, 'closeclick',function(){
        _this.selectedMarker.setAnimation(null);
    })

    google.maps.event.addListener(_this.infowindow, 'domready',function(){
        console.log('info donready');
        let iwOuter = $('.gm-style-iw');
        let iwBackground = iwOuter.prev();
        iwBackground.css({
            'z-index': '2'
        });
        iwBackground.children(':nth-child(2)').css({'display':'none'});
        iwBackground.children(':nth-child(4)').css({'display':'none'});
        let iwCloseBtn = iwOuter.next();
        iwOuter.css({
            'top': '43px',
            'z-index': '1'
        });
        iwCloseBtn.css({
            'right': '47px',
            'top': '53px'
        });

        let cusContent = new Vue({
            el: 'cus-content',
            data: {
                place: _this.getSelectedPlace()
            },
            components: {
                InfoWindow
            },
            template: '<InfoWindow :place=place></InfoWindow>',
            methods: {

            }
        });
    })
}