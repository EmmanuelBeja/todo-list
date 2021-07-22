import React, { useState, useEffect } from 'react';

import { TodoList } from './components/TodoList';
import { AddTodoForm } from './components/AddTodoForm';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import axios from 'axios';

const App = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    getTodos()
  }, [])

  const getTodos: GetTodo = () => {
    axios.get(`http://localhost:5000/todos`).then(data => {
      setTodos(data.data)
    })
  }

  const toggleTodo: ToggleTodo = (selectedTodo: Todo) => {
    const todoValue = todos.filter((todo) => todo.id === selectedTodo.id)[0]
    todoValue.complete = !todoValue.complete
    axios.patch(`http://localhost:5000/todos/${selectedTodo.id}`, todoValue).then((data) => {
      toast.success('Status update successfull', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })

      // get updated todos
      getTodos()
    })
  };

  const addTodo: AddTodo = (text: string) => {
    const newTodo = { id: todos.length+1, text, complete: false };
    axios.post(`http://localhost:5000/todos`, newTodo).then(data => {
      toast.success('Add successfull', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })

      // get updated todos
      getTodos()
    });
  };

  const deleteTodo: DeleteTodo = (selectedTodo: Todo) => {
    axios.delete(`http://localhost:5000/todos/${selectedTodo.id}`).then(data => {
      toast.success('Delete successfull', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })

      // get updated todos
      getTodos()
    })
  };

  return (
    <>
      <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo}/>
      <AddTodoForm addTodo={addTodo} />
      <ToastContainer />
    </>
  )

}

export default App;
