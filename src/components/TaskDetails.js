import {useState,useEffect } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import Button from './Button';


const TaskDetails = () => {
    const [task, setTask] = useState('');
    const [loading, setLoading] = useState(true);
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {

    const fetchTask = () => {
        fetch(`http://localhost:5000/tasks/${params.id}`)
        .then(res => res.json())
        .then(result =>  { 
            setTask(result)
            setLoading(false)
            
        })
    }
         fetchTask();
        
        
    }, [params]);

    

    return (  loading ? ( 
          <h3>Loading........</h3>
        ) : (
            <div>
            <p>{task.text}</p>
            <p>{task.day}</p>
            <Button  text="Go Back" onClick={ () => {
                navigate("/")
            }}/>
            </div>
        )
              
    );
}
 
export default TaskDetails


