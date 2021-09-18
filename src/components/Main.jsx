import React from 'react';
import { useSelector } from 'react-redux';
import List from './List';

const Main = () => {
  const tracker = useSelector((state) => state.list);

  return (
    <main className="page_wrap">
      {tracker.map(list => {
        return <List 
          key={list.id} 
          list={list}
          listLength={list.cards.length}
        />
      })} 
    </main>
  );
};

export default Main;