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
