# 🚀 LinkJet

![License](https://img.shields.io/badge/license-ISC-blue.svg)
![Node](https://img.shields.io/badge/Node.js-v18+-green.svg)
![React](https://img.shields.io/badge/React-Vite-blue)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15+-336791.svg)

**LinkJet** is a modern, full-stack URL shortener application designed to make link management efficient and insightful. Built with performance and type-safety in mind using the **PERN stack** (PostgreSQL, Express, React, Node) and **TypeScript** friendly tooling.

---

## 📸 Screenshots

|                         Dashboard View                          |                         Analytics View                          |
| :-------------------------------------------------------------: | :-------------------------------------------------------------: |
| ![Dashboard Placeholder](./client/linkjet/public/dashboard.png) | ![Analytics Placeholder](./client/linkjet/public/analytics.png) |

---

## ✨ Key Features

- **🔐 Secure Authentication:** Robust Sign Up and Login system using JWT (JSON Web Tokens).
- **🔗 Instant Shortening:** Convert long, cumbersome URLs into crisp, shareable links instantly.
- **📊 Detailed Analytics:** Track click counts, referrers, and user engagement data.
- **📱 Responsive Dashboard:** A clean, mobile-first interface built with **Tailwind CSS**.
- **⚡ High Performance:** Optimized backend queries using **Drizzle ORM**.

---

## 🛠️ Tech Stack

### Client Side

- **Framework:** [React](https://react.dev/) (powered by [Vite](https://vitejs.dev/))
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Routing:** React Router DOM
- **State/Network:** Axios
- **Icons:** Lucide React

### Server Side

- **Runtime:** Node.js & Express.js
- **Database:** PostgreSQL
- **ORM:** [Drizzle ORM](https://orm.drizzle.team/) (for type-safe SQL)
- **Validation:** Zod (Schema validation)
- **Auth:** JWT (JSON Web Tokens) & Bcrypt

---

## ⚙️ Environment Variables

To run this project, you will need to add the following environment variables to your `.env` files.

**Server (`server/.env`)**

| Variable       | Description                   | Example                                         |
| :------------- | :---------------------------- | :---------------------------------------------- |
| `PORT`         | Port for the backend server   | `8000`                                          |
| `DATABASE_URL` | PostgreSQL connection string  | `postgresql://user:pass@localhost:5432/linkjet` |
| `JWT_SECRET`   | Secret key for signing tokens | `super_secret_key_123`                          |

**Client (`client/linkjet/.env`)**

| Variable       | Description               | Example                 |
| :------------- | :------------------------ | :---------------------- |
| `VITE_API_URL` | URL of the backend server | `http://localhost:8000` |

---

## 🚀 Installation & Setup

Follow these steps to get a local copy up and running.

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL installed and running

### 1. Clone the Repository

```bash
git clone <repository-url>
cd linkjet
```

````

### 2. Backend Setup

```bash
# Move to server directory
cd server

# Install dependencies
npm install

# Setup Database
# 1. Create a database named 'linkjet_db' in your Postgres instance
# 2. Update .env file with your credentials
npm run db:push  # Push schema to database

# Start Server
npm run dev

```

_Server runs on:_ `http://localhost:8000`

### 3. Frontend Setup

```bash
# Move to client directory (from root)
cd client/linkjet

# Install dependencies
npm install

# Start Client
npm run dev

```

_Client runs on:_ `http://localhost:5173`

---

## 🔌 API Reference

Here are the primary endpoints for the application:

#### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and receive JWT

#### URLs

- `POST /api/url/shorten` - Create a short link (Protected)
- `GET /api/url/analytics/:id` - Get stats for a specific link (Protected)
- `GET /:code` - Redirect to the original URL

---

## 📂 Project Structure

```bash
linkjet/
├── client/
│   └── linkjet/
│       ├── src/
│       │   ├── components/  # Reusable UI components
│       │   ├── pages/       # Route pages (Dashboard, Login)
│       │   └── hooks/       # Custom React hooks
└── server/
    ├── db/             # Drizzle connection & Schema
    ├── middlewares/    # Auth & Validation middleware
    ├── controllers/    # Route logic
    └── routes/         # API Endpoint definitions

```

## 🤝 Contributing

Contributions are always welcome!

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/amazing-feature`).
3. Commit your changes (`git commit -m 'Add amazing feature'`).
4. Push to the branch (`git push origin feature/amazing-feature`).
5. Open a Pull Request.

## 📄 License

Distributed under the ISC License.
````
