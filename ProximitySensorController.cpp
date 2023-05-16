#include "Arduino.h"
#include "libs/ProxomitySensorController.h"

ProximitySensorController::ProximitySensorController(
    uint8_t trig_pin, uint8_t echo_pin, uint16_t min_offset, uint16_t max_offset)
{
    t_pin = trig_pin;
    e_pin = echo_pin;
    mi_offset = min_offset;
    ma_offset = max_offset;
    last_trig = millis();
}

void ProximitySensorController::setUp()
{
    pinMode(t_pin, OUTPUT);
    pinMode(e_pin, INPUT);
    unsigned long avg = 0;
    uint8_t num_of_rep = 20;
    for (uint8_t i = 0; i <= num_of_rep; i++)
    {
        avg += measure(5);
    }
    base_len = avg / num_of_rep;
}

uint16_t ProximitySensorController::measure(uint8_t measurement_time)
{
    digitalWrite(t_pin, HIGH);
    delay(measurement_time);
    digitalWrite(t_pin, LOW);
    unsigned long time = pulseIn(e_pin, HIGH);
    return (time / 2) / 29.1;
}

bool ProximitySensorController::compare(uint16_t mesured_len)
{
    bool inBounds = mesured_len <= base_len - mi_offset && mesured_len >= base_len - ma_offset;
    bool wasPrevious = _prev_state <= base_len - mi_offset && _prev_state >= base_len - ma_offset;
    _prev_state = mesured_len;

    uint16_t now = millis();
    bool time = now - last_trig >= 500;
    if (inBounds)
    {
        last_trig = now;
    }

    return !wasPrevious && inBounds && time;
}

bool ProximitySensorController::aboveMax(uint16_t mesured_len)
{
    return mesured_len > ma_offset;
}

bool ProximitySensorController::belowMin(uint16_t mesured_len)
{
    return mi_offset > mesured_len;
}