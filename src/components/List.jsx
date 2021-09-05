import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AddCardForm from './AddCardForm';
import AddNewCard from './AddNewCard';
import Card from './Card';
import { setBackgroundColor } from '../utils';

const List = ({list, 
  currentList, 
  setCurrentList, 
  currentCard, 
  setCurrentCard}) => { 

  const {listTitle, cards} = list;

  const [renderedCards, setRenderedCards] = useState(cards);
  const [openForm, setOpenForm] = useState(false);


  const onDragOverHandler = (evt) => {
    evt.preventDefault();
    setBackgroundColor(evt, 'list_wrap', '#686868')    
  }

  const dragLeaveHandler = (evt) => {
    setBackgroundColor(evt, 'list_wrap', '#353535d2');    
  }

  const dragEndHandler = (evt) => {
    setBackgroundColor(evt, 'list_wrap', '#353535d2');    
  }
  
  const dropCardHandler = (evt, list) => {
    setBackgroundColor(evt, 'list_wrap', '#353535d2');    

    if (!list.length) {
      list.push(currentCard);
      const currentIndex = currentList.indexOf(currentCard);
      currentList.splice(currentIndex, 1);

      setRenderedCards(renderedCards.map(item => {
        if (item.id === list.id) {
          return list;
        }
        if (item.id === currentList.id) {
          return currentList;
        }
        return item;
      }))
    }

  }

  return (
    <section 
      className="list_wrap" 
      onDragOver={(evt) => onDragOverHandler(evt)}
      onDragLeave={(evt) => dragLeaveHandler(evt)}
      onDragEnd={(evt) => dragEndHandler(evt)}
      onDrop={(evt) => dropCardHandler(evt, renderedCards)}
    >
      <h2 className="list_title">{listTitle}</h2>

      {renderedCards.map(card => {
        return <Card 
          key={card.id} 
          renderedCards={renderedCards} 
          card={card} 
          currentList={currentList}
          currentCard={currentCard}
          setCurrentList={setCurrentList}
          setCurrentCard={setCurrentCard}
          setRenderedCards={setRenderedCards}
        />
      })}

      <AddNewCard openForm={openForm} setOpenForm={setOpenForm} />

      {openForm && 
        <AddCardForm 
          renderedCards={renderedCards} 
          setRenderedCards={setRenderedCards}  
          setOpenForm={setOpenForm}
        />
      }
      
    </section>
  );
};

List.propTypes = {
  list: PropTypes.shape({
    id: PropTypes.number.isRequired,
    listTitle: PropTypes.string.isRequired,
    cards: PropTypes.array.isRequired
  }).isRequired,

  currentList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      description: PropTypes.string,
      theme: PropTypes.string,
      importance: PropTypes.bool,
      done: PropTypes.bool,
    })
  ),
  setCurrentList: PropTypes.func.isRequired, 
  currentCard: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    description: PropTypes.string,
    theme: PropTypes.string,
    importance: PropTypes.bool,
    done: PropTypes.bool,
  }), 
  setCurrentCard: PropTypes.func.isRequired,
}

export default List;