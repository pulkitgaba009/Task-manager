import { Routes,Route } from "react-router-dom"
import Home from "./pages/Home"
import CreatePage from "./pages/CreatePage"
import NoteDetail from "./pages/NoteDetail"

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/create" element={<CreatePage/>}/>
        <Route path="/note/:id" element={<NoteDetail/>}/>
      </Routes>
    </>
  )
}

export default App