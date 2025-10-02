"""Reset database and create a test user"""
import os
import sys

# Set environment
os.environ["DATABASE_URL"] = "sqlite:///./autonote.db"

from database import engine, Base, SessionLocal
from models import User
from auth import get_password_hash

# Drop all tables and recreate
print("🗑️  Dropping all tables...")
Base.metadata.drop_all(bind=engine)

print("📦 Creating fresh tables...")
Base.metadata.create_all(bind=engine)

# Create test user
db = SessionLocal()
try:
    test_user = User(
        email="test@example.com",
        username="testuser",
        full_name="Test User",
        hashed_password=get_password_hash("Test1234"),
        is_active=True,
        is_verified=True
    )
    db.add(test_user)
    db.commit()
    print("✅ Test user created!")
    print("   Email: test@example.com")
    print("   Password: Test1234")
except Exception as e:
    print(f"❌ Error: {e}")
    db.rollback()
finally:
    db.close()

print("\n✅ Database reset complete!")
