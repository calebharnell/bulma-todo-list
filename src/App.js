import React, { Component } from 'react';
import { Input, Button, Notification } from 'reactbulma'
import './App.css';
import Header from './components/Header'

class App extends Component {
  state = {
    tasks: [
      {
        id: 1,
        name: 'Do the washing',
        date: new Date("October 13, 2014 11:13:00"),
        complete: false
      },
      {
        id: 2,
        name: 'Walk the dog',
        date: new Date("October 13, 2014 11:15:00"),
        complete: false
      }
    ],
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
    // check current input against existing task names
    const existingItem = this.state.tasks.find(task => task.name === this.state.searchPhrase);
    // add the new task to our copy of tasks (only if it isn't already in the list)
    !existingItem && currentTasks.unshift({name: this.state.searchPhrase, date: new Date(), complete: false});
    // Update the state with the new tasks
    this.setState({
      tasks: currentTasks,
      searchPhrase: ''
    })
  }

  changeCompletedStatus = (id) => {
    const currentTasks = [...this.state.tasks];
    const taskIndex = currentTasks.findIndex(task => task.id === id)
    currentTasks[taskIndex].complete = !currentTasks[taskIndex].complete
    this.setState(prevState => ({
      tasks: currentTasks
    }))
  }

  render() {

    const { tasks, searchPhrase } = this.state

    return (
      <div className="App">
        <Header totalIncomplete={ tasks.filter(task => !task.complete).length } totalComplete={ tasks.filter(task => task.complete).length } />

        <form onSubmit={ this.addTask }>
          <Input primary placeholder="Search/Add to do!" value={ searchPhrase } onChange={ this.onChangeQuery }/><br /><br />
          <Button primary>Submit</Button>
        </form>
        {
          tasks
          .filter(task => task.name.includes(searchPhrase))
          .map(task => (
            <Notification success={task.complete} onClick={()=>this.changeCompletedStatus(task.id)}>
              <p>{task.name} - {task.date.toLocaleString()}</p>
            </Notification>
          ))
        }
      </div>
    );
  }
}

export default App;
