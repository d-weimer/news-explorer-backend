# News Explorer: Backend

The back-end project is focused on creating a server for the News Explorer application. You’ll gain a deeper understanding of how to work with databases, set up security and testing, and prepare the web application for deployment on a remote machine. The main goal is to create a secure RESTful server with an API, user authorization, and centralized error handling.

## Technologies and Techniques Used

**Backend development:**

- **Node.js & Express:** Used to set up the server and create routes to separate endpoint paths from the controller logic.
- **MongoDB & Mongoose:** A NoSQL database used with Mongoose schemas to validate incoming data before saving anything to the database.
- **JWT & bcryptjs:** JSON Web Tokens used for user authentication and state authorization, paired with `bcryptjs` for secure password hashing.
- **Celebrate & Joi:** Integrated middleware used to validate incoming HTTP request payloads, parameters, and headers before reaching controllers.
- **Winston & express-winston:** Logging framework used to track incoming server requests (`request.log`) and catch unhandled application errors (`error.log`).
- **Postman:** Used to test all the API endpoints, mock request data, and make sure custom HTTP error status codes are working properly.
- **ESLint:** Used to catch code errors early and enforce a clean and consistent coding style across the project.
- **Nodemon:** Added as a development dependency to automatically restart the server whenever code changes are saved.

## API Functionality Overview

This backend is a RESTful API that handles JSON data for the News Explorer application, allowing users to authenticate and manage saved news articles.

### Core Features

1. **User Authentication (`/signup`, `/signin`):** Handles creating new user accounts with hashed passwords and logging users in to issue secure JWT tokens.
2. **User Profile (`/users/me`):** Retrieves the profile of the currently authenticated user based on their JWT token.
3. **Saved Articles (`/articles`):** Allows authenticated users to save news articles with detailed metadata (keyword, title, text, date, source, link, and image) and fetch all articles saved by their account.
4. **Delete Articles (`/articles/:articleId`):** Enables users to remove saved articles by their unique ID, with authorization checks to ensure users can only delete their own saved articles.
5. **Centralized Error Handling:** Implements custom error classes (`BadRequestError`, `UnauthorizedError`, `ForbiddenError`, `NotFoundError`, `ConflictError`) alongside a central error handler to return standardized JSON response payloads.

## Running the Project

`npm run start` — to launch the production server

`npm run dev` — to launch the server with the hot reload feature using nodemon

### API Testing with Postman

Postman was used to test and verify that all server functionality works as expected. To test the API endpoints locally:

1. Start your local server by running `npm run dev` in your terminal.
2. Open Postman and target your requests at `http://localhost:3000`.
3. Use the following endpoints to test the API behavior:
   - **Public Routes:** `POST /signup` (Register User), `POST /signin` (Log In User)
   - **Protected Routes (Requires `Authorization: Bearer <token>`):**
     - **User:** `GET /users/me` (Get Current User)
     - **Articles:** `GET /articles` (Get Saved Articles), `POST /articles` (Save Article), `DELETE /articles/:articleId` (Delete Article)

## Frontend GitHub Repository

[News Explorer Frontend](https://github.com/d-weimer/news-explorer-app)
