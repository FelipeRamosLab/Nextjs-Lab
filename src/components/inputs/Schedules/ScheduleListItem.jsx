import Button from '@mui/material/Button';
import configs from '../../../../config.json';

export default function ScheduleListItem({ schedule, deleteSchedule, ...props }) {
   return (
      <li {...props} className="schedule">
         {deleteSchedule && <Button className="delete-button" variant="text" onClick={() => deleteSchedule(schedule?._id)}>X</Button>}

         {!deleteSchedule && <div className="weekdays">
            {configs.daysOfWeek.map(day => {
               const isSelected = schedule.weekdays.find(item => item === day);
               return <span key={String(Math.random())} className={`light-checkbox display ${isSelected ? 'selected' : ''}`}>{day}</span>
            })}
         </div>}

         {deleteSchedule && <p>{schedule.weekdays.join(', ')}</p>}

         <span className="time">{schedule.startTime}</span> - <span className="time">{schedule.endTime}</span>
      </li>
   );
}
