#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>
#include <ESP8266HTTPUpdateServer.h> //Biblioteca que cria o servico de atualizacão via wifi (ou Over The Air - OTA)
#define DEBUGGING(...) Serial.println( __VA_ARGS__ )
#define DEBUGGING_L(...) Serial.print( __VA_ARGS__ )


const char* host      = "luces"; //Nome que seu ESP8266 (ou NodeMCU) tera na rede
const char* ssid = "Systel";
const char* password = "abracadabra";

String readStrings = "";

int pin1 = 14; // (D5)
int pin2 = 12; // (D6)
int pin3 = 13; // (D7)
int pin4 = 15; // (D8)



String estado1;
String estado2;
String estado3;
String estado4;

String XML;


ESP8266WebServer servidorWeb(80); //Servidor Web en puerto 80
ESP8266HTTPUpdateServer atualizadorOTA;
//WiFiServer server(80);
//WiFiClient client;

/////////////////////////////////////////////////////////////////////////////////////////////

void buildXML(){
  XML="<?xml version='1.0'?>";
  XML+="<CASA>";
  XML+="<CUARTO>";
  XML+="<LUZ>";
  XML+=estado1;
  XML+="</LUZ>";
  XML+="<LUZ>";
  XML+=estado2;
  XML+="</LUZ>";
  XML+="<LUZ>";
  XML+=estado3;
  XML+="</LUZ>";
  XML+="<LUZ>";
  XML+=estado4;
  XML+="</LUZ>";
  XML+="</CUARTO>";
  XML+="</CASA>";
}

void handleOn1() {
  estado1="1";
  digitalWrite(pin1,LOW);
}

void handleOff1() {
  estado1="0";
  digitalWrite(pin1,HIGH);
}

void handleOn2() {
  estado2="1";
  digitalWrite(pin2,LOW);
}

void handleOff2() {
  estado2="0";
  digitalWrite(pin2,HIGH);
}

void handleOn3() {
  estado3="1";
  digitalWrite(pin3,LOW);
}

void handleOff3() {
  estado3="0";
  digitalWrite(pin3,HIGH);
}

void handleOn4() {
  estado4="1";
  digitalWrite(pin4,LOW);
}

void handleOff4() {
  estado4="0";
  digitalWrite(pin4,HIGH);
}




void handleStatus() {
  buildXML();
  servidorWeb.send(200,"text/xml",XML);
}

//////////////////////////////////////////////////////////
void InicializaServicoAtualizacao() {
  atualizadorOTA.setup(&servidorWeb);
  servidorWeb.begin();
  DEBUGGING_L("O servico de atualizacao remota (OTA) Foi iniciado com sucesso! Abra http://");
  DEBUGGING_L(host);
  DEBUGGING(".local/update no seu browser para iniciar a atualizacao\n");
}


////////////////////////////////////////////////////////////////////////////////////
void setup() {
  Serial.begin(115200);
  delay(10);
  servidorWeb.begin();
  estado1="0";
  estado2="0";
  estado3="0";
  estado4="0";
  InicializaServicoAtualizacao();
  servidorWeb.on("/on1", handleOn1);
  servidorWeb.on("/off1", handleOff1);
  servidorWeb.on("/on2", handleOn2);
  servidorWeb.on("/off2", handleOff2);
  servidorWeb.on("/on3", handleOn3);
  servidorWeb.on("/off3", handleOff3);
  servidorWeb.on("/on4", handleOn4);
  servidorWeb.on("/off4", handleOff4);
  servidorWeb.on("/status", handleStatus);

      // config static IP
  IPAddress ip(192, 168, 1, 110);
  IPAddress gateway(192, 168, 1, 1);
  Serial.print(F("Setting static ip to : "));
  Serial.println(ip);
  IPAddress subnet(255, 255, 255, 0);
  WiFi.config(ip, gateway, subnet);
    // config static IP


  pinMode(pin1,OUTPUT);
  pinMode(pin2,OUTPUT);
  pinMode(pin3,OUTPUT);
  pinMode(pin4,OUTPUT);
  digitalWrite(pin1,HIGH);
  digitalWrite(pin2,HIGH);
  digitalWrite(pin3,HIGH);
  digitalWrite(pin4,HIGH);
  pinMode(LED_BUILTIN, OUTPUT);


  // Connect to WiFi network
  Serial.println();
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);



  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.println("WiFi connected");

  // Start the server
  //server.begin();
  Serial.println("Server started");

  // Print the IP address
  Serial.println(WiFi.localIP());
}
/////////////////////////////////////////////////////////////////////////////////////////////

void loop() {
servidorWeb.handleClient();
  }//void loop()
