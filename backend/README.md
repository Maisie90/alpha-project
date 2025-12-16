# Project Alpha – Backend API

This repository contains the backend API for Project Alpha, an educational quiz platform designed to improve student engagement in non-STEM subjects through teacher-created multiple-choice quizzes.

The backend is responsible for authentication and quiz and question management.

---

## Table of Contents

- [Overview](#overview)
- [Technologies Used](#technologies-used)
- [Database Schema](#database-schema)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Running the Server](#running-the-server)
- [API Documentation](#api-documentation)
- [Testing](#testing)

---

## Overview

The backend exposes a RESTful API built with Node.js and Express, following an MVC architecture. It handles user authentication, role-based access, and CRUD operations for quizzes and questions.

---

## Technologies Used

- Node.js
- Express.js
- PostgreSQL
- Jest
- dotenv

---

## Getting Started

### Prerequisites

Ensure you have the following installed on your machine:

- Node.js (v18 or later)
- PostgreSQL
- Git

---

### Installation

1. Clone the repository:
```
git clone git@github.com:Maisie90/alpha-project.git

```
2. Navigate to the backend directory:
```
cd project-alpha/backend
```
3. Install dependencies via terminal
```
npm install
```

### Running the server
Start the backend development server with:
```
npm run dev
```

### Testing 
The backend uses Jest for unit testing and integration testing.
Run the test suite using:
```
npm test
```
