#include <SPI.h>
#include <RF24.h>
#include <WiFi.h>
#include <HTTPClient.h>

const char *ssid = "shrutika";
const char *password = "12345678";
const char *api_key = "GNCLLYH1BZN8FCYF";
const char *channel_id = "2438231";

RF24 radio(15, 5);  // CE, CSN
const int buzzerPin = 10; // Digital pin for the piezo buzzer

void setup() {
  Serial.begin(9600);
  radio.begin();
  radio.openReadingPipe(1, 0xF0F0F0F0E1LL);  // Set the pipe address for communication
  radio.startListening();

  pinMode(buzzerPin, OUTPUT);
  connectToWiFi();
}

void loop() {
  if (radio.available()) {
    char text[128] = "";
    radio.read(&text, 128);
    Serial.println("Received Data: " + String(text));

    // Parse the sensor readings from the received data
    int G = parseGasLevel(text);
    float T = parseTemperature(text);
    float H = parseHumidity(text);
    int P = parsePulseRate(text);

//    Serial.println("Gas Level: " + String(gasLevel));
//    Serial.println("Temperature: " + String(temperature));
//    Serial.println("Humidity: " + String(humidity));
//    Serial.println("Pulse Rate: " + String(pulseRate));

    checkPulseRate(P);
    sendToThingSpeak(G, T, H, P);
  }
}

int parseGasLevel(String data) {
  return data.substring(data.indexOf("Gas Level: ") + 11, data.indexOf(",")).toInt();
}

float parseTemperature(String data) {
  return data.substring(data.indexOf("Temperature: ") + 13, data.indexOf(", Humidity: ")).toFloat();
}

float parseHumidity(String data) {
  return data.substring(data.indexOf("Humidity: ") + 10, data.indexOf(", Pulse Rate:")).toFloat();
}

int parsePulseRate(String data) {
  return data.substring(data.indexOf("Pulse Rate: ") + 12).toInt();
}

void checkPulseRate(int pulseRate) {
  if (pulseRate < 55 || pulseRate > 95) {
    tone(buzzerPin, 1000); // Sound the buzzer at 1000Hz
    delay(1000);          // Sound for 1 second
    noTone(buzzerPin);    // Stop the buzzer
  }
}

void connectToWiFi() {
  Serial.print("Connecting to WiFi");
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.print(".");
  }

  Serial.println("\nConnected to WiFi");
}

void sendToThingSpeak(int G, float T, float H, int P) {
  HTTPClient http;

  // Your ThingSpeak update URL
  String url = "http://api.thingspeak.com/update?api_key=" + String(api_key) +
               "&field1=" + String(G) +
               "&field2=" + String(T) +
               "&field3=" + String(H) +
               "&field4=" + String(P);

  http.begin(url);

  int httpCode = http.GET();
  if (httpCode > 0) {
    if (httpCode == HTTP_CODE_OK) {
      Serial.println("Data sent to ThingSpeak successfully");
    } else {
      Serial.println("Error sending data to ThingSpeak");
    }
  } else {
    Serial.println("HTTP request failed");
  }

  http.end();
}
