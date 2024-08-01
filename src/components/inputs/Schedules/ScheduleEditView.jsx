import { useContext } from 'react';
import NoSchedule from './NoSchedule';
import ScheduleListItem from './ScheduleListItem';
import APIContext from '../../../context/4handsAPI';
import Button from '@mui/material/Button';

export default function ScheduleEditView({ masterUID, list, setList, setView }) {
   const API = (useContext(APIContext))();

   async function deleteSchedule(UID) {
      try {
         const response = await API.ajax.authDelete('/master-account/delete-schedule', { masterUID, scheduleUID: UID });
         const deleted = response.data;
         if (deleted.success) {
            setView('display');
         } else {
            alert(deleted);
         }
      } catch (err) {
         throw err;
      }
   }
   
   return (<>
      <ul className="schedules-wrap">
         {!list.length && <NoSchedule type="create" />}

         {list.map(schedule => (
            <ScheduleListItem
               key={String(Math.random())}
               schedule={schedule}
               deleteSchedule={deleteSchedule}
            />
         ))}
      </ul>
      
      <Button variant="contained" className="cta" fullWidth={true} onClick={() => setView('create')}>
         CREATE
      </Button>
   </>);
}