export const getToken = (state) => state.navigation.auth.token;
export const getUserId = (state) => state.navigation.auth.userId;
export const getCreateUserSuccess = (state) => state.navigation.auth.createSuccess;
export const getErrorMessage = (state) => state.navigation.auth.createError;
export const getLogInMessage = (state) => state.navigation.auth.logInMessage;
export const getLogInError = (state) => state.navigation.auth.logInError;
