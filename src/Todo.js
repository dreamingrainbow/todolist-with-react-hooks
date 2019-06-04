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
