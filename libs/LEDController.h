#ifndef LEDController_h
#define LEDController_h
#include "Arduino.h"

class LEDController
{
public:
    LEDController(int pin_number);
    int pin_num;
    int is_active;
    void init();
    void change_state(int new_state);
    bool onIntervalPassed(unsigned long interval);
    bool offIntervalPassed(unsigned long interval);

private:
    unsigned long _prev_time;
};
#endif