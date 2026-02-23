import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Layout from './components/layout/layout';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
    <Layout/></>
  );
}

export default App
