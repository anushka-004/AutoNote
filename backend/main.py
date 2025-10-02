from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer
from sqlalchemy.orm import Session
from datetime import timedelta
import os
from dotenv import load_dotenv

from database import get_db, engine, Base
from models import User
from schemas import UserCreate, UserLogin, UserResponse, Token
from auth import (
    get_password_hash, 
    authenticate_user, 
    create_access_token, 
    get_current_active_user,
    get_user_by_email,
    get_user_by_username
)

load_dotenv()

# Set default database URL if not provided
if not os.getenv("DATABASE_URL"):
    os.environ["DATABASE_URL"] = "sqlite:///./autonote.db"

# Create database tables
try:
    Base.metadata.create_all(bind=engine)
    print("✅ Database tables created successfully!")
except Exception as e:
    print(f"⚠️ Database connection issue: {e}")
    print("Using SQLite as fallback...")
    os.environ["DATABASE_URL"] = "sqlite:///./autonote.db"
    from database import engine
    Base.metadata.create_all(bind=engine)

# Initialize FastAPI app
app = FastAPI(
    title="AutoNote API",
    description="Backend API for AutoNote - AI-Powered Meeting Platform",
    version="1.0.0"
)

# CORS configuration - Allow all localhost ports for development
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:3001", 
        "http://127.0.0.1:3000",
        "http://127.0.0.1:3001"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    """Root endpoint."""
    return {"message": "Welcome to AutoNote API", "version": "1.0.0"}

@app.get("/health")
async def health_check():
    """Health check endpoint."""
    return {"status": "healthy", "service": "autonote-api"}

@app.post("/auth/register", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
async def register_user(user: UserCreate, db: Session = Depends(get_db)):
    """
    Register a new user.
    
    - **email**: User's email address (must be unique)
    - **username**: User's username (must be unique)
    - **full_name**: User's full name
    - **password**: User's password (min 8 chars, must contain uppercase, lowercase, and digit)
    """
    print(f"📝 Register attempt - Email: {user.email}, Username: {user.username}, Full Name: {user.full_name}")
    
    # Check if user already exists
    existing_user_email = get_user_by_email(db, user.email)
    if existing_user_email:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    existing_user_username = get_user_by_username(db, user.username)
    if existing_user_username:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Username already taken"
        )
    
    # Create new user
    hashed_password = get_password_hash(user.password)
    db_user = User(
        email=user.email,
        username=user.username,
        full_name=user.full_name,
        hashed_password=hashed_password
    )
    
    try:
        db.add(db_user)
        db.commit()
        db.refresh(db_user)
        return db_user
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to create user"
        )

@app.post("/auth/login", response_model=Token)
async def login_user(user_credentials: UserLogin, db: Session = Depends(get_db)):
    """
    Authenticate user and return access token.
    
    - **email**: User's email address
    - **password**: User's password
    """
    print(f"🔑 Login attempt - Email: {user_credentials.email}")
    
    # Authenticate user
    user = authenticate_user(db, user_credentials.email, user_credentials.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Inactive user account"
        )
    
    # Create access token
    access_token_expires = timedelta(minutes=int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "30")))
    access_token = create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    
    return {"access_token": access_token, "token_type": "bearer"}

@app.get("/auth/me", response_model=UserResponse)
async def get_current_user_info(current_user: User = Depends(get_current_active_user)):
    """
    Get current user information.
    Requires valid authentication token.
    """
    return current_user

@app.get("/auth/verify-token")
async def verify_token(current_user: User = Depends(get_current_active_user)):
    """
    Verify if the provided token is valid.
    """
    return {"valid": True, "user_id": current_user.id, "email": current_user.email}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
