# 🐘 PostgreSQL Database Guide

## Quick Start - View Your Data

### Option 1: Use the Python Script (Easiest)
```bash
cd backend
python view_postgres.py
```

This script will:
- ✅ Automatically try common PostgreSQL passwords
- ✅ Show all tables and their data
- ✅ Display users in a nice format
- ✅ Give you troubleshooting tips if connection fails

---

## Option 2: Use psql Command Line

### Connect to PostgreSQL
```bash
psql -U postgres -d autonote_db
```

### Common SQL Commands

#### View all tables
```sql
\dt
```

#### View users table structure
```sql
\d users
```

#### View all users
```sql
SELECT * FROM users;
```

#### View specific user data
```sql
SELECT id, email, username, full_name, is_active, created_at FROM users;
```

#### Count users
```sql
SELECT COUNT(*) FROM users;
```

#### Search for specific user
```sql
SELECT * FROM users WHERE email = 'your@email.com';
```

#### View recent users
```sql
SELECT * FROM users ORDER BY created_at DESC LIMIT 10;
```

#### Exit psql
```sql
\q
```

---

## Option 3: Use pgAdmin (GUI Tool)

### Install pgAdmin
Download from: https://www.pgadmin.org/download/

### Connect to Database
1. Open pgAdmin
2. Right-click "Servers" → "Register" → "Server"
3. Enter:
   - **Name**: AutoNote
   - **Host**: localhost
   - **Port**: 5432
   - **Database**: autonote_db
   - **Username**: postgres
   - **Password**: (your postgres password)

### View Data
1. Expand: Servers → AutoNote → Databases → autonote_db → Schemas → public → Tables
2. Right-click "users" → "View/Edit Data" → "All Rows"

---

## Option 4: Use DBeaver (Free GUI Tool)

### Install DBeaver
Download from: https://dbeaver.io/download/

### Connect to Database
1. Click "New Database Connection"
2. Select "PostgreSQL"
3. Enter:
   - **Host**: localhost
   - **Port**: 5432
   - **Database**: autonote_db
   - **Username**: postgres
   - **Password**: (your postgres password)
4. Click "Test Connection" then "Finish"

### View Data
1. Expand: autonote_db → Schemas → public → Tables
2. Double-click "users" to view data

---

## Troubleshooting

### Check if PostgreSQL is Running

**Windows:**
```powershell
# Check service status
Get-Service postgresql*

# Or use pg_isready
pg_isready
```

**If not running:**
```powershell
# Start PostgreSQL service
net start postgresql-x64-14  # or your version
```

### Check if Database Exists
```bash
psql -U postgres -l
```

### Create Database if Missing
```bash
psql -U postgres
CREATE DATABASE autonote_db;
\q
```

### Reset Password (if forgotten)
1. Find `pg_hba.conf` file (usually in PostgreSQL installation folder)
2. Change authentication method to `trust` temporarily
3. Restart PostgreSQL service
4. Connect and change password:
   ```sql
   ALTER USER postgres PASSWORD 'new_password';
   ```
5. Change `pg_hba.conf` back to `md5`
6. Restart PostgreSQL

---

## Connection String Format

Your DATABASE_URL should look like:
```
postgresql://USERNAME:PASSWORD@HOST:PORT/DATABASE
```

**Example:**
```
postgresql://postgres:mypassword@localhost:5432/autonote_db
```

### Set Environment Variable

**Windows (PowerShell):**
```powershell
$env:DATABASE_URL = "postgresql://postgres:YOUR_PASSWORD@localhost:5432/autonote_db"
```

**Windows (Command Prompt):**
```cmd
set DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/autonote_db
```

---

## Python Code to View Data

If you want to write your own script:

```python
import os
from sqlalchemy import create_engine, text

# Set your connection string
DATABASE_URL = "postgresql://postgres:YOUR_PASSWORD@localhost:5432/autonote_db"

# Create engine
engine = create_engine(DATABASE_URL)

# Query data
with engine.connect() as conn:
    result = conn.execute(text("SELECT * FROM users"))
    for row in result:
        print(row)
```

---

## Common Issues

### Issue: "password authentication failed"
**Solution:** Check your PostgreSQL password. Try common defaults: `postgres`, `admin`, `root`, `password`

### Issue: "database 'autonote_db' does not exist"
**Solution:** Create the database:
```bash
psql -U postgres
CREATE DATABASE autonote_db;
```

### Issue: "could not connect to server"
**Solution:** PostgreSQL service is not running. Start it:
```powershell
net start postgresql-x64-14
```

### Issue: "no pg_hba.conf entry"
**Solution:** Edit `pg_hba.conf` to allow local connections:
```
# Add this line:
host    all             all             127.0.0.1/32            md5
```

---

## Quick Reference

| Task | Command |
|------|---------|
| View data (Python) | `python view_postgres.py` |
| Connect via psql | `psql -U postgres -d autonote_db` |
| List tables | `\dt` (in psql) |
| View all users | `SELECT * FROM users;` |
| Count users | `SELECT COUNT(*) FROM users;` |
| Exit psql | `\q` |
| Check if running | `pg_isready` |
| Start service | `net start postgresql-x64-14` |

---

## Your Database Schema

### Users Table
| Column | Type | Description |
|--------|------|-------------|
| id | Integer | Primary key |
| email | String | User email (unique) |
| username | String | Username (unique) |
| full_name | String | Full name |
| hashed_password | String | Hashed password |
| is_active | Boolean | Account active status |
| is_verified | Boolean | Email verified status |
| created_at | DateTime | Account creation time |
| updated_at | DateTime | Last update time |

---

## Need Help?

1. **Run the diagnostic script:**
   ```bash
   python view_postgres.py
   ```
   It will tell you exactly what's wrong!

2. **Check PostgreSQL logs:**
   - Windows: `C:\Program Files\PostgreSQL\14\data\log\`

3. **Test connection manually:**
   ```bash
   psql -U postgres
   ```

---

**Happy querying! 🎉**
