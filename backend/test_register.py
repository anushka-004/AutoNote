"""Test registration with various scenarios"""
import requests
import json
from datetime import datetime

BASE_URL = "http://localhost:8000"

def test_register_new_user():
    """Test registering a completely new user"""
    timestamp = int(datetime.now().timestamp())
    user_data = {
        "email": f"newuser{timestamp}@example.com",
        "username": f"newuser{timestamp}",
        "full_name": "New Test User",
        "password": "NewPass123"
    }
    
    print("Testing registration with:")
    print(f"  Email: {user_data['email']}")
    print(f"  Username: {user_data['username']}")
    print(f"  Password: {user_data['password']}")
    print()
    
    try:
        response = requests.post(
            f"{BASE_URL}/auth/register",
            json=user_data,
            headers={"Content-Type": "application/json"}
        )
        
        print(f"Status Code: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2)}")
        
        if response.status_code == 201:
            print("\n✅ Registration successful!")
            return user_data
        else:
            print(f"\n❌ Registration failed!")
            return None
            
    except Exception as e:
        print(f"\n❌ Error: {e}")
        return None

def test_register_weak_password():
    """Test with weak password"""
    timestamp = int(datetime.now().timestamp())
    user_data = {
        "email": f"weak{timestamp}@example.com",
        "username": f"weak{timestamp}",
        "full_name": "Weak Password User",
        "password": "weak"  # Too short, no uppercase, no digit
    }
    
    print("\n" + "="*50)
    print("Testing with WEAK password (should fail):")
    print(f"  Password: {user_data['password']}")
    print()
    
    try:
        response = requests.post(
            f"{BASE_URL}/auth/register",
            json=user_data,
            headers={"Content-Type": "application/json"}
        )
        
        print(f"Status Code: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2)}")
        
        if response.status_code != 201:
            print("\n✅ Correctly rejected weak password!")
        else:
            print("\n⚠️ Should have rejected weak password!")
            
    except Exception as e:
        print(f"\n❌ Error: {e}")

def test_register_duplicate_email():
    """Test with duplicate email"""
    user_data = {
        "email": "test@example.com",  # Already exists
        "username": f"duplicate{int(datetime.now().timestamp())}",
        "full_name": "Duplicate Email User",
        "password": "DupPass123"
    }
    
    print("\n" + "="*50)
    print("Testing with DUPLICATE email (should fail):")
    print(f"  Email: {user_data['email']}")
    print()
    
    try:
        response = requests.post(
            f"{BASE_URL}/auth/register",
            json=user_data,
            headers={"Content-Type": "application/json"}
        )
        
        print(f"Status Code: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2)}")
        
        if response.status_code == 400:
            print("\n✅ Correctly rejected duplicate email!")
        else:
            print("\n⚠️ Should have rejected duplicate email!")
            
    except Exception as e:
        print(f"\n❌ Error: {e}")

if __name__ == "__main__":
    print("="*50)
    print("Registration Test Suite")
    print("="*50)
    print()
    
    # Test 1: Valid new user
    print("[1/3] Testing valid new user registration...")
    new_user = test_register_new_user()
    
    # Test 2: Weak password
    print("\n[2/3] Testing weak password validation...")
    test_register_weak_password()
    
    # Test 3: Duplicate email
    print("\n[3/3] Testing duplicate email check...")
    test_register_duplicate_email()
    
    print("\n" + "="*50)
    print("Tests completed!")
    print("="*50)
    
    if new_user:
        print(f"\n✅ New user created successfully!")
        print(f"   Email: {new_user['email']}")
        print(f"   Password: {new_user['password']}")
        print(f"\nYou can login with these credentials!")
