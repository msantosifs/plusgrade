import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {MainLayout} from "./layout/MainLayout.tsx";
import {Reservations} from "./Pages/Reservations.tsx";

function App() {

  return <>
      <Router>
          <Routes>
              <Route path="/" element={<MainLayout/>}>
                  <Route path="/" element={<Reservations/>}/>
              </Route>
          </Routes>
      </Router>
      </>

}

export default App
