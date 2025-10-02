#!/usr/bin/env python3
"""
Simple database setup script for AutoNote
This creates the database tables without using Alembic migrations
"""

import os
import sys
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

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
        print("   3. Your .env file has correct DATABASE_URL")
        return False

if __name__ == "__main__":
    print("🚀 AutoNote Database Setup")
    print("=" * 40)
    
    # Check database connection first
    if not check_database_connection():
        sys.exit(1)
    
    # Create tables
    if create_tables():
        print("\n🎉 Database setup complete!")
        print("You can now start the server with: python run.py")
    else:
        print("\n❌ Database setup failed!")
        sys.exit(1)
