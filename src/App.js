import React, { Component } from 'react';
import { Progress, Level, Heading, Title, Input, Button } from 'reactbulma'
import './App.css';
import Header from './components/Header'

class App extends Component {
  state = {
    tasks: ['Do the washing', 'Walk the dog'],
    searchPhrase: ''
  }

  onChangeQuery = (event) => {
    // update the state with our search query
    this.setState({
      searchPhrase: event.target.value
    })
  }

  addTask = (event) => {
    // stop the browser from submitting the form
    event.preventDefault();
    // make a copy of the current tasks
    const currentTasks = [...this.state.tasks];
    // add the new task to our copy of tasks
    currentTasks.unshift( this.state.searchPhrase );
    // Update the state with the new tasks
    this.setState({
      tasks: currentTasks,
      searchPhrase: ''
    })
  }

  render() {

    const { tasks, searchPhrase } = this.state

    return (
      <div className="App">
        <Header title="INCOMPLETE" totalIncomplete={ tasks.length }/>
        <form onSubmit={ this.addTask }>
          <Input primary placeholder="Search/Add to do!" value={ searchPhrase } onChange={ this.onChangeQuery }/><br /><br />
          <Button primary>Submit</Button>
        </form>
        { tasks.filter(task => task.includes(searchPhrase)).map(task => <p>{task}</p>) }
      </div>
    );
  }
}

export default App;
