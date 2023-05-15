#ifndef APIController_h
#define APIController_h
#include "WiFiNINA.h"

/// @brief třída řešící komunikaci s REST API
class APIController
{
public:
    /// @brief inicializace objektu
    /// @param server_url url adresa serveru
    /// @param server_port port na kterém je server přístupný
    APIController(String server_url, uint16_t server_port);
    /// @brief inicializace objektu
    /// @param ip_address ip adresa serveru
    /// @param server_port port na kterém je server přístupný
    APIController(IPAddress ip_address, uint16_t server_port);
    /// @brief připojení k serveru, musí být voláno v setup()
    /// @param num_of_tries počet pokusů o připojení
    void connect(uint8_t num_of_tries);
    /// @brief pošle HTTP požadavek na server
    /// @param endpoint koncová adresa požadavku
    /// @param keep_alive zda se má komunikace udržovat otevřená
    void sendRequest(uint8_t req_type, String endpoint, bool keep_alive);
    /// @brief kontroluje zda odpověď serveru je OK 200
    /// @return 200 -> true
    bool isOKResCode();
    /// @brief odpojí od serveru
    void disconect();
    IPAddress ip;
    String url = "";
    uint16_t port;
    bool is_connected;

private:
    /// @brief pošle HTTP GET požadavek na server
    /// @param endpoint koncová adresa požadavku
    /// @param keep_alive zda se má komunikace udržovat otevřená
    void _getRequest(String endpoint, bool keep_alive);
    /// @brief pošle HTTP GET požadavek na server
    /// @param endpoint koncová adresa požadavku
    /// @param keep_alive zda se má komunikace udržovat otevřená
    void _postRequest(String endpoint, bool keep_alive);
    /// @brief přečte odpověď (1 řádek) ze serveru
    String _readRespose();
    WiFiClient client;
};

enum RequestType
{
    GET_REQUEST = 1,
    POST_REQUEST = 2
};

#endif