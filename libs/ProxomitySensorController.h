#ifndef ProximitySensorController_h
#define ProximitySensorController_h

/// @brief Třída řešící komunikaci s ultrasonickým senzorem HC-SR04
class ProximitySensorController
{
public:
    /// @brief Třída řešící komunikaci s ultrasonickým senzorem HC-SR04
    /// @param trig_pin pin na kterém je připojen Trigger
    /// @param echo_pin pin na kterém je připojeno Echo
    /// @param min_offset minimální vzdálenost od země, kterou senzor vezme jako validní
    /// @param max_offset maximální vzdálenost od země, kterou senzor vezme jako validní
    ProximitySensorController(uint8_t trig_pin, uint8_t echo_pin, uint16_t min_offset, uint16_t max_offset);
    /// @brief funkce pro měření vzdálenosti objektu, funkce trvá measurement_time + 2*vzdálenost*rychlost_zvuku
    /// @param measurement_time jak dlouho (ms) se bude vysílat ultrazvukový signál
    /// @return vzdálenost v cm kterou senzor naměřil
    uint16_t measure(uint8_t measurement_time);
    /// @brief nastaví Triger pin na output a Echo pin na input, změří vzdálenost od země a uloží, musí být volána v setup()
    void init();
    /// @brief porovnává zda senzor zaznamenal pohyb od posledního měření a zda uběhla požadovaná doba, požadovaná doba je zde z důvodu odstranění chyb v měření
    /// @param mesured_len zvdálenost na porovnání
    /// @param delay_between_trig po jaké době (ms) se bude nový průjezd brát jako validní
    /// @return true pokud vzdálenost je v rozsahu a předchozí stav nebyl a uběhla minimálně požadovaná doba (delay_between_trig)
    bool compare(uint16_t mesured_len, uint16_t delay_between_trig = 500);
    uint8_t t_pin;
    uint8_t e_pin;
    uint16_t mi_offset;
    uint16_t ma_offset;

private:
    uint16_t base_len;
    uint16_t _prev_state;
    uint16_t last_trig;
};

#endif