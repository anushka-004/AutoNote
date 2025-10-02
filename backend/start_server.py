#!/usr/bin/env python3
"""
Simple server startup with automatic fallback
"""

import os
import sys
from multiprocessing import freeze_support

# Set environment variables
os.environ["DATABASE_URL"] = "sqlite:///./autonote.db"
os.environ["SECRET_KEY"] = "your-super-secret-key-change-this-in-production-12345"
os.environ["ALGORITHM"] = "HS256"
os.environ["ACCESS_TOKEN_EXPIRE_MINUTES"] = "30"

# Add current directory to path
sys.path.append(os.path.dirname(__file__))

if __name__ == "__main__":
    freeze_support()
    
    try:
        from main import app
        import uvicorn
        
        print("🚀 Starting AutoNote API Server...")
        print("📍 URL: http://localhost:8000")
        print("📚 Docs: http://localhost:8000/docs")
        print("🔍 ReDoc: http://localhost:8000/redoc")
        print("=" * 50)
        
        uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
        
    except Exception as e:
        print(f"❌ Error starting server: {e}")
        print("\n💡 Make sure all dependencies are installed:")
        print("   pip install -r requirements.txt")
        sys.exit(1)
