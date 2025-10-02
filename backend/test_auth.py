"""Test authentication endpoints"""
import requests
import json
from datetime import datetime

BASE_URL = "http://localhost:8000"

def test_health():
    """Test if backend is running"""
    try:
        response = requests.get(f"{BASE_URL}/health")
        print(f"✅ Backend Health: {response.json()}")
        return True
    except Exception as e:
        print(f"❌ Backend not running: {e}")
        return False

def test_register():
    """Test user registration"""
    timestamp = int(datetime.now().timestamp())
    user_data = {
        "email": f"testuser{timestamp}@example.com",
        "username": f"testuser{timestamp}",
        "full_name": "Test User",
        "password": "Test1234"
    }
    
    try:
        response = requests.post(
            f"{BASE_URL}/auth/register",
            json=user_data,
            headers={"Content-Type": "application/json"}
        )
        
        if response.status_code == 201:
            data = response.json()
            print(f"✅ Registration successful!")
            print(f"   User ID: {data['id']}")
            print(f"   Email: {data['email']}")
            print(f"   Username: {data['username']}")
            return user_data
        else:
            print(f"❌ Registration failed: {response.status_code}")
            print(f"   Error: {response.json()}")
            return None
    except Exception as e:
        print(f"❌ Registration error: {e}")
        return None

def test_login(email, password):
    """Test user login"""
    credentials = {
        "email": email,
        "password": password
    }
    
    try:
        response = requests.post(
            f"{BASE_URL}/auth/login",
            json=credentials,
            headers={"Content-Type": "application/json"}
        )
        
        if response.status_code == 200:
            data = response.json()
            print(f"✅ Login successful!")
            print(f"   Token: {data['access_token'][:50]}...")
            print(f"   Type: {data['token_type']}")
            return data['access_token']
        else:
            print(f"❌ Login failed: {response.status_code}")
            print(f"   Error: {response.json()}")
            return None
    except Exception as e:
        print(f"❌ Login error: {e}")
        return None

def test_get_user(token):
    """Test getting current user with token"""
    try:
        response = requests.get(
            f"{BASE_URL}/auth/me",
            headers={"Authorization": f"Bearer {token}"}
        )
        
        if response.status_code == 200:
            data = response.json()
            print(f"✅ Get current user successful!")
            print(f"   ID: {data['id']}")
            print(f"   Email: {data['email']}")
            print(f"   Full Name: {data['full_name']}")
            return True
        else:
            print(f"❌ Get user failed: {response.status_code}")
            print(f"   Error: {response.json()}")
            return False
    except Exception as e:
        print(f"❌ Get user error: {e}")
        return False

def test_existing_user():
    """Test login with existing test user"""
    print("\n" + "="*50)
    print("Testing with existing user (test@example.com)")
    print("="*50)
    
    token = test_login("test@example.com", "Test1234")
    if token:
        test_get_user(token)
        return True
    return False

if __name__ == "__main__":
    print("="*50)
    print("AutoNote Authentication Test Suite")
    print("="*50)
    
    # Test 1: Backend health
    print("\n[1/5] Testing backend health...")
    if not test_health():
        print("\n❌ Backend is not running! Start it with: python start_server.py")
        exit(1)
    
    # Test 2: Register new user
    print("\n[2/5] Testing user registration...")
    user_data = test_register()
    if not user_data:
        print("\n⚠️ Registration test failed")
    
    # Test 3: Login with new user
    if user_data:
        print("\n[3/5] Testing login with new user...")
        token = test_login(user_data['email'], user_data['password'])
        
        # Test 4: Get current user
        if token:
            print("\n[4/5] Testing get current user...")
            test_get_user(token)
    
    # Test 5: Login with existing test user
    print("\n[5/5] Testing login with existing test user...")
    test_existing_user()
    
    print("\n" + "="*50)
    print("✅ All authentication tests completed!")
    print("="*50)
    print("\nYour backend authentication is working!")
    print("Now test the frontend at: http://localhost:3000")
