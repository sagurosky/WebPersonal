function formulario(){
    alert("lo siento, aun no descubri como programar servlets en el servidor de github");
}

function iniciarMap(){
    var coord = {lat:-34.61358669501732 ,lng:-58.88324148147951};
    var map = new google.maps.Map(document.getElementById('map'),{
      zoom: 10,
      center: coord
    });
    var marker = new google.maps.Marker({
      position: coord,
      map: map
    });
}