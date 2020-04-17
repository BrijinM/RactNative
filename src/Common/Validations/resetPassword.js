import validator from 'validator';
import {isEmpty} from 'lodash';

import {PASS_COMPARE, PASSWORD_RESTRICT, PASSWORD_MISMATCH, EMPTY_PASSWORD, EMPTY_NEW_PASSWORD, EMPTY_CONFIRM_PASSWORD } from './constants';

export default function validateResetScreen(data) {
    const errors = {};
    if (validator.isEmpty(data.newpassword)) {
        errors.newpassword = EMPTY_PASSWORD;
    }
    if (validator.isEmpty(data.confirmpassword)) {
        errors.confirmpassword = EMPTY_CONFIRM_PASSWORD;
    }
    if (!validator.equals(data.newpassword, data.confirmpassword)) {
        errors.confirmpassword = PASSWORD_MISMATCH;
    }
    if((data.newpassword).length !==0 && (data.newpassword).length <8){
        errors.newpassword = PASSWORD_RESTRICT;
    }
    if(!isEmpty(data.splitter) && validator.equals(data.splitter, 'Settings') && validator.isEmpty(data.currentpassword) ){
        errors.currentpassword = EMPTY_PASSWORD;
    }
    if(!isEmpty(data.splitter) && validator.equals(data.splitter, 'Settings')&& validator.isEmpty(data.newpassword) ){
        errors.newpassword = EMPTY_NEW_PASSWORD;
    } 
    if(!isEmpty(data.splitter) && validator.equals(data.splitter, 'Settings')&& !validator.isEmpty(data.currentpassword) && !validator.equals(data.oldPassword, data.currentpassword)){
        errors.currentpassword = PASS_COMPARE;
    }
    if(!isEmpty(data.splitter) && validator.equals(data.splitter, 'Settings')&& !validator.isEmpty(data.newpassword)  && validator.equals(data.currentpassword, data.newpassword)){
        errors.newpassword = PASSWORD_MISMATCH;
    }
    if (!isEmpty(data.splitter) && validator.equals(data.splitter, 'Settings')&& !validator.isEmpty(data.confirmpassword) && !validator.equals(data.newpassword, data.confirmpassword)){
        errors.confirmpassword = PASSWORD_MISMATCH
    }
    
    return {
        errors,
        isValid: isEmpty(errors),
    };
}
