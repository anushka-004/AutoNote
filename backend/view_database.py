"""View all data in the database with detailed formatting"""
import os
import sys

# Check if DATABASE_URL is already set, otherwise default to SQLite
if not os.getenv("DATABASE_URL"):
    os.environ["DATABASE_URL"] = "sqlite:///./autonote.db"

from database import SessionLocal, DATABASE_URL
from models import User
from datetime import datetime

# Detect database type
is_postgres = DATABASE_URL.startswith("postgresql")
db_type = "PostgreSQL" if is_postgres else "SQLite"

print("\n" + "="*80)
print(f"🔍 Connecting to {db_type} database...")
print(f"📌 URL: {DATABASE_URL}")
print("="*80)

db = SessionLocal()

try:
    users = db.query(User).all()
    
    print("\n" + "="*80)
    print(f"📊 AUTONOTE DATABASE ({db_type}) - Total Users: {len(users)}")
    print("="*80)
    print()
    
    if users:
        for i, user in enumerate(users, 1):
            print(f"┌─ User #{i} " + "─"*70)
            print(f"│ 🆔 ID:           {user.id}")
            print(f"│ 📧 Email:        {user.email}")
            print(f"│ 👤 Username:     {user.username}")
            print(f"│ 📝 Full Name:    {user.full_name}")
            print(f"│ ✅ Active:       {user.is_active}")
            print(f"│ ✓  Verified:     {user.is_verified}")
            print(f"│ 📅 Created:      {user.created_at}")
            if user.updated_at:
                print(f"│ 🔄 Updated:      {user.updated_at}")
            print(f"└" + "─"*78)
            print()
    else:
        print("❌ No users found in database!")
        print()
        print("💡 To create a test user, run:")
        print("   python reset_db.py")
        print()
        
except Exception as e:
    print(f"\n❌ Error querying database: {e}")
    print()
    if is_postgres:
        print("💡 PostgreSQL troubleshooting:")
        print("   1. Is PostgreSQL running?")
        print("   2. Is the password correct?")
        print("   3. Does database 'autonote_db' exist?")
        print("   4. Try: python view_postgres.py")
    print()
    sys.exit(1)
        
finally:
    db.close()

print("="*80)
if is_postgres:
    print(f"🐘 PostgreSQL Database: {DATABASE_URL.split('@')[1] if '@' in DATABASE_URL else 'N/A'}")
    print("="*80)
    print()
    print("💡 Other ways to view PostgreSQL data:")
    print("   1. pgAdmin: https://www.pgadmin.org/")
    print("   2. DBeaver: https://dbeaver.io/")
    print("   3. psql command: psql -U postgres -d autonote_db")
    print("   4. Python script: python view_postgres.py")
else:
    print(f"📁 Database Location: {os.path.abspath('autonote.db')}")
    print("="*80)
    print()
    print("💡 Other ways to view SQLite database:")
    print("   1. DB Browser for SQLite: https://sqlitebrowser.org/")
    print("   2. VS Code SQLite extension")
    print("   3. Python script: python view_database.py")
print()
print("📖 For detailed guide, see: POSTGRES_GUIDE.md")
print()
