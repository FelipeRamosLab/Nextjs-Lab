import { useEffect, useState } from 'react';
import ScheduleDisplayView from './ScheduleDisplayView';
import ScheduleEditView from './ScheduleEditView';
import CreateSchedule from '../../forms/CreateSchedule';

export default function Schedules({ masterUID, schedules = [], type }) {
   const [ view, setView ] = useState('display');
   const [ list, setList ] = useState(schedules);

   useEffect(() => {
      setList(schedules);
   }, [schedules]);

   return <div className="schedules card">
      <h3 className="text-center">Master's Schedules</h3>

      {view === 'display' && <ScheduleDisplayView
         list={list}
         setView={setView}
      />}

      {view === 'edit' && <ScheduleEditView
         masterUID={masterUID}
         list={list}
         setList={setList}
         setView={setView}
      />}

      {view === 'create' && <CreateSchedule
         type={type}
         masterUID={masterUID}
         setList={setList}
         setView={setView}
      />}
   </div>;
}
