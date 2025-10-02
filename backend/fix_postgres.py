#!/usr/bin/env python3
"""
Fix PostgreSQL connection - try different common settings
"""

import os
import sys

# Try different PostgreSQL connection strings
connection_strings = [
    "postgresql://postgres:postgres@localhost:5432/autonote_db",
    "postgresql://postgres:@localhost:5432/autonote_db", 
    "postgresql://postgres:admin@localhost:5432/autonote_db",
    "postgresql://postgres:123456@localhost:5432/autonote_db"
]

sys.path.append(os.path.dirname(__file__))

from database import engine, Base
from models import User

def test_connection(db_url):
    """Test database connection"""
    try:
        from sqlalchemy import create_engine
        test_engine = create_engine(db_url)
        connection = test_engine.connect()
        connection.close()
        return True
    except Exception as e:
        print(f"❌ Failed: {db_url}")
        print(f"   Error: {e}")
        return False

def create_tables():
    """Create tables"""
    try:
        Base.metadata.create_all(bind=engine)
        print("✅ Tables created!")
        return True
    except Exception as e:
        print(f"❌ Table creation failed: {e}")
        return False

if __name__ == "__main__":
    print("🔍 Testing PostgreSQL connections...")
    
    for db_url in connection_strings:
        print(f"\n🧪 Testing: {db_url}")
        if test_connection(db_url):
            print("✅ Connection successful!")
            os.environ["DATABASE_URL"] = db_url
            break
    else:
        print("\n❌ No connection worked!")
        print("\n💡 Check your PostgreSQL:")
        print("   1. Is PostgreSQL running?")
        print("   2. What's your postgres password?")
        print("   3. Is database 'autonote_db' created?")
        sys.exit(1)
    
    # Create tables
    if create_tables():
        print("\n🎉 PostgreSQL setup complete!")
        print("Run: python run.py")
    else:
        print("\n❌ Setup failed!")
