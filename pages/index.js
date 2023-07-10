import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5555');
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
let timer;

export default function Home() {
  const [speed, setSpeed] = useState(MAX_SPEED);

  const handlePower = async (state) => {
    socket.emit('cmd:motor:power', state);
  }

  const handleSpeed = (value) => {
    socket.emit('cmd:motor:speed', value);
  }

  useEffect(() => {
    socket.on('connection', () => console.log('Socket conneted at port 5555!'));

    socket.on('cmd:motor:power:response', (data) => {
      if (!data.success) alert(data.message);
      console.log('Motor power:', data.state);

      if (data.state === 'on') setSpeed(MAX_SPEED);
      else if (data.state === 'off') setSpeed(0);

      console.log('Power: ' + data.state);
    });

    socket.on('cmd:motor:speed:response', (data) => {
      if (!data.success) alert(data.message);

      setSpeed(data.currentSpeed);
      console.log('Motor speed:', data.currentSpeed);
    });
  }, [])

  return <>
    <h1>Motor Controller</h1>

    <section>
      <h2>Power</h2>
      <button style={styles.button} onClick={() => handlePower('on')}>ON</button>
      <button style={styles.button} onClick={() => handlePower('off')}>OFF</button>
    </section>

    <section>
      <h2>Speed</h2>

      <input
        style={styles.slide}
        type="range"
        step={1}
        min={0}
        max={MAX_SPEED}
        value={speed}
        onChange={({target}) => handleSpeed(Number(target.value))}
        onTouchEnd={() => handleSpeed(0)}
      />
    </section>
  </>
}
