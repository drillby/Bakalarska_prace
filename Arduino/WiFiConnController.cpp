#include "Arduino.h"
#include "libs/WiFiConnController.h"

WiFiConnController::WiFiConnController(char *ssid, char *pw, uint8_t device_ip[4], uint8_t encryption)
{
    *p_ssid = *ssid;
    *_p_pw = *pw;
    ip[4] = device_ip[4];
    _encryption = encryption;
    status = WL_IDLE_STATUS;
}

void WiFiConnController::connect()
{
    switch (_encryption)
    {
    case NO_ENCRYPTION:
    {
        _noEncryption();
        break;
    }

    case WEP_ENCRYPTION:
    {
        _withWEP();
        break;
    }

    case WPA_ENCRYPTION:
    {
        _withWPA();
        break;
    }

    default:
    {
        break;
    }
    }
}

bool WiFiConnController::hasWiFiModule()
{
    return !(WiFi.status() == WL_NO_MODULE);
}

bool WiFiConnController::hasLatestFirmware()
{
    return WiFi.firmwareVersion() == WIFI_FIRMWARE_LATEST_VERSION;
}

void WiFiConnController::_noEncryption()
{
}

void WiFiConnController::_withWEP()
{
}

void WiFiConnController::_withWPA()
{
}