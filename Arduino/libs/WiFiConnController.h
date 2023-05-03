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
    /// @param device_ip IP adresa pod kterou se Arduino pokusí přihlásit
    WiFiConnController(char *ssid, char *pw, uint8_t device_ip[]);
    /// @brief pokusí se připojit Arduino k WiFi, musí být zavolána v setup(), připojuje pouze k sítím zabezpečených pomocí WPA
    /// @return None
    void connect();
    char *p_ssid;
    uint8_t ip[4];
    uint8_t status;
    /// @brief zkoumá zda Arduino má WiFi modul
    /// @return true pokus Arduino má WiFi modul
    bool hasWiFiModule();
    /// @brief zkoumá zda Arduino má nejnovější firmware na ovládání WiFi modulu
    /// @return true pokud má nejnovější firmware
    bool hasLatestFirmware();

private:
    char *_p_pw;
};

#endif