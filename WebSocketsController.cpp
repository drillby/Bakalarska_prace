#include "Arduino.h"
#include "libs/WebSocketsController.h"

WebSocketsController::WebSocketsController(String server_url, uint16_t server_port)
{
    url = server_url;
    port = server_port;
}

WebSocketsController::WebSocketsController(IPAddress server_ip, uint16_t server_port)
{
    ip = server_ip;
    port = server_port;
}

void WebSocketsController::connect(WiFiClient conn, String endpoint)
{
    _conn = conn;
    if (url != "")
    {
        _client = WebSocketClient(_conn, url, port);
    }
    else
    {
        _client = WebSocketClient(_conn, ip, port);
    }
    _client.begin(endpoint);
}

void WebSocketsController::send(String msg)
{
    _client.beginMessage(TYPE_TEXT);
    _client.print(msg);
    _client.endMessage();
}

String WebSocketsController::receive()
{
    int isMessage = _client.parseMessage();

    if (isMessage > 0)
        return _client.readString();
}

bool WebSocketsController::isConnected()
{
    return _client.connected() != 0;
}