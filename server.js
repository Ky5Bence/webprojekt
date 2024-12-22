// Szükséges modulok importálása
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const cors = require('cors');

// Express alkalmazás létrehozása
const app = express();
const PORT = 5000;  // A backend portja

// Middleware-ek beállítása
app.use(cors());  // Cross-Origin Resource Sharing engedélyezése
app.use(bodyParser.json());  // JSON kérések kezelése

// SQLite adatbázis inicializálása
const db = new sqlite3.Database('./database.db', (err) => {
    if (err) {
        console.error('Hiba történt az adatbázis kapcsolódásakor:', err.message);
    } else {
        console.log('Sikeresen csatlakozva az SQLite adatbázishoz.');
    }
});

// Tábla létrehozása, ha még nem létezik
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS items (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            price REAL NOT NULL,
            description TEXT
        )
    `, (err) => {
        if (err) {
            console.error('Hiba a tábla létrehozása során:', err.message);
        } else {
            console.log('Az "items" tábla létrejött vagy már létezik.');
        }
    });
});

// CRUD műveletek (Create, Read, Update, Delete)

// Adatok listázása (GET)
app.get('/api/items', (req, res) => {
    db.all('SELECT * FROM items', [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(rows);  // A lekérdezett adatok visszaadása JSON formátumban
        }
    });
});

// Új adat hozzáadása (POST)
app.post('/api/items', (req, res) => {
    const { name, price, description } = req.body;
    
    // Ellenőrzés, hogy minden szükséges adatot megadtak-e
    if (!name || !price) {
        return res.status(400).json({ error: 'Name and price are required.' });
    }

    db.run('INSERT INTO items (name, price, description) VALUES (?, ?, ?)', [name, price, description], function (err) {
        if (err) {
            console.error('Hiba a hozzáadás során:', err.message); // Hiba részletes logolása
            return res.status(500).json({ error: err.message });
        } else {
            res.json({ id: this.lastID });
        }
    });
});

// Adat módosítása (PUT)
app.put('/api/items/:id', (req, res) => {
    const { id } = req.params;  // Az ID, amelyet a URL paraméterként adunk át
    const { name, price, description } = req.body;  // Az új adatokat a kérés törzséből vesszük

    db.run('UPDATE items SET name = ?, price = ?, description = ? WHERE id = ?', [name, price, description, id], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json({ updated: this.changes });  // Visszaadja, hogy hány rekordot módosított
        }
    });
});

// Adat törlése (DELETE)
app.delete('/api/items/:id', (req, res) => {
    const { id } = req.params;  // Az ID, amelyet a URL paraméterként adunk át

    db.run('DELETE FROM items WHERE id = ?', [id], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json({ deleted: this.changes });  // Visszaadja, hogy hány rekordot törölt
        }
    });
});

// Szerver indítása
app.listen(PORT, () => {
    console.log(`Szerver fut: http://localhost:${PORT}`);
});
