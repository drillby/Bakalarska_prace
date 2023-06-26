# Set up

V tomto dokumentu se dozvíte, jak si nainstalovat a spustit aplikaci.

## Prekvizity

Pro spuštění aplikace je potřeba mít nainstalované následující programy:

- [Node.js](https://nodejs.org/en/)
- Nastavený [backend](https://github.com/drillby/Bakalarska_prace/blob/backend/setup.md)

## Instalace

Jediné co je potřeba udělat je spustit následující příkaz v terminálu:

```bash
npm install
```

Tento příkaz naistaluje všechny potřebné balíčky pro spuštění aplikace.

## Spuštění

Pro spuštění aplikace je potřeba spustit následující příkaz v terminálu:

```bash
npm start
```

Tento příkaz spustí aplikaci na adrese [http://localhost:3000](http://localhost:3000) a na lokální IP adrese počítače.

Tato forma spuštění je vhodná pro vývoj aplikace, protože se při změně kódu aplikace automaticky restartuje.

## Build

Pro vytvoření produkční verze aplikace je potřeba spustit následující příkaz v terminálu:

```bash
npm run build
```

Tento příkaz vytvoří složku `build`, ve které se nachází produkční verze aplikace.

Pokud tuto složku přesunete na server, tak aplikace bude dostupná na adrese serveru.
