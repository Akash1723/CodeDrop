import Home from './components/home'
import Layout from './components/Layout'
import Register from './components/register'
import Login from './components/login'
import Dashboard from './components/Dashboard'
import UploadFile from './components/UploadFile'
import ReceiveFile from './components/ReceiveFile'
import {createBrowserRouter,RouterProvider} from 'react-router-dom'

function App() {
  const routes=createBrowserRouter([{
    path:"/",
    element:<Layout/>,
    children:[
      {path:"/login",element:<Login/>},
      {path:"/register",element:<Register/>},
      {path:"/",element:<Home/>},
      {path:"/dashboard",element:<Dashboard />},
      {path:"/upload",element:<UploadFile/>},
      {path:"/receive",element:<ReceiveFile/>}
    ]
  }]);
  return (
    <>
      <RouterProvider router={routes}/>
    </>
  )
}

export default App
