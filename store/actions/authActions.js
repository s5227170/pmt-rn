import { ThunkAction } from 'redux-thunk';
import firebase from '../../firebase/firebase';

export const SET_LOADING = 'SET_LOADING';
export const SET_SUCCESS = 'SET_SUCCESS';
export const SET_ERROR = 'SET_ERROR';
export const NEED_VERIFICATION = 'NEED_VERIFICATION';
export const SET_USER = 'SET_USER';

export const signup = (email, password, forename, surname) => {
    return async dispatch => {
        try {
            dispatch({
                type: SET_LOADING,
                payload: true
            });
        const res = await firebase.auth().createUserWithEmailAndPassword(email, password);
            const currentTime = new Date();
            new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(currentTime);
        if(res.user) {
                const User = {
                    id: res.user.uid,
                    forename: forename,
                    surname: surname,
                    email: email,
                    createdAt: currentTime,
                    admin: false,
                    verified: false,
                    avatar: "",
                    favorites: [],
                }
                await firebase.firestore().collection('/users').doc(res.user.uid).set(User);
                await res.user.sendEmailVerification();
                dispatch({
                    type: NEED_VERIFICATION
                });
                dispatch({
                    type: SET_USER,
                    payload: User
                });
                dispatch({
                    type: SET_SUCCESS,
                    payload: true
                });
                dispatch({
                    type: SET_LOADING,
                    payload: false
                });
            }
        }catch(e) {
            dispatch({
                type: SET_ERROR,
                payload: e.Message
            });
            dispatch({
                type: SET_LOADING,
                payload: true
            });
        }
    }
}

export const getUserById = (id) => {
    return async dispatch => {
        try {
            const user = await firebase.firestore().collection('users').doc(id).get();
            if (user.exists) {
                const userData = user.data();
                dispatch({
                    type: SET_USER,
                    payload: userData
                });
            }
        } catch (e) {
            dispatch({
                type: SET_ERROR,
                payload: e.Message
            })
        }
    }
}

export const signin = (email, password) => {
    return async dispatch => {
        try {
            dispatch({
                type: SET_LOADING,
                payload: true
            });
            await firebase.auth().signInWithEmailAndPassword(email, password).then(test => {
                dispatch({
                    type: SET_SUCCESS,
                    payload: true
                });
                dispatch({
                    type: SET_LOADING,
                    payload: false
                })
            });
        } catch (e) {
            dispatch({
                type: SET_ERROR,
                payload: e.Message
            });
            dispatch({
                type: SET_LOADING,
                payload: false
            });
        }
    }
}

export const signout = () => {
    return async dispatch => {
        try {
            dispatch({
                type: SET_LOADING,
                payload: true
            });
            await firebase.auth().signOut().then(() => {
                dispatch({
                    type: SET_SUCCESS,
                    payload: true
                })
                dispatch({
                    type: SET_USER,
                    payload: null
                });
                dispatch({
                    type: SET_LOADING,
                    payload: false
                });
            })
        } catch (e) {
            console.log(e);
            dispatch({
                type: SET_ERROR,
                payload: e.Message
            });
            dispatch({
                type: SET_LOADING,
                payload: false
            });
        }
    }
}

export const setNeedVerification = () => {
    return dispatch => {
        dispatch({
            type: NEED_VERIFICATION
        });
    }
}

export const setSuccess = (success) => {
    return dispatch => {
        dispatch({
            type: SET_SUCCESS,
            payload: success
        });
    }
}