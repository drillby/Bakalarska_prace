#ifndef LEDController_h
#define LEDController_h
#include "Arduino.h"

/// @brief Třída LEDController je zodpovědná za ovládání stavu a časování bliknutí
/// @param pin_number číslo PINu na kterém je LED zapojená
class LEDController
{
public:
    /// @brief Třída LEDController je zodpovědná za ovládání stavu a časování bliknutí
    /// @param pin_number číslo PINu na kterém je LED zapojená
    LEDController(uint8_t pin_number);
    /// @brief číslo PINu ve kterém je LED zapojena
    uint8_t pin_num;
    /// @brief aktuální stav LED
    uint8_t is_active;
    /// @brief slouží pro nastavení PINu jako outputu, musí být zavolána v setup()
    void init();
    /// @brief slouží ke změně stavu LED
    /// @param new_state nový stav LED, může být 1, nebo 0
    void changeState(uint8_t new_state);
    /// @brief kontroluje zda uběhl interval během kterého má LED držet svůj stav
    /// @param interval doba v ms po kterou má být LED v daném stavu
    /// @return true pokud interval doby zapnutí uběhl
    bool intervalPassed(unsigned long interval);

private:
    /// @brief čas kdy se uskutečnílo předchozí měření času intervalu
    unsigned long _prev_time;
};
void checkUpBlink(LEDController LEDs[], uint8_t size, unsigned int delay_time);
#endif