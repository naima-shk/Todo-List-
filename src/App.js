import React, {Component} from 'react';
import './App.css';
import Todos from './component/Todos';
import Header from './component/Layout/Header';
import Addtodo from './component/Addtodo';
//import uuid from 'uuid';
import {BrowserRouter as Router , Route} from 'react-router-dom';
import About from './component/Pages/About';
import axios from 'axios';
class App extends Component {
  state={
    todos:[]
  }
  componentDidMount(){
    axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10')
    .then(res => this.setState({todos: res.data}))
  }

  //Toggle complete 
  markComplete = (id) => {
    this.setState ({ todos:  this.state.todos.map(todo  => {
      if(todo.id === id) { 
        todo.completed = ! todo.completed
      }
      return todo;
    }) });
  }

  //Delete Todo
  delTodo =(id) => {
    axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
    .then (res =>  this.setState({ todos: [...this.state.todos.filter(todo =>todo.id !==id)]
    }));
   
  }

  // ADD todo
  addTodo = (title) =>{
    axios.post('https://jsonplaceholder.typicode.com/todos',{
       title,
       completed:false
    })
  .then(res => this.setState({ todos: [... this.state.todos, res.data] }));
   }
  render () {
    return (
      <Router>
       <div className="App">
       <div className="container">
       <Header/>
       <Route exact path="/"  render={(props) =>(
         <React.Fragment>
          <Addtodo  addTodo={this.addTodo}/>
          <Todos  todos={this.state.todos}  markComplete={this.markComplete}
          delTodo={this.delTodo} />
         </React.Fragment>
        )} />
        <Route path="/about"  component={About}/>
      
       </div>
       </div>
       </Router>
     );
   }
}

export default App;
