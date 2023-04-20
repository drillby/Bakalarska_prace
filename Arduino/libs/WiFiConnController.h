#ifndef WiFiConnController_h
#define WiFiConnController_h
#include "Arduino.h"
#include "WiFiNINA.h"

class WiFiConnController
{
public:
    WiFiConnController(char ssid[], char pw[], unsigned short ip[4], unsigned short encryption);
    void init();

private:
    void _noEncryption(char ssid[], char pw[], unsigned short ip[4]);
    void _withWEP(char ssid[], char pw[], unsigned short ip[4]);
    void _withWPA(char ssid[], char pw[], unsigned short ip[4]);
};

enum EncryptionType
{
    NO_ENCRYPTION = 0,
    WEP_ENCRYPTION = 1,
    WPA_ENCRYPTION = 2
};

#endif