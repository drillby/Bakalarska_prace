#ifndef LEDController_h
#define LEDController_h
#include "Arduino.h"

class LEDController
{
public:
    LEDController(unsigned short pin_number);
    unsigned short pin_num;
    unsigned short is_active;
    void init();
    void changeState(unsigned short new_state);
    bool onIntervalPassed(unsigned long interval);
    bool offIntervalPassed(unsigned long interval);

private:
    unsigned long _prev_time;
};
#endif