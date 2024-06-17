import React from 'react'
import { ITask } from '../Interface'

interface TodoTaskProps{
    task:ITask;
    completeTask(taskNameToDelete:string):void;
}

function TodoTask({task,completeTask}:TodoTaskProps) {
  return (
    <div className='task'>
      <div className='content'>
        <span>{task.taskName}</span>
        <span>{task.deadline} Days</span>
      </div>
   
      <button onClick=
      {
        ()=>
      {
        completeTask(task.taskName)
      }
      }
      >X</button>
    </div>
  )
}

export default TodoTask
