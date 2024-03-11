# Poznámka:

<b>Projekt je z organizačních a CI/CD důvodů rozdělen do 3 větví, pro robrazení kódu každé části (Arduino, frontend, backend) si vyberte příslušnou větev</b>

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

Pokud projekt není dostupný na tomto [odkazu](http://bakalarska_prace.hostgo.cloud/), je možné si ho spustit lokálně.

### Spuštění ze zdrojových kódů

1. Nainstalujte [Node.js](https://nodejs.org/en/download/)
2. Naklonujte si tento repozitář
3. Nainstalujte závislosti pomocí příkazu `npm install`
4. Spusťte projekt pomocí příkazu `npm start`
5. Otevřete si prohlížeč a zadejte adresu `http://localhost:3000/`
6. Pro korektní fungování je nutné mít spuštěný backend, který je dostupný na tomto [odkazu](http://bp_api.hostgo.cloud/), nebo si ho můžete spustit lokálně, viz [odkaz](https://github.com/drillby/Bakalarska_prace/tree/backend)

### Spuštění pomocí Dockeru

1. Nainstalujte [Docker](https://www.docker.com/products/docker-desktop)
2. Naklonujte si tento repozitář
3. Spusťte příkaz `docker build -t bakalarska_prace_webui .`
4. Spusťte příkaz `docker run -p 8080:8080 bakalarska_prace_webui`
5. Otevřete si prohlížeč a zadejte adresu `http://localhost:8080/`
6. Pro korektní fungování je nutné mít spuštěný backend, který je dostupný na tomto [odkazu](http://bp_api.hostgo.cloud/), nebo si ho můžete spustit lokálně, viz [odkaz](https://github.com/drillby/Bakalarska_prace/tree/backend)
