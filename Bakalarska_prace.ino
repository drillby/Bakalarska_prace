#include "libs/LEDController.h"
#include "libs/WiFiConnController.h"
#include "libs/APIController.h"
#include "config.h"

LEDController CervenaLED(CERVENA);
LEDController OrangovaLED(ORANZOVA);
LEDController ZelenaLED(ZELENA);

String ssid_ = WIFI_SSID;
String pw_ = WIFI_PW;

WiFiConnController ConnController(WIFI_SSID, WIFI_PW); // ! v případě nedostatku místa refaktorovat String na char *

APIController FlaskAPI(SERVER_ADDRESS, SERVER_PORT);

// má svítit červená a oranžová zároveň
bool c_o;

/// @brief funkce pro abstrakci blikání LEDek při kontrole Arduina
/// @param LEDs pole inicializovaných LEDController objektů
/// @param size velikost pole
/// @param delay_time doba po kterou budou LEDky svítit v ms
void checkUpBlink(LEDController LEDs[], unsigned int delay_time)
{
  unsigned int size = sizeof(LEDs) / sizeof(LEDs[0]);
  for (uint8_t i = 0; i < size; i++)
  {
    LEDs[i].changeState(HIGH);
  }
  delay(delay_time);
  for (uint8_t i = 0; i < size; i++)
  {
    LEDs[i].changeState(LOW);
  }
  delay(delay_time);
}

void setup()
{
  CervenaLED.init();
  OrangovaLED.init();
  ZelenaLED.init();
  c_o = false;

  LEDController LEDs_check_up[3] = {CervenaLED, OrangovaLED, ZelenaLED};

  LEDController LEDs_passed[1] = {ZelenaLED};

  LEDController LEDs_warning[1] = {OrangovaLED};

  LEDController LEDs_error[1] = {CervenaLED};

  unsigned long delay_time = 1000;

  // začátek kontrolní sekvence Arduina
  // bliknutí všech LED je pouze vizuální ukazatel, že začala tato sekvence
  checkUpBlink(LEDs_check_up, delay_time);

  // kontrola zda Arduino obsahuje WiFi modul
  if (!ConnController.hasWiFiModule())
  {
    while (true)
    {
      checkUpBlink(LEDs_error, delay_time);
    }
  }
  checkUpBlink(LEDs_passed, delay_time);

  // kontrola zda Arduino má nejnovější WiFi firmware
  if (!ConnController.hasLatestFirmware())
  {
    checkUpBlink(LEDs_warning, delay_time);
  }
  else
  {
    checkUpBlink(LEDs_passed, delay_time);
  }

  ConnController.connect(3);

  if (ConnController.status != WL_CONNECTED)
  {
    while (true)
    {
      checkUpBlink(LEDs_error, delay_time);
    }
  }
  checkUpBlink(LEDs_passed, delay_time);

  FlaskAPI.connect(3);

  if (FlaskAPI.is_connected == false)
  {
    while (true)
    {
      checkUpBlink(LEDs_error, delay_time);
    }
  }
  checkUpBlink(LEDs_passed, delay_time);

  // TODO:testovací dotaz na server

  // konec kontrolní sekvence Arduina
  // bliknutí všech LED je pouze vizuální ukazatel, že začala tato skončila
  checkUpBlink(LEDs_check_up, delay_time);
}
void loop()
{
  // chtěná sekvence = č -> č+o -> z -> o

  // červená
  if (!CervenaLED.is_active && !ZelenaLED.is_active && !OrangovaLED.is_active && CervenaLED.offIntervalPassed(CERVENA_INTERVAL))
  {
    CervenaLED.changeState(HIGH);
  }
  else if (CervenaLED.is_active && !OrangovaLED.is_active && CervenaLED.onIntervalPassed(CERVENA_INTERVAL))
  {
    CervenaLED.changeState(LOW);
  }

  // červená + oranžová
  if (c_o && !CervenaLED.is_active && !ZelenaLED.is_active && !OrangovaLED.is_active && OrangovaLED.offIntervalPassed(CERVENA_ORANZOVA_INTERVAL))
  {
    CervenaLED.changeState(HIGH);
    OrangovaLED.changeState(HIGH);
  }
  else if (c_o && OrangovaLED.is_active && CervenaLED.is_active && OrangovaLED.onIntervalPassed(CERVENA_ORANZOVA_INTERVAL))
  {
    CervenaLED.changeState(LOW);
    OrangovaLED.changeState(LOW);
    c_o = false;
  }

  // zelená
  if (!ZelenaLED.is_active && !CervenaLED.is_active && !OrangovaLED.is_active && ZelenaLED.offIntervalPassed(ZELENA_INTERVAL))
  {
    ZelenaLED.changeState(HIGH);
  }
  else if (ZelenaLED.is_active && ZelenaLED.onIntervalPassed(ZELENA_INTERVAL))
  {
    ZelenaLED.changeState(LOW);
  }

  // oranžová
  if (!c_o && !CervenaLED.is_active && !ZelenaLED.is_active && !OrangovaLED.is_active && OrangovaLED.offIntervalPassed(ORANZOVA_INTERVAL))
  {
    OrangovaLED.changeState(HIGH);
  }
  else if (!c_o && OrangovaLED.is_active && OrangovaLED.onIntervalPassed(ORANZOVA_INTERVAL))
  {
    OrangovaLED.changeState(LOW);
    c_o = true;
  }
}