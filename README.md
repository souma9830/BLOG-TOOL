# 🔶 BOULEVARD - Blog Platform


> A modern, high-performance blog platform featuring a unique **Neo-Brutalist design system**, real-time content analytics, and full-stack capabilities with JSON Server.

[![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

---

## 🚀 Live Demo
**[🔗 View Live Application](PUT_YOUR_RENDER_LINK_HERE)**

---

## ✨ Key Features

This isn't just another blog template. It's fully engineered with advanced features:

### 🎨 **Unique Design System**
- **Neo-Brutalist Aesthetic**: Custom-built UI with bold borders, offset shadows, and high-contrast typography.
- **Dark Mode 🌙**: Fully responsive dark theme with smooth 200ms color transitions and localStorage persistence.
- **Responsive Layout**: Mobile-first architecture using CSS Grid and Flexbox.

### ✍️ **Advanced Content Editor**
- **Live Split-Screen Preview 👁️**: Real-time rendering of markdown content alongside the editor.
- **Auto-Save Drafts 💾**: Never lose work! Drafts are automatically saved to local storage every 2 seconds.
- **SEO Score Calculator 🎯**: Live analysis of title and description length with actionable recommendations.
- **Real-time Analytics 📊**:
  - Live Word & Character Count
  - Dynamic Reading Time Estimate
  - Paragraph Counter

### ❤️ **Interactive Engagement**
- **Like System**: Optimistic UI updates with heart animations (one like per user restriction).
- **Bookmarks**: Save articles to a dedicated "Saved" collection (persisted to database).
- **Social Sharing**: Native mobile sheet integration + Clipboard fallback for desktop.

---

## 🛠️ Tech Stack & Architecture

### **Frontend**
- **Framework**: React 19 + Vite
- **Language**: TypeScript (Strict Mode)
- **Styling**: Tailwind CSS + Custom CSS Variables (Theming)
- **State Management**: TanStack Query (React Query) v5 + Context API
- **Routing**: React Router DOM v6
- **UI Components**: Shadcn UI (Radix Primitives) + Lucide Icons

### **Backend (Mock)**
- **JSON Server**: Full REST API capabilities
- **Database**: `db.json` (Structured data for Blogs and Bookmarks)

---

## 📂 Project Structure

```bash
src/
├── components/         # Reusable UI components
│   ├── ui/             # Shadcn primitives (Card, Button, Badge...)
│   ├── Layout.tsx      # Main application shell
│   └── ...
├── pages/              # Route views
│   ├── Home.tsx        # Blog feed with search & filters
│   ├── CreateBlog.tsx  # Advanced editor with analytics
│   ├── BlogDetail.tsx  # Dynamic blog rendering
│   └── Bookmarks.tsx   # Saved functionality
├── lib/                # Utilities
│   ├── api.ts          # Centralized API layer (Axios)
│   ├── theme.tsx       # Dark mode context logic
│   └── interactions.ts # Like/Bookmark logic
└── ...
```

---

## ⚡ Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/souma9830/BLOG-TOOL.git
   cd BLOG-TOOL
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the Development Server**
   ```bash
   npm run dev
   ```
   > Runs frontend at `http://localhost:5173`

4. **Start the Backend Server**
   ```bash
   npm run server
   ```
   > Runs JSON API at `http://localhost:3001`

---

## 🛣️ API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/blogs` | Fetch all blog posts |
| `GET` | `/blogs/:id` | Fetch single blog details |
| `POST` | `/blogs` | Create a new blog post |
| `GET` | `/bookmarks` | Fetch user bookmarks |
| `POST` | `/bookmarks` | Add a new bookmark |
| `DELETE` | `/bookmarks/:id` | Remove a bookmark |

---

## 👨‍💻 Author

**Soumadeep**  
- [LinkedIn](https://www.linkedin.com/in/soumadeep-s/)
- [GitHub](https://github.com/souma9830)

---

_Built with ❤️ for the frontend interview_
