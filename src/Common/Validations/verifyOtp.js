import validator from 'validator';
import {isEmpty} from 'lodash';

import { INVALID_OTP } from './constants';

export default function validationVerifyOtp(data) {
    const errors = {};
    if (validator.isEmpty(data.otpText)) {
        errors.otpText = INVALID_OTP;
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
}
