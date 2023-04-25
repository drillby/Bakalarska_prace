#include "libs/LEDController.h"
#include "libs/WiFiConnController.h"
#include "config.h"

LEDController CervenaLED(CERVENA);
LEDController OrangovaLED(ORANZOVA);
LEDController ZelenaLED(ZELENA);

uint8_t test[] = ARDU_IP;
WiFiConnController ConnController(WIFI_SSID, WIFI_PW, test, NO_ENCRYPTION);

// má svítit červená a oranžová zároveň
bool c_o;

void setup()
{
  CervenaLED.init();
  OrangovaLED.init();
  ZelenaLED.init();
  c_o = false;
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