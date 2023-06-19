# Set up

V tomto dokumentu se dozvíte, jak si nainstalovat a spustit aplikaci.

## Prekvizity a nastavení prekvizit

### Python

Pro spuštění aplikace je potřeba mít nainstalovaný [Python 3.6](http://python.org) a vyšší. Dále je potřeba mít nainstalovaný [pip](https://pypi.org/project/pip/).

### Databáze

Dále je třeba mít nastavenou SQL databázi. Pro nastavení databáze je potřeba vytvořit soubor `config.py` a v něm vytvořit třídu `DatabaseConfig` připojení k databázi. Příklad třídy `DatabaseConfig`:

```python
class DatabaseConfig:
    DB_TYPE = "mysql+pymysql"
    DB_HOST = "192.168.132.156" # může být i localhost, nebo url adresa
    DB_PORT = 3306
    DB_USER = "drillby"
    DB_PW = "password"
    DB_NAME = "Development"
    DB_TABLE = "CarPassing"
    SQLALCHEMY_DATABASE_URI = (
        f"{DB_TYPE}://{DB_USER}:{DB_PW}@{DB_HOST}:{DB_PORT}/{DB_NAME}"
    )
```

Databáze musí mít tabulku `CarPassing` s následujícími sloupci:
(databáze se vytvoří sama, pokud neexistuje)

| Sloupec   | Datový typ | Popis                     |
| --------- | ---------- | ------------------------- |
| id        | int        | ID                        |
| time_date | datetime   | Časová známka             |
| is_red    | boolean    | Projelo auto na červenou? |

### MQTT broker

Dále je třeba mít nastavený MQTT broker. Pro nastavení MQTT brokera je potřeba vytvořit soubor `config.py` a v něm vytvořit třídu `MQTTConfig` připojení k MQTT brokeru. Příklad třídy `MQTTConfig`:

```python
class MQTTConfig:
    MQTT_BROKER_URL = "test.mosquitto.org"
    MQTT_BROKER_PORT = 1883
    MQTT_BROKER_TOPIC = "carpassing"
```

Pokud budete využívat připojení pomocí TLS, tak je potřeba nastavit i cestu k certifikátu. Příklad třídy `MQTTConfig` s nastaveným certifikátem:

```python
import ssl

class MQTTConfig:
    MQTT_BROKER_URL = "test.mosquitto.org"
    MQTT_BROKER_PORT = 8883
    MQTT_BROKER_TOPIC = "carpassing"
    MQTT_TLS_CA_CERTS = "./cert/mosquitto.org.pem"
    MQTT_TLS_CERTFILE = "./cert/certificate.pem"
    MQTT_TLS_KEYFILE = "./cert/private.key"
    MQTT_TLS_CIPHERS = "ECDHE-RSA-AES128-GCM-SHA256"
    MQTT_TLS_VERSION = ssl.PROTOCOL_TLSv1_2
```

### Certifikáty

**Důležité:**

- Certifikáty jsou potřeba pouze pokud se chcete připojit pomocí TLS.
- ZA ŽÁDNÝCH OKOLNOSTÍ CERTIFIKÁTY VÁMI GENEROVANÉ NESDÍLEJTE.

Potřebujete certifikáty pro připojení k MQTT brokeru. Certifikáty si můžete vygenerovat pomocí následujících příkazů:

```bash
openssl genrsa -out private.key 2048
openssl req -new -x509 -key private.key -out certificate.pem -days 3650
```

Dále je potřeba certifikát poskytnutý pro ověření MQTT brokeru. Certifikát si můžete stáhnout pomocí následujícího příkazu:

```bash
wget https://test.mosquitto.org/ssl/mosquitto.org.crt
```

## Instalace

Jako první je potřeba vytvořit si virtuální prostředí. To uděláte pomocí příkazu:

```bash
python -m venv venv
```

Následně je potřeba aktivovat virtuální prostředí. To uděláte pomocí příkazu:

```bash
source venv/bin/activate
```

Nyní je potřeba nainstalovat potřebné knihovny. To uděláte pomocí příkazu:

```bash
pip install -r requirements.txt
```

## Nastavení serveru

**Poznámka:** Server není potřeba do velké míry přenastavovat. Stačí pouze nastavit databázi, MQTT broker a samozřejmě IP adresu a port, na kterém bude server naslouchat.

V neposlední řadě je třeba vytvořit config soubor pro server. Vytvořte soubor `config.py` a v něm vytvořte třídu `ServerConfig`. Příklad třídy `ServerConfig`:

```python
class ServerConfig:
    SERVER_HOST = "localhost" # může být i url adresa, nebo IP adresa
    SERVER_PORT = 5000
    SERVER_DEBUG = True
```

CORS je potřeba nastavit, pokud se budete připojovat z jiného zařízení. Příklad třídy `ServerConfig` s nastaveným CORS:

```python
class ServerConfig:
    SERVER_HOST = "localhost" # může být i url adresa, nebo IP adresa
    SERVER_PORT = 5000
    SERVER_DEBUG = True
    CORS_CONFIG = {
        "origins": ["*"],
        "methods": ["GET", "POST", "DELETE"],
        "allow_headers": [
            "Authorization",
            "Content-Type",
            "Access-Control-Allow-Origin",
        ],
    }
```

Logging je potřeba nastavit, pokud chcete logovat do souboru. Příklad třídy `ServerConfig` s nastaveným loggingem:

```python
class ServerConfig:
    SERVER_HOST = "localhost" # může být i url adresa, nebo IP adresa
    SERVER_PORT = 5000
    SERVER_DEBUG = True
    LOGGING_CONFIG = {
        "version": 1,
        "formatters": {
            "default": {
                "format": "[%(asctime)s] %(levelname)s in %(module)s: %(message)s",
            },
        },
        "handlers": {
            "wsgi": {
                "class": "logging.StreamHandler",
                "stream": "ext://flask.logging.wsgi_errors_stream",
                "formatter": "default",
            },
            "file": {
                "class": "logging.handlers.RotatingFileHandler",
                "filename": "logs.log",
                "maxBytes": 1024 * 1024 * 100,
                "backupCount": 20,
                "formatter": "default",
            },
        },
    }
```

## Spuštění

Pro spuštění aplikace je potřeba spustit následující příkaz:

```bash
python run.py
```

## Testování

Pro spuštění testů je potřeba spustit následující příkaz:

```bash
pytest
```
