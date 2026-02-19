# 📦 React CRUD

A CRUD (Create, Read, Update, Delete) web app built with React, Vite, TypeScript and Tailwind CSS.  
The app provides an interface for managing **users** through listing, creating, editing, deleting with confirmation, and searching, with form validation (Zod + Formik) and toast notifications.

---

## 🚀 Tech Stack

- React 19
- TypeScript
- Vite 7
- Tailwind CSS 4
- React Router 7
- Formik
- Zod
- TanStack React Query
- Axios
- React Toastify
- Lucide React

---

## ✨ Functionalities

- ✅ User list with pagination
- ➕ Create user
- ✏️ Edit user
- 👤 User details view
- 🗑️ Delete user with modal confirmation
- 🔎 Search users
- 📝 Form validation
- 🔔 Toast (success/error)

---

## 📦 Installation

```bash
git clone larimoreira21/react-crud
cd react-crud
npm install
```

---

## 💻 Development

Start the development server:

```bash
npm run dev
```

The app will be available at:

```
http://localhost:8080
```

---

## 🏗️ Production Build

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

The web app uses the https://mockapi.io/, which requires the VITE_MOCK_API_URL and also the https://console.cloudinary.com/ that requires the VITE_CLOUDINARY_URL.

Update those two values in your .env to run the application locally.

---

## 🧹 Lint e formatting

Verify lint:

```bash
npm run lint
```

Format code with prettier:

```bash
npm run format
```

---

## 📁 Project Structure

```
src
├── components/                # Reusable UI (UI(design system),UserForm, Button, Input, etc.)
├── pages/                     # ListUsers, UserDetails, CreateUser, EditUser
├── hooks/                     # useUser (list, create, update, delete, upload)
├── schemas/                   # Zod user schema & validateUserForm for Formik
├── services/                  # API client (Axios) & user API
├── helpers/                   # formik, queryKeys, theme
├── types/                     # TypeScript types
├── App.tsx                    # Root layout & routing
└── main.tsx                   # Entry point
```

---

## 🎨 Styling

The UI is built with **Tailwind CSS v4** using utility-first classes.
The layout focuses on clarity, spacing, and accessibility for CRUD operations.

---

## 📝 Forms & validation

Create and edit flows use **Formik** for form state and **Zod** for validation.

---

## 🔔 Notifications

Uses **React Toastify** to provide success and error notifications when calling the endpoints.

---

## 🧭 Routing

Client-side routing is handled by **React Router v7**, enabling navigation between list, create, and edit views.

---

## 🗒️ Available Scripts

| Script            | Description                        |
| ----------------- | ---------------------------------- |
| `npm run dev`     | Start development server           |
| `npm run build`   | TypeScript + Vite production build |
| `npm run preview` | Preview production build           |
| `npm run lint`    | Run ESLint                         |
| `npm run format`  | Format code with Prettier          |

---

## ⚙️ Requirements

- Node.js 20.x+
- npm 9+
