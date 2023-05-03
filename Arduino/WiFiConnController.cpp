#include "Arduino.h"
#include "libs/WiFiConnController.h"

WiFiConnController::WiFiConnController(char *ssid, char *pw, uint8_t device_ip[4])
{
    *p_ssid = *ssid;
    *_p_pw = *pw;
    ip[4] = device_ip[4];
    status = WL_IDLE_STATUS;
}

void WiFiConnController::connect()
{
}

bool WiFiConnController::hasWiFiModule()
{
    return !(WiFi.status() == WL_NO_MODULE);
}

bool WiFiConnController::hasLatestFirmware()
{
    return WiFi.firmwareVersion() == WIFI_FIRMWARE_LATEST_VERSION;
}