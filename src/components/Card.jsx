import React from 'react';
import PropTypes from 'prop-types';
import { getStylesForCard } from '../utils';

const Card = ({
  card, 
  renderedCards, 
  currentList, 
  setCurrentList, 
  currentCard, 
  setCurrentCard,
  setRenderedCards}) => {

  const {id, title, description, theme, done, importance} = card;

  const makeCardDone = (id) => { 
    const doneCard = renderedCards.find(item => item.id === id);
    doneCard.done = !doneCard.done;
    renderedCards.splice(renderedCards.indexOf(doneCard), 1);
    renderedCards.push(doneCard);
    setRenderedCards([...renderedCards])
  }

  const deleteCard = (id) => {
    setRenderedCards([...renderedCards.filter(card => card.id !== id)])
  }

  const dragLeaveHandler = (evt) => {
    evt.target.style.boxShadow = 'none'
  }
  
  const dragStartHandler = (evt, list, card) => {
    setCurrentList(list);
    setCurrentCard(card);
  }
  
  const dragEndHandler = (evt, list, card) => {
    evt.target.style.boxShadow = 'none'
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
  
  const dropHandler = (evt, list, card) => {
    evt.preventDefault();
    const currentIndex = currentList.indexOf(currentCard);
    currentList.splice(currentIndex, 1);
    const dropIndex = list.indexOf(card);
    list.splice(dropIndex + 1, 0, currentCard);
  
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


  return (
    <article 
      className={getStylesForCard(done, importance)} 
      draggable={done ? false : true}
      onDragLeave={(evt) => dragLeaveHandler(evt)}
      onDragStart={(evt) => dragStartHandler(evt, renderedCards, card)}
      onDragEnd={(evt) => dragEndHandler(evt, renderedCards, card)}
      onDrop={(evt) => dropHandler(evt, renderedCards, card)}
    >
      <h3 className="card_title">{title}</h3>
      <p className="card_text">{description}</p>
      <div className="card_bottom_wrap">
        {theme ? <p className="card_theme">{theme}</p> : null}
        
        {done ? 
            <button type="button" onClick={() => deleteCard(id)} className="card_check">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M16 7V17C16 18.1046 15.1046 19 14 19H6C4.89543 19 4 18.1046 4 17V7L2 7V3H6.5L7.44721 1.10557C7.786 0.428005 8.47852 0 9.23607 0H10.7639C11.5215 0 12.214 0.428004 12.5528 1.10557L13.5 3H18V7L16 7ZM17 4V6L3 6V4H7.11803L8.34164 1.55279C8.51103 1.214 8.8573 1 9.23607 1H10.7639C11.1427 1 11.489 1.214 11.6584 1.55279L12.882 4H17ZM5 17C5 17.5523 5.44772 18 6 18H14C14.5523 18 15 17.5523 15 17V7H5V17Z" fill="white"/>
              </svg> 
            </button>
          :
            <button type="button" onClick={() => makeCardDone(id)} className="card_check">
              <svg width="20" height="20" viewBox="0 0 24 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path id="check_icon" fillRule="evenodd" clipRule="evenodd"
                d="M24 2.62787L9.54844 19.3028L0 9.75432L2.83722 6.91709L9.33855 13.4184L20.9678 0L24 2.62787Z" fill="white" />
              </svg> 
            </button>
          }

      </div>
    </article>
  );
};

Card.propType = {
  card: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    theme: PropTypes.string.isRequired,
    importance: PropTypes.bool.isRequired,
    done: PropTypes.bool.isRequired,
  }).isRequired, 
  renderedCards:  PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      theme: PropTypes.string.isRequired,
      importance: PropTypes.bool.isRequired,
      done: PropTypes.bool.isRequired,
    }).isRequired
  ), 
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
    description: PropTypes.stringd,
    theme: PropTypes.string,
    importance: PropTypes.bool,
    done: PropTypes.bool,
  }), 
  setCurrentCard: PropTypes.func.isRequired,
  setRenderedCards: PropTypes.func.isRequired
}


export default Card;