import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig'; // Asegúrate de que la ruta es correcta
import { Link } from 'react-router-dom';

function Devoluciones() {
  const [devoluciones, setDevoluciones] = useState([]);

  useEffect(() => {
    const fetchDevoluciones = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'devoluciones')); // Cambia a 'devoluciones'
        const devolucionesList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setDevoluciones(devolucionesList);
      } catch (e) {
        console.error('Error al recuperar devoluciones: ', e);
      }
    };

    fetchDevoluciones();
  }, []);

  return (
    <div className="container">
      <h2>Devoluciones</h2>
      <ul className="list-group">
        {devoluciones.length === 0 ? (
          <li className="list-group-item">No hay devoluciones disponibles.</li>
        ) : (
          devoluciones.map(devolucion => (
            <li key={devolucion.id} className="list-group-item">
              <h5>Fecha: {new Date(devolucion.date).toLocaleDateString()}</h5>
              <p><strong>Comentarios:</strong> {devolucion.feedback}</p>
              <h6>Tareas:</h6>
              <ul>
                {Array.isArray(devolucion.tasks) && devolucion.tasks.map((task, index) => (
                  <li key={index}>
                    {task.name} - {task.priority} - {task.completed ? 'Completada' : 'No completada'}
                  </li>
                ))}
              </ul>
            </li>
          ))
        )}
      </ul>
      <Link to={"/"} className='btn btn-primary'>Regresar</Link>
    </div>
  );
}

export default Devoluciones;
