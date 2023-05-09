#include "Arduino.h"
#include "libs/WiFiConnController.h"

WiFiConnController::WiFiConnController(String ssid, String pw, uint8_t device_ip[4])
{
    p_ssid = ssid;
    _p_pw = pw;
    ip[4] = device_ip[4];
    status = WL_IDLE_STATUS;
}

void WiFiConnController::connect(uint8_t num_of_tries)
{
    for (uint8_t i = 0; i <= num_of_tries; i++)
    {
        if (status == WL_CONNECTED)
        {
            break;
        }
        status = WiFi.begin(p_ssid.c_str(), _p_pw.c_str());
        delay(10000);
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