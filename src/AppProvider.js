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
