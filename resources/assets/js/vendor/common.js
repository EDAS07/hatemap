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