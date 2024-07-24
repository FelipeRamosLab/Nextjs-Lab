import NoSchedule from './NoSchedule';
import ScheduleListItem from './ScheduleListItem';
import Button from '@mui/material/Button';

export default function ScheduleDisplayView({ list, setView }) {
   return (<>
      <ul className="schedules-wrap">
         {!list.length && <NoSchedule type="create" />}

         {list.map(schedule => (
            <ScheduleListItem
               key={String(Math.random())}
               schedule={schedule}
            />
         ))}
      </ul>
      
      <Button variant="contained" fullWidth={true} onClick={() => setView('edit')}>
         EDIT
      </Button>
   </>);
}