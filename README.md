# News Explorer: Backend

The back-end project is focused on creating a server for the News Explorer application. It provides a secure RESTful API with user authorization, database persistence, logging, and centralized error handling, fully deployed on a Google Cloud Platform (GCP) Ubuntu instance.

## Live Application & API Endpoints

- **Frontend Application:** [https://djw-newsexplorer.jumpingcrab.com](https://djw-newsexplorer.jumpingcrab.com)
- **Backend API:** [https://api.djw-newsexplorer.jumpingcrab.com](https://api.djw-newsexplorer.jumpingcrab.com)

## Technologies and Techniques Used

**Backend Development & Security:**

- **Node.js & Express:** Configured on port `3002` to handle incoming HTTP requests and route controller logic.
- **MongoDB & Mongoose:** NoSQL database used with Mongoose schemas to validate incoming data before saving to the database.
- **JWT & bcryptjs:** JSON Web Tokens for state authorization, paired with `bcryptjs` for password hashing.
- **Celebrate & Joi:** Middleware used to validate incoming HTTP request payloads, parameters, and headers before reaching controllers.
- **Winston & express-winston:** Logging framework tracking incoming server requests (`request.log`) and catching unhandled errors (`error.log`).
- **ESLint & Nodemon:** ESLint enforces clean code formatting, while Nodemon handles hot reloading during local development.

**Deployment & Infrastructure:**

- **Google Cloud Platform (GCP):** Hosted on an Ubuntu 24.04 VM instance.
- **Nginx:** Configured as a reverse proxy to manage incoming traffic, route API requests to port `3002`, and serve static frontend builds.
- **Certbot (Let's Encrypt):** SSL/TLS certificates provisioned to enforce HTTPS security across domains.
- **PM2:** Node process manager running the server in the background with auto-restart enabled.

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
