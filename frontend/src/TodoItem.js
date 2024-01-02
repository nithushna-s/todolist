import React, { useState } from 'react';

const TodoItem = ({ todo, onUpdate, onDelete }) => {
  const [updatedTitle, setUpdatedTitle] = useState('');

  const handleUpdate = () => {
    onUpdate(todo._id, updatedTitle);
    setUpdatedTitle('');
  };

  return (
    <div className="todo-item">
      <span>{todo.name}</span>
      <input
        type="text"
        value={updatedTitle}
        onChange={(e) => setUpdatedTitle(e.target.value)}
        placeholder="Update title"
      />
      <button onClick={handleUpdate} style={{ backgroundColor: 'green'}}>Update</button>
      <button onClick={() => onDelete(todo._id)}>Delete</button>
    </div>
  );
};

export default TodoItem;
