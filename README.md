# Bakalářská práce

## Název práce:

Model křižovatky řízený Arduinem

## Autor:

Pavel Podrazký

## Pracoviště:

Katedra elektrotechniky a automatizace, TF, ČZU

## Vedoucí práce:

doc. Ing. Monika Hromasová Ph.D.

## Metodika:

- Rešerše hardwarových a softwarových řešení
- Návrh provedení výukové úlohy
- Realizace výukové úlohy
- Vytvoření programu pro řízení
- Realizace 3D tisku v prototypovém centru TF

## Spuštění projektu:

Pokud API není dostupné na tomto [odkazu](http://bp_api.hostgo.cloud/), je možné spustit server lokálně.

Pro spuštění je potřeba mít přístup k MySQL databázi, její přístupové údaje je potřeba zadat do souboru `config.py`. Pokud tabulka ve specifikované databázi neexistuje server ji vytvoří.
Je nutné dodržet následující strukturu tabulky:

| id   | date_time | is_red  |
| ---- | --------- | ------- |
| uuid | datetime  | boolean |

Dále je potřeba mít přístup k MQTT brokeru, jeho přístupové údaje je potřeba zadat do souboru `config.py`. Je možné využít i TLS, pro to je potřeba nastavit cestu k certifikátu.

Certifikát pro TLS lze vygenerovat pomocí následujících příkazů:

```bash
openssl genrsa -out private.key 2048
openssl req -new -x509 -key private.key -out certificate.pem -days 3650
```

Certifikát pro ověření MQTT brokeru lze stáhnout pomocí následujícího příkazu:

```bash
wget https://test.mosquitto.org/ssl/mosquitto.org.crt
```

Certifikáty je potřeba umístit do složky `cert`.

### Spuštění ze zdrojových kódů

1. Nainstalujte si [Python](https://www.python.org/downloads/)
2. Naklonujte si tento repozitář
3. Nainstalujte si závislosti pomocí příkazu `pip install -r requirements.txt`
4. Spusťte server pomocí příkazu `python app.py`
5. Server bude dostupný na adrese `http://localhost:5000/`

### Spuštění pomocí Dockeru

1. Nainstalujte si [Docker](https://www.docker.com/products/docker-desktop)
2. Naklonujte si tento repozitář
3. Spusťte příkaz `docker build -t bakalarska_prace/api .`
4. Spusťte příkaz `docker run -p 5000:5000 bakalarska_prace/api`
5. Otevřete prohlížeč a zadejte adresu `http://localhost:5000/`
