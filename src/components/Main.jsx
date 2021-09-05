import React, { useState } from 'react';
import List from './List';
import { data } from '../data';

const Main = () => {

  const [tracker, setTracker] = useState(data);

  const [currentList, setCurrentList] = useState([])
  const [currentCard, setCurrentCard] = useState({})

  return (
    <main className="page_wrap">
      {tracker.map(list => {
        return <List 
          setTracker={setTracker} 
          key={list.id} 
          list={list}
          currentList={currentList}
          currentCard={currentCard}
          setCurrentList={setCurrentList}
          setCurrentCard={setCurrentCard}
        />
      })}
    </main>
  );
};

export default Main;