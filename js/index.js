  $.fn.scrollEnd = function(callback, timeout) {
    $(this).scroll(function(){
      var $this = $(this);
      if ($this.data('scrollTimeout')) {
        clearTimeout($this.data('scrollTimeout'));
      }
      $this.data('scrollTimeout', setTimeout(callback,timeout));
    });
  };

  function inicializarSlider(){
    $("#rangoPrecio").ionRangeSlider({
      type: "double",
      grid: false,
      min: 0,
      max: 100000,
      from: 200,
      to: 80000,
      prefix: "$"
    });
  }

  function playVideoOnScroll(){
    var ultimoScroll = 0,
    intervalRewind;
    var video = document.getElementById('vidFondo');
    $(window)
    .scroll((event)=>{
      var scrollActual = $(window).scrollTop();
      if (scrollActual > ultimoScroll){
       video.play();
     } else {
      video.play();
    }
    ultimoScroll = scrollActual;
  })
    .scrollEnd(()=>{
      video.pause();
    }, 10)
  }

  $(document).ready(function(){
    $.get("servicio.php", function(data, status){
      var answerJSON = JSON.parse(data);
      var lengthJSON = answerJSON.length;
      var tipoArray = [];
      var ciudadArray = [];
      for(var i = 0; i < lengthJSON; i++){
        var tipoLength = tipoArray.length;
        var ciudadLength = ciudadArray.length;
        if(tipoLength != 0){
          var t = 1;
          var c = 1;
          for (var j = 0; j < tipoLength; j++){
            if(tipoArray[j] != answerJSON[i].Tipo){
              t = t + 1;
            }
          }
          for (var k = 0; k < ciudadLength; k++) {
            if(ciudadArray[k] != answerJSON[i].Ciudad){
              c = c + 1;
            }
          }
          if(tipoLength < t){
            tipoArray.push(answerJSON[i].Tipo);
          }
          if(ciudadLength < c){
            ciudadArray.push(answerJSON[i].Ciudad);
          }
        } else {
         tipoArray.push(answerJSON[i].Tipo);
         ciudadArray.push(answerJSON[i].Ciudad);
       }
     }
     for (var i = 0; i < tipoArray.length; i++) {
      var rTipo = '<option value="'+tipoArray[i] +'">'+tipoArray[i] + '</option>';
      $('#selectTipo').append(rTipo);
    }
    for (var i = 0; i < ciudadArray.length; i++) {
      var rCiudad = '<option value="'+ciudadArray[i] +'">'+ciudadArray[i] + '</option>';
      $('#selectCiudad').append(rCiudad);
    }
  });
  });

  $("#mostrarTodos").click(function(){
    $.get("servicio.php", function(data, status){
      var answerJSON = JSON.parse(data);
      var lengthJSON = answerJSON.length;
      for (var i = 0; i < lengthJSON; i++) {
        var id = answerJSON[i].Id;
        var direccion = answerJSON[i].Direccion;
        var ciudad = answerJSON[i].Ciudad;
        var telefono = answerJSON[i].Telefono;
        var codigoPostal = answerJSON[i].Codigo_Postal;
        var tipo = answerJSON[i].Tipo;
        var precio = answerJSON[i].Precio;
        var obj = "<div class ='itemMostrado'>"
        +"<img src='img/home.jpg'><ul>"+
        "<li>Dirección: "+ direccion + "</li>"+
        "<li>Ciudad: "+ ciudad + "</li>"+
        "<li>Teléfono: "+ telefono + "</li>"+
        "<li>Codigo: "+ codigoPostal + "</li>"+
        "<li>Tipo: "+ tipo + "</li>"+
        "<li>Precio "+ precio + "</li>"+
        "</ul></div>";
        $(".colContenido").append(obj);
      }
    });
  });

  $("#submitButton").click(function(){
    var precio = $("#rangoPrecio").val().split(";");
    var ciudad = $('#selectCiudad').val();
    var tipo = $('#selectTipo').val();

    $.post("servicio.php",
    {
      Ciudad: ciudad,
      Tipo: tipo,
      Min: precio[0],
      Max: precio[1]
    },
    function(data, status){
      $("div").remove(".itemMostrado");
      var answerJSON = JSON.parse(data);
      var lengthJSON = answerJSON.length;
      for (var i = 0; i < lengthJSON; i++) {
        var id = answerJSON[i].Id;
        var direccion = answerJSON[i].Direccion;
        var ciudad = answerJSON[i].Ciudad;
        var telefono = answerJSON[i].Telefono;
        var codigoPostal = answerJSON[i].Codigo_Postal;
        var tipo = answerJSON[i].Tipo;
        var precio = answerJSON[i].Precio;
        var obj = "<div class ='itemMostrado'>"
        +"<img src='img/home.jpg'><ul>"+
        "<li>Dirección: "+ direccion + "</li>"+
        "<li>Ciudad: "+ ciudad + "</li>"+
        "<li>Teléfono: "+ telefono + "</li>"+
        "<li>Codigo: "+ codigoPostal + "</li>"+
        "<li>Tipo: "+ tipo + "</li>"+
        "<li>Precio "+ precio + "</li>"+
        "</ul></div>";
        $(".colContenido").append(obj);
      }
    });
  });

  inicializarSlider();
  playVideoOnScroll();
