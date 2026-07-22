# 🎓 AI Student Manager — Backend API

A scalable backend for an **AI-powered student learning and management platform**, built using **Node.js, Express.js, MySQL, and Google Generative AI**.

The project provides REST APIs for user authentication, profile management, PDF-based learning workflows, AI-generated questions and quizzes, flashcards, and an AI chatbot. It is designed with a modular backend architecture that separates routes, controllers, services, middleware, and database logic.

> **Note:** This repository currently contains the **backend only**. A frontend/client can consume the provided REST APIs.

---

## ✨ Features

### 🔐 Authentication & User Management

* User registration and login
* Password hashing using **bcrypt**
* JWT-based authentication
* Cookie-based token handling
* Retrieve authenticated user information
* Profile picture upload
* Protected API routes

### 🔑 Password Recovery

* Forgot-password workflow
* OTP generation
* OTP verification
* Email-based OTP delivery
* Password reset functionality

### 🤖 AI-Powered Learning

Integration with **Google Generative AI** enables intelligent learning features such as:

* AI chatbot
* AI-generated questions
* Quiz generation
* Answer processing
* Flashcard generation
* AI-assisted learning from uploaded content

### 📄 PDF Processing

Students can upload PDF documents that can be processed by the backend for AI-assisted learning workflows.

The backend includes dedicated PDF parsing functionality and supports generating learning material from uploaded documents.

### 📝 Quiz & Question System

Dedicated APIs and controllers are provided for:

* Creating questions
* Creating quizzes
* Sending quizzes
* Receiving answers
* Generating flashcards

### ☁️ Media Handling

The backend includes support for:

* File uploads using **Multer**
* Cloud-based media handling
* Profile picture uploads

---

## 🛠️ Tech Stack

| Technology              | Purpose                         |
| ----------------------- | ------------------------------- |
| **Node.js**             | JavaScript runtime              |
| **Express.js**          | REST API framework              |
| **MySQL**               | Relational database             |
| **mysql2**              | MySQL driver for Node.js        |
| **Google GenAI**        | AI-powered learning features    |
| **JWT**                 | Authentication & authorization  |
| **bcrypt**              | Password hashing                |
| **Multer**              | File upload handling            |
| **Cloudinary**          | Cloud media storage             |
| **Nodemailer / Resend** | Email and OTP delivery          |
| **PDF Parser**          | Extracting content from PDFs    |
| **Cookie Parser**       | Cookie handling                 |
| **CORS**                | Cross-origin resource sharing   |
| **dotenv / dotenvx**    | Environment variable management |

---

## 📁 Project Structure

```text
ai-student-manager/
│
├── src/
│   ├── controllers/
│   │   ├── chatBot.controller.js
│   │   ├── createQuestions.controller.js
│   │   ├── createQuiz.controller.js
│   │   ├── forgotPassword.controller.js
│   │   ├── getFlashCard.controller.js
│   │   ├── getUser.controllers.js
│   │   ├── recieveAnswer.controller.js
│   │   ├── resetPassword.controller.js
│   │   ├── sendQuiz.controller.js
│   │   ├── uploadPdf.controller.js
│   │   ├── uploadPfp.controllers.js
│   │   ├── userLogin.controllers.js
│   │   ├── userSignup.controller.js
│   │   └── verifyOtp.controller.js
│   │
│   ├── database/
│   │   └── # MySQL database configuration
│   │
│   ├── middlewares/
│   │   └── # Authentication and request middleware
│   │
│   ├── routes/
│   │   ├── chatBot.routes.js
│   │   ├── createQuestions.routes.js
│   │   ├── createQuiz.routes.js
│   │   ├── forgotPassword.routes.js
│   │   ├── getFlashCard.routes.js
│   │   ├── getUser.routes.js
│   │   ├── recieveAnswer.routes.js
│   │   ├── resetPassword.routes.js
│   │   ├── sendQuiz.routes.js
│   │   ├── uploadPdf.routes.js
│   │   ├── uploadPfp.routes.js
│   │   ├── userLogin.routes.js
│   │   ├── userSignup.routes.js
│   │   └── verifyOtp.routes.js
│   │
│   ├── services/
│   │   ├── googleAiText.js
│   │   ├── googleQuestions.js
│   │   ├── mailService.js
│   │   ├── otpGen.js
│   │   └── pdfParser.js
│   │
│   └── app.js
│
├── server.js
├── package.json
├── package-lock.json
├── .gitignore
├── LICENSE
└── README.md
```

The application follows a modular structure:

```text
Request
   │
   ▼
Routes
   │
   ▼
Middleware
   │
   ▼
Controllers
   │
   ├────────► Services ────────► AI / Email / PDF Processing
   │
   ▼
MySQL Database
   │
   ▼
Response
```

This separation keeps API routing, business logic, external services, authentication, and database operations independently maintainable.

---

## 🚀 Getting Started

### Prerequisites

Make sure the following are installed:

* Node.js
* npm
* MySQL Server
* Git

You will also need credentials/API keys for external services used by the project.

---

### 1. Clone the Repository

```bash
git clone https://github.com/EnzoCodes786/ai-student-manager.git
cd ai-student-manager
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the project root.

```env
SERVER_PORT=4000

# MySQL
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=your_database_name

# Authentication
JWT_SECRET=your_jwt_secret

# Google AI
GOOGLE_API_KEY=your_google_ai_api_key

# Email Service
EMAIL_USER=your_email
EMAIL_PASSWORD=your_email_password

# Cloud Storage
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

> Environment variable names may differ depending on your local configuration. Check the source configuration before running the project.

**Never commit your `.env` file or API credentials to GitHub.**

---

### 4. Configure MySQL

Start your local MySQL server and create the database required by the application.

Ensure that the credentials configured in your environment variables match your MySQL configuration.

---

### 5. Start the Development Server

```bash
npm run dev
```

The backend runs on port `4000` by default unless `SERVER_PORT` is provided.

```text
http://localhost:4000
```

---

## 🔌 API Modules

The backend exposes API functionality across several modules:

| Module            | Description                                     |
| ----------------- | ----------------------------------------------- |
| Authentication    | Registration and login                          |
| User              | Retrieve and manage user information            |
| Password Recovery | OTP generation, verification and password reset |
| Profile           | Profile picture upload                          |
| PDF               | Upload and process PDF documents                |
| AI Chatbot        | AI-powered conversational assistance            |
| Questions         | Generate learning questions                     |
| Quiz              | Generate and manage quizzes                     |
| Answers           | Process submitted answers                       |
| Flashcards        | Generate AI-assisted flashcards                 |

The exact route paths and request payloads can be found inside the `src/routes` directory.

---

## 🔐 Authentication Flow

```text
User
 │
 │ Registration / Login
 ▼
Express API
 │
 ├── Validate Request
 │
 ├── Hash / Verify Password
 │
 └── Generate JWT
        │
        ▼
 Authentication Cookie / Token
        │
        ▼
 Protected API Routes
```

Passwords are hashed before authentication-related database operations, while JWT tokens are used to identify authenticated users when accessing protected resources.

---

## 🤖 AI Learning Workflow

```text
Student
   │
   ├── Upload PDF
   │
   ▼
PDF Processing Service
   │
   ▼
Extracted Content
   │
   ▼
Google Generative AI
   │
   ├── Questions
   ├── Quizzes
   ├── Flashcards
   └── Chat Assistance
```

The goal is to turn ordinary study material into interactive learning resources through AI.

---

## 🔒 Security

The backend uses multiple security mechanisms:

* Password hashing with bcrypt
* JWT-based authentication
* Environment variables for secrets
* Cookie parsing for authentication workflows
* OTP-based password recovery
* Middleware-based route protection
* CORS configuration

For production deployments, secure cookies, HTTPS, rate limiting, request validation, and production-specific CORS rules should also be configured.

---

## 📦 Major Dependencies

```text
express
mysql2
bcrypt
jsonwebtoken
cookie-parser
cors
@google/genai
multer
cloudinary
nodemailer
resend
pdf-parse
pdfjs-dist
pdfreader
dotenv
@dotenvx/dotenvx
```

---

## 🗺️ Future Improvements

Possible improvements planned for the project include:

* Frontend dashboard
* Detailed API documentation using Swagger/OpenAPI
* Automated API testing
* Rate limiting
* Request validation
* Role-based authorization
* AI-generated study plans
* Student performance analytics
* Quiz history and progress tracking
* Docker support
* Production deployment

---

## 🎯 Project Objective

AI Student Manager is being developed as a backend platform that combines traditional student-management functionality with modern AI-assisted learning tools.

Instead of limiting the application to storing student information, the project explores how generative AI can help students interact with their study material through:

**PDF → Content Extraction → AI Processing → Questions / Quizzes / Flashcards / Chat**

The project also demonstrates practical backend development concepts including authentication, relational databases, REST APIs, file handling, cloud services, email workflows, and third-party AI integration.

---

## 👨‍💻 Author

**Aryan Qayum**

Backend Developer / Computer Science Student

GitHub: **@EnzoCodes786**

---

## 📄 License

This project is licensed under the **MIT License**.

See the `LICENSE` file for more information.

---

<p align="center">
  Built with Node.js, Express.js, MySQL & Generative AI 🚀
</p>
