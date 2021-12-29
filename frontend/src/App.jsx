import { Routes, Route } from "react-router-dom"

import { Login } from "./components"
import { Home } from "./containers"

const App = () => {
  return (
    <Routes>
      <Route path='login' element={<Login />} />
      <Route path='/*' element={<Home />} />
    </Routes>
  )
}

export default App
