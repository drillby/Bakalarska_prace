#include "Arduino.h"
#include "libs/WiFiConnController.h"

WiFiConnController::WiFiConnController(String ssid, String pw, uint16_t connection_check_delay)
{
    p_ssid = ssid;
    _p_pw = pw;
    status = WL_IDLE_STATUS;
    conn_check_delay = connection_check_delay;
}

void WiFiConnController::connect(uint8_t num_of_tries)
{
    for (uint8_t i = 0; i <= num_of_tries; i++)
    {
        status = WiFi.begin(p_ssid.c_str(), _p_pw.c_str());
        if (status == WL_CONNECTED)
        {
            break;
        }
        delay(conn_check_delay);
    }
}

uint8_t WiFiConnController::isConnected()
{
    return WiFi.status() == WL_CONNECTED;
}

bool WiFiConnController::hasWiFiModule()
{
    return !(WiFi.status() == WL_NO_MODULE);
}

bool WiFiConnController::hasLatestFirmware()
{
    return WiFi.firmwareVersion() == WIFI_FIRMWARE_LATEST_VERSION;
}