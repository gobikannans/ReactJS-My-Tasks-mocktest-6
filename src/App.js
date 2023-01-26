import {Component} from 'react'
import {v4 as uuid} from 'uuid'
import './App.css'

// These are the lists used in the application. You can move them to any component needed.

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

// Replace your code here
class App extends Component {
  state = {
    activeTag: 'INITIAL',
    taskTag: tagsList[0].optionId,
    taskInput: '',
    taskList: [],
  }

  onTaskInput = event => {
    this.setState({taskInput: event.target.value})
  }

  onChangeSelect = event => {
    this.setState({taskTag: event.target.value})
  }

  onClickTag = event => {
    this.setState(prevState => ({
      activeTag:
        prevState.activeTag === event.target.value
          ? 'INITIAL'
          : event.target.value,
    }))
  }

  onClickSubmit = () => {
    const {taskTag, taskInput} = this.state
    const newTask = {
      id: uuid(),
      newTaskInput: taskInput,
      newSelectedTag: taskTag,
    }
    if (taskInput.length !== 0) {
      this.setState(prevState => ({
        taskList: [...prevState.taskList, newTask],
        taskInput: '',
        taskTag: tagsList[0].optionId,
      }))
    }
  }

  renderTaskList = () => {
    const {taskList, activeTag} = this.state
    const filterTaskList =
      activeTag === 'INITIAL'
        ? taskList
        : taskList.filter(each => each.newSelectedTag === activeTag)
    const emptyTaskList = filterTaskList.length > 0
    return (
      <>
        {emptyTaskList ? (
          <ul className="task-list-container">
            {filterTaskList.map(eachItem => (
              <li className="task-list-item" key={eachItem.id}>
                <p className="task-name">{eachItem.newTaskInput}</p>
                <p className="task-item-btn">{eachItem.newSelectedTag}</p>
              </li>
            ))}
          </ul>
        ) : (
          <div>
            <p className="no-task-heading">No Tasks Added Yet</p>
          </div>
        )}
      </>
    )
  }

  renderFormContainer = () => {
    const {taskTag, taskInput} = this.state
    return (
      <>
        <form className="form-container">
          <label htmlFor="task" className="label">
            Task
          </label>
          <input
            type="text"
            id="task"
            placeholder="Enter the task here"
            value={taskInput}
            className="input"
            onChange={this.onTaskInput}
          />
          <label htmlFor="select" className="label">
            Tags
          </label>
          <select
            id="select"
            className="select"
            onChange={this.onChangeSelect}
            value={taskTag}
          >
            {tagsList.map(eachItem => (
              <option value={eachItem.optionId} key={eachItem.optionId}>
                {eachItem.displayText}
              </option>
            ))}
          </select>
          <button
            type="button"
            className="submit-btn"
            onClick={this.onClickSubmit}
          >
            Add Task
          </button>
        </form>
      </>
    )
  }

  renderTaskContainer = () => {
    const {activeTag, taskList} = this.state
    return (
      <div className="added-task-container">
        <h1 className="sub-heading">Tags</h1>
        <ul className="tag-list-container">
          {tagsList.map(eachItem => {
            const isActive = activeTag === eachItem.optionId
            const active = isActive ? 'active-tag-btn' : 'normal-tag-btn'

            return (
              <li className="tag-list-item" key={eachItem.optionId}>
                <button
                  type="button"
                  className={active}
                  onClick={this.onClickTag}
                  value={eachItem.optionId}
                >
                  {eachItem.displayText}
                </button>
              </li>
            )
          })}
        </ul>
        <h1 className="sub-heading">Tasks</h1>
        {this.renderTaskList()}
      </div>
    )
  }

  render() {
    return (
      <div className="bg-container">
        <div className="create-task-container">
          <h1 className="main-heading">Create a task!</h1>
          {this.renderFormContainer()}
        </div>
        {this.renderTaskContainer()}
      </div>
    )
  }
}

export default App
