#ifndef WebSocketsController_h
#define WebSocketsController_h
#include <ArduinoHttpClient.h>
#include <WiFi.h>

class WebSocketsController
{
public:
    WebSocketsController(String server_url, uint16_t server_port);
    WebSocketsController(IPAddress server_url, uint16_t server_port);
    void connect(String endpoint = "");
    void send(String msg);
    String receive();
    bool isConnected();
    String url = "";
    IPAddress ip;
    uint16_t port;

private:
    WiFiClient _conn;
    WebSocketClient _client = WebSocketClient(_conn, (127, 0, 0, 1), 5000);
    // WebSocketClient _client = WebSocketClient(_conn, "localhost", 5000);
};

#endif