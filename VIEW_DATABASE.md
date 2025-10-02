# 📊 How to View Your Database

## 🚀 Quick Start (Easiest Methods)

### For PostgreSQL:
```bash
# Option 1: Double-click this file
view-postgres-data.bat

# Option 2: Run from command line
cd backend
python view_postgres.py
```

### For SQLite:
```bash
cd backend
python view_database.py
```

---

## 🔍 Which Database Am I Using?

Your application can use either **SQLite** or **PostgreSQL**. Check your `DATABASE_URL` environment variable:

- **SQLite**: `sqlite:///./autonote.db` (default, file-based)
- **PostgreSQL**: `postgresql://postgres:password@localhost:5432/autonote_db` (server-based)

---

## 📖 Detailed Guides

### PostgreSQL Users
👉 **See [POSTGRES_GUIDE.md](POSTGRES_GUIDE.md)** for:
- Multiple ways to view data (Python, psql, pgAdmin, DBeaver)
- Connection troubleshooting
- SQL query examples
- Common issues and solutions

### SQLite Users
SQLite data is stored in `backend/autonote.db` file. View it with:
1. **Python script**: `python view_database.py`
2. **DB Browser for SQLite**: https://sqlitebrowser.org/
3. **VS Code SQLite extension**

---

## 🛠️ All Available Scripts

| Script | Purpose | Database |
|--------|---------|----------|
| `view_database.py` | View data (auto-detects DB type) | Both |
| `view_postgres.py` | View PostgreSQL data with auto-connect | PostgreSQL |
| `view-postgres-data.bat` | Quick launcher for PostgreSQL viewer | PostgreSQL |
| `check_users.py` | Quick user count check | SQLite |

---

## 💡 Quick Commands

### View Data
```bash
# Auto-detect and view
cd backend
python view_database.py

# Force PostgreSQL
cd backend
python view_postgres.py
```

### Using psql (PostgreSQL)
```bash
# Connect to database
psql -U postgres -d autonote_db

# View all users
SELECT * FROM users;

# Count users
SELECT COUNT(*) FROM users;

# Exit
\q
```

### Check Database Type
```bash
cd backend
python -c "import os; from database import DATABASE_URL; print(DATABASE_URL)"
```

---

## 🔧 Set Database Type

### Use PostgreSQL
```powershell
# PowerShell
$env:DATABASE_URL = "postgresql://postgres:YOUR_PASSWORD@localhost:5432/autonote_db"

# Command Prompt
set DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/autonote_db
```

### Use SQLite (Default)
```powershell
# PowerShell
$env:DATABASE_URL = "sqlite:///./autonote.db"

# Command Prompt
set DATABASE_URL=sqlite:///./autonote.db
```

---

## ❓ Troubleshooting

### "Could not connect to PostgreSQL"
1. Check if PostgreSQL is running: `pg_isready`
2. Verify password is correct
3. Ensure database exists: `psql -U postgres -l`
4. Run diagnostic: `python view_postgres.py`

### "No users found"
1. Make sure your application is running
2. Try registering a user through the frontend
3. Or create test data: `python reset_db.py`

### "File not found: autonote.db"
1. SQLite database hasn't been created yet
2. Run the application first to create it
3. Or run: `python reset_db.py`

---

## 📚 Database Schema

### Users Table
```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR UNIQUE NOT NULL,
    username VARCHAR UNIQUE NOT NULL,
    full_name VARCHAR NOT NULL,
    hashed_password VARCHAR NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    is_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP
);
```

---

## 🎯 Common Tasks

### View all users
```bash
cd backend
python view_database.py
```

### Search for specific user (PostgreSQL)
```bash
psql -U postgres -d autonote_db
SELECT * FROM users WHERE email = 'user@example.com';
```

### Export data (PostgreSQL)
```bash
psql -U postgres -d autonote_db -c "COPY users TO 'users.csv' CSV HEADER"
```

### Backup database (PostgreSQL)
```bash
pg_dump -U postgres autonote_db > backup.sql
```

---

**Need more help? Check [POSTGRES_GUIDE.md](POSTGRES_GUIDE.md) for detailed instructions!**
