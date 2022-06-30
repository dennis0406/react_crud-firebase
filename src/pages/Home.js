import React from 'react';
import CategoryTitle from '../components/CategoryTitle';
import { Header } from '../components/Header';
import Posts from '../components/Posts';


function Home() {
  
  return (
    <div className=' bg-body'>
      <h1 className='title'>home</h1>
      <Header></Header>
      <CategoryTitle category={"Passerelles Numériques Vietnam"}/>
          <Posts/>
      <CategoryTitle category={"What you know about"}/>
          <Posts/>
          
    </div>
  );
}

export default Home;