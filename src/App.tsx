import './App.css'
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import QuestsPage from './pages/QuestsPage';
import { SpeedInsights } from "@vercel/speed-insights/react"

function App() {

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/quests" element={<QuestsPage />} />
      <SpeedInsights />
    </Routes>
  )
}

export default App