import { ADD_FLASH_MESSAGE, DELETE_FLASH_MESSAGE } from '../actions/types.js';
import shortid from 'shortid';

export default (state = [], action = {}) => {
  switch(action.type){
    case ADD_FLASH_MESSAGE:
      return [
        ...state,
        {
          id: shortid.generate(),
          type: action.message.type,
          text: action.message.text
        }
      ];
    case DELETE_FLASH_MESSAGE:
      return state.filter(message => message.id !== action.id);﻿


    default: return state;

  }
}