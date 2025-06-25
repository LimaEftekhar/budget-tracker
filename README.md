Simple Budgeting App

A clean and easy-to-use React app to help you track your budgets and expenses.

How to Install and Run

1- Clone the repository  
   If you haven't already, download the code or clone the repo:

   bash
   git clone https://github.com/LimaEftekhar/budget-tracker
   cd budget-tracker

2- Install the dependencies
    Make sure Node.js is installed on your system. Then run:
   npm install

3-Start the app locally
    Launch the development server:
    npm run dev
4-Open the app in your browser
    Go to: http://localhost:5173
    
What You Can Do
    Add and manage different budgets (like Groceries, Rent, etc.)
    Add  budget
    Add expenses to any budget
    delete expenses and budgett
    edit expenses 
    View uncategorized expenses
    See the total of all your expenses

Project Structure
    main.jsx – Entry point, loads the app with routing and context

    App.jsx – Sets up routes (Home, About, Not Found) and page titles

    pages/Home.jsx – Main dashboard with budget cards and modals

    components/ – UI parts like BudgetCard, AddExpenseModal, ViewExpensesModal, etc.

    contexts/BudgetsContext.jsx – Handles app-wide state for budgets and expenses

How It Works
    Budget and expense data is managed globally using BudgetsContext

    The Home page (/) displays all budget cards and totals

    You can add expenses from each budget card

    Uncategorized expenses are handled separately

    Routes:

    / → Home

    /about → About

    Any unknown route → Not Found page