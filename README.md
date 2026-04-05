````md id="pro1"
# 💼 Zorvyn – Finance Dashboard UI

A modern, responsive, and interactive finance dashboard designed to help users track financial activities, analyze spending patterns, and gain actionable insights.

---

## 📌 Overview

Zorvyn is a frontend-focused finance dashboard built to demonstrate:

- Clean and intuitive UI/UX design
- Structured component architecture
- Effective state management
- Data visualization techniques
- Role-based UI behavior simulation

The application is not dependent on any backend and uses mock or static data to simulate real-world financial tracking.

---

## 🧠 Approach

This project was developed with a strong emphasis on:

- **Modular and scalable architecture** using React components  
- **Context-based state management** for efficient data flow  
- **Reusable UI components** for maintainability  
- **Clean and minimal design principles** for better user experience  
- **Glassmorphism-inspired UI design** for modern aesthetics  
- **Data visualization** using responsive charts  

All data handling is performed on the frontend, ensuring simplicity and focus on UI logic.

---

## ✨ Features

### 📊 Dashboard Overview
- Summary cards:
  - Total Balance  
  - Income  
  - Expenses  
- Time-based visualization (Cash flow trend chart)  
- Categorical visualization (Spending breakdown chart)  

### 💳 Transactions Management
- Transaction list with:
  - Date  
  - Amount  
  - Category  
  - Type (Income / Expense)  
- Search functionality  
- Filtering by transaction type  
- Clean and structured data presentation  

### 👤 Role-Based UI (Simulation)
- **Viewer Role**: Read-only access  
- **Admin Role**: Add and delete transactions  
- Role switching via UI toggle/dropdown  

### 💡 Insights Section
- Highlights:
  - Highest spending category  
  - Monthly comparisons  
- Provides quick financial insights from available data  

### 🌗 Theme Support
- Light and Dark mode  
- Smooth UI transitions  
- Theme persistence using `localStorage`  

### 💾 Data Persistence
- User preferences (theme, transactions) stored locally  
- Ensures data remains after page reload  

---

## 🛠️ Tech Stack

- **Frontend Framework**: React (Vite)  
- **Language**: TypeScript  
- **Styling**: Vanilla CSS (Variables, Flexbox, Grid)  
- **Charts**: Recharts  
- **Icons**: Lucide React  
- **State Management**: React Context API + Local State  

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash id="pro2"
git clone https://github.com/your-username/zorvyn-finance-dashboard.git
````

### 2️⃣ Navigate to Project Directory

```bash id="pro3"
cd zorvyn-finance-dashboard
```

### 3️⃣ Install Dependencies

```bash id="pro4"
npm install
```

### 4️⃣ Run the Development Server

```bash id="pro5"
npm run dev
```

### 5️⃣ Open in Browser

```
http://localhost:5173/
```

---

## 📁 Project Structure

```id="pro6"
src/
├── components/       # Reusable UI components
├── pages/            # Application pages/views
├── context/          # Global state management
├── data/             # Mock data
├── styles/           # CSS and theming
├── App.tsx           # Root component
└── main.tsx          # Entry point
```

---

## 🎯 Key Highlights

* Clean and maintainable code structure
* Fully responsive design
* Role-based UI behavior simulation
* Real-time data interaction (frontend state)
* Strong focus on UI/UX principles
* Effective use of charts for data insights

---

## 👨‍💻 Author

**A.U.M. Ahsan**
BICT (Hons) Undergraduate
Frontend Developer | MERN Stack Enthusiast

---

## 📜 License

This project is developed for academic and evaluation purposes.

