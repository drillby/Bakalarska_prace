#ifndef WiFiConnController_h
#define WiFiConnController_h
#include "Arduino.h"
#include "WiFiNINA.h"

class WiFiConnController
{
public:
    WiFiConnController(char *ssid, char *pw, uint8_t device_ip[], uint8_t encryption);
    void connect();
    char *p_ssid;
    uint8_t ip[4];
    uint8_t status;
    bool hasWiFiModule();
    bool hasLatestFirmware();

private:
    char *_p_pw;
    uint8_t _encryption;
    void _noEncryption();
    void _withWEP();
    void _withWPA();
};

enum EncryptionType
{
    NO_ENCRYPTION = 0,
    WEP_ENCRYPTION = 1,
    WPA_ENCRYPTION = 2
};

#endif