#ifndef WiFiConnController_h
#define WiFiConnController_h
#include "Arduino.h"
#include "WiFiNINA.h"

/// @brief třída řešící připojení k WiFi
class WiFiConnController
{
public:
    /// @brief třída řešící připojení k WiFi
    /// @param ssid název WiFi sítě
    /// @param pw heslo do WiFi sítě
    WiFiConnController(String ssid, String pw, uint16_t connection_check_delay = 1000);
    /// @brief pokusí se připojit Arduino k WiFi, musí být zavolána v setup(), připojuje pouze k sítím zabezpečených pomocí WPA2
    /// @param num_of_tries kolikrát se pokusí připojit k WiFi síti, prodleva mezi pokusy je 10s
    /// @return None
    void connect(uint8_t num_of_tries);
    String p_ssid;
    uint8_t ip[4];
    uint8_t status;
    uint16_t conn_check_delay;
    /// @brief zkoumá zda Arduino má WiFi modul
    /// @return true pokus Arduino má WiFi modul
    bool hasWiFiModule();
    /// @brief zkoumá zda Arduino má nejnovější firmware na ovládání WiFi modulu
    /// @return true pokud má nejnovější firmware
    bool hasLatestFirmware();
    uint8_t isConnected();

private:
    String _p_pw;
    WiFiClient _wifi;
};

#endif