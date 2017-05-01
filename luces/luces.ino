#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>

const char* ssid = "Systel";
const char* password = "abracadabrasys";

String readStrings = "";

int pin1 = 14; // (D5)
int pin2 = 12; // (D6)
int pin3 = 13; // (D7)


String estado1,estado2,estado3;
String XML;

ESP8266WebServer servidorWeb(80); //Servidor Web en puerto 80
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
  XML+="</CUARTO>";
  XML+="<CUARTO>";
  XML+="<LUZ>";
  XML+=estado2;
  XML+="</LUZ>";
  XML+="</CUARTO>";
  XML+="<CUARTO>";
  XML+="<LUZ>";
  XML+=estado3;
  XML+="</LUZ>";
  XML+="</CUARTO>";
  XML+="</CASA>";
}

void handleOn1() {
  estado1="1";
  digitalWrite(pin1,HIGH);
}

void handleOff1() {
  estado1="0";
  digitalWrite(pin1,LOW);
}

void handleOn2() {
  estado2="1";
  digitalWrite(pin2,HIGH);
}

void handleOff2() {
  estado2="0";
  digitalWrite(pin2,LOW);
}

void handleOn3() {
  estado3="1";
  digitalWrite(pin3,HIGH);
}

void handleOff3() {
  estado3="0";
  digitalWrite(pin3,LOW);
}

void handleStatus() {
  buildXML();
  servidorWeb.send(200,"text/xml",XML);
}


////////////////////////////////////////////////////////////////////////////////////
void setup() {
  Serial.begin(115200);
  delay(10);
  servidorWeb.begin();
  estado1=estado2=estado3="0";
  servidorWeb.on("/on1", handleOn1);
  servidorWeb.on("/off1", handleOff1);
  servidorWeb.on("/on2", handleOn2);
  servidorWeb.on("/off2", handleOff2);
  servidorWeb.on("/on3", handleOn3);
  servidorWeb.on("/off3", handleOff3);
  servidorWeb.on("/status", handleStatus);

      // config static IP
  IPAddress ip(192, 168, 1, 196);
  IPAddress gateway(192, 168, 1, 1);
  Serial.print(F("Setting static ip to : "));
  Serial.println(ip);
  IPAddress subnet(255, 255, 255, 0);
  WiFi.config(ip, gateway, subnet);
    // config static IP


  pinMode(pin1,OUTPUT);
  pinMode(pin2,OUTPUT);
  pinMode(pin3,OUTPUT);
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
