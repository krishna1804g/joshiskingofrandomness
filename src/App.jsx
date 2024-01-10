import { Route, Routes } from 'react-router-dom'
import SignIn from './pages/SignIn'
import AddCompany from './pages/AddCompany'
import Dashboard from './pages/Dashboard'
import AfterLoginLayout from './component/layout/AfterLoginLayout'
import Logs from './pages/Logs'
import ActiveDirectory from './pages/ActiveDirectory'
import Profile from './pages/Profile'
import NoPage from './pages/NoPage'
import SignUp from './pages/SignUp'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getUtilsData } from './redux/apiCalls/Utils/apicalls'

function App() {
  const utils = useSelector((state) => state.utils)
  const dispatch = useDispatch()

  useEffect(() => {
    getUtilsData(dispatch, 'signup')
  }, [])

  //console.log(utils?.utils?.toggle)

  return (
    <>
      <Routes>
        <Route path='/Auth' index element={<SignIn />} />
        {utils?.utils?.toggle && <Route path='/signup'  element={<SignUp />} />}
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
