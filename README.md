# Serenade & Ink

A modern, full-stack blog platform for those who write as if serenading the stars, with every line a song of devotion. Built with React (Vite, Tailwind), Node.js, Express, and MongoDB.

---

## ✨ Features
- Google OAuth authentication
- Create, edit, and delete blogs
- Live markdown preview
- Responsive, dark, glassy UI
- User dashboard, profile, and analytics
- Modern, animated design

---

## 🚀 Prerequisites
- Node.js (v18+ recommended)
- npm or yarn
- MongoDB (local or Atlas)

---

## 🛠️ Project Structure
```
blog/
  backend/      # Express + MongoDB API
  frontend/     # React + Vite + Tailwind UI
  ...           # (this README)
```

---

## ⚡ Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/iadii/Serenade-Ink.git
cd Serenade-Ink
```

### 2. Backend Setup
```bash
cd backend
npm install
```

- Create a `.env` file in `backend/`:
  ```env
  MONGO_URI=your_mongodb_connection_string
  JWT_SECRET=your_jwt_secret
  GOOGLE_CLIENT_ID=your_google_client_id
  GOOGLE_CLIENT_SECRET=your_google_client_secret
  CLIENT_URL=http://localhost:5173
  ```
- Start the backend:
  ```bash
  npm run dev
  # or
  node index.js
  ```
- The backend runs on `http://localhost:5000` by default.

### 3. Frontend Setup
```bash
cd ../frontend
npm install
```
- Create a `.env` file in `frontend/` (if needed):
  ```env
  VITE_API_URL=http://localhost:5000
  ```
- Start the frontend:
  ```bash
  npm run dev
  ```
- The frontend runs on `http://localhost:5173` by default.

---

## 🗂️ Folder Structure
```
blog/
  backend/      # Express API, models, routes, controllers
  frontend/     # React app, components, pages, context
```

---

## 🤝 Contributing
1. Fork the repo & create a branch
2. Make your changes (with clear commits)
3. Open a Pull Request
4. Describe your changes and reference issues if any

---

## 📄 License
[MIT](LICENSE) (or your preferred license) 
