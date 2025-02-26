# Car Management System
by Zhannur, Maxim and Nurgul

## Overview
The Car Management System is a web application that allows users to register, authenticate, and manage car-related data such as manufacturers and models. The project includes user authentication with JWT tokens and serves static HTML pages.

## Features
- User authentication (Sign Up / Sign In)
- JWT-based authentication system
- Routes for car-related data (manufacturers, models, cars)
- Secure password storage using bcrypt
- API endpoints for handling user and car-related data


## Setup instructions

### Prerequisites
Ensure you have the following installed on your system:
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/car-management.git
   cd car-management
   ```
2. **Install dependencies**
   ```bash
   npm install express mongoose dotenv bcrypt jsonwebtoken express-validator path cors body-parser
   ```
3. **Setup environment by creating .env file
   ```bash
   PORT=8080
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

4. Run the server
   ```bash
   npm start
   ```

### API Documentation

#### 1. Authentication
- **Base URL:** `/api/auth`
- **Endpoints:**
  - `POST /signup` → Register a new user  
    **Request Body:**  
    ```json
    { "email": "user@example.com", "password": "securepassword" }
    ```
  - `POST /login` → Authenticate a user  
    **Request Body:**  
    ```json
    { "email": "user@example.com", "password": "securepassword" }
    ```

#### 2. Cars
- **Base URL:** `/api/cars`
- **Endpoints:**
  - `GET /` → Get all cars
  - `POST /` → Add a new car  
    **Request Body:**  
    ```json
    { "model": "Sedan", "manufacturer": "Toyota", "year": 2022 }
    ```
  - `GET /:id` → Get a specific car by ID
  - `PUT /:id` → Update car details  
    **Request Body:**  
    ```json
    { "model": "SUV", "manufacturer": "Ford", "year": 2023 }
    ```
  - `DELETE /:id` → Remove a car

#### 3. Manufacturers
- **Base URL:** `/api/manufacturers`
- **Endpoints:**
  - `GET /` → Get all manufacturers
  - `POST /` → Add a new manufacturer  
    **Request Body:**  
    ```json
    { "name": "Tesla", "country": "USA" }
    ```
  - `GET /:id` → Get a specific manufacturer by ID
  - `PUT /:id` → Update manufacturer details  
    **Request Body:**  
    ```json
    { "name": "BMW", "country": "Germany" }
    ```
  - `DELETE /:id` → Remove a manufacturer

#### 4. Models
- **Base URL:** `/api/models`
- **Endpoints:**
  - `GET /` → Get all models
  - `POST /` → Add a new model  
    **Request Body:**  
    ```json
    { "name": "Model S", "manufacturerId": "12345" }
    ```
  - `GET /:id` → Get a specific model by ID
  - `PUT /:id` → Update model details  
    **Request Body:**  
    ```json
    { "name": "Model X", "manufacturerId": "67890" }
    ```
  - `DELETE /:id` → Remove a model



