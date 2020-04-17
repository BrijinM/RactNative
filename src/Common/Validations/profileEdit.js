import validator from 'validator';
import {isEmpty} from 'lodash';

import { ENTER_NAME,ENTER_ADDRESS, VALID_PINCODE, VALID_DATE, VALID_CITY, VALID_EMAIL, VALID_GENDER, VALID_STATE, EMPTY_EMAIL} from './constants';

const regSpace = /^\s+$/;
const emailpregMatch=/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,})$/i;
const pinPregmatch = /^\d{6}$/;


export default  function validateEditprofile(data){
    const errors = {};

    if(validator.isEmpty(data.name)){
        errors.name = ENTER_NAME;
    }
    if (validator.isEmpty(data.email)){
        errors.email = EMPTY_EMAIL;
    }
    if(!validator.isEmpty(data.email) && emailpregMatch.test(data.email)!==true){
        errors.email = VALID_EMAIL;
    }
    if(validator.isEmpty(data.dob)){
        errors.dob=VALID_DATE;
    }
    if(validator.isEmpty(data.gender)){
        errors.gender = VALID_GENDER;
    }
    if(regSpace.test(data.address)===true || validator.isEmpty(data.address)){
        errors.address = ENTER_ADDRESS;
    }
    if(validator.isEmpty(data.city)){
        errors.city = VALID_CITY;
    }
    if(pinPregmatch.test(data.pincode)!==true){
        errors.pincode = VALID_PINCODE;
    } 
    if (isEmpty(data.state)) {
        errors.state = VALID_STATE;
    }  
    return {
        errors,
        isValid: isEmpty(errors),
    };
}