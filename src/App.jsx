import { FiPlus, FiTrash, FiEdit } from "react-icons/fi";
import { useState, useEffect } from "react";

function App() {
    
    const [task, setTask] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [{ text: "Task 1", status: 0 }];
  });
  
  const [text, setText] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(task));
  }, [task]);

  const handleClick = () => {
    if (text.trim()) {
      const items = [...task];
      if (editIndex !== null) {
        items[editIndex] = { text: text, status: 0 };
        setEditIndex(null);
      } else {
        items.unshift({ text: text, status: 0 });
      }
      setTask(items);
      setText(''); 
    }
  };

  const handleEdit = (index) => {
    setText(task[index].text);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const items = [...task];
    items.splice(index, 1);
    setTask(items);
  };

  const handleToggleStatus = (index) => {
    const items = [...task];
    items[index].status = items[index].status === 0 ? 1 : 0;
    setTask(items);
  };

  const filteredTasks = task.filter(task => {
    if (filter === 'All') return true;
    if (filter === 'Pending') return task.status === 0;
    if (filter === 'Completed') return task.status === 1;
    return true;
  });

  return (
    <div className="w-[300px] mx-auto my-4 border border-gray-200 p-3">
      <div className="flex items-center">
        <input 
          type="text" 
          value={text} 
          onChange={e => setText(e.target.value)} 
          className="h-[40px] border border-gray-200 w-full outline-none px-4" 
        />
        <button 
          onClick={handleClick} 
          className="w-[40px] h-[40px] inline-flex items-center justify-center bg-green-500 text-white">
          <FiPlus />
        </button>
      </div>
      <div className="flex items-center mt-4 space-x-1">
        <button 
          onClick={() => setFilter('All')}
          className={`h-[35px] flex-1 border border-gray-500 inline-flex items-center justify-center ${filter === 'All' ? 'bg-gray-300' : ''}`}>
          All
        </button>
        <button 
          onClick={() => setFilter('Pending')}
          className={`h-[35px] flex-1 border border-gray-500 inline-flex items-center justify-center ${filter === 'Pending' ? 'bg-gray-300' : ''}`}>
          Pending
        </button>
        <button 
          onClick={() => setFilter('Completed')}
          className={`h-[35px] flex-1 border border-gray-500 inline-flex items-center justify-center ${filter === 'Completed' ? 'bg-gray-300' : ''}`}>
          Completed
        </button>
      </div>
      <div className="mt-6 space-y-3">
        {filteredTasks.map((task, index) => (
          <div key={index} className="flex border border-gray-200 p-2 items-center">
            <label className="flex flex-1 items-center">
              <input 
                type="checkbox" 
                className="mr-2" 
                checked={task.status === 1}
                onChange={() => handleToggleStatus(index)}
              />
              <span>{task.text}</span>
            </label>
            <div className="flex space-x-2">
              <button onClick={() => handleEdit(index)} className="text-blue-500">
                <FiEdit />
              </button>
              <button onClick={() => handleDelete(index)} className="text-red-500">
                <FiTrash />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
