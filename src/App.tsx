import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { Bundles } from './pages/Bundles'
import { Calendar } from './pages/Calendar'
import { Crafting } from './pages/Crafting'
import { Equipment } from './pages/Equipment'
import { Farming } from './pages/Farming'
import { Fishing } from './pages/Fishing'
import { Items } from './pages/Items'
import { Today } from './pages/Today'
import { Villagers } from './pages/Villagers'
import { GameDateProvider } from './state/useGameDate'

export default function App() {
  return (
    <GameDateProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Today />} />
            <Route path="calendrier" element={<Calendar />} />
            <Route path="agriculture" element={<Farming />} />
            <Route path="peche" element={<Fishing />} />
            <Route path="craft" element={<Crafting />} />
            <Route path="objets" element={<Items />} />
            <Route path="equipement" element={<Equipment />} />
            <Route path="villageois" element={<Villagers />} />
            <Route path="paquets" element={<Bundles />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </GameDateProvider>
  )
}
