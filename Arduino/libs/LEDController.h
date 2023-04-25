#ifndef LEDController_h
#define LEDController_h
#include "Arduino.h"

class LEDController
{
public:
    LEDController(uint8_t pin_number);
    uint8_t pin_num;
    uint8_t is_active;
    void init();
    void changeState(uint8_t new_state);
    bool onIntervalPassed(unsigned int interval);
    bool offIntervalPassed(unsigned int interval);

private:
    unsigned long _prev_time;
};
#endif