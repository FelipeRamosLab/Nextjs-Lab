import { useEffect } from 'react'; 
import geckos from '@geckos.io/client';

export default function Home() {
    useEffect(() => {
        const channel = geckos({ url: 'http://localhost', port: 9208 }); // default port is 9208

        channel.onConnect(error => {
            if (error) {
                console.error(error.message);
                return
            }

            channel.on('chat message', data => {
                console.log(`You got the message ${data}`);
            });

            channel.on('stream-chunk', (chunk) => {
                console.log(chunk);
                const video = document.querySelector('video');
                const blob = new Blob(chunk.data, {type: 'video/mp4'});
                const source = video.querySelector('source');

                source.type = 'video/mp4';
                source.src = URL.createObjectURL(blob);
            });

            channel.emit('chat message', 'a short message sent to the server');
        });
    }, []);

    return <>
      <h1>NextJS Lab</h1>
      <video autoPlay controls>
        <source></source>
      </video>
    </>
}
 