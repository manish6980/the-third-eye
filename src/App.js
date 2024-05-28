import './App.css';
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import RootLayout from './RootLayout';
import Home from './components/Home/home'
import Login from './components/LogIn/login'
import Register from './components/Register/register'
import AboutUs from './components/AboutUs/aboutUs'
import Userprofile from './components/User-profile/UserProfile'
import Products from './components/Products/Products'
import AdminLogin from './components/AdminLogin/AdminLogin'
import AdminProfile from './components/AdminProfile/AdminProfile'
import Cart from './components/Cart/Cart'

function App() {
  const router=createBrowserRouter([
    {
      path:"/",
      element:<RootLayout/>,
      children:[
        {
          path:"/",
          element:<Home/>,
        },
        {
          path:"/login",
          element:<Login/>,
        },
        {
          path:"/register",
          element:<Register/>,
        },
        
        {
          path:"/user-profile",
          element:<Userprofile/>,
          children:[
            {
              path:"products",
              element:<Products/>,
            }
          ]
        },
        {
          path:"/adminlogin",
          element:<AdminLogin/>,
        },
        {
          path:"/admin-profile",
          element:<AdminProfile/>,
          children:[
            {
              path:"cart",
              element:<Cart/>,
            }
          ]
        },
      ]
    }
  ])
  return (
    <div className='App' >
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
