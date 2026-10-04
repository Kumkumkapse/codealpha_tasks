# CodeAlpha Social Media Platform

A full-stack Social Media Platform developed as part of the CodeAlpha Full Stack Development Internship.

## Features

* User registration
* User login
* User profile
* Create posts
* View recent posts
* Like and unlike posts
* Add comments to posts
* MongoDB database integration
* Responsive web interface

## Technologies Used

* HTML
* CSS
* JavaScript
* Node.js
* Express.js
* MongoDB
* Mongoose
* REST API

## Project Structure

```text
Task2_SocialMediaPlatform/
│
├── config/
│   └── db.js
│
├── models/
│   ├── User.js
│   └── Post.js
│
├── routes/
│   ├── userRoutes.js
│   └── postRoutes.js
│
├── public/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   ├── script.js
│   │   └── auth.js
│   ├── auth.html
│   └── index.html
│
├── .env
├── .gitignore
├── package.json
├── package-lock.json
├── README.md
└── server.js
```

## How to Run

1. Install Node.js.
2. Open the project folder in VS Code.
3. Open the terminal.
4. Run:

```bash
npm install
```

5. Make sure the MongoDB connection string is configured in the `.env` file.
6. Start the server:

```bash
node server.js
```

7. Open the application in a browser:

```text
http://localhost:3001
```

## Database

The application uses MongoDB with Mongoose for storing users and posts.

## Internship Task

This project was developed for **CodeAlpha Full Stack Development Internship – Task 2: Social Media Platform**.
