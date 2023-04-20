#include "libs/LEDController.h"
#include <WiFiNINA.h>

// PIN zelené diody
#define ZELENA 5
// PIN oranžové diody
#define ORANZOVA 6
// PIN červwné diody
#define CERVENA 7

// jak dlouho má červená dioda svítit
#define CERVENA_INTERVAL 3000
// jak dlouho má svítit červená a oranžová dioda zároveň
#define CERVENA_ORANZOVA_INTERVAL 1000
// jak dlouho má oranžová dioda svítit
#define ORANZOVA_INTERVAL 1000
// jak dlouho má zelená dioda svítit
#define ZELENA_INTERVAL CERVENA_INTERVAL + CERVENA_ORANZOVA_INTERVAL

LEDController CervenaLED(CERVENA);
LEDController OrangovaLED(ORANZOVA);
LEDController ZelenaLED(ZELENA);

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
    CervenaLED.change_state(HIGH);
  }
  else if (CervenaLED.is_active && !OrangovaLED.is_active && CervenaLED.onIntervalPassed(CERVENA_INTERVAL))
  {
    CervenaLED.change_state(LOW);
  }

  // červená + oranžová
  if (c_o && !CervenaLED.is_active && !ZelenaLED.is_active && !OrangovaLED.is_active && OrangovaLED.offIntervalPassed(CERVENA_ORANZOVA_INTERVAL))
  {
    CervenaLED.change_state(HIGH);
    OrangovaLED.change_state(HIGH);
  }
  else if (c_o && OrangovaLED.is_active && CervenaLED.is_active && OrangovaLED.onIntervalPassed(CERVENA_ORANZOVA_INTERVAL))
  {
    CervenaLED.change_state(LOW);
    OrangovaLED.change_state(LOW);
    c_o = false;
  }

  // zelená
  if (!ZelenaLED.is_active && !CervenaLED.is_active && !OrangovaLED.is_active && ZelenaLED.offIntervalPassed(ZELENA_INTERVAL))
  {
    ZelenaLED.change_state(HIGH);
  }
  else if (ZelenaLED.is_active && ZelenaLED.onIntervalPassed(ZELENA_INTERVAL))
  {
    ZelenaLED.change_state(LOW);
  }

  // oranžová
  if (!c_o && !CervenaLED.is_active && !ZelenaLED.is_active && !OrangovaLED.is_active && OrangovaLED.offIntervalPassed(ORANZOVA_INTERVAL))
  {
    OrangovaLED.change_state(HIGH);
  }
  else if (!c_o && OrangovaLED.is_active && OrangovaLED.onIntervalPassed(ORANZOVA_INTERVAL))
  {
    OrangovaLED.change_state(LOW);
    c_o = true;
  }
}