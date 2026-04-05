# Finance Dashboard

A responsive personal finance dashboard built with React, Recharts, and Lucide icons. The app presents a six-month financial snapshot with summary metrics, trend charts, transaction filtering, role-based actions, and quick insights generated from mock transaction data.

## Overview

This project was designed as a frontend dashboard experience for exploring income, expenses, savings, and category-level spending patterns in a clean single-page interface.

The dashboard includes:

- A financial overview with balance, income, expenses, and savings-rate summary cards
- Interactive charts for running balance, monthly income vs expenses, and category-level spending
- A transaction table with search, category/type filters, and sortable columns
- An insights section that highlights top spending behavior and month-over-month comparisons
- A role toggle that enables admin-only actions such as adding a transaction
- Light and dark theme support
- CSV export for the currently filtered transaction set
- Responsive layouts for mobile, tablet, and desktop screens

## Approach

The app uses a single React dashboard component backed by mock transaction data. Derived values such as totals, category summaries, filtered transactions, and chart datasets are computed with `useMemo` so the UI stays straightforward while avoiding unnecessary recalculations during filtering and sorting.

For the interface, the focus was on making key finance information easy to scan:

- Summary cards surface the most important top-level metrics first
- Charts provide fast visual comparison across months and spending categories
- The transactions section supports day-to-day exploration with search and filters
- The insights section translates raw numbers into more readable takeaways

## Tech Stack

- React
- Create React App
- Recharts
- Lucide React
- React Testing Library

## Project Structure

```text
finance-dashboard/
|-- public/
|-- src/
|   |-- App.js
|   |-- App.css
|   |-- App.test.js
|   |-- FinanceDashboard.jsx
|   |-- index.css
|   `-- index.js
|-- package.json
`-- README.md
```

## Setup Instructions

### Prerequisites

- Node.js 18 or later
- npm

### Install dependencies

```bash
npm install
```

### Run locally

```bash
npm start
```

By default, Create React App runs on `http://localhost:3000`.

If port `3000` is already in use, run:

```powershell
$env:PORT=3001
npm start
```

Then open `http://localhost:3001`.

## Available Scripts

### `npm start`

Starts the development server with hot reload.

### `npm run build`

Builds an optimized production bundle in the `build/` folder.

### `npm test -- --watch=false --runInBand`

Runs the test suite once in single-process mode. The `--runInBand` flag is helpful on some Windows setups where Jest worker processes can hit `EPERM` spawn errors.

## Features Explained

### 1. Financial Overview

Displays the most important financial KPIs:

- Total balance
- Total income
- Total expenses
- Savings rate

### 2. Visual Analytics

Uses charts to make trends easier to understand:

- Area chart for running balance trend
- Bar chart for monthly income vs expenses
- Pie chart for category-wise expense distribution

### 3. Transaction Management

The transactions section supports:

- Search by description or category
- Filter by transaction type
- Filter by category
- Sort by date or amount
- Export filtered records as CSV

### 4. Role-Based Interaction

The role switcher simulates two user modes:

- `viewer`: can explore dashboard data
- `admin`: can add new transactions through the modal form

### 5. Insights Panel

Summarizes patterns from the underlying data, including:

- Highest spending category
- Monthly comparison against the previous month
- Observations about savings, housing costs, lifestyle spending, and freelance income

## Testing

The project includes a basic React Testing Library test to confirm the main dashboard heading renders correctly.

Run:

```bash
npm test -- --watch=false --runInBand
```

## Future Improvements

- Persist transactions with local storage or a backend API
- Add authentication and real user roles
- Support custom date ranges instead of fixed mock months
- Add editable and deletable transactions
- Connect to real financial datasets or bank integrations
- Improve mobile layout behavior for dense tables and charts

## Repository

GitHub repository: `https://github.com/Srija-22-web-cs/FinanceDashboard.git`
