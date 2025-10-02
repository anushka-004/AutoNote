#!/usr/bin/env python3
"""
Simple setup without .env file - uses default values
"""

import os
import sys

# Set environment variables directly
os.environ["DATABASE_URL"] = "postgresql://postgres:password@localhost:5432/autonote_db"
os.environ["SECRET_KEY"] = "your-super-secret-key-change-this-in-production-12345"
os.environ["ALGORITHM"] = "HS256"
os.environ["ACCESS_TOKEN_EXPIRE_MINUTES"] = "30"

# Add current directory to path
sys.path.append(os.path.dirname(__file__))

from database import engine, Base
from models import User

def create_tables():
    """Create all database tables"""
    try:
        print("🔄 Creating database tables...")
        Base.metadata.create_all(bind=engine)
        print("✅ Database tables created successfully!")
        return True
    except Exception as e:
        print(f"❌ Error creating tables: {e}")
        return False

def check_database_connection():
    """Check if database connection is working"""
    try:
        print("🔍 Checking database connection...")
        connection = engine.connect()
        connection.close()
        print("✅ Database connection successful!")
        return True
    except Exception as e:
        print(f"❌ Database connection failed: {e}")
        print("\n💡 Make sure:")
        print("   1. PostgreSQL is running")
        print("   2. Database 'autonote_db' exists")
        print("   3. Username: postgres, Password: password")
        return False

if __name__ == "__main__":
    print("🚀 AutoNote Database Setup")
    print("=" * 40)
    
    # Check database connection first
    if not check_database_connection():
        print("\n🔧 Try creating the database first:")
        print("   1. Open pgAdmin or psql")
        print("   2. Create database: autonote_db")
        print("   3. Make sure user 'postgres' has access")
        sys.exit(1)
    
    # Create tables
    if create_tables():
        print("\n🎉 Database setup complete!")
        print("You can now start the server with: python run.py")
    else:
        print("\n❌ Database setup failed!")
        sys.exit(1)
