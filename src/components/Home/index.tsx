import React from 'react';
import MyTasks from '../MyTasks';
import AddTask from '../AddTask';

type Props = {};

const Home: React.FC<Props> = () => {
   return <section id="home-content">
      <h2>My Tasks</h2>

      <MyTasks />
      <AddTask />
   </section>
}

export default Home;
