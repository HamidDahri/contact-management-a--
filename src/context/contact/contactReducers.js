import { Action } from "history";
import { ADD_CONTACT,CONTACT_ERROR, CLEAR_CURRENT, CLEAR_FILTER, DELETE_CONTACT, FILTER_CONTACT, SET_CURRENT, UPDATE_CONTACT, GET_CONTACTS, CLEAR_CONTACTS } from "../types";

export default (state, action) => {
    switch(action.type){
       case GET_CONTACTS:
        return {
            ...state , 
            contacts: action.payload,
            loading: false
        }
       case CLEAR_CONTACTS:
        return {
            ...state , 
            contacts: null , 
            filtered: null, 
            error: null , 
            current: null
        }
       case ADD_CONTACT:
       return {
           ...state, 
           contacts: [...state.contacts , action.payload]
       }
       case DELETE_CONTACT:
           return {
               ...state, 
               contacts: state.contacts.filter(contact => contact._id !== action.payload)
           }
       case SET_CURRENT:
           return {
               ...state , 
               current: action.payload
           }    
       case CLEAR_CURRENT:
           return {
               ...state, 
               current: null
           }   
       case UPDATE_CONTACT:
           return {
               ...state , 
               contacts: state.contacts.map( contact => 
                   contact._id === action.payload._id ? action.payload : contact)
           }     
       case CLEAR_FILTER: 
           return {
               ...state ,
               filtered: null
           }    
       case FILTER_CONTACT: 
           return {
               ...state,
               filtered: state.contacts.filter( contact => {
                   const regex = new RegExp(`${action.payload}`, 'gi');
                   return contact.name.match(regex) || contact.email.match(regex)
               })
           } 
        case CONTACT_ERROR: 
        return {
            ...state , 
            error: action.payload
        }      
        default: 
        return state;
    }
}