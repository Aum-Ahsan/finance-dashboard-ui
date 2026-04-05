# Zorvyn - Finance Dashboard UI

A clean, responsive, and interactive finance dashboard to track financial activities and insights.

## Overview of Approach

To build this modern finance dashboard, I focused on a glassmorphic aesthetic to create depth and emphasis while maintaining high readability. I adopted the `React + Vite` stack along with raw CSS to ensure maximum design control without the overhead of heavy styling frameworks unless explicitly requested. I used `recharts` to render beautiful and responsive interactive charts for data visualization. State is managed locally combined with the Context API, providing a seamless data flow throughout the application structure while avoiding heavy state management libraries, in favor of a lean setup. Custom styling includes full dark/light mode integration using CSS variables and persistence using `localStorage`.

## Features

- **Dashboard Overview**: Get a bird's eye view of total balances, incomes, and expenses. Includes Cash Flow Line Charts and Category Expense Pie Charts.
- **Transactions Management**: Includes searching by description and filtering by transaction type (Income vs Expense). 
- **Role-Based Access Control Simulation**: Switch between "Viewer" (Read-only data viewing) and "Admin" (Add new transactions or delete existing ones).
- **Intelligent Insights**: Automatically highlights your topmost spending category on the main overview.
- **Dark & Light Mode**: Switch between themes seamlessly with CSS variables.
- **Local Storage Persistence**: Your data states (like custom transactions and theme preference) are safely persisted in the browser.

## Setup Instructions

Ensure you have Node.js installed, then run the following commands in the terminal:

1. Install dependencies:
```bash
npm install
```

2. Start the local development server:
```bash
npm run dev
```

3. Open your browser and navigate to the local server address provided (usually `http://localhost:5173/`).

## Stack

- **Framework**: React 18+ (Vite Template)
- **Styling**: Vanilla CSS (Variables, Grid, Flexbox, Glassmorphism utilities)
- **Icons**: Lucide React
- **Charting**: Recharts
- **Language**: TypeScript
