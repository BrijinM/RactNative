import validator from 'validator';
import {isEmpty} from 'lodash';
import { INVALID_MOBILE, MOBILE_RESTRICT, INVALID_PASSWORD, PASSWORD_RESTRICT, INVALID_NAME, PASSWORD_MISMATCH, EMPTY_MOBILE, EMPTY_PASSWORD, EMPTY_CONFIRM_PASSWORD }  from './constants';

const reg = /^[0-9]+$/;
const regSpace = /^\s+$/;

export default function validateSignupScreen(data) {
    const errors = {};

    if (regSpace.test(data.name) === true || validator.isEmpty(data.name)) {
        errors.name = INVALID_NAME;
    }
    if (reg.test(data.mobile)!== true) {
        errors.mobile = INVALID_MOBILE;
    }
    if((data.mobile).length !== 0 && (data.mobile).length < 10 || (data.mobile).length >10 ){
        errors.mobile = MOBILE_RESTRICT;
    }
    if (validator.isEmpty(data.password)) {
        errors.password = INVALID_PASSWORD;
    }
    if((data.password).length !==0 && (data.password).length <8){
        errors.password = PASSWORD_RESTRICT;
    }
    if (validator.isEmpty(data.confirmpassword)) {
        errors.confirmpassword = INVALID_PASSWORD;
    }
     if((data.confirmpassword).length !==0 && (data.confirmpassword).length <8){
        errors.confirmpassword = PASSWORD_RESTRICT;
    }
    if (!validator.equals(data.password, data.confirmpassword)) {
        errors.confirmpassword = PASSWORD_MISMATCH;
    }
    if(validator.isEmpty(data.mobile)) {
        errors.mobile = EMPTY_MOBILE
    }
    if(validator.isEmpty(data.password)) {
        errors.password = EMPTY_PASSWORD
    }
    if(validator.isEmpty(data.confirmpassword)) {
        errors.confirmpassword = EMPTY_CONFIRM_PASSWORD
    }
    return {
        errors,
        isValid: isEmpty(errors),
    };
}
