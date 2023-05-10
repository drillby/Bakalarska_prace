#ifndef config_h
#define config_h

// PIN zelené diody
#define ZELENA 5
// PIN oranžové diody
#define ORANZOVA 6
// PIN červwné diody
#define CERVENA 7

// jak dlouho má červená dioda svítit
#define CERVENA_INTERVAL 3000
// jak dlouho má svítit červená a oranžová dioda zároveň
#define CERVENA_ORANZOVA_INTERVAL 1000
// jak dlouho má oranžová dioda svítit
#define ORANZOVA_INTERVAL 1000
// jak dlouho má zelená dioda svítit
#define ZELENA_INTERVAL CERVENA_INTERVAL + CERVENA_ORANZOVA_INTERVAL
// SSID WiFi na kterou se Arduino připojí
#define WIFI_SSID "Zizice_doma"
// heslo k WiFi
#define WIFI_PW "Pavel_Olinka"
#endif
