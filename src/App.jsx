import Applayout from './components/applayout'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Dashboard from "./components/Dashboard"
import CreateTransaction from './components/transaction/CreateTransaction'
import TransactionTable from './components/transaction/transactionTable'
import EditTransaction from './components/transaction/EditTransaction'
import BudgetTable from "./components/budget/budgetTable"
import Login from './components/Login'
import SignUp from './components/SignUp'
import Notfound from './components/Notfound'
import ProtectedRoute from './components/ProtectedRote'
import CreateBudget from './components/budget/CreateBudget'
import EditBudget from './components/budget/EditBudget'

const router = createBrowserRouter([
  {
    path: '/',
    element: <ProtectedRoute><Applayout /></ProtectedRoute>,
    children: [
      {
        index: '/',
        element: <Dashboard />
      },
      {
        path: '/transction',
        element: <TransactionTable />
      },
      {
        path: '/budget',
        element: <BudgetTable />
      },
      {
        path: '/transction/new',
        element: <CreateTransaction />
      },
      {
        path: '/transction/edit/:id',
        element: <EditTransaction />
      },
      {
        path: '/budget/new',
        element: <CreateBudget />
      },
      {
        path: '/budget/edit/:id',
        element: <EditBudget />
      },
    ]
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <SignUp />
  },
  {
    path: '*',
    element: <Notfound />
  }
])

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App
