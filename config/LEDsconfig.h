#ifndef LEDsConfig_h
#define LEDsConfig_h

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

#endif