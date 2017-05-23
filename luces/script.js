var ips=['192.168.1.188',
    '192.168.0.184',
    '192.168.0.183',
    '192.168.0.182'];

function loadMain() {
    for (i =0;i<ips.length;i++){
        console.log(compEstado(i));
    }
}
function unloadMain() {
    for (i =0;i<ips.length;i++){
        if ("WebSocket" in window){
            var ws1 = new WebSocket("ws://"+ips[i]+"/off");
            ws1.close = function(){ };
        }
    }

}

function togglebutton(range,ip) {

    var val = range.value;
    console.log(val);

    if ("WebSocket" in window){
        var ws1 = new WebSocket("ws://"+ips[ip]+"/off");
        ws1.onclose = function(){ };
    }

    if (val == 1) {
        range.className = "mas";
        if ("WebSocket" in window){
            var ws1 = new WebSocket("ws://"+ips[ip]+"/mas");
            ws1.onclose = function(){ };
        }

    } else if (val == 2) {
        range.className = "off";
        if ("WebSocket" in window){
            var ws1 = new WebSocket("ws://"+ips[ip]+"/off");
            ws1.onclose = function(){ };
        }

    } else if (val == 3) {
        range.className = "menos";
        if ("WebSocket" in window){
            var ws1 = new WebSocket("ws://"+ips[ip]+"/menos");
            ws1.onclose = function(){ };
        }
    }
    if(ip == 2){
        ip = 3;
        if ("WebSocket" in window){
            var ws1 = new WebSocket("ws://"+ips[ip]+"/off");
            ws1.onclose = function(){ };
        }

        if (val == 1) {
            range.className = "mas";
            if ("WebSocket" in window){
                var ws1 = new WebSocket("ws://"+ips[ip]+"/mas");
                ws1.onclose = function(){ };
            }

        } else if (val == 2) {
            range.className = "off";
            if ("WebSocket" in window){
                var ws1 = new WebSocket("ws://"+ips[ip]+"/off");
                ws1.onclose = function(){ };
            }

        } else if (val == 3) {
            range.className = "menos";
            if ("WebSocket" in window){
                var ws1 = new WebSocket("ws://"+ips[ip]+"/menos");
                ws1.onclose = function(){ };
            }
        }
        console.log("Segundo motor");
    }
}

function set_estado(est,ipbutton) {    
    if(est==3){
        document.getElementById(ipbutton).value=3;
        document.getElementById(ipbutton).className="mas";
    }
    if(est==1){
        document.getElementById(ipbutton).value=2;
        document.getElementById(ipbutton).className="off";
    }
    if(est==2){
        document.getElementById(ipbutton).value=1;
        document.getElementById(ipbutton).className="menos";
    }
}
function  compEstado(ipid) {
    var comp=false;
    var xhttp = new XMLHttpRequest();
    var est;
    var ipbutton =ips[ipid];
    var idbutton = "option"+(ipid+1);
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            if(ipid<3){
                document.getElementById(idbutton).removeAttribute("disabled");
                document.getElementById("buton"+(ipid)).classList.remove("disabled");
                xmlDoc=this.responseXML;
                x=xmlDoc.getElementsByTagName("LUZ");
                est=x[0].childNodes[0].nodeValue;
                set_estado(est,idbutton);
                console.log(est);
                /*if ("WebSocket" in window){
                    var ws1 = new WebSocket("ws://"+ipbutton+"/off");
                    ws1.onclose = function(){ };
                }*/
            }

        }
        if (this.readyState == 4 && this.status == 0) {
            if(ipid<3){
                var swt =document.getElementById(idbutton);
                swt.disabled=true;
                console.log(idbutton);
                var slide = document.getElementById("buton"+(ipid));
                slide.className+=" disabled";
                comp=false;
            }else{
                console.log("dos motores");
            }

        }
    };
    xhttp.open("GET", "http://"+ipbutton+"/status", true);
    xhttp.send();
    return comp;
}