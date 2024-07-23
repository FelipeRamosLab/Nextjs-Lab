import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';

export default function LightCheckbox({ label = '', formData = {}, onClick = () => {}}) {
   const [ currentValue, setCurrentValue ] = useState(formData.weekdays.get(label));

   return <Button
      className={`light-checkbox ${currentValue ? 'selected' : ''}`}
      onClick={() => {
         onClick(label, !currentValue);
         setCurrentValue(!currentValue);
      }}
   >
      {label}
   </Button>
}
