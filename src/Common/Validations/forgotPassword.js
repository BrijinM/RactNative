import {isEmpty} from 'lodash';
import validator from 'validator';
import { INVALID_MOBILE, MOBILE_RESTRICT, EMPTY_MOBILE } from './constants';

const reg = /^[0-9]+$/;

export default function validateForgotScreen(data) {
    const errors = {};
    
    if (reg.test(data.mobile) !== true) {
        errors.mobile = INVALID_MOBILE;
    }
    if((data.mobile).length !==0 && (data.mobile).length <10 || (data.mobile).length >10 ){
        errors.mobile = MOBILE_RESTRICT;
    }
    if(validator.isEmpty(data.mobile)) {
        errors.mobile = EMPTY_MOBILE
    }
    return {
        errors,
        isValid: isEmpty(errors),
    };
}