var ips=['192.168.100.101',
    '192.168.100.102'];
var ipActual;
function elegir_Boton(boton) {
	console.log(boton.value);
	ipActual=boton.value;
}
function boton_Elegido(range,ip) {
	var val = range.value;    
	console.log(ipActual);
    if (val == 1) {
        range.className = "rangeFalse";
        if ("WebSocket" in window){
            var ws1 = new WebSocket("ws://"+ips[ip]+"/mas");
            ws1.onclose = function(){ };
        }        
        
    } else if (val == 2) {
        //change color of slider background
        range.className = "rangeNeutral";
        if ("WebSocket" in window){
            var ws1 = new WebSocket("ws://"+ips[ip]+"/off");
            ws1.onclose = function(){ };
        }

    } else if (val == 3) {
    	//change color of slider background
    	range.className = "rangeTrue";
        if ("WebSocket" in window){
            var ws1 = new WebSocket("ws://"+ips[ip]+"/menos");
            ws1.onclose = function(){ };
        }
    }
}

function togglebutton(range) {
	if(ipActual==-1){
		Control_todos(range);
	}else{
		boton_Elegido(ipActual);
	}
}

function Control_todos(range) {
	for (var i = 0; i <= ips.length; i++) {
		boton_Elegido(range,i);
	}
}




