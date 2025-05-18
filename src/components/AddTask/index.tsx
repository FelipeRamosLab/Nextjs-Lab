'use client';

import './AddTask.scss';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { taskActions } from '@/store';

type Props = {};

const AddTask: React.FC<Props> = () => {
   const [ subject, setSubject ] = useState('');
   const [ descr, setDescr ] = useState('');
   const dispatch = useDispatch();

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.id === 'subject-input') {
         setSubject(e.target.value);
      }

      if (e.target.id === 'descr-input') {
         setDescr(e.target.value);
      }
   }

   const resetForm = () => {
      setSubject('');
      setDescr('');
   }

   const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();

      dispatch(taskActions.add({ subject, description: descr}));
      resetForm();
   }

   return <form id="add-task" onSubmit={handleSubmit}>
      <div className="input-wrap">
         <label htmlFor="subject-input">Subject</label>
         <input id="subject-input" type="text" value={subject} onChange={handleChange} />
      </div>
      <div className="input-wrap">
         <label htmlFor="descr-input">Description</label>
         <input id="descr-input" type="text" value={descr} onChange={handleChange} />
      </div>

      <button type="submit">Add</button>
   </form>
}

export default AddTask;
