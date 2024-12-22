const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware-ek beállítása
app.use(cors());
app.use(bodyParser.json());

// SQLite adatbázis inicializálása
const db = new sqlite3.Database('./database.db', (err) => {
    if (err) {
        console.error('Error connecting to database:', err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

// Tábla létrehozása, ha nem létezik
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS items (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL
        )
    `, (err) => {
        if (err) {
            console.error('Error creating table:', err.message);
        } else {
            console.log('Table "items" created or already exists.');
        }
    });
});

// CRUD Műveletek

// Adatok listázása (GET)
app.get('/api/items', (req, res) => {
    db.all('SELECT * FROM items', [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(rows);
        }
    });
});

// Új adat hozzáadása (POST)
app.post('/api/items', (req, res) => {
    const { name } = req.body;
    db.run('INSERT INTO items (name) VALUES (?)', [name], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json({ id: this.lastID });
        }
    });
});

// Adat módosítása (PUT)
app.put('/api/items/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    db.run('UPDATE items SET name = ? WHERE id = ?', [name, id], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json({ updated: this.changes });
        }
    });
});

// Adat törlése (DELETE)
app.delete('/api/items/:id', (req, res) => {
    const { id } = req.params;

    db.run('DELETE FROM items WHERE id = ?', [id], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json({ deleted: this.changes });
        }
    });
});

// Szerver indítása
app.listen(PORT, () => {
    console.log(`Szerver fut: http://localhost:${PORT}`);
});