import React from 'react';
import { AppUI } from './AppUI';

// const AllTodos = [
//   { text: 'Cortar cebolla', completed: true },
//   { text: 'Tomar el cursso de intro a React', completed: true },
//   { text: 'Llorar con la llorona', completed: true },
//   { text: 'LALALALAA', completed: false },
//   { text: 'Estudiar todos los días React', completed: false },
//   { text: 'Aprender todos los días algo nuevo', completed: true },
//   { text: 'Saludar a todos', completed: false },
// ];

function useLocalstorage(itemName, itemvalue) {
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);
  const [todos, setCountTodos] = React.useState(itemvalue);
  React.useEffect(() => {
    setTimeout(() => {
      try {
        const localstorageTodos = localStorage.getItem(itemName);
        let parseTodo;

        if (!localstorageTodos) {
          localStorage.setItem(itemName, JSON.stringify(itemvalue));
          parseTodo = itemvalue;
        } else {
          parseTodo = JSON.parse(localstorageTodos);
        }
        setCountTodos(parseTodo);
        setLoading(false);
      } catch (error) {
        setError(error);
      }
    }, 10000);
  }[]);

  const saveTodos = (NewTodos) => {
    try {
      const stringifyTodos = JSON.stringify(NewTodos);
      localStorage.setItem(itemName, stringifyTodos);
      setCountTodos(NewTodos);
    } catch (error) {
      setError(error);
    }
  };

  return { todos, saveTodos, loading, error };
}

function App() {
  const { todos, saveTodos, loading, error } = useLocalstorage('TODO_V1', []);

  const completedTodos = todos.filter((todo) => !!todo.completed).length;
  const countsTodos = todos.length;

  const [searchValue, setSearchValue] = React.useState('');

  let searchedTodos = [];

  if (!searchValue >= 1) {
    searchedTodos = todos;
  } else {
    searchedTodos = todos.filter((todo) => {
      const Todotext = todo.text.toLowerCase();
      const Searchtext = searchValue.toLowerCase();
      return Todotext.includes(Searchtext);
    });
  }

  const CompletedTodo = (text) => {
    const TodoIndex = todos.findIndex((todo) => todo.text === text);
    const msgcompleted = confirm(
      'Deseas completar o descompletar ' + text + '?'
    );
    const NewTodos = [...todos];

    if (msgcompleted) {
      alert('¡Gracias por confirmar!');
      NewTodos[TodoIndex].completed = true;
    } else {
      alert('¡Haz denegado el mensaje!');
      NewTodos[TodoIndex].completed = false;
    }
    saveTodos(NewTodos);
  };

  const DelatedTodo = (text) => {
    const TodoIndex = todos.findIndex((todo) => todo.text === text);
    const msgdelate = confirm('¿Deseas eliminar ' + text + '?');
    const NewTodos = [...todos];

    if (msgdelate) {
      alert('¡Gracias por confirmar!');
      NewTodos.splice(TodoIndex, 1);
    } else {
      alert('¡Haz denegado el mensaje!');
      NewTodos[TodoIndex];
    }
    saveTodos(NewTodos);
  };

  return (
    <AppUI
      loading={loading}
      error={error}
      countsTodos={countsTodos}
      completedTodos={completedTodos}
      searchValue={searchValue}
      setSearchValue={setSearchValue}
      searchedTodos={searchedTodos}
      CompletedTodo={CompletedTodo}
      DelatedTodo={DelatedTodo}
    />
  );
}

export default App;
