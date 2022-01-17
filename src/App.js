import { useState } from 'react';
import AddTask from './components/AddTasks';
import Header from './components/Header'
import Tasks from './components/Tasks';


function App() {
  const [showAddTask , setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState(
    [
        {
          "id": 1,
          "text": "Doctors Appointment",
          "day": "Feb 5th at 2:30pm",
          "reminder": true
        },
        {
          "id": 2,
          "text": "Meeting at School",
          "day": "Feb 6th at 1:30pm",
          "reminder": true
        },
        {
            "id": 3,
            "text": "Food Shopping",
            "day": "Feb 5th at 2:30pm",
            "reminder": false,
          }
      ]
  );

  //add task
const addTask = (task) => {
    const id = Math.floor(Math.random() * 10000) + 1
    const newTask = { id,  ...task}
    setTasks([...tasks, newTask])
}

  //delete task
  const deleteTask = (id) => {
    //filter through task array and show only those tasks whose id does not match, when we remove by clicking the task with corresponding id will not be shown
       setTasks(tasks.filter( (task) => task.id !== id ))
  }

  //Toggle reminder
  const toggleReminder = (id) => {
    //if the id to be toggled comes in the map iteration then change the reminder to be the opposite of what it was
      setTasks(tasks.map( (task) => task.id === id ? { ...task, reminder: !task.reminder }: task))
  }
  return (
    <div className="container">
      <Header onAdd = {() => setShowAddTask(!showAddTask)} showAdd={showAddTask}/>
      {showAddTask && <AddTask onAdd={addTask}/> }

      { tasks.length > 0 ? (
          <Tasks tasks={tasks} onDelete = {deleteTask} onToggle={toggleReminder}/>
               ) : (
                  'No Tasks to Show'
                 )}
    </div>
  );
}

export default App;
