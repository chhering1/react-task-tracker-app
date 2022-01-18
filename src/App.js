import { useState,useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import About from './components/About';
import AddTask from './components/AddTasks';
import Footer from './components/Footer';
import Header from './components/Header'
import Tasks from './components/Tasks';


function App() {
  const [showAddTask , setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([ ]);
  const [updatedData, setUpdatedData] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/tasks')
        .then( response => response.json())
        .then(result => setTasks(result))
  }, []);

  //add task
const addTask = (task) => {
  fetch('http://localhost:5000/tasks', {
             method: 'POST',
             headers: {
               'Content-type' : 'application/json',
             },
             body : JSON.stringify(task)
           })
           .then( res => res.json())
           .then ( result => setTasks([...tasks, result]) )

    // const id = Math.floor(Math.random() * 10000) + 1
    // const newTask = { id,  ...task}
    // setTasks([...tasks, newTask])
}

  //delete task
  const deleteTask = (id) => {
    fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE'
    })
    //filter through task array and show only those tasks whose id does not match, when we remove by clicking the task with corresponding id will not be shown
       setTasks(tasks.filter( (task) => task.id !== id ))
  }

  //fetching a single task by their id
  const fetchTask =  async (id) => {
    const res = await  fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json(); 
          return data;
  }
  //Toggle reminder
  const toggleReminder = async  (id) => {
      const taskToToggle =  await fetchTask(id)
      console.log(taskToToggle)
      const updatedTask = { ...taskToToggle, reminder: !taskToToggle.reminder}

        fetch(`http://localhost:5000/tasks/${id}`, {
               method: 'PUT',
               headers: {
                'Content-type' : 'application/json',
                 },
                body : JSON.stringify(updatedTask)
    })
               .then(res => res.json())
              .then( result  => setUpdatedData(result))
  
    //if the id to be toggled comes in the map iteration then change the reminder to be the opposite of what it was

       setTasks(tasks.map( (task) => task.id === id ? { ...task, reminder: !updatedData.reminder }: task))

  
  }

  return (
    <Router>
    <div className="container">
      <Header onAdd = {() => setShowAddTask(!showAddTask)} showAdd={showAddTask}/>
      {showAddTask && <AddTask onAdd={addTask}/> }

      { tasks.length > 0 ? (
          <Tasks tasks={tasks} onDelete = {deleteTask} onToggle={toggleReminder}/>
               ) : (
                  'No Tasks to Show'
                 )}
                 <Routes>
                 <Route path="/about" component={About}></Route>

                 </Routes>
            <Footer />
    </div>
    </Router>
  );
}

export default App;
