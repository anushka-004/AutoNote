"""View PostgreSQL database data with detailed formatting"""
import os
import sys
from sqlalchemy import create_engine, inspect, text
from sqlalchemy.orm import sessionmaker

# PostgreSQL connection strings to try
POSTGRES_URLS = [
    "postgresql://postgres:postgres@localhost:5432/autonote_db",
    "postgresql://postgres:@localhost:5432/autonote_db",
    "postgresql://postgres:admin@localhost:5432/autonote_db",
    "postgresql://postgres:root@localhost:5432/autonote_db",
    "postgresql://postgres:password@localhost:5432/autonote_db",
]

def test_connection(db_url):
    """Test if database connection works"""
    try:
        engine = create_engine(db_url)
        with engine.connect() as conn:
            conn.execute(text("SELECT 1"))
        return engine
    except Exception as e:
        return None

def get_postgres_connection():
    """Try to connect to PostgreSQL with different credentials"""
    print("🔍 Attempting to connect to PostgreSQL...")
    print()
    
    # Check if DATABASE_URL is set in environment
    env_url = os.getenv("DATABASE_URL")
    if env_url and env_url.startswith("postgresql"):
        print(f"📌 Trying environment DATABASE_URL...")
        engine = test_connection(env_url)
        if engine:
            print(f"✅ Connected using environment variable!")
            return engine, env_url
        print(f"❌ Environment URL failed")
        print()
    
    # Try common connection strings
    for i, db_url in enumerate(POSTGRES_URLS, 1):
        print(f"🧪 Attempt {i}/{len(POSTGRES_URLS)}: {db_url.split('@')[0]}@...")
        engine = test_connection(db_url)
        if engine:
            print(f"✅ Connected successfully!")
            return engine, db_url
        print(f"❌ Failed")
    
    return None, None

def view_all_tables(engine):
    """View all tables and their data"""
    inspector = inspect(engine)
    tables = inspector.get_table_names()
    
    print("\n" + "="*80)
    print(f"📊 POSTGRESQL DATABASE - Total Tables: {len(tables)}")
    print("="*80)
    print()
    
    if not tables:
        print("❌ No tables found in database!")
        print()
        return
    
    # Create session
    Session = sessionmaker(bind=engine)
    session = Session()
    
    try:
        for table_name in tables:
            print(f"┌─ TABLE: {table_name} " + "─"*(70-len(table_name)))
            
            # Get columns
            columns = inspector.get_columns(table_name)
            col_names = [col['name'] for col in columns]
            
            # Query all rows
            result = session.execute(text(f"SELECT * FROM {table_name}"))
            rows = result.fetchall()
            
            print(f"│ 📋 Columns: {', '.join(col_names)}")
            print(f"│ 📊 Row Count: {len(rows)}")
            print(f"│")
            
            if rows:
                for i, row in enumerate(rows, 1):
                    print(f"│ ┌─ Row #{i}")
                    for col_name, value in zip(col_names, row):
                        # Truncate long values
                        str_value = str(value)
                        if len(str_value) > 60:
                            str_value = str_value[:57] + "..."
                        print(f"│ │ {col_name:20} = {str_value}")
                    print(f"│ └" + "─"*70)
            else:
                print(f"│ (No data)")
            
            print(f"└" + "─"*78)
            print()
    
    finally:
        session.close()

def view_users_table(engine):
    """View users table specifically with nice formatting"""
    Session = sessionmaker(bind=engine)
    session = Session()
    
    try:
        result = session.execute(text("SELECT * FROM users"))
        rows = result.fetchall()
        
        print("\n" + "="*80)
        print(f"👥 USERS TABLE - Total Users: {len(rows)}")
        print("="*80)
        print()
        
        if rows:
            for i, row in enumerate(rows, 1):
                print(f"┌─ User #{i} " + "─"*70)
                print(f"│ 🆔 ID:           {row[0]}")
                print(f"│ 📧 Email:        {row[1]}")
                print(f"│ 👤 Username:     {row[2]}")
                print(f"│ 📝 Full Name:    {row[3]}")
                print(f"│ 🔒 Password:     {row[4][:20]}... (hashed)")
                print(f"│ ✅ Active:       {row[5]}")
                print(f"│ ✓  Verified:     {row[6]}")
                print(f"│ 📅 Created:      {row[7]}")
                if row[8]:
                    print(f"│ 🔄 Updated:      {row[8]}")
                print(f"└" + "─"*78)
                print()
        else:
            print("❌ No users found in database!")
            print()
    
    except Exception as e:
        print(f"❌ Error viewing users table: {e}")
        print()
    
    finally:
        session.close()

def main():
    """Main function"""
    print("="*80)
    print("🐘 POSTGRESQL DATABASE VIEWER")
    print("="*80)
    print()
    
    # Get connection
    engine, db_url = get_postgres_connection()
    
    if not engine:
        print("\n" + "="*80)
        print("❌ COULD NOT CONNECT TO POSTGRESQL")
        print("="*80)
        print()
        print("💡 Troubleshooting:")
        print("   1. Make sure PostgreSQL is running")
        print("   2. Check your PostgreSQL password")
        print("   3. Verify database 'autonote_db' exists")
        print()
        print("📝 To check if PostgreSQL is running:")
        print("   Windows: Check Services or run 'pg_isready' in terminal")
        print()
        print("📝 To create the database:")
        print("   psql -U postgres")
        print("   CREATE DATABASE autonote_db;")
        print()
        print("📝 To set your DATABASE_URL:")
        print("   set DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/autonote_db")
        print()
        return
    
    print(f"\n📌 Connected to: {db_url}")
    print()
    
    # View all tables
    view_all_tables(engine)
    
    # View users table with special formatting
    view_users_table(engine)
    
    print("="*80)
    print("✅ DONE")
    print("="*80)
    print()

if __name__ == "__main__":
    main()
