import { Route, Routes } from 'react-router-dom'
import SignIn from './pages/SignIn'
import AddCompany from './pages/AddCompany'
import Dashboard from './pages/Dashboard'
import AfterLoginLayout from './component/layout/AfterLoginLayout'
import Logs from './pages/Logs'
import ActiveDirectory from './pages/ActiveDirectory'
import Profile from './pages/Profile'
import NoPage from './pages/NoPage'

function App() {

  return (
    <>
      <Routes>
        <Route path='/Auth' index element={<SignIn />} />
        <Route path='/*' index element={<NoPage />} />
        <Route path='/add-company' index element={<AddCompany />} />
        <Route path='/' element={<AfterLoginLayout />}>
          <Route path='/dashboard' index element={<Dashboard />} />
          <Route path='/logs' index element={<Logs />} />
          <Route path='/domains' index element={<ActiveDirectory />} />
          <Route path='/profile' index element={<Profile />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
