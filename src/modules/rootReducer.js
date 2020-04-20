// Empty placeholder to reserve reducer namespace.
// Otherwise redux may complain when we asyncrhonously
// inject reducers.

/**
 * Routing to be implemented
 */
import { combineReducers } from 'redux';
import { USER_LOGGED_OUT } from '../actions/types';

import signUp from '../reducers/signUp';
import logIn from '../reducers/logIn';
import verifyOtp from '../reducers/otp';
import resendOtp from '../reducers/resendOtp';
import forgotPassword from '../reducers/forgotPassword';
import schemeList from '../reducers/schemeList';
import schemePlans from '../reducers/schemePlans';
import joinScheme from '../reducers/joinScheme';
import userSchemes from '../reducers/userSchemes';
import appSettings from '../reducers/profileSettings';
import updateProfile from '../reducers/editProfile';
import passwordChange from '../reducers/changePassword';
import internetConnection from '../reducers/networkErrorHandler';
import getNotifications from '../reducers/getNotification';
import postNotification from '../reducers/postNotificationdata';
import goldprice from '../reducers/goldPriceDetails';
import stateList from '../reducers/stateList';
import notificationSwitch from '../reducers/notificationSwitch';
import paymentRequest from '../reducers/paymentRequest';
import transactionDetails from '../reducers/transactionRequest';
import paymentStatus from '../reducers/paymentStatus';
import transactionHistory from '../reducers/transactionHistory';
import memberSchemeByIdData from '../reducers/memberSchemeById';
import sessionExpiredLoader from '../reducers/sessionExpiredLoader';
import globalErrorNotification from '../reducers/globalErrorNotification';
import routeName from '../reducers/setRoute';

const appReducer = combineReducers({
   signUp,
    verifyOtp,
    resendOtp,
    logIn,
    forgotPassword,
    schemeList,
    schemePlans,
    joinScheme,
    userSchemes,
    appSettings,
    updateProfile,
    passwordChange,
    internetConnection,
    getNotifications,
    postNotification,
    goldprice,
    stateList,
    notificationSwitch,
    paymentRequest,
    transactionDetails, 
    paymentStatus,
    transactionHistory,
    memberSchemeByIdData,
    sessionExpiredLoader,
    globalErrorNotification,
    routeName
})

export const rootReducer = (state, action) => {
    if (action.type === USER_LOGGED_OUT) {
        Object.keys(appReducer).map(el => {
            if (el !=='stateList') {
                state[el] = undefined;
            }
        });
    }

  return appReducer(state, action)
}
