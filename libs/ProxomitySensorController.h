#ifndef ProximitySensorController_h
#define ProximitySensorController_h

class ProximitySensorController
{
public:
    ProximitySensorController(uint8_t trig_pin, uint8_t echo_pin, uint16_t min_offset);
    uint16_t measure(uint8_t measurement_time);
    void setUp();
    bool compare(uint16_t mesured_len);
    uint8_t t_pin;
    uint8_t e_pin;
    float offset;

private:
    uint16_t base_len;
};

#endif