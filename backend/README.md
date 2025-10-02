# AutoNote Backend API

A secure FastAPI backend for the AutoNote application with user authentication and registration.

## Features

- 🔐 **Secure Authentication**: JWT-based authentication with bcrypt password hashing
- 👤 **User Management**: Registration and login with email/username validation
- 🛡️ **Security**: Password strength validation, CORS protection, and secure token handling
- 🗄️ **Database**: PostgreSQL with SQLAlchemy ORM and Alembic migrations
- 📚 **API Documentation**: Auto-generated OpenAPI/Swagger documentation

## Quick Start

### 1. Install Dependencies

```bash
cd backend
pip install -r requirements.txt
```

### 2. Set Up Database

Create a PostgreSQL database and update the connection string in your environment:

```bash
# Copy the example environment file
cp env.example .env

# Edit .env with your database credentials
DATABASE_URL=postgresql://username:password@localhost:5432/autonote_db
SECRET_KEY=your-super-secret-key-change-this-in-production
```

### 3. Run Database Migrations

```bash
# Initialize Alembic (first time only)
alembic init alembic

# Create initial migration
alembic revision --autogenerate -m "Initial migration"

# Apply migrations
alembic upgrade head
```

### 4. Start the Server

```bash
# Development server
uvicorn main:app --reload --host 0.0.0.0 --port 8000

# Or run directly
python main.py
```

The API will be available at:
- **API**: http://localhost:8000
- **Documentation**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## API Endpoints

### Authentication

- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login user and get access token
- `GET /auth/me` - Get current user information
- `GET /auth/verify-token` - Verify if token is valid

### Health Check

- `GET /` - Root endpoint
- `GET /health` - Health check

## Request/Response Examples

### Register User

```bash
curl -X POST "http://localhost:8000/auth/register" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "username": "johndoe",
    "full_name": "John Doe",
    "password": "SecurePass123"
  }'
```

### Login User

```bash
curl -X POST "http://localhost:8000/auth/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "SecurePass123"
  }'
```

### Access Protected Route

```bash
curl -X GET "http://localhost:8000/auth/me" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

## Security Features

- **Password Requirements**: Minimum 8 characters with uppercase, lowercase, and digit
- **JWT Tokens**: Secure token-based authentication with configurable expiration
- **Password Hashing**: bcrypt for secure password storage
- **CORS Protection**: Configured for frontend integration
- **Input Validation**: Pydantic models for request validation

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | Required |
| `SECRET_KEY` | JWT secret key | Required |
| `ALGORITHM` | JWT algorithm | HS256 |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | Token expiration time | 30 |

## Database Schema

### Users Table

| Column | Type | Description |
|--------|------|-------------|
| id | Integer | Primary key |
| email | String | Unique email address |
| username | String | Unique username |
| full_name | String | User's full name |
| hashed_password | String | Bcrypt hashed password |
| is_active | Boolean | Account status |
| is_verified | Boolean | Email verification status |
| created_at | DateTime | Account creation timestamp |
| updated_at | DateTime | Last update timestamp |

## Development

### Running Tests

```bash
# Install test dependencies
pip install pytest pytest-asyncio httpx

# Run tests
pytest
```

### Code Formatting

```bash
# Install formatting tools
pip install black isort

# Format code
black .
isort .
```

## Production Deployment

1. Set strong `SECRET_KEY` in production
2. Use environment-specific database URLs
3. Configure proper CORS origins
4. Set up SSL/TLS certificates
5. Use a production ASGI server like Gunicorn with Uvicorn workers

```bash
# Production server
gunicorn main:app -w 4 -k uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000
```
