import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import AddCardForm from './AddCardForm';
import AddNewCard from './AddNewCard';
import Card from './Card';
import { setBackgroundColor } from '../utils';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../action-creatons/list-action-creators';
import { useDrop } from 'react-dnd';
import { ItemTypes } from '../dragndrop/item-types';

const List = ({ list, listLength }) => { 

  const dispatch = useDispatch();
  const { dropCard } = bindActionCreators(actionCreators, dispatch); 

  const {listTitle, cards, id} = list;

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
  }
  const ref = useRef(null);

  const [{isOver}, drop] = useDrop({
    accept: ItemTypes.CARD,
    drop: (dragItem, monitor) => {
      if (id === dragItem.id) {
        return;
      }
      //проверка, если доска пустая
      if (!listLength) {
        const listId = id;
        dropCard({listId, dragItem})
      }
    }, 
    collect: (monitor) => {      
      return {
        isOver: monitor.isOver({ shallow: true }),      
      }
    }
  })

  drop(ref);

  return (
    <section 
      ref={ref}
      className="list_wrap" 
      onDragOver={(evt) => onDragOverHandler(evt)}
      onDragLeave={(evt) => dragLeaveHandler(evt)}
      onDragEnd={(evt) => dragEndHandler(evt)}
      onDrop={(evt) => dropCardHandler(evt)}
    >

      <h2 className="list_title">{listTitle}</h2>
      
      {cards.map((card) => { 
        return <Card 
          key={card.id} 
          listLength={listLength}
          card={card} 
          listId={id}
        />
      })}
      
      <AddNewCard openForm={openForm} setOpenForm={setOpenForm} />

      {openForm && 
        <AddCardForm setOpenForm={setOpenForm} listId={id}/>
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
  listLength: PropTypes.number.isRequired
}

export default List;