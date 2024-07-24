export default function NoSchedule({ text, smallText, type = 'CREATE' }) {
   return (
      <li className="schedule text-center">
         <p>{text || 'There is nothing scheduled yet!'}</p>
         <small>{smallText || `Click on the "${type.toLocaleUpperCase()}" button bellow to add the first schedule.`}</small>
      </li>
   );
}
