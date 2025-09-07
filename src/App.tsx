import './App.css'
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import QuestsPage from './pages/QuestsPage';
import { SpeedInsights } from "@vercel/speed-insights/next"

function App() {

  return (
    <Routes>
      <SpeedInsights/>
      <Route path="/" element={<HomePage />} />
      <Route path="/quests" element={<QuestsPage />} />
    </Routes>
  )
}

export default App