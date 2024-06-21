import React from 'react'
import { BrowserRouter , Routes , Route } from 'react-router-dom'
import LoginPage from "./Pages/LoginPage"
import SalesLeadPage from './Pages/SalesLeadPage'
import EditLead from "./Pages/EditLead"
import AddLeadForm from './Components/AddLeadForm/AddLeadForm'
import RegisterPage from './Pages/RegisterPage'

const App = () => {
  return (
    <BrowserRouter>
           <Routes>
           <Route element={<LoginPage></LoginPage>} path="/"></Route>
            <Route element={<SalesLeadPage></SalesLeadPage>} path="/sales-lead"></Route>
            <Route element={<AddLeadForm></AddLeadForm>} path ="/add-lead-form"></Route>
            <Route element={<EditLead></EditLead>} path="/edit/:id"></Route>
            <Route element={<RegisterPage></RegisterPage>} path="/register"></Route>
           </Routes>
        </BrowserRouter>
  )
}
export default App
