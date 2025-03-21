# Ecommerce Backend

This is a TypeScript-based Express backend for an eCommerce application. It provides user authentication, email verification via OTP, an admin panel, product management, and purchasing functionalities similar to platforms like Amazon.

## Features
- User registration and authentication with email OTP verification
- Admin dashboard for managing products, events, and users
- Shopping cart functionality to add, update, and remove items
- Order management and checkout system
- Uses MongoDB for database storage
- Implements logging and error handling with Winston
- JWT-based authentication for security

## Installation

### Prerequisites
- Node.js and npm installed
- MongoDB database set up

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/impana1999/ecommerce-backend.git
   ```

2. Navigate to the project directory:
   ```bash
   cd ecommerce-backend
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Set up environment variables in a `.env` file:
   ```env
   MONGO_URI=your_mongo_db_connection_string
   JWT_SECRET=your_secret_key
   RAZORPAY_KEY=your_razorpay_key
   SMTP_USER=your_smtp_email
   SMTP_PASS=your_smtp_password
   ```

5. Compile TypeScript to JavaScript:
   ```bash
   npm run build
   ```

## Running the Application

### Development Mode
```bash
npm run dev
```

## Project Structure
```
├── src
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── services
│   ├── middlewares
│   ├── utils
│   ├── config
│   ├── server.ts
├── dist (Generated after build)
├── .env
├── package.json
├── tsconfig.json
```

## Technologies Used
- **Backend:** Node.js, Express, TypeScript
- **Database:** MongoDB
- **Authentication:** JWT, bcryptjs
- **Logging:** Winston

## Contributing
Feel free to submit pull requests or issues to improve the project.

