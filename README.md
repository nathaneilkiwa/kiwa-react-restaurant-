Kiwa Restaurant App 🍽️

A modern, full-stack restaurant web application built for speed, scalability, and a delightful user experience.

Kiwa is a complete restaurant platform that allows customers to browse the menu, place orders, book tables, and contact the restaurant—all through a clean, intuitive, and responsive web interface.

This project is built with a modern tech stack (React + Vite + TailwindCSS + Node.js + MongoDB) and structured with best practices suitable for production deployment.

⭐ Key Features
Frontend

⚡ Fast, lightweight UI powered by React 19 + Vite

🎨 Beautiful, responsive design using TailwindCSS

🔄 Smooth navigation with React Router

🧾 Menu browsing with category support

🛒 Order creation and checkout experience

📅 Reservation/booking system

🔐 Authentication page (Login)

📬 Contact page with form

🚫 Custom, polished 404 screen

Backend (Optional / If Included)

Node.js + Express REST API

MongoDB database using Mongoose

JWT-based authentication

Secure cookie handling

Reservation, order, and menu CRUD

Production-ready folder structure

🛠️ Tech Stack
Frontend

React

Vite

TailwindCSS

Axios

React Router

Backend

Node.js

Express

MongoDB

Mongoose

JSON Web Tokens (JWT)

🗂️ Project Structure
kiwa/
├── restaurant-frontend/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── context/
│   │   ├── utils/
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Menu.jsx
│   │   │   ├── Order.jsx
│   │   │   ├── Booking.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── Login.jsx
│   │   │   └── NotFound.jsx
│   │   └── main.jsx
│   └── index.html
└── backend/   <-- if your repo includes backend services

🚀 Getting Started
Clone the Repository
git clone https://github.com/YOUR_USERNAME/kiwa-restaurant.git
cd kiwa-restaurant

Frontend Setup
Install Dependencies
cd restaurant-frontend
npm install

Run Development Server
npm run dev

Build for Production
npm run build

Preview Production Build
npm run preview

Backend Setup (If included in your repo)
Install & Run
cd backend
npm install
npm run dev

Environment Variables

Create .env in /backend:

PORT=5000
MONGO_URI=your_mongo_db_url
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173

🔑 Frontend Environment Variables

Create restaurant-frontend/.env:

VITE_API_BASE_URL=http://localhost:5000/api

📄 Pages Overview
Page	Role
Home.jsx	Restaurant landing page
Menu.jsx	Displays menu items
Order.jsx	Checkout/cart experience
Booking.jsx	Table reservation system
Login.jsx	Authentication screen
Contact.jsx	Contact form
NotFound.jsx	404 error page
🧪 Testing & Quality

Recommended tools for expanding the project:

Vitest + Testing Library (unit tests)

Playwright / Cypress for end-to-end testing

ESLint + Prettier for consistent code formatting

Husky for pre-commit hooks

🎯 Planned Enhancements / Roadmap

Admin dashboard

Real-time order tracking

Payment integration

Email notifications

User profiles & order history

Multi-language support

Dark mode

🤝 Contributing

Contributions are welcome!
To contribute:

Fork the repository

Create a feature branch

Commit your work

Open a pull request

📜 License

Released under the MIT License.
Feel free to use, modify, and distribute this project.
