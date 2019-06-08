### Todo List using React Context and Hooks ###

## Step One ## 
Create A Context.
This be our share data object through out our application;

```JavaScript AppContext.js
import React from 'react';
const AppContext = React.createContext();
export default AppContext;
```

## Step Two ##
Next we need to create our Provider.
Our privider will contain our general controller logic for our application, these are the functions/methods we need access to through out our application. We use local storeage to create a persistant todo list for the example however you would simple extend this out to the data connections.

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
      let todoList = this.state.todoList;
      todoList.splice(selectedID, 1);
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

## Step Three ##
So now lets create the primary application component. Since we want our context available through out our applicaton we create our provider at the base of our application as our primary component in our app component. We also add our todolist primary component to the application provider component.

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

## Step Four ##
Next the TodoList main wrapper page, here we don't use the context so we just create our component adding our Todos component which utilizes the context.

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
## Step Five ##
Next we create our Todos Component. Here we utilze the context consumer and use it to wrap our component content, where within our component we access the context and react based on the information or utilize the functions manipulating state through out the application. Here we import our form and context, iterate over our todolist context mapping our Todo components. Next we need a way to manipulate that data so we will create a form.

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
## Step Six ##
Forms dont need to be forms! We just need our elements.
First we import our resources, then we set up our local state, we use the context consumer and the functions we attached to the context to manipulate the context and local state. Here I use an input but this could be a paragraph element using advance techniques like editable content, to keep this demonstration simple we use an input. We pass the event object to our local state function setting our todo on change. Once we click the buttin we add the todo to our context with our addTodo method we attached to our context.

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
## Step Seven ##
Finally our Todo, Here we used a CSS Transition to make it look a little special, but again we start this component with the consumer component since we will be utilizing our context. We add our attached methods to our buttons and display our data. That's it we are done for now.

```JavaScript
import React from 'react';
import MyContext from './AppContext';
import { CSSTransitionGroup } from 'react-transition-group';
const Todo = props => (
  <MyContext.Consumer>
    {context => (
      context.todoList[props.ID] !== null ? 
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
      </CSSTransitionGroup> : null
    )}
  </MyContext.Consumer>
);

export default Todo;
```

## Extra Credit ##
Try it out on your own. Try adding a way to edit the existing todo. Maybe setup to utilize a storage services. If you want to be good at something practice!

