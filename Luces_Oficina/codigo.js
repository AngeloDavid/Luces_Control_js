/**
 * Created by angel on 21/04/2017.
 */
var ips=['192.168.100.101',
    '192.168.100.102',
    '192.168.100.103',
    '192.168.100.104',
    '192.168.100.105'];
//var titles=['101','102','103','104'];
function loadDoc(){
    for(i =0; i<5;i++){
        compEstado(i);
    }
}
function compEstado(ipid) {
    var xhttp = new XMLHttpRequest();
    var txt="";
    var est;
    var ipbutton =ips[ipid];
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
            /*var mss = "<div id='mserror1'>";
            mss+="<h1>Oups, Conexi&oacuten defectuosa </h1><br><br>";
            mss+="<p>Por favor, Compruebe su conexi&oacuten con el router o conexi&oacuten el&eacutectrica</p>";
            mss+="</div>";
            var ms =document.getElementById("oficina"+(ipid+1)).innerHTML=mss;*/
        }
    };
    xhttp.open("GET", "http://"+ipbutton+"/status", true);
    xhttp.send();
}

function btnCrear(labeltxt,checkedbool,id) {
    var btn="";
    var onCambiar="cambiar('power"+id+"',"+id+");";
    var checkedCompr = checkedbool? 'checked':'';

    btn+="<div class='power-container'>";
    btn+='<input type="checkbox" id="power'+id+'" name="power'+id+'" onchange="'+onCambiar+'"'+checkedCompr+' />';
    btn+="<label for='power"+id+"' class='power"+id+"'>";
    btn+="<span class='icon-off'></span><span class='light'></span></label>";
    btn+="<h2>"+labeltxt+"</h2></div>";
    return btn;
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