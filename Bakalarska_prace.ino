// sudo minicom -D /dev/ttyACM0 -b 115200 - pro připojení terminalu k Arduinu přes USB

#define DEBUG

#include "libs/LEDController.h"
#include "libs/WiFiConnController.h"
#include "libs/APIController.h"
#include "libs/ProxomitySensorController.h"
#include "libs/MQTTController.h"

#include "config/APIConfig.h"
#include "config/LEDsConfig.h"
#include "config/WiFiConfig.h"
#include "config/SensorConfig.h"
#include "config/MQTTConfig.h"

LEDController CervenaLED(CERVENA);
LEDController OrangovaLED(ORANZOVA);
LEDController ZelenaLED(ZELENA);

String wifi_ssid = WIFI_SSID;
String wiif_pw = WIFI_PW;
WiFiConnController ConnController(wifi_ssid, wiif_pw);

// uint8_t local_server[4] = LOCAL_SERVER;
// IPAddress server_address(local_server[0], local_server[1], local_server[2], local_server[3]);
APIController FlaskAPI(SERVER_ADDRESS, SERVER_PORT);

uint8_t mqtt_server[4] = MQTT_LOCAL;
IPAddress mqtt_ip(mqtt_server[0], mqtt_server[1], mqtt_server[2], mqtt_server[3]);
MQTTController MQTTSender(MQTT_SERVER, MQTT_PORT, MQTT_TOPIC);

ProximitySensorController SensorController(TRIGGER, ECHO, TRIGGER_OFFSET_MIN, TRIGGER_OFFSET_MAX);

// má svítit červená a oranžová zároveň
bool c_o;
uint8_t mesured_height;

void setup()
{
#ifdef DEBUG
  Serial.begin(115200);
  Serial.println("Debug mód zapnut");
#endif
  CervenaLED.init();
  OrangovaLED.init();
  ZelenaLED.init();
  c_o = true;

  LEDController LEDs_check_up[3] = {CervenaLED, OrangovaLED, ZelenaLED};
  uint8_t LEDs_check_size = sizeof(LEDs_check_up) / sizeof(LEDController);

  LEDController LEDs_passed[1] = {ZelenaLED};
  uint8_t LEDs_pass_size = sizeof(LEDs_passed) / sizeof(LEDController);

  LEDController LEDs_warning[1] = {OrangovaLED};
  uint8_t LEDs_warning_size = sizeof(LEDs_warning) / sizeof(LEDController);

  LEDController LEDs_error[1] = {CervenaLED};
  uint8_t LEDs_error_size = sizeof(LEDs_error) / sizeof(LEDController);

  unsigned long delay_time = 1000;

  // začátek kontrolní sekvence Arduina
  // bliknutí všech LED je pouze vizuální ukazatel, že začala tato sekvence
  checkUpBlink(LEDs_check_up, LEDs_check_size, delay_time);

  // kontrola zda Arduino obsahuje WiFi modul
  if (!ConnController.hasWiFiModule())
  {
    while (true)
    {
#ifdef DEBUG
      Serial.println("WiFi modul nenalezen");
#endif
      checkUpBlink(LEDs_error, LEDs_error_size, delay_time);
    }
  }
  checkUpBlink(LEDs_passed, LEDs_pass_size, delay_time);

  // kontrola zda Arduino má nejnovější WiFi firmware
  if (!ConnController.hasLatestFirmware())
  {
#ifdef DEBUG
    Serial.println("WiFi modul nemá nejnovější firmware");
#endif
    checkUpBlink(LEDs_warning, LEDs_warning_size, delay_time);
  }
  else
  {
    checkUpBlink(LEDs_passed, LEDs_pass_size, delay_time);
  }

  // pokus o připojení na WiFi
  ConnController.connect(3);

  if (ConnController.status != WL_CONNECTED)
  {
#ifdef DEBUG
    Serial.println("Nepodařilo se připojit k WiFi");
#endif
    while (true)
    {
      checkUpBlink(LEDs_error, LEDs_error_size, delay_time);
    }
  }
  checkUpBlink(LEDs_passed, LEDs_pass_size, delay_time);

  // pokus o připojení k REST API serveru
  FlaskAPI.connect(3);

  if (!FlaskAPI.is_connected)
  {
#ifdef DEBUG
    Serial.println("Nepodařilo se připojit k REST API serveru");
#endif
    while (true)
    {
      checkUpBlink(LEDs_error, LEDs_error_size, delay_time);
    }
  }
  checkUpBlink(LEDs_passed, LEDs_pass_size, delay_time);

  // testovací HTTP požadavek
  FlaskAPI.sendRequest(GET_REQUEST, "/");
  if (!FlaskAPI.isOKResCode())
  {
#ifdef DEBUG
    Serial.println("Testovací HTTP požadavek selhal");
#endif
    while (true)
    {
      checkUpBlink(LEDs_error, LEDs_error_size, delay_time);
    }
  }
  checkUpBlink(LEDs_passed, LEDs_pass_size, delay_time);

  FlaskAPI.disconect();

  if (!MQTTSender.connect())
  {
#ifdef DEBUG
    Serial.println("Nepodařilo se připojit k MQTT serveru");
#endif
    while (true)
    {
      checkUpBlink(LEDs_error, LEDs_error_size, delay_time);
    }
  }
  checkUpBlink(LEDs_passed, LEDs_pass_size, delay_time);

  mesured_height = 0;

  // inicializace senzoru a nastavení výšky ve které se senzor nachází
  SensorController.init();
#ifdef DEBUG
  Serial.println("Senzor inicializován, na výšce: " + String(SensorController.get_base_len()) + " cm");
#endif

  // konec kontrolní sekvence Arduina
  // bliknutí všech LED je pouze vizuální ukazatel, že skončila tato sekvence
  checkUpBlink(LEDs_check_up, LEDs_check_size, delay_time);
}
void loop()
{
  // chtěná sekvence = č -> č+o -> z -> o

  // červená
  if (!CervenaLED.is_active && !ZelenaLED.is_active &&
      !OrangovaLED.is_active && CervenaLED.intervalPassed(CERVENA_INTERVAL))
  {
    CervenaLED.changeState(HIGH);
  }
  else if (CervenaLED.is_active && !OrangovaLED.is_active &&
           CervenaLED.intervalPassed(CERVENA_INTERVAL))
  {
    CervenaLED.changeState(LOW);
  }

  // červená + oranžová
  if (c_o && !CervenaLED.is_active && !ZelenaLED.is_active &&
      !OrangovaLED.is_active && OrangovaLED.intervalPassed(CERVENA_ORANZOVA_INTERVAL))
  {
    CervenaLED.changeState(HIGH);
    OrangovaLED.changeState(HIGH);
  }
  else if (c_o && OrangovaLED.is_active && CervenaLED.is_active &&
           OrangovaLED.intervalPassed(CERVENA_ORANZOVA_INTERVAL))
  {
    CervenaLED.changeState(LOW);
    OrangovaLED.changeState(LOW);
    c_o = false;
  }

  // zelená
  if (!ZelenaLED.is_active && !CervenaLED.is_active && !OrangovaLED.is_active &&
      ZelenaLED.intervalPassed(ZELENA_INTERVAL))
  {
    ZelenaLED.changeState(HIGH);
    MQTTSender.poll();
  }
  else if (ZelenaLED.is_active && ZelenaLED.intervalPassed(ZELENA_INTERVAL))
  {
    ZelenaLED.changeState(LOW);
  }

  // oranžová
  if (!c_o && !CervenaLED.is_active && !ZelenaLED.is_active && !OrangovaLED.is_active &&
      OrangovaLED.intervalPassed(ORANZOVA_INTERVAL))
  {
    OrangovaLED.changeState(HIGH);
  }
  else if (!c_o && OrangovaLED.is_active && OrangovaLED.intervalPassed(ORANZOVA_INTERVAL))
  {
    OrangovaLED.changeState(LOW);
    c_o = true;
  }

  // měření
  mesured_height = SensorController.measure(MESUREMENT_TIME);
  if (SensorController.compare(mesured_height))
  {
#ifdef DEBUG
    Serial.println("Pohyb zaznamenán");
#endif
    String req_body = "{\"is_red_light\":" +
                      String((CervenaLED.is_active && OrangovaLED.is_active) || CervenaLED.is_active) + "}";
    MQTTSender.send(req_body);
  }
}
