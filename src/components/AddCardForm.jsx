import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';
import * as actionCreators from '../action-creatons/list-action-creators';


const AddCardForm = ({setOpenForm, listId}) => {

  const dispatch = useDispatch();                                   
  const { addCard } = bindActionCreators(actionCreators, dispatch); 

  const defaultCard = {
    id: null,
    title: '',
    description: '',
    theme: '',
    importance: false,
    done: false,
  }

  const [newCard, setNewCard] = useState(defaultCard);

  const resetForm = (evt) => {
    if (evt.currentTarget.classList.contains('new_card_form')) {
      evt.currentTarget.reset();
    }
    
    setNewCard(defaultCard);
    setOpenForm(false);
  }

  const submitForm = (evt) => {
    evt.preventDefault();
    addCard({id: listId, card: {...newCard, id: Date.now()}});
    resetForm(evt);
  }

  return (
    <form className="new_card_form" onSubmit={submitForm}>
      <article className="card form">
        <h3 className="card_title">
          <label htmlFor="title"/>
          <input 
            onChange={evt => setNewCard({...newCard, title: evt.target.value})}
            type="text" 
            id="title" 
            name="card_title" 
            minLength="1" 
            placeholder="title" 
            required
          />
        </h3>
        <p className="card_text">
          <label htmlFor="text"/>
          <textarea 
            onChange={evt => setNewCard({...newCard, description: evt.target.value})}
            type="text" 
            id="text" 
            name="card_text" 
            placeholder="description" 
          ></textarea>
        </p>
        <div className="card_bottom_wrap">
          <p className="card_theme">
            <label htmlFor="theme"/>
            <input 
              onChange={evt => setNewCard({...newCard, theme: evt.target.value})}
              type="text" 
              id="theme" 
              name="card_theme" 
              placeholder="theme"
            />
          </p>
          <button 
            onClick={evt => setNewCard({...newCard, importance: !newCard.importance})}
            type="button" 
            className={newCard.importance ? "is_important button--important" : "is_important"}
          >
            <svg width="30" height="30" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10 19C14 19 16.5 15.1026 16.5 12.1795C16.5 6.82051 12.5 2.92308 9.5 0C10.5 2.4359 10.4484 7.34994 7 10.2308C6 9.25641 6.5 6.33333 7 5.84615C5.5 6.33333 3 8.28205 3 12.1795C3 16.0769 6 19 10 19Z"
                fill="#262626" />
            </svg>
          </button>
        </div>
        <div className="form_buttons_wrap">
          <button type="submit">add</button>
          <button onClick={resetForm} type="reset">cancel</button>
        </div>
      </article>
    </form>
  );
};

AddCardForm.propTypes = {
  setOpenForm: PropTypes.func.isRequired,
  listId: PropTypes.number.isRequired
}

export default AddCardForm;