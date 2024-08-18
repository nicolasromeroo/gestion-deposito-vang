import React, { useState } from 'react';
import { collection, doc, setDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig'; // Importa `db` desde tu archivo de configuración
import { Link } from 'react-router-dom';

const PRIORIDADES = ['Alta', 'Media', 'Baja'];

const initialTasks = [
  { id: 1, name: 'Revisar inventario', priority: 'Alta', completed: false },
  { id: 2, name: 'Organizar estanterías', priority: 'Media', completed: false },
];

function DepositoTareas() {
  const [tasks, setTasks] = useState(initialTasks);
  const [newTaskName, setNewTaskName] = useState('');
  const [newTaskPriority, setNewTaskPriority] = useState('Media');
  const [feedback, setFeedback] = useState('');

  const addTask = () => {
    const newTask = {
      id: tasks.length + 1,
      name: newTaskName,
      priority: newTaskPriority,
      completed: false,
    };
    setTasks([...tasks, newTask]);
    setNewTaskName('');
  };

  const removeTask = (id) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
  };

  const saveTasksForNextShift = async () => {
    try {
      // Define a unique ID for the document, e.g., based on timestamp
      const docId = new Date().toISOString(); // Usar timestamp como ID

      await setDoc(doc(db, 'tareasTurnoTarde', docId), {
        tasks,
        feedback,
        date: new Date().toISOString(),
      });
      alert('Tareas para el turno tarde guardadas con éxito');
      setTasks([]);
      setFeedback('');
    } catch (e) {
      console.error('Error al guardar las tareas para el turno tarde: ', e);
    }
  };

  const sortedTasks = [...tasks].sort((a, b) => {
    return PRIORIDADES.indexOf(a.priority) - PRIORIDADES.indexOf(b.priority);
  });

  return (
    <div className="container">
      <h2>Gestión de Tareas del Depósito</h2>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          value={newTaskName}
          onChange={(e) => setNewTaskName(e.target.value)}
          placeholder="Nueva tarea"
        />
        <select
          className="form-select"
          value={newTaskPriority}
          onChange={(e) => setNewTaskPriority(e.target.value)}
        >
          {PRIORIDADES.map(priority => (
            <option key={priority} value={priority}>
              {priority}
            </option>
          ))}
        </select>
        <button className="btn btn-primary" onClick={addTask}>Añadir Tarea</button>
      </div>
      <ul className="list-group">
        {sortedTasks.map(task => (
          <li
            key={task.id}
            className={`list-group-item d-flex justify-content-between align-items-center ${task.completed ? 'list-group-item-success' : ''}`}
            style={{
              backgroundColor: task.priority === 'Alta' ? 'red' :
                                task.priority === 'Media' ? 'yellow' : 'lightgray',
              color: task.priority === 'Media' ? 'black' : 'white'
            }}
          >
            <span>{task.name} - {task.priority}</span>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => removeTask(task.id)}
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
      <div className="mt-4">
        <h4>Descripción y Devoluciones</h4>
        <textarea
          className="form-control"
          rows="5"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Describe las tareas y cualquier devolución del turno TARDE..."
        ></textarea>
        <button className="btn btn-secondary mt-3" onClick={saveTasksForNextShift}>Guardar Tareas para el Turno Tarde</button>
      </div>
      <Link to={"/"} className='btn btn-primary'>Regresar</Link>
    </div>
  );
}

export default DepositoTareas;



// src/components/DepositoTareas.jsx
// import React, { useState } from 'react';
// import { collection, addDoc } from 'firebase/firestore';
// import { db } from '../firebaseConfig'; // Asegúrate de que esta ruta sea correcta

// function DepositoTareas() {
//   const [tasks, setTasks] = useState([]);
//   const [taskName, setTaskName] = useState('');
//   const [taskPriority, setTaskPriority] = useState('Media');
//   const [feedback, setFeedback] = useState('');

//   const handleAddTask = () => {
//     if (taskName.trim() === '') return;
//     setTasks([...tasks, { name: taskName, priority: taskPriority, completed: false }]);
//     setTaskName('');
//     setTaskPriority('Media');
//   };

//   const handleSaveDevoluciones = async () => {
//     try {
//       await addDoc(collection(db, 'devoluciones'), {
//         tasks: tasks,
//         feedback: feedback,
//         date: new Date().toISOString(),
//       });
//       alert('Devoluciones guardadas con éxito');
//       setTasks([]); // Limpiar la lista de tareas
//       setFeedback(''); // Limpiar el área de texto
//     } catch (e) {
//       console.error('Error al guardar las devoluciones: ', e);
//     }
//   };

//   return (
//     <div className="container">
//       <h2>Gestión de Tareas</h2>
//       <div>
//         <input
//           type="text"
//           value={taskName}
//           onChange={(e) => setTaskName(e.target.value)}
//           placeholder="Nombre de la tarea"
//         />
//         <select
//           value={taskPriority}
//           onChange={(e) => setTaskPriority(e.target.value)}
//         >
//           <option value="Alta">Alta</option>
//           <option value="Media">Media</option>
//           <option value="Baja">Baja</option>
//         </select>
//         <button onClick={handleAddTask}>Agregar Tarea</button>
//       </div>
//       <div>
//         <h3>Tareas a Completar</h3>
//         <ul>
//           {tasks.map((task, index) => (
//             <li key={index}>
//               {task.name} - {task.priority}
//               <button onClick={() => {
//                 // Aquí puedes añadir lógica para marcar la tarea como completada
//               }}>
//                 Marcar como completada
//               </button>
//             </li>
//           ))}
//         </ul>
//         <textarea
//           value={feedback}
//           onChange={(e) => setFeedback(e.target.value)}
//           placeholder="Comentarios"
//         ></textarea>
//         <button onClick={handleSaveDevoluciones}>Guardar Devoluciones</button>
//       </div>
//     </div>
//   );
// }

// export default DepositoTareas;

