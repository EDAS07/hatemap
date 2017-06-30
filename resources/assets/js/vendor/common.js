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

window.createGroupMarker = function createGroupMarker(group, _this){
    var groupLoc = new google.maps.LatLng(group.lat, group.lng);

    let getGroupUrl = function(){
        if(group.data.length >= 10){
            return 'images/plus.png';
        }else{
            return 'images/number_' +  group.data.length +'.png';
        }
    }
    let image = {
        url: getGroupUrl(),
        scaledSize: new google.maps.Size(30, 30),
        origin: new google.maps.Point(0,0),
        anchor: new google.maps.Point(0,20)
    };
    var marker = new google.maps.Marker({
        map: _this.map,
        icon: image,
        position: groupLoc
    });

    google.maps.event.addListener(marker, 'click', function() {
        console.log('click marker');
        if(_this.selectedMarker != null){
            _this.selectedMarker.setAnimation(null);
        }
        if(marker.getAnimation() === undefined){
            marker.setAnimation(null);
        }
        
        _this.set('selectedMarker', marker);
        _this.set('selectedGroup', group);
        _this.set('show_rightSidebar', false);
        _this.infowindow.close();

        if(_this.map.getZoom() < 17){
            _this.map.setZoom(_this.map.getZoom()+1);
        }else{
            _this.set('show_groupSidebar', true);
        }

        _this.map.panToWithOffset(marker.position, 0, 150);

        Event.fire('updateGroup', group);
    });

    return marker;
}

/*window.createMarker = function createMarker(place, _this) {
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
        
        _this.set('selectedMarker', marker);
        _this.set('selectedPlace', place);
        _this.set('show_groupSidebar', false);
        _this.set('show_rightSidebar', true);

        if(marker.getAnimation() !== null){
            marker.setAnimation(null);
        }else{
            marker.setAnimation(google.maps.Animation.BOUNCE);
        }
        _this.infowindow.setContent('<cus-content></cus-content>');
        _this.infowindow.open(map, this);
        console.log('marker position:', marker.position);
        // _this.map.panTo(marker.position);
        _this.map.panToWithOffset(marker.position, 0, 150);
        Event.fire('updateComments', place.comments);
    });

    return marker;
}*/

window.initMapEvent = function initMapEvent(_this){
    google.maps.event.addListener(_this.map, 'click',function(){
        _this.infowindow.close();
        _this.set('selectedGroup', []);
        _this.set('show_rightSidebar', false);
        _this.set('show_groupSidebar', false);
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

    google.maps.event.addListener(_this.map, 'zoom_changed',function(){
        console.log('zoom changed', _this.map.getZoom());
        Event.fire('updateMarkers', null);
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
                place: _this.get('selectedPlace')
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

window.isFunction = function isFunction(functionToCheck) {
    var getType = {};
    return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}
