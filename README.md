Step One Create A Context.
This is our state store;

```JavaScript AppContext.js
import React from 'react';
const AppContext = React.createContext();
export default AppContext;
```

So Now we can add that to our App.js

```JavaScript App.js
import React from 'react';
import './App.css';
import AppProvider from './AppProvider';
import TodoList from './TodoList';
function App() {
  return (
    <AppProvider>
      <TodoList />
    </AppProvider>
  );
}

export default App;
```

Next we need to create our Provider

```JavaScript AppProvider.js
import React from 'react';
import AppContext from './AppContext';
const initialState = {
  todoList: JSON.parse(localStorage.getItem('todo-list-with-react-hooks')) || []
};

class AppProvider extends React.Component {
  state = initialState;
  todoFunctions = {
    addTodo: name => {
      const todoList = this.state.todoList;
      todoList.push({ name, complete: false });
      localStorage.setItem('todo-list-with-react-hooks', JSON.stringify(todoList));
      this.setState({
        todoList
      });
    },
    completeTodo: selectedID => {
      const todoList = this.state.todoList;
      todoList[selectedID].complete = !todoList[selectedID].complete;
      localStorage.setItem(
        'todo-list-with-react-hooks',
        JSON.stringify(todoList)
      );

      this.setState({
        todoList
      });
    },
    deleteTodo: selectedID => {
      const todoList = this.state.todoList;
      delete todoList[selectedID];
      localStorage.setItem(
        'todo-list-with-react-hooks',
        JSON.stringify(todoList)
      );
      this.setState({
        todoList
      });
    }
  };
  render() {
    return (
      <AppContext.Provider value={Object.assign(this.state, this.todoFunctions)}>
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

export default AppProvider;
```

Next Lets to the TodoList

```JavaScript TodoList.js
import React from 'react';
import Todos from './Todos';
const TodoList = () => (
  <div className='todo-list'>
    <h2>Todo list:</h2>
    <Todos />
  </div>
);
export default TodoList;
```

Next we add in out Todos

```JavaScript Todos.js
import React, { Fragment } from 'react';
import MyContext from './AppContext';
import Todo from './Todo';
import TodoForm from './TodoForm';
const Todos = () => (
  <MyContext.Consumer>
    {context => {
      let _Context = Object.keys(context.todoList);
      return (
        <Fragment>
          <h4>Total Todos {_Context.length}</h4>
          <TodoForm />
          {_Context.map(ID => (
            <Todo key={ID} ID={ID} />
          ))}
        </Fragment>
      );
    }}
  </MyContext.Consumer>
);
export default Todos;
```

We need our Form.

```JavaScript TodoForm.js
import React, { Fragment, useState } from 'react';
import MyContext from './AppContext';
const TodoForm = props => {
  const [ todo, setTodo ] = useState();
  return (
    <MyContext.Consumer>
      {context => (
        <Fragment>
          <label>
            Todo:{' '}</label>
            <input
              name='todo'
              onChange={e => setTodo( e.target.value )}
            />          
          <button onClick={() => context.addTodo(todo)}>Add</button>
        </Fragment>
      )}
    </MyContext.Consumer>
  );
};

export default TodoForm;
```

Finally our Todo

```JavaScript
import React from 'react';
import MyContext from './AppContext';
import { CSSTransitionGroup } from 'react-transition-group';
const Todo = props => (
  <MyContext.Consumer>
    {context => (
      <CSSTransitionGroup
        transitionName='todo-item'
        transitionAppear={true}
        transitionAppearTimeout={500}
        transitionEnterTimeout={700}
        transitionLeaveTimeout={700}
      >
        <div className='todo-item'>
          <p>Todo: {context.todoList[props.ID].name}</p>
          <p>
            Complete: {context.todoList[props.ID].complete ? 'True' : 'False'}
          </p>
          <button onClick={() => context.completeTodo(props.ID)}>
            Complete
          </button>
          <button onClick={() => context.deleteTodo(props.ID)}>Delete</button>
        </div>
      </CSSTransitionGroup>
    )}
  </MyContext.Consumer>
);

export default Todo;
```
