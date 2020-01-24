import React, { Component } from 'react';
import './App.css';
import {Route} from 'react-router-dom'
import ToDo from './Pages/ToDo'
import Add from './Pages/Add'
import Edit from './Pages/Edit'


class App extends Component {
  render (){
    return (
    <div >
        <Route path = '/' component = {ToDo} exact/>
        <Route path = '/add' component = {Add} />
        <Route path = '/edit/:id' component = {Edit}/>
    </div>
  );
  }
  
}

export default App;
