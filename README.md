# Termékkezelő felület

A React alapú webalkalmazás, amely lehetővé teszi termékek hozzáadását, módosítását, törlését és megjelenítését egy SQLite adatbázisból. Az alkalmazás front-end része React-tel készült, míg a back-end Express.js-t és SQLite-t használ az adatbázis kezelésére.

## Funkciók

- **Új termékek hozzáadása**: Lehetőség van új termékek nevének, leírásának és árának megadására.
- **Termékek megjelenítése**: A hozzáadott termékek listázása a weboldalon.
- **Termékek módosítása**: A meglévő termékek adatainak szerkesztése.
- **Termékek törlése**: A termékek törlésének lehetősége.
  
## Telepítés

### 1. Klónozd a projektet
Első lépésként klónozd a projektet a saját gépedre:

```bash
git clone https://github.com/Ky5Bence/webprojekt.git
```

### 2. Telepítsd a szükséges csomagokat

#### Frontend (React)
A frontend mappában lépj be a következő parancsokkal:

```bash
cd client
npm install axios cra-template react react-dom react-scripts web-vitals webpack
```

#### Backend (Node.js + Express.js)
A backend mappában lépj be:

```bash
cd .\product-management-dashboard\client\
npm install express body-parser cors mysql2 sqlite3 react react-dom vite

```

### 3. Indítsd el a szervert és a frontend alkalmazást

#### Indítsd el a backend szervert
A backend szerver indításához futtasd a következő parancsot a `webprojekt` mappában:

```bash
node server.js
```

Ez elindítja az Express.js szervert a 5000-es porton.

#### Indítsd el a frontend alkalmazást
A frontend alkalmazás elindításához futtasd a következő parancsot a `client` mappában:

```bash
npm start
```

Ez elindítja a React alkalmazást a 3000-es porton.

### 4. Adatbázis
A webalkalmazás SQLite adatbázist használ a termékek tárolására. A backend automatikusan létrehozza a szükséges táblát, ha még nem létezik.

## Fejlesztés

A fejlesztéshez egyszerűen módosíthatod a `client/src/App.js` fájlt a React komponens logikájának szerkesztésére, valamint a `webprojekt/server.js` fájlt a backend kód módosítására.

- **Frontend**: Módosítsd a React komponenseket a `client` mappában.
- **Backend**: Az API végpontokat és adatbázis műveleteket a `webprojekt` mappában található `server.js` fájlban szerkesztheted.

### API végpontok

- **GET /api/items**: Az összes termék lekérése.
- **POST /api/items**: Új termék hozzáadása.
- **PUT /api/items/:id**: Meglévő termék módosítása.
- **DELETE /api/items/:id**: Termék törlése.

## Használat

A webalkalmazás indítása után a következő funkciók érhetők el:

1. **Új termék hozzáadása**: Töltsd ki a termék nevét, leírását és árát, majd kattints a "Termék hozzáadása" gombra.
2. **Termékek megjelenítése**: Az összes termék látható lesz a "Meglévő termékek" szekcióban.
3. **Termék módosítása**: Az "Módosít" gombra kattintva módosítható egy termék.
4. **Termék törlése**: A "Törlés" gombra kattintva törölhető egy termék.


## További információk

Ez az alkalmazás célja, hogy bemutassa egy egyszerű CRUD alkalmazás működését a React és Express.js keretrendszerek használatával.
