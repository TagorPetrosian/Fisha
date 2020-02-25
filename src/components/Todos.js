import React, { useState, useEffect } from 'react';
import axios from 'axios';
import uuid from 'uuid/v1';
import { insert } from '../utils';

const Todos = () => {
  const [todos, setTodos] = useState([]);
  const [value, setValue] = useState('');

  const onEnterPress = e => {
    if (e.keyCode === 13) {
      const newTodo = { id: uuid(), title: e.target.value };
      let index = todos.length;

      //solution 1 easier to comprehend
      // setTodos(
      //   [...todos, newTodo].sort((a, b) => a.title.localeCompare(b.title))
      // );

      // solution 2 better time complexity
      // find index to insert new todo
      for (let i = 0; i < todos.length; i++) {
        if (todos[i].title.localeCompare(newTodo.title) >= 0) {
          index = i;
          break;
        }
      }

      setTodos(insert(todos, index, newTodo));
      setValue('');
    }
  };

  const onInputChange = e => {
    setValue(e.target.value);
  };

  const onTodoClick = e => {
    e.target.style.textDecoration = 'none';
  };

  const renderTodos = () => {
    return todos.map(todo => {
      return (
        <li
          key={todo.id}
          onClick={onTodoClick}
          className={`${todo.title.slice(-1) === 'e' ? 'todo-background' : ''}`}
        >
          {todo.title}
        </li>
      );
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios('http://jsonplaceholder.typicode.com/todos');
      setTodos(
        result.data
          ?.filter(todo => todo.title.charAt(0) === 's')
          .sort((a, b) => a.title.localeCompare(b.title))
      );
    };
    fetchData();
  }, []);

  return (
    <div className='todos-wrapper'>
      <h1>Todos App</h1>
      <input
        type='text'
        value={value}
        onKeyUp={onEnterPress}
        onChange={onInputChange}
      />
      <ul className='todos'>{renderTodos()}</ul>
    </div>
  );
};

export default Todos;
