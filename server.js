var express = require("express");
var path = require("path");
var app = express();

var calcularMes = function(mes){
    var nombre;
  switch(mes){
    case 1: nombre = "January";
      break;
    case 2: nombre = "February";
      break;
    case 3: nombre = "March";
      break;
    case 4: nombre = "April";
      break;
    case 5: nombre = "May";
      break;
    case 6: nombre = "June";
      break;
    case 7: nombre = "July";
      break;
    case 8: nombre = "August";
      break;
    case 9: nombre = "September";
      break;
    case 10: nombre = "October";
      break;
    case 11: nombre = "November";
      break;
    case 12: nombre = "December";
      break;
  }  
  return nombre;
};

var calcularNoMes = function(num){
    var mes;
    switch(num){
        case 'January': mes = 0;
        break;
        case 'February': mes = 1;
        break;
        case 'March': mes = 2;
        break;
        case 'April': mes = 3;
        break;
        case 'May': mes = 4;
        break;
        case 'June': mes = 5;
        break;
        case 'July': mes = 6;
        break;
        case 'August': mes = 7;
        break;
        case 'September': mes = 8;
        break;
        case 'October': mes = 9;
        break;
        case 'November': mes = 10;
        break;
        case 'December': mes = 11;
        break;
    }
    return mes;
};

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/:timestamp', function(req, res){
    var timestamp = req.params.timestamp;
    
    if(timestamp == null){
      
      res.send("Parámetro inválido");
      
    } else {
    
      if(timestamp.indexOf(',') > -1){
          console.log("Es una fecha natural");
          var fecha = timestamp.split(',');
          var diames = fecha[0].split(' ');
          var mes = calcularNoMes(diames[0]);
          var dia = diames[1];
          var año = fecha[1].trim();
          var unix = new Date(año, mes, dia).getTime()/1000;
          var resultado = {};
          resultado.unix = unix.toString();
          resultado.natural = timestamp;
          res.send(resultado);
      } else {
          var fecha = new Date(timestamp*1000);
          var natural = calcularMes(fecha.getMonth())+' '+fecha.getDay()+', '+fecha.getFullYear();
          var resultado = {};
          resultado.unix = timestamp;
          resultado.natural = natural;
          res.send(resultado);
      }
    
    }
    
});

app.listen(8080, function(){
    console.log("El servidor esta activo");
});