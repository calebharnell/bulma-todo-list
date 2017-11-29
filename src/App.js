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

    // update the state with the new task
    this.setState({
      tasks: [...this.state.tasks, this.state.searchPhrase],

      // reset search phrase to an empty string
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
