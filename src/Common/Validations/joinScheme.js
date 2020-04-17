import validator from 'validator';
import {isEmpty} from 'lodash';

import { ENTER_NAME, ENTER_ADDRESS, VALID_ID, VALID_PINCODE, VALID_DATE, VALID_CITY, VALID_PROOF, VALID_EMAIL ,VALID_STATE, EMPTY_EMAIL} from './constants';

const regSpace = /^\s+$/;
const emailpregMatch=/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,})$/i;
const pinPregmatch = /^\d{6}$/;

export default function validateScheme(data){
    const errors = {};

    if (regSpace.test(data.name) === true || validator.isEmpty(data.name)) {
        errors.name = ENTER_NAME;
    }
    if (regSpace.test(data.address) === true || validator.isEmpty(data.address)) {
        errors.address = ENTER_ADDRESS;
    }
    if (validator.isEmpty(data.idNumber) || (data.idNumber).length > 20) {
        errors.idNumber = VALID_ID;
    }
    if(pinPregmatch.test(data.pincode)!==true){
        errors.pincode = VALID_PINCODE;
    }
    if (validator.isEmpty(data.dobFormat)) {
        errors.dobFormat = VALID_DATE;
    }
    if (isEmpty(data.city)) {
        errors.city = VALID_CITY;
    }
    if (validator.isEmpty(data.idType)) {
        errors.idType = VALID_PROOF;
    }
    if (validator.isEmpty(data.email)){
        errors.email = EMPTY_EMAIL;
    }
    if (!validator.isEmpty(data.email) && emailpregMatch.test(data.email)===!true) {
        errors.email = VALID_EMAIL;
    }
    if (isEmpty(data.state)) {
        errors.state = VALID_STATE;
    }
    return {
        errors,
        isValid: isEmpty(errors),
    };
}