import React, {useReducer, useContext} from "react";
import reducer from "./reducer";
import axios from 'axios';
import {
    CLEAR_ALERT,
    DISPLAY_ALERT,
    SETUP_USER_BEGIN,
    SETUP_USER_ERROR,
    SETUP_USER_SUCCESS,
    TOGGLE_SIDEBAR,
    LOGOUT_USER, UPDATE_USER_SUCCESS, UPDATE_USER_BEGIN, UPDATE_USER_ERROR, HANDLE_CHANGE, CLEAR_VALUES,
    CREATE_JOB_SUCCESS, CREATE_JOB_ERROR, CREATE_JOB_BEGIN, GET_JOBS_BEGIN, GET_JOBS_SUCCESS, SET_EDIT_JOB
} from "./actions";

const token = localStorage.getItem('token');
const user = localStorage.getItem('user');
const userLocation = localStorage.getItem('location');

const initialState = {
    isLoading: false,
    showAlert: false,
    alertText: '',
    alertType: '',
    user: user ? JSON.parse(user) : null,
    token: token,
    userLocation: userLocation || '',
    showSidebar: false,
    isEditing: false,
    editJobId: '',
    position: '',
    company: '',
    jobLocation: userLocation || '',
    jobTypeOptions: ['full-time', 'part-time', 'remote', 'internship'],
    jobType: 'full-time',
    statusOptions: ['interview', 'declined', 'pending'],
    status: 'pending',
    jobs: [],
    totalJobs: 0,
    page: 1,
    numOfPages: 1,
};

const AppContext = React.createContext();

const AppProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    // AUTHENTICATED REQ MAKER //
    const authFetch = axios.create({
        baseURL: 'api/v1/'
    });

    // requests //

    authFetch.interceptors.request.use((config) => {
            config.headers.common['Authorization'] = `Bearer ${state.token}`;
            return config;
        },
        (error) => {
            return Promise.reject(error);
        })


    // response //

    authFetch.interceptors.response.use((response) => {
            return response;
        },
        (error) => {
            console.log(error.response);
            if (error.response.status === 401) {
                logoutUser();
            }
            return Promise.reject(error);
        })

    // HANDLING CHANGES //
    const handleChange = ({name, value}) => {
        dispatch({
            type: HANDLE_CHANGE,
            payload: {name, value}
        })
    }

    // ALERT FUNCTIONALITY //
    const displayAlert = () => {
        dispatch({type: DISPLAY_ALERT});
        clearAlert();
    };

    const clearAlert = () => {
        setTimeout(() => {
            dispatch({type: CLEAR_ALERT})
        }, 3000)
    };

    // LOCAL STORAGE //
    const addUserToLocalStorage = ({user, token, location}) => {
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token);
        localStorage.setItem('location', location);
    }
    const removeUserFromLocalStorage = ({user, token, location}) => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        localStorage.removeItem('location');
    }

    // USER SETUP //

    const setupUser = async ({currentUser, endPoint, alertText}) => {
        dispatch({type: SETUP_USER_BEGIN});
        try {
            const {data} = await axios.post(`/api/v1/auth/${endPoint}`, currentUser);
            const {user, token, location} = data;
            dispatch({type: SETUP_USER_SUCCESS, payload: {user, token, location, alertText}});
            addUserToLocalStorage({user, token, location});
        } catch (error) {
            dispatch({
                type: SETUP_USER_ERROR,
                payload: {
                    msg: error.response.data.msg
                }
            })
        }
        clearAlert();
    };

    const toggleSidebar = () => {
        dispatch({type: TOGGLE_SIDEBAR});
    };

    // LOGGING USER OUT //
    const logoutUser = () => {
        dispatch({type: LOGOUT_USER})
        removeUserFromLocalStorage();
    }

    // UPDATING USER INFO //
    const updateUser = async (currentUser) => {
        dispatch({type: UPDATE_USER_BEGIN})
        try {
            const {data} = await authFetch.patch('auth/update-user', currentUser)

            const { user, location, token} = data;

            dispatch({
                type: UPDATE_USER_SUCCESS,
                payload: { user, location, token},
            })

            addUserToLocalStorage({user, location, token})
        } catch (error) {
            if (error.response.status !== 401) {
                dispatch({
                    type: UPDATE_USER_ERROR,
                    payload: {msg: error.response.data.msg},
                })
            }
        }
        clearAlert();
    };

    const clearValues = () => {
        dispatch({type: CLEAR_VALUES});
    };

    // CREATING JOBS //
    const createJob = async () => {
        dispatch({type: CREATE_JOB_BEGIN});
        try {
            const {position, company, jobLocation, jobType, status} = state;

            await authFetch.post("/jobs", {
                position, company, jobLocation, jobType, status
            });
            dispatch({
                type: CREATE_JOB_SUCCESS
            });
            dispatch({
                type: CLEAR_VALUES
            });
        } catch (error) {
            if (error.response.status === 401) return
            dispatch({
                    type: CREATE_JOB_ERROR,
                    payload: {msg: error.response.data.msg}
                })
            }
        clearAlert();
    }

    // GET ALL JOBS //
    const getJobs = async () => {
        let url = `/jobs`;
        dispatch({type: GET_JOBS_BEGIN})
        try {
            const {data} = await authFetch(url);
            const {jobs, totalJobs, numOfPages} = data;
            dispatch({
                type: GET_JOBS_SUCCESS,
                payload: {
                    jobs,
                    totalJobs,
                    numOfPages
                }
            })
        } catch(error) {
            console.log(error.response);
            logoutUser();
        }
        clearAlert();
    }
    // EDITING JOBS //
    const setEditJob = (id) => {
        dispatch({type: SET_EDIT_JOB, payload: {id}});
    };

    const editJob = () => {
        console.log('edit job');
    };

    // DELETING JOBS //
    const deleteJob = (id) => {
        console.log(`delete: ${id}`);
    };

    return (
        <AppContext.Provider value={{...state, displayAlert, setupUser, toggleSidebar, logoutUser, updateUser, handleChange, clearValues, createJob, getJobs, setEditJob, deleteJob, editJob}}>
            {children}
        </AppContext.Provider>
    );
};

const useAppContext = () => {
    return useContext(AppContext);
}

export {AppProvider, initialState, useAppContext};