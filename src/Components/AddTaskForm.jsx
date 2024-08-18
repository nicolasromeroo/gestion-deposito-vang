
const AddTaskForm = ({ onAddTask }) => {
    const [title, setTitle] = React.useState('');
    const [priority, setPriority] = React.useState(1);
  
    const handleSubmit = (e) => {
      e.preventDefault();
      onAddTask({ title, priority });
      setTitle('');
      setPriority(1);
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Título" />
        <input type="number" value={priority} onChange={(e) => setPriority(e.target.value)} placeholder="Prioridad" />
        <button type="submit">Agregar Tarea</button>
      </form>
    );
  };

export default AddTaskForm