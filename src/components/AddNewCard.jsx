import React from 'react';
import PropTypes from 'prop-types';

const AddNewCard = ({openForm, setOpenForm}) => {


  return (
    <button 
      onClick={() => setOpenForm(!openForm)} 
      className={openForm ? 'hidden' : 'new_card'} 
      type="button" 
    >
      + add new card
    </button>
  );
}

AddNewCard.propTypes = {
  openForm: PropTypes.bool.isRequired, 
  setOpenForm: PropTypes.func.isRequired
}

export default AddNewCard;