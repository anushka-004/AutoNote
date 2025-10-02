"""Check all users in database"""
import os
os.environ["DATABASE_URL"] = "sqlite:///./autonote.db"

from database import SessionLocal
from models import User

db = SessionLocal()

try:
    users = db.query(User).all()
    
    print("="*60)
    print(f"Total Users in Database: {len(users)}")
    print("="*60)
    print()
    
    if users:
        for i, user in enumerate(users, 1):
            print(f"User #{i}:")
            print(f"  ID: {user.id}")
            print(f"  Email: {user.email}")
            print(f"  Username: {user.username}")
            print(f"  Full Name: {user.full_name}")
            print(f"  Active: {user.is_active}")
            print(f"  Verified: {user.is_verified}")
            print(f"  Created: {user.created_at}")
            print()
    else:
        print("No users found in database!")
        print()
        print("Run: python reset_db.py")
        print("To create the test user.")
        
finally:
    db.close()

print("="*60)
