
// import React, { useEffect, useState } from 'react';
// import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
// import { db } from '../firebaseConfig'; // Importa `db` desde tu archivo de configuración
// import { Link } from 'react-router-dom';

// function TareasACompletar() {
//   const [tasks, setTasks] = useState([]);
//   const [feedback, setFeedback] = useState('');
//   const [taskToComplete, setTaskToComplete] = useState(null);

//   useEffect(() => {
//     const fetchTasks = async () => {
//       try {
//         const querySnapshot = await getDocs(collection(db, 'tareasTurnoTarde'));
//         const tasksList = querySnapshot.docs.map(doc => ({
//           id: doc.id,
//           ...doc.data()
//         }));
//         if (tasksList.length > 0) {
//           const latestTaskSet = tasksList[tasksList.length - 1]; // Obtén la última entrada
//           setTasks(latestTaskSet.tasks);
//           setFeedback(latestTaskSet.feedback);
//         }
//       } catch (e) {
//         console.error('Error al recuperar tareas: ', e);
//       }
//     };

//     fetchTasks();
//   }, []);

//   // Función para marcar una tarea como completada
//   const markTaskAsCompleted = async (id) => {
//     const updatedTasks = tasks.map(task =>
//       task.id === id ? { ...task, completed: true } : task
//     );
//     setTasks(updatedTasks);

//     // Guarda el estado actualizado en Firestore
//     const docRef = doc(db, 'tareasTurnoTarde', 'latestTaskId'); // Usa el ID correcto del documento
//     await updateDoc(docRef, { tasks: updatedTasks });
//   };

//   return (
//     <div className="container">
//       <h2>Tareas a Completar del Turno Tarde</h2>
//       <ul className="list-group">
//         {tasks.length === 0 ? (
//           <li className="list-group-item">No hay tareas disponibles para completar.</li>
//         ) : (
//           tasks.map(task => (
//             <li key={task.id} className="list-group-item d-flex justify-content-between align-items-center">
//               <span>{task.name} - {task.priority}</span>
//               <button
//                 className="btn btn-success btn-sm"
//                 onClick={() => markTaskAsCompleted(task.id)}
//                 disabled={task.completed}
//               >
//                 {task.completed ? 'Completada' : 'Completar'}
//               </button>
//             </li>
//           ))
//         )}
//       </ul>
//       <div className="mt-4">
//         <h4>Devolución del Turno Tarde</h4>
//         <textarea
//           className="form-control"
//           rows="5"
//           value={feedback}
//           onChange={(e) => setFeedback(e.target.value)}
//           placeholder="Describe las tareas y cualquier devolución..."
//         ></textarea>
//       </div>
//       <Link to={"/"} className='btn btn-primary'>Regresar</Link>

//     </div>
//   );
// }

// export default TareasACompletar;

import React, { useEffect, useState } from 'react';
import { collection, getDocs, updateDoc, doc, addDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig'; // Asegúrate de que la ruta es correcta
import { Link } from 'react-router-dom';

function TareasACompletar() {
  const [tasks, setTasks] = useState([]);
  const [feedback, setFeedback] = useState('');
  const docId = 'latestDocId'; // Cambia al ID correcto

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'tareasTurnoTarde'));
        const tasksList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        if (tasksList.length > 0) {
          tasksList.sort((a, b) => new Date(b.date) - new Date(a.date));
          const latestTaskSet = tasksList[0];
          setTasks(latestTaskSet.tasks);
          setFeedback(latestTaskSet.feedback);
        }
      } catch (e) {
        console.error('Error al recuperar tareas: ', e);
      }
    };

    fetchTasks();
  }, []);

  const markTaskAsCompleted = async (id) => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, completed: true } : task
    );
    setTasks(updatedTasks);

    const docRef = doc(db, 'tareasTurnoTarde', docId); // Usa el ID correcto del documento
    await updateDoc(docRef, { tasks: updatedTasks });
  };

  // Función para guardar la devolución en Firestore
  const saveFeedback = async () => {
    try {
      await addDoc(collection(db, 'devoluciones'), {
        tasks,
        feedback,
        date: new Date().toISOString(),
      });
      alert('Devolución guardada con éxito');
      setTasks([]); // Limpiar las tareas
      setFeedback(''); // Limpiar el área de texto
    } catch (e) {
      console.error('Error al guardar la devolución: ', e);
    }
  };

  return (
    <div className="container">
      <h2>Tareas a Completar del Turno Tarde</h2>
      <ul className="list-group">
        {tasks.length === 0 ? (
          <li className="list-group-item">No hay tareas disponibles para completar.</li>
        ) : (
          tasks.map(task => (
            <li key={task.id} className="list-group-item d-flex justify-content-between align-items-center">
              <span>{task.name} - {task.priority}</span>
              <button
                className="btn btn-success btn-sm"
                onClick={() => markTaskAsCompleted(task.id)}
                disabled={task.completed}
              >
                {task.completed ? 'Completada' : 'Completar'}
              </button>
            </li>
          ))
        )}
      </ul>
      <div className="mt-4">
        <h4>Devolución del Turno Tarde</h4>
        <textarea
          className="form-control"
          rows="5"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Describe las tareas y cualquier devolución..."
        ></textarea>
        <button className="btn btn-secondary mt-3" onClick={saveFeedback}>Enviar Devolución</button>
      </div>
      <Link to={"/"} className='btn btn-primary'>Regresar</Link>
    </div>
  );
}

export default TareasACompletar;
