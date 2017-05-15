/**
 * Created by andrestaipe on 8/5/17.
 */
var ip="192.168.100.107";
function loadDoc() {
    for (i=1; i<=2; i++){
        compEstado(i);
    }
}
function compEstado(ipid){

    var xhttp = new XMLHttpRequest();
    var est;
    var idbutton = "swt" + ipid;

    xhttp.onreadystatechange = function() {

        if (this.readyState == 4 && this.status == 200) {
            document.getElementById(idbutton).removeAttribute("disabled");
            document.getElementById("slide"+ipid).classList.remove("disabled");
            est=this.responseText;
            var swt =document.getElementById(idbutton);
            swt.checked = est==0?false:true;
            compEstadoif(est);

        }
        if (this.readyState == 4 && this.status == 0) {
            var swt =document.getElementById(idbutton);
            swt.disabled=true;
            console.log(idbutton);
            var slide = document.getElementById("slide"+ipid);
            slide.className+=" disabled";
            /*var mss = "<div id='mserror1'>";
             mss+="<h1>Oups, Conexi&oacuten defectuosa </h1><br><br>";
             mss+="<p>Por favor, Compruebe su conexi&oacuten con el router o conexi&oacuten el&eacutectrica</p>";
             mss+="</div>";
             var ms =document.getElementById("oficina"+(ipid+1)).innerHTML=mss;*/
        }
    };

    xhttp.open("GET", "http://"+ip+"/status", true);
    xhttp.send();
}

function compEstadoif(est){
    if(est==0){
        checkedEstado(false);
        autoEstado(false,true);
    }else
    if(est==1){
        checkedEstado(true);
        autoEstado(false,false);
        llenar_canvas();
    }else{
        checkedEstado(true);
        autoEstado(true,false);
    }
}
function checkedEstado(bool1){
    var swt =document.getElementById("swt1");
    swt.checked = bool1;
}
function autoEstado(bool2,bool3){
    var swtauto =document.getElementById("swt2");
    swtauto.checked = bool2;
    swtauto.disabled = bool3;
}

function cambiar()
{
    var sw = document.getElementById("swt1").checked;
    if(sw){
        if ("WebSocket" in window)
        {
            var ws1 = new WebSocket("ws://"+ip+"/on");
            ws1.onclose = function(){ };
            var ws = new WebSocket("ws://"+ip);
            ws.onopen = function () { };
            ws.onclose = function(){};
            llenar_canvas();
            autoEstado(false,false);
        }
    }else{
        if ("WebSocket" in window)
        {
            var ws = new WebSocket("ws://"+ip+"/off");
            ws.onmessage = function (evt){ };
            ws.onclose = function(evt){ console.log(evt);};
            vaciar_canvas();
            autoEstado(false,true);
        }
    }
}
function cambiarAuto()
{
    var sw = document.getElementById("swt2").checked;
    if(sw){
        if ("WebSocket" in window)
        {
            var ws = new WebSocket("ws://"+ip+"/auto");
            ws.onclose = function(evt){console.log(evt);};
            vaciar_canvas();
        }
    }else{
        console.log("auto off")
        if ("WebSocket" in window)
        {
            var ws2 = new WebSocket("ws://"+ip+"/on");
            ws2.onclose = function(){ };
            llenar_canvas();
        }
    }

}
function vaciar_canvas() {
    var canvas = document.getElementById('colorspace');
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
function llenar_canvas () {
    var canvas = document.getElementById('colorspace');
    var ctx = canvas.getContext('2d');
    function drawCanvas() {
        var colours = ctx.createLinearGradient(0, 0, window.innerWidth, 0);
        for(var i=0; i <= 360; i+=10) {
            colours.addColorStop(i/360, 'hsl(' + i + ', 100%, 50%)');
        }
        ctx.fillStyle = colours;
        ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
        var luminance = ctx.createLinearGradient(0, 0, 0, ctx.canvas.height);
        luminance.addColorStop(0, '#ffffff');
        luminance.addColorStop(0.05, '#ffffff');
        luminance.addColorStop(0.5, 'rgba(0,0,0,0)');
        luminance.addColorStop(0.95, '#000000');
        luminance.addColorStop(1, '#000000');
        ctx.fillStyle = luminance; ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    }
    var eventLocked = false;
    function handleEvent(clientX, clientY) {
        if(eventLocked) {
            return;
        }
        function colourCorrect(v) {
            return Math.round(1023-(v*v)/64);
        }
        var data = ctx.getImageData(clientX, clientY, 1, 1).data;
        var params = [
            'r=' + colourCorrect(data[0]),
            'g=' + colourCorrect(data[1]),
            'b=' + colourCorrect(data[2]) ].join('&');
        var req = new XMLHttpRequest();
        req.open('POST', 'http://'+ip+'/?' + params, true);
        req.send();
        eventLocked = true;
        req.onreadystatechange = function() {
            if(req.readyState == 4)
            { eventLocked = false; }
        }
    }

    canvas.addEventListener('click', function(event) {
        handleEvent(event.clientX, event.clientY, true);
    }, false);

    canvas.addEventListener('touchmove', function(event){
        handleEvent(event.touches[0].clientX, event.touches[0].clientY);}, false);

    function resizeCanvas() {
        canvas.width = window.innerWidth; canvas.height = window.innerHeight; drawCanvas();
    }
    window.addEventListener('resize', resizeCanvas, false);
    resizeCanvas();
    drawCanvas();
    document.ontouchmove = function(e) {e.preventDefault()};
}
