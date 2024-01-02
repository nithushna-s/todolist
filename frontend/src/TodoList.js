import React, { useState, useEffect } from 'react';
import TodoItem from './TodoItem';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = () => {
    fetch('http://localhost:3001/api/todos')
      .then((response) => response.json())
      .then((todos) => setTodos(todos))
      .catch((error) => console.error('Error fetching todos:', error));
  };

  const addTodo = () => {
    if (newTodo.trim() !== '') {
      fetch('http://localhost:3001/api/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newTodo }),
      })
        .then((response) => response.json())
        .then((todo) => {
          setNewTodo('');
          setTodos((prevTodos) => [...prevTodos, todo]);
        })
        .catch((error) => console.error('Error adding todo:', error));
    }
  };

  const updateTodo = (todoId, updatedTitle) => {
    fetch(`http://localhost:3001/api/todos/${todoId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: updatedTitle }),
    })
      .then((response) => response.json())
      .then((updatedTodo) => {
        setTodos((prevTodos) =>
          prevTodos.map((todo) =>
            todo._id === todoId ? { ...todo, name: updatedTodo.name } : todo
          )
        );
      })
      .catch((error) => console.error('Error updating todo:', error));
  };

  const deleteTodo = (todoId) => {
    fetch(`http://localhost:3001/api/todos/${todoId}`, {
      method: 'DELETE',
    })
      .then(() => {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== todoId));
      })
      .catch((error) => console.error('Error deleting todo:', error));
  };

  return (
    <div className="todo-list">
      <h2>To-Do List</h2>
      <div className="add-todo">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="New task..."
        />
        <button onClick={addTodo} style={{ backgroundColor: 'blue' }}>
          Add
        </button>
      </div>
      <div className="todos">
        {todos.map((todo) => (
          <TodoItem key={todo._id} todo={todo} onUpdate={updateTodo} onDelete={deleteTodo} />
        ))}
      </div>
    </div>
  );
};

export default TodoList;
