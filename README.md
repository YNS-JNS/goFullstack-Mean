# E-Commerce Web Application gofullstack 

Welcome to the E-Commerce Web Application, this is an example e-commerce platform built using the MEAN Stack (MongoDB, Express.js, Angular, Node.js).

## Overview

The E-Commerce Web Application is a comprehensive e-commerce platform designed for product management and user accounts. This application includes a range of features, allowing users to view products, create new listings, view detailed product information, update product details, and securely manage user accounts. User passwords are securely encrypted with bcrypt, and user authentication is managed using JSON Web Tokens (JWT).

## Features

- **Product Management:**
  - Restfull API 
  - View all products in the store.
  - Create new products for listing.
  - View detailed product information.
  - Update product details, including price, description, and more.
  - Delete products from the catalog.

- **User Management:**
  - Create user accounts with secure token-based authentication.
  - Passwords are securely hashed and encrypted using bcrypt.

## Project Structure

The project is structured as follows:

- `frontend`: Contains the Angular front-end application and user interface components.
- `backend`: Houses the Express.js server and server-side logic.
- `models`: Defines the database schemas for products and users.
- `routes`: Manages the API routes for product and user interactions.
- `controllers`: Contains the logic for handling API requests.
- `middleware`: Houses custom middleware functions for authentication and other purposes.
- `images`: Stores product images and assets.

## Dependencies (Backend)

The backend of the project relies on the following packages:

- **bcrypt**: For secure password hashing and encryption.
- **express**: The Node.js web application framework.
- **jsonwebtoken**: For generating and verifying JSON Web Tokens (JWT).
- **mongoose**: The ODM library for MongoDB.
- **mongoose-unique-validator**: A plugin for Mongoose to handle unique fields.
- **multer**: For handling file uploads.

## Getting Started

### Prerequisites

- Ensure you have Node.js and npm installed. You can download them [here](https://nodejs.org/).

### Usage

To begin exploring the E-Commerce Web Application, follow these steps:

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/YNS-JNS/gofullstack-mean.git
   cd gofullstack-mean

2. **Setting up the Backend:**

    - **Navigate to the backend directory:**

    ```bash
    cd backend
    ```

    - **Install the necessary packages:**

    ```bash
    npm install
    ```

    - **MongoDB Setup:**

    - Create a new database on MongoDB.
    - Copy the connection string provided by MongoDB.
    - Replace the `uri` in the `app.js` file with your MongoDB connection string.

    - **Start the backend server:**

    ```bash
    npm start
    ```

3. **Setting up the Frontend:**

    - **Navigate to the frontend directory:**

    ```bash
    cd frontend
    ```

    - **Install the necessary packages:**

    ```bash
    npm install
    ```

    - **Start the frontend / Start the Application:**

    ```bash
    npm start
    ```

4. **Open the App:**

    Visit [http://localhost:4200](http://localhost:4200) in your web browser to see the app.

    Server is running on port: [http://localhost:3000](http://localhost:3000).

## Author

This gofullstack web Application was created with ❤️ by [AIT M'BAREK Youness](https://github.com/YNS-JNS).

## Learn More

- Angular Documentation: [https://angular.io/docs](https://angular.io/docs)

## Contribution

If you find issues or want to contribute, follow these steps:

1. Fork the project.
2. Create a branch for your feature: `git checkout -b feature/NewFeature`.
3. Commit your changes: `git commit -m "Add New Feature"`.
4. Push to the branch: `git push origin feature/NewFeature`.
5. Open a pull request.

