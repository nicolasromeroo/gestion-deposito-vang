
const TaskList = ({ tasks, onUpdateTask, onDeleteTask }) => (
    <ul>
      {tasks.sort((a, b) => a.priority - b.priority).map(task => (
        <li key={task.id}>
          <span>{task.title}</span>
          <button onClick={() => onUpdateTask(task.id)}>Editar</button>
          <button onClick={() => onDeleteTask(task.id)}>Eliminar</button>
        </li>
      ))}
    </ul>
  );

  export default TaskList