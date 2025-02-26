# Car Management System

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

### API documentation


