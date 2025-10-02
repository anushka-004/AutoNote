#!/usr/bin/env python3
"""
Quick start with SQLite - no PostgreSQL needed!
"""

import os
import sys

# Use SQLite instead of PostgreSQL
os.environ["DATABASE_URL"] = "sqlite:///./autonote.db"
os.environ["SECRET_KEY"] = "your-super-secret-key-12345"
os.environ["ALGORITHM"] = "HS256"
os.environ["ACCESS_TOKEN_EXPIRE_MINUTES"] = "30"

sys.path.append(os.path.dirname(__file__))

from database import engine, Base
from models import User

print("🚀 Quick Setup with SQLite...")
Base.metadata.create_all(bind=engine)
print("✅ Database ready!")

# Start server
import uvicorn
from main import app

print("🌐 Starting server at http://localhost:8000")
uvicorn.run(app, host="0.0.0.0", port=8000)
