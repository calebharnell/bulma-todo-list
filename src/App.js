import React, { Component } from 'react';
import { Input, Button, Notification } from 'reactbulma';
import './App.css';
import Header from './components/Header';
import axios from 'axios';

let currentKey = 2;
const genKey = () => ++currentKey;

class App extends Component {
  state = {
    tasks: [],
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
    if (!existingItem) {
      axios.post('/api/tasks', {
        key: genKey(),
        name: this.state.searchPhrase,
        date: new Date(),
        complete: false
      })
      .then((response) => {
        console.log(response);
        // add the new task to our copy of tasks (only if it isn't already in the list)
        currentTasks.unshift(response.data);
        this.setState({
          // Update the state with the new tasks
          tasks: currentTasks,
          searchPhrase: ''
        })
      })
      .catch((error) => {
        console.log(error);
      });
    } else {
      this.setState({
        searchPhrase: ''
      })
    }
  }

  changeCompletedStatus = (key) => {
    const currentTasks = [...this.state.tasks];
    const taskIndex = currentTasks.findIndex(task => task.key === key)
    currentTasks[taskIndex].complete = !currentTasks[taskIndex].complete
    this.setState(prevState => ({
      tasks: currentTasks
    }))
  }

  render() {

    const { tasks, searchPhrase } = this.state

    return (
      <div className="App">
        <Header
        totalTasks={ tasks.length }
        totalIncomplete={ tasks.filter(task => !task.complete).length }
        totalComplete={ tasks.filter(task => task.complete).length } />

        <form onSubmit={ this.addTask }>
          <Input autoFocus primary placeholder="Search/Add to do!" value={ searchPhrase } onChange={ this.onChangeQuery }/><br /><br />
          <Button primary>Submit</Button>
        </form>
        {
          tasks
          .filter(task => task.name.includes(searchPhrase))
          .map(task => (
            <Notification success={task.complete} onClick={()=>this.changeCompletedStatus(task.key)}>
              <p>{task.name} - {task.date.toLocaleString()}</p>
            </Notification>
          ))
        }
      </div>
    );
  }

  componentDidMount() {
    // Grab our tasks from the API
    axios.get('/api/tasks')
      .then((response) => {
        console.log('Success!')
        console.log(response.data);
        // Set state to array of tasks from API
        this.setState({
          tasks: response.data,
        })
      })
      .catch((error) => {
        console.log('Whoops!')
        console.log(error);
      });
  }
}

export default App;
