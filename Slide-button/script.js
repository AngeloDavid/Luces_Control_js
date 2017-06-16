var ips=['192.168.1.188',
    '192.168.100.102'];

function togglebutton(range,ip) {

	var val = range.value;    

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
        