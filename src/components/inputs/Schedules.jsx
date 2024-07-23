import { useContext, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import LightCheckbox from './LightCheckbox';
import APIContext from '../../context/4handsAPI';

const daysOfWeek = [ 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN' ];

export default function Schedules({ masterUID, schedules = [], type }) {
   const [ view, setView ] = useState('display');
   const [ list, setList ] = useState(schedules);
   const [ formData, setFormData ] = useState({ type, weekdays: new Map() });
   const API = (useContext(APIContext))();

   async function createNew(ev) {
      ev.preventDefault();

      const data = { ...formData, master: masterUID, weekdays: [] };
      formData.weekdays.forEach((value, key) => value && data.weekdays.push(key));

      try {
         const created = await API.dbQuery('schedules').saveDoc(data);
         if (created.success) {
            const loaded = await API.dbQuery('schedules', { master: masterUID }).getQuery();
            setList(loaded);
            setView('display');
         } else {
            alert(created);
         }
      } catch (err) {
         throw err;
      }
   }

   function handleDate(ev, type) {
      const value = ev.target.value;

      switch (type) {
         case 'start':
            setFormData(prev => ({ ...prev, startTime: value }));
            break;
         case 'end':
            setFormData(prev => ({ ...prev, endTime: value }));
            break;
      }
   }

   function selectWeekday(weekday, value) {
      setFormData(prev => {
         prev.weekdays.set(weekday, value);
         return prev;
      });
   }

   async function deleteSchedule(UID) {
      try {
         const deleted = await API.dbQuery('schedules', UID).deleteDoc();
         if (deleted.success) {
            const loaded = await API.dbQuery('schedules', { master: masterUID }).getQuery();
            setList(loaded);
            setView('display');
         } else {
            alert(deleted);
         }
      } catch (err) {
         throw err;
      }
   }

   function View() {
      if (view === 'display') {
         return <ul className="schedules-wrap">
            {!list.length && <li className="schedule text-center">
               <p>There is nothing scheduled yet!</p>
               <small>Click on the "EDIT" button bellow to add the first schedule.</small>
            </li>}

            {list.map(schedule => <li key={String(Math.random())} className="schedule">
               <div className="weekdays">
                  {daysOfWeek.map(day => {
                     const isSelected = schedule.weekdays.find(item => item === day);
                     return <span key={String(Math.random())} className={`light-checkbox display ${isSelected ? 'selected' : ''}`}>{day}</span>
                  })}
               </div>

               <span className="time">{schedule.startTime}</span> - <span className="time">{schedule.endTime}</span>
            </li>)}
         </ul>
      }

      else if (view === 'edit' || view === 'create') {
         return <>
            {view === 'edit' && <>
               <ul className="schedules-wrap">
                  {!list.length && <li className="schedule text-center">
                     <p>There is nothing scheduled yet!</p>
                     <small>Click on the "CREATE" button bellow to add the first schedule.</small>
                  </li>}

                  {list.map(schedule => <li key={String(Math.random())} className="schedule">
                     <Button className="delete-button" variant="text" onClick={() => deleteSchedule(schedule?._id)}>X</Button>

                     <p>{schedule.weekdays.join(', ')}</p>
                     <span className="time">{schedule.startTime}</span> - <span className="time">{schedule.endTime}</span>
                  </li>)}
               </ul>
               
               <Button variant="contained" className="cta" fullWidth={true} onClick={() => setView('create')}>
                  CREATE
               </Button>
            </>}

            {view === 'create' && <form name="schedule-form" onSubmit={createNew}>
               <h5 className="text-center">New Schedule</h5>

               <div className="weekdays">
                  {daysOfWeek.map(key => <LightCheckbox
                     key={key + Date.now()}
                     label={key}
                     formData={formData}
                     onClick={selectWeekday}
                  />)}
               </div>

               <div className="inputs-wrap">
                  <input type="time" value={formData.startTime} onChange={(ev) => handleDate(ev, 'start')} />
                  <input type="time" value={formData.endTime} onChange={(ev) => handleDate(ev, 'end')} />
               </div>

               <Button type="submit" variant="contained" className="cta" fullWidth={true}>
                  SAVE
               </Button>
            </form>}
         </>
      }
   
      else {
         return <></>;
      }
   }

   return <div className="schedules card">
      <h3 className="text-center">Master's Schedules</h3>

      <View />

      {view === 'display' && <Button variant="contained" fullWidth={true} onClick={() => setView('edit')}>
         EDIT
      </Button>}
   </div>;
}
