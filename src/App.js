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
