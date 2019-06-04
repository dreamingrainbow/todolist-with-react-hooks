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
