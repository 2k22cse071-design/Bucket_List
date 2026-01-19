# Life Tracker Application

A full-stack Todo/Achievement List application using Spring Boot and React.

## Prerequisites
1.  **XAMPP**: Ensure MySQL is running on port 3306.
2.  **Java 17+**: For the backend.
3.  **Node.js**: For the frontend.

## Database Setup
The application is configured to create the database automatically if it connects as `root` (password empty).
*   Database Name: `bucketdb`
*   User: `root`
*   Password: `(empty)`

If connection fails, open PHPMyAdmin and create a database named `bucketdb`.

## Running the Application

### 1. Start the Backend
Open a terminal in the `backend` folder:
```bash
cd backend
mvn spring-boot:run
```
Server will start on `http://localhost:8080`.

### 2. Start the Frontend
Open a new terminal in the `frontend` folder:
```bash
cd frontend
npm install  # (Already installed)
npm run dev
```
The app will open at `http://localhost:5173`.

## Features
*   **Achievements**: Track what you've accomplished.
*   **Missed Achievements**: Keep note of missed opportunities.
*   **Bucket List**: Plan your future goals.
*   **CRUD**: Add, Edit, Delete items.
*   **Premium UI**: Dark mode, glassmorphism design.
