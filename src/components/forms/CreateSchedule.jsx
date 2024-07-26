import { useContext, useState } from 'react';
import LightCheckbox from '../inputs/LightCheckbox';
import Button from '@mui/material/Button';
import APIContext from '../../context/4handsAPI';
import configs from '../../../config.json';


export default function CreateSchedule({ masterUID, setList, setView, type }) {
   const [ formData, setFormData ] = useState({ type, weekdays: new Map() });
   const API = (useContext(APIContext))();

   async function createNew(ev) {
      ev.preventDefault();

      const data = { ...formData, master: masterUID, weekdays: [] };
      formData.weekdays.forEach((value, key) => value && data.weekdays.push(key));

      try {
         const response = await API.ajax.authPut('/master-account/create-schedule', data);
         const created = response.data;
         if (created.success) {
            setList(created.schedules);
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

   return (
      <form name="schedule-form" onSubmit={createNew}>
         <h5 className="text-center">New Schedule</h5>

         <div className="weekdays">
            {configs.daysOfWeek.map(key => <LightCheckbox
               key={key + Date.now()}
               label={key}
               formData={formData}
               onClick={selectWeekday}
            />)}
         </div>

         <div className="inputs-wrap">
            <input type="time" value={formData.startTime || ''} onChange={(ev) => handleDate(ev, 'start')} />
            <input type="time" value={formData.endTime || ''} onChange={(ev) => handleDate(ev, 'end')} />
         </div>

         <Button type="submit" variant="contained" className="cta" fullWidth={true}>
            SAVE
         </Button>
      </form>
   );
}
