import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Layout from './components/layout/layout';
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import WaterStress from './components/WaterStress/WaterStress';
import TankerAllocation from './components/TankerAllocation/TankerAllocation';
import Prediction from './components/Prediction/Prediction';
import Home from './components/Home/Home';
import Dashboard from './components/Dashboard/Dashboard';
function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = createBrowserRouter([{
    path:"/",
    element:<>
    <Home/>
    </>
  },{
    path:"/dashboard",
    element:<><Layout/></>,
    
    children:[{
      path:"",
      element:<><Dashboard/></>
    },
      {
        path:"risk-analysis",
        element:<><WaterStress/></>
      },
      {
        path:"tanker-allocation",
        element:<><TankerAllocation/></>
      },
    {
      path:"prediction",
      element:<><Prediction/></>
    }
    ]
  }])
  return (
    <>
    <RouterProvider router={router}/></>
  );
}

export default App
