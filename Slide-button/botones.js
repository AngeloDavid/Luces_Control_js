var ips=[['192.168.1.188','Cuarto 1'],
    ['192.168.100.102','Cuarto 2'],
    ['192.168.100.103','Cuarto 3'],
    ['192.168.100.104','Cuarto 4']];
var ipActual;
function elegir_Boton(boton) {
	console.log(boton.value);
	ipActual=boton.value;
	if(ipActual==-1){
	    document.getElementById("Mensaje").innerText="Todos" ;
        document.getElementById("btn_Elegir").classList.add("activo");
    }else{
        document.getElementById("Mensaje").innerText=ips[ipActual][1];
        document.getElementById("btn_Elegir").classList.remove("activo");
    }
	document.getElementById("btn_opciones").removeAttribute("disabled");
}
function boton_Elegido(range,ip) {
	var val = range.value;    
	console.log(ipActual);
    if ("WebSocket" in window){
        var ws1 = new WebSocket("ws://"+ips[ip][0]+"/off");
        ws1.onclose = function(){ };
    }
    if (val == 1) {
        range.className = "rangeFalse";
        if ("WebSocket" in window){
            var ws1 = new WebSocket("ws://"+ips[ip][0]+"/mas");
            ws1.onclose = function(){ };
        }

        
    } else if (val == 2) {
        //change color of slider background
        range.className = "rangeNeutral";
        if ("WebSocket" in window){
            var ws1 = new WebSocket("ws://"+ips[ip][0]+"/off");
            ws1.onclose = function(){ };
        }

    } else if (val == 3) {
    	//change color of slider background
    	range.className = "rangeTrue";
        if ("WebSocket" in window){
            var ws1 = new WebSocket("ws://"+ips[ip][0]+"/menos");
            ws1.onclose = function(){ };
        }
    }
}

function togglebutton(range) {
	if(ipActual==-1){
        Control_todos(range);
	}else{
        boton_Elegido(range,ipActual);
	}
}

function Control_todos(range) {
    // console.log(range.value);
	for (var i = 0; i <= ips.length; i++) {
		boton_Elegido(range,i);
	}
}

function  compEstado(ipid) {
    var comp=false;
    var xhttp = new XMLHttpRequest();
    var est;
    var ipbutton =ips[ipid][0];
    var idbutton = "option"+(ipid+1);
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById(idbutton).removeAttribute("disabled");
            document.getElementById("option_C"+(ipid+1)).classList.remove("disabled");
            xmlDoc=this.responseXML;
            x=xmlDoc.getElementsByTagName("LUZ");
            est=x[0].childNodes[0].nodeValue;
            var swt =document.getElementById(idbutton);
            swt.checked = est==0?false:true;
            comp=true;
        }
        if (this.readyState == 4 && this.status == 0) {
            var swt =document.getElementById(idbutton);
            swt.disabled=true;
            console.log(idbutton);
            var slide = document.getElementById("option_C"+(ipid+1));
            slide.className+=" disabled";
            comp=false;
        }
    };
    xhttp.open("GET", "http://"+ipbutton+"/status", true);
    xhttp.send();
    return comp;
}

function loadMain() {
    for (i =0;i<ips.length;i++){
        console.log(compEstado(i));
    }
}




