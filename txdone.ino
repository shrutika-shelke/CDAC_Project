#include <SPI.h>
#include <nRF24L01.h>
#include <RF24.h>
#include <DHT.h>

const int mq9Pin = A0; // Analog pin for MQ-9 sensor
const int dhtPin = 2;  // Digital pin for DHT22 sensor
const int pulsePin = A4;  // Analog pin for XD58C pulse rate sensor
const int buzzerPin = 10; // Digital pin for the piezo buzzer

DHT dht(dhtPin, DHT22);
RF24 radio(15, 5);    // CE, CSN pins

struct SensorData {
  int mq9Value;
  float temperature;
  float humidity;
  int pulseRate;
};

void setup() {
  Serial.begin(9600);
  radio.begin();
  radio.openWritingPipe(0xF0F0F0F0E1LL); // Set the transmit pipe address
  dht.begin();
}

void loop() {
  SensorData data;
  data.mq9Value = analogRead(mq9Pin);
  data.temperature = dht.readTemperature();
  data.humidity = dht.readHumidity();
  data.pulseRate = analogRead(pulsePin);

  // Convert the struct to a char array
  char msgBuffer[128];
  sprintf(msgBuffer, "G :%d,T :%.2f,H :%.2f,P :%d", data.mq9Value, data.temperature, data.humidity, data.pulseRate);

  radio.write(msgBuffer, sizeof(msgBuffer));
  Serial.println("Message Sent: " + String(msgBuffer));
  Serial.println("-----------------------------------------------------------------------------------------------------------");

  delay(1000); // Delay before sending the next message
}
