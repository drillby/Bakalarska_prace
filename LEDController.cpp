#include "Arduino.h"
#include "libs/LEDController.h"

LEDController::LEDController(uint8_t pin_number)
{
    pin_num = pin_number;
    _prev_time = 0;
    is_active = 0;
}

void LEDController::init()
{
    pinMode(pin_num, OUTPUT);
    return;
}

void LEDController::changeState(uint8_t new_state)
{
    digitalWrite(pin_num, new_state);
    is_active = new_state;
    return;
}

bool LEDController::intervalPassed(unsigned long interval)
{
    unsigned long curr_time = millis();
    if (curr_time - _prev_time >= interval)
    {
        _prev_time = curr_time;
        return true;
    }
    return false;
}

void checkUpBlink(LEDController LEDs[], uint8_t size, unsigned int delay_time)
{
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