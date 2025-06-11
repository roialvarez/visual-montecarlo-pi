var puntos = 0;
var dentro = 0;
var tam = 3.5;
var radio = 600.0;
var maximo = 1000000;
var flag = true;
var colorDentro = ["red","orange","#FE2E2E"];
var colorFuera = ["blue","#2E9AFE","#2EFEF7"];
//var canvas = document.getElementById("lienzo");

function dibuja(a,b,ctx,color){
	ctx.beginPath();
	ctx.arc(a,b,tam,0,2*Math.PI);
	ctx.fillStyle = color;
	ctx.fill();
	ctx.stroke();
}
function redondear(valor){
		return Math.round(valor*10000.)/10000.;
}

$(document).ready(function(){
	$("#ec").html("Valor real: "+Math.PI);
	var longitud = $("#range_long");
	var tamanho = $("#range_punto");
	var size = $("#range_size");
	var canvas = $("#lienzo");
	var ctx = canvas.get(0).getContext("2d");
	var t;
	function inicio(){
		puntos += 1;
		a = Math.random()*radio;
		b = Math.random()*radio;
		a1 = a-radio/2.0;
		b1 = b-radio/2.0;
		c = Math.sqrt(a1**2 + b1**2);
		d = 4*dentro/puntos;
		e = Math.abs(Math.PI-d);
		if (c<=radio/2.0) {
			dentro += 1;
			dibuja(a,b,ctx,colorDentro[0]);
		}else{
			dibuja(a,b,ctx,colorFuera[1]);
		}
		$("#puntos").html(puntos);
		$("#dentro").html(dentro);
		$("#result").html(d);
		$("#errabs").html(e);
		$("#errrel").html(e/Math.PI);
		$("#errpor").html(redondear(e*100.0/Math.PI));
	}
	$("#btn_start").click(function(e){
		t = setInterval(inicio,1);

	});
	$("#btn_stop").on("click",function(){
		if(t){
			clearInterval(t);
		}
	});
	longitud.on("change",function(){
		radio = parseFloat(this.value);
		(canvas[0]).width = radio;
		(canvas[0]).height = radio;
	});
	tamanho.on("change",function(){
		tam = parseFloat(this.value);
	});
	size.on("change",function(){
		$("#resultado").css("fontSize", this.value+"em");
		console.log(this.value)
	});
});
