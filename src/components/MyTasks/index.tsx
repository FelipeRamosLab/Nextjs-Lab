'use client';

import './MyTasks.scss';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Task, TaskState, taskActions } from '@/store';

type Props = {};

const MyTasks: React.FC<Props> = () => {
   const tasks = useSelector((state: { task: TaskState }) => state.task.tasks);
   const dispatch = useDispatch();
   const tasksArray: Task[] = [];

   tasks.forEach((value) => {
      tasksArray.push(value);
   });

   const handleDelete = (task: Task) => {
      dispatch(taskActions.remove({ id: task.id }));
   }

   return <table id="my-tasks">
      {Boolean(tasks.size) && <thead>
         <tr>
            <td>Subject</td>
            <td>Description</td>
            <td>Actions</td>
         </tr>
      </thead>}

      <tbody>
         {Boolean(tasks.size) && tasksArray.map((task: Task) => (
            <tr key={task.id}>
               <td>{task.subject}</td>
               <td>{task.description}</td>
               <td><button className="delete-btn" onClick={() => handleDelete(task)}>DELETE</button></td>
            </tr>
         ))}

         {!Boolean(tasks.size) && (
            <tr>
               <td>There is any task waiting. Please create a new one.</td>
            </tr>
         )}
      </tbody>
   </table>
}

export default MyTasks;
