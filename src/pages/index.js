import axios from "axios";
import React, { useState, useEffect } from 'react';
import $ from "jquery";
import config from '../../config.json';

const root = config[config.root];

export default function Home({welcome}) {
  return (<h1>{welcome}</h1>);
}

export async function getServerSideProps(){
  return {
    props: {welcome: 'Welcome a bot!'}
  }
}
