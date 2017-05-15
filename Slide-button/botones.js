var ips=[['192.168.100.101','Cuarto 1'],
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
        for (i=0;i<ips.length;i++){
            console.log(document.getElementById("option"+i));
        }

    }else{
        document.getElementById("Mensaje").innerText=ips[ipActual][1];
        document.getElementById("btn_Elegir").classList.remove("activo");
    }
	document.getElementById("btn_opciones").removeAttribute("disabled");
}
function boton_Elegido(range,ip) {
	var val = range.value;    
	console.log(ipActual);
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




