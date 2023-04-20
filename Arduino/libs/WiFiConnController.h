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

#endif