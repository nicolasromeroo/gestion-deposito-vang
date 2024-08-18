import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { getFirestore } from "firebase/firestore";
import { app } from "./firebaseConfig"; // Importa la instancia de Firebase desde firebaseConfig
import RRHHMensajes from "./components/RRHHMensajes";
import DepositoTareas from "./components/DepositoTareas";
import Devoluciones from "./components/Devoluciones";
// 
import Home from "./components/Home";
import TareasACompletar from "./components/TareasACompletar";

// Inicializa Firestore con la app de Firebase
const db = getFirestore(app);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tareasacompletar" element={<TareasACompletar />} />
        <Route path="/rrhh/mensajes" element={<RRHHMensajes />} />
        <Route path="/deposito/tareas" element={<DepositoTareas db={db} />} />
        <Route path="/devoluciones" element={<Devoluciones db={db} />} />
      </Routes>
    </Router>
  );
}

export default App;
