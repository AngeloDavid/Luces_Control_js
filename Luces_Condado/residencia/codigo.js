/**
 * Created by angel on 21/04/2017.
 */
var ips=['192.168.0.110'];
function loadDoc(){
    for(i =0; i<4;i++){
        compEstado(i);
    }
}
function compEstado(ipid) {
    var xhttp = new XMLHttpRequest();
    var est;
    var ipbutton =ips+"/status"+ipid;
    var idbutton = "swt"+(ipid+1);
    xhttp.onreadystatechange = function() {

        if (this.readyState == 4 && this.status == 200) {
            document.getElementById(idbutton).removeAttribute("disabled");
            document.getElementById("slide"+(ipid+1)).classList.remove("disabled");
            xmlDoc=this.responseXML;
            x=xmlDoc.getElementsByTagName("LUZ");
            est=x[0].childNodes[0].nodeValue;
            var swt =document.getElementById(idbutton);
            swt.checked = est==0?false:true;
        }
        if (this.readyState == 4 && this.status == 0) {
            var swt =document.getElementById(idbutton);
            swt.disabled=true;
            console.log(idbutton);
            var slide = document.getElementById("slide"+(ipid+1));
            slide.className+=" disabled";
        }
    };
    xhttp.open("GET", "http://"+ipbutton+"/status", true);
    xhttp.send();
}


function cambiar(idbutton,ipid){
    var ip =ips[ipid];
    var sw = document.getElementById(idbutton).checked;
    if(sw){
        if ("WebSocket" in window){
            var ws1 = new WebSocket("ws://"+ip+"/on");
            ws1.onclose = function(){ };
        }
    }else{
        if ("WebSocket" in window){
            var ws = new WebSocket("ws://"+ip+"/off");
            ws.onclose = function(){ };
        }
    }

}