// sudo minicom -D /dev/ttyACM0 -b 115200

#include "libs/LEDController.h"
#include "libs/WiFiConnController.h"
#include "libs/APIController.h"
#include "libs/ProxomitySensorController.h"

#include "config/APIConfig.h"
#include "config/LEDsconfig.h"
#include "config/WiFiConfig.h"
#include "config/SensorConfig.h"

LEDController CervenaLED(CERVENA);
LEDController OrangovaLED(ORANZOVA);
LEDController ZelenaLED(ZELENA);

String wifi_ssid = WIFI_SSID;
String wiif_pw = WIFI_PW;
WiFiConnController ConnController(wifi_ssid, wiif_pw);

uint8_t local_server[4] = LOCAL_SERVER;
IPAddress server_address(local_server[0], local_server[1], local_server[2], local_server[3]);
APIController FlaskAPI(server_address, SERVER_PORT);

ProximitySensorController SensorController(TRIGGER, ECHO, TRIGGER_OFFSET_MIN, TRIGGER_OFFSET_MAX);

// má svítit červená a oranžová zároveň
bool c_o;
uint8_t mesured_height;

void setup()
{
  Serial.begin(115200);
  CervenaLED.init();
  OrangovaLED.init();
  ZelenaLED.init();
  c_o = false;

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
      checkUpBlink(LEDs_error, LEDs_error_size, delay_time);
    }
  }
  checkUpBlink(LEDs_passed, LEDs_pass_size, delay_time);

  // kontrola zda Arduino má nejnovější WiFi firmware
  if (!ConnController.hasLatestFirmware())
  {
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
    while (true)
    {
      checkUpBlink(LEDs_error, LEDs_error_size, delay_time);
    }
  }
  checkUpBlink(LEDs_passed, LEDs_pass_size, delay_time);

  FlaskAPI.disconect();
  // FlaskAPI.connect(1);

  mesured_height = 0;

  // inicializace senzoru a nastavení výšky ve které se senzor nachází
  SensorController.init();

  // konec kontrolní sekvence Arduina
  // bliknutí všech LED je pouze vizuální ukazatel, že skončila tato sekvence
  checkUpBlink(LEDs_check_up, LEDs_check_size, delay_time);
}
void loop()
{
  // chtěná sekvence = č -> č+o -> z -> o

  // červená
  if (!CervenaLED.is_active && !ZelenaLED.is_active &&
      !OrangovaLED.is_active && CervenaLED.offIntervalPassed(CERVENA_INTERVAL))
  {
    CervenaLED.changeState(HIGH);
  }
  else if (CervenaLED.is_active && !OrangovaLED.is_active &&
           CervenaLED.onIntervalPassed(CERVENA_INTERVAL))
  {
    CervenaLED.changeState(LOW);
  }

  // červená + oranžová
  if (c_o && !CervenaLED.is_active && !ZelenaLED.is_active &&
      !OrangovaLED.is_active && OrangovaLED.offIntervalPassed(CERVENA_ORANZOVA_INTERVAL))
  {
    CervenaLED.changeState(HIGH);
    OrangovaLED.changeState(HIGH);
  }
  else if (c_o && OrangovaLED.is_active && CervenaLED.is_active &&
           OrangovaLED.onIntervalPassed(CERVENA_ORANZOVA_INTERVAL))
  {
    CervenaLED.changeState(LOW);
    OrangovaLED.changeState(LOW);
    c_o = false;
  }

  // zelená
  if (!ZelenaLED.is_active && !CervenaLED.is_active && !OrangovaLED.is_active &&
      ZelenaLED.offIntervalPassed(ZELENA_INTERVAL))
  {
    ZelenaLED.changeState(HIGH);
  }
  else if (ZelenaLED.is_active && ZelenaLED.onIntervalPassed(ZELENA_INTERVAL))
  {
    ZelenaLED.changeState(LOW);
  }

  // oranžová
  if (!c_o && !CervenaLED.is_active && !ZelenaLED.is_active && !OrangovaLED.is_active &&
      OrangovaLED.offIntervalPassed(ORANZOVA_INTERVAL))
  {
    OrangovaLED.changeState(HIGH);
  }
  else if (!c_o && OrangovaLED.is_active && OrangovaLED.onIntervalPassed(ORANZOVA_INTERVAL))
  {
    OrangovaLED.changeState(LOW);
    c_o = true;
  }

  // měření
  mesured_height = SensorController.measure(MESUREMENT_TIME);
  if (SensorController.compare(mesured_height))
  {
    String req_body = "{\"is_red_light\":" +
                      String(CervenaLED.is_active && !OrangovaLED.is_active) + "}";
    Serial.println(req_body);
    //  FlaskAPI.sendRequest(POST_REQUEST, "/write_db", req_body);
    //  FlaskAPI.disconect();
    //  FlaskAPI.connect(0);
  }

  // // kontrola a pokus o opětovné připojení, pokud vypadne WiFi
  // if (!ConnController.isConnected())
  // {
  //   CervenaLED.changeState(LOW);
  //   OrangovaLED.changeState(LOW);
  //   ZelenaLED.changeState(LOW);
  //   c_o = true;
  //   while (!ConnController.isConnected())
  //   {
  //     OrangovaLED.changeState(HIGH);
  //     ConnController.connect(0);
  //     OrangovaLED.changeState(LOW);
  //     delay(ConnController.conn_check_delay);
  //   }
  // }

  // // kontrola a pokus o opětovné připojení, pokud se nedaří navázat spojení se serverem
  // if (!FlaskAPI.is_connected)
  // {
  //   CervenaLED.changeState(LOW);
  //   OrangovaLED.changeState(LOW);
  //   ZelenaLED.changeState(LOW);
  //   c_o = true;
  //   while (!FlaskAPI.is_connected)
  //   {
  //     OrangovaLED.changeState(HIGH);
  //     FlaskAPI.connect(0);
  //     OrangovaLED.changeState(LOW);
  //     delay(FlaskAPI.conn_check_delay);
  //   }
  // }
}
