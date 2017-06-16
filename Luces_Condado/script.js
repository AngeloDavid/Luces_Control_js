var ips=["192.168.1.196","192.168.1.195"];      
      var idDisp=0;
      var title=['Ext-Frontal','Ext-Lateral','Ref-Frontal','Ref-Lateral','Luz-1','Luz-2'];

      function loadDoc() {                
        compEstado(0);
      }

      function compEstado(ipid) {        
        var xhttp = new XMLHttpRequest();
        var ip =ips[ipid];         
        xhttp.onreadystatechange = function() {          
          var txt="";
          if (this.readyState == 4 && this.status == 200) {              
                xmlDoc = this.responseXML; 
                x=xmlDoc.getElementsByTagName("LUZ");              
                for (i =0; i < x.length ; i++) {                               
                  txt+=btnCrear(idDisp,title[idDisp],(x[i].childNodes[0].nodeValue==0?false:true),i,ipid);
                  idDisp++;               
                }                 
                if(ipid==1){                  
                  var txtante=document.getElementById("demo").innerHTML;
                  document.getElementById("demo").innerHTML=txtante+txt;
                }else{
                  //compEstado(1);
                  document.getElementById("demo").innerHTML=txt;
                }                                                
              }
          if (this.readyState == 4 && this.status == 0) {   
              var mss="<h1>Oups, Conexión defectuosa </h1><br><br>";
              mss+="<p>Por favor, Compruebe su conección con el router o conexión eléctrica</p>"
              mss+="<input type='button' id='act' onclick='loadDoc()' value='Recargar' >"
              mss+="<a href='luces.html'>ver luces</a>"
              document.getElementById("demo").innerHTML=mss;              
          }
        };  
           
        xhttp.open("GET", "http://"+ip+"/status", true);
        xhttp.send();                        
      }
      function btnCrear(id,labeltxt,checkedbool,idEqu,ipid) {
          var btn="";          
          var onCambiar="cambiar('power"+id+"',"+idEqu+","+ipid+");";          
          var checkedCompr = checkedbool? 'checked':'';
          
          btn+="<div class='power-container'>";
          btn+='<input type="checkbox" id="power'+id+'" name="power'+id+'" onchange="'+onCambiar+'"'+checkedCompr+' />';
          btn+="<label for='power"+id+"' class='power"+id+"'>";
          btn+="<span class='icon-off'></span><span class='light'></span></label>";
          btn+="<h2>"+labeltxt+"</h2></div>";
          return btn;
      }
      function cambiar(idbutton,id,ipid){          
          var ip =ips[ipid];
          var sw = document.getElementById(idbutton).checked;
          if(sw){
                if ("WebSocket" in window){
                    var ws1 = new WebSocket("ws://"+ip+"/on"+(id+1));           
                    ws1.onclose = function(){ };                                

                }
          }else{
             if ("WebSocket" in window){
               var ws = new WebSocket("ws://"+ip+"/off"+(id+1));
               ws.onclose = function(){ };
             }
          }
      }