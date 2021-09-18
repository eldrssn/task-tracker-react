import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { getStylesForCard } from '../utils';
import * as actionCreators from '../action-creatons/list-action-creators';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useDrag, useDrop } from 'react-dnd';
import { ItemTypes } from '../dragndrop/item-types';


const Card = ({ card, listId, listLength }) => {

  const dispatch = useDispatch(); 
  const { doneCard, deleteCard, dropCard } = bindActionCreators(actionCreators, dispatch); 

  const {id, title, description, theme, done, importance} = card;

  const ref = useRef(null);

  const [{isOver}, drop] = useDrop({
    accept: ItemTypes.CARD,
    drop: (dragItem, monitor) => {
      if (id === dragItem.id) {
        return;
      }
      // проверка, если доска не пустая
      if (listLength) {
        dropCard({id, listId, dragItem})
      }
    }, 
    collect: (monitor) => {      
      return {
        isOver: monitor.isOver({ shallow: true }),      
      }
    }
  })
  
  const [{isDragging}, drag] = useDrag({
    type: ItemTypes.CARD,
    item: () => {
      return {id, listId};
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  })
  
  drag(drop(ref));
  
  return (
    <article 
      ref={ref}
      className={getStylesForCard(done, importance)} 
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
            <button type="button" onClick={() => doneCard(id)} className="card_check">
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
  listId: PropTypes.number.isRequired,
  listLength: PropTypes.number.isRequired
}


export default Card;