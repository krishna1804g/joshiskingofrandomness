import { Route, Routes } from 'react-router-dom'
import SignIn from './pages/SignIn'
import AddCompany from './pages/AddCompany'
import Dashboard from './pages/Dashboard'
import AfterLoginLayout from './component/layout/AfterLoginLayout'

function App() {

  return (
    <>
      <Routes>
        <Route path='/Auth' index element={<SignIn />} />
        <Route path='/add-company' index element={<AddCompany />} />
        <Route path='/' element={<AfterLoginLayout />}>
          <Route path='/dashboard' index element={<Dashboard />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
