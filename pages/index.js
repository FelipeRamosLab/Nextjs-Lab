import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

let timer;
const MAX_SPEED = 1000;
const styles = {
  button: {
    padding: '10px 30px',
    margin: '10px'
  },
  slide: {
    width: '100%'
  }
};

const socket = io('http://localhost:5555');

socket.on('testFE:connection', received => {
  debugger;
})

export default function Home() {
  const [speed, setSpeed] = useState(MAX_SPEED);

  useEffect(() => {
    socket.emit('test:connection');
  }, []);

  const handlePower = async (state) => {
    try {
      const response = await fetch('http://192.168.15.45/motor/power/' + state, {
        headers: { 'Content-Type': 'application/json' },
        method: 'GET'
      });
      const data = await response.json();
  
      if (data.success) {
        if (state === 'on') setSpeed(MAX_SPEED);
        else if (state === 'off') setSpeed(0);
        console.log('Power: ' + state);
      } else {
        throw data;
      }
    } catch (err) {
      throw err.message;
    }
  }

  const handleSpeed = (value) => {
    setSpeed(value);
    if (timer) clearTimeout(timer);
    timer = setTimeout(async () => {
      try {
        const response = await fetch('http://192.168.15.45/motor/speed/' + value, {
          headers: { 'Content-Type': 'application/json'},
          method: 'GET'
        });
        const data = await response.json();
    
        if (data.success) {
          console.log('Speed: ' + value);
        } else {
          throw data;
        }
      } catch (err) {
        throw err.message;
      }
    }, 100);
  }

  return <>
    <h1>Motor Controller</h1>

    <section>
      <h2>Power</h2>
      <button style={styles.button} onClick={() => handlePower('on')}>ON</button>
      <button style={styles.button} onClick={() => handlePower('off')}>OFF</button>
    </section>

    <section>
      <h2>Speed</h2>

      <input style={styles.slide} type="range" step={1} min={0} max={MAX_SPEED} value={speed} onChange={({target}) => handleSpeed(Number(target.value))} />
    </section>
  </>
}
