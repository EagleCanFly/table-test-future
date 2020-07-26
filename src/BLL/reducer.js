import {API} from "../DAL/api";

const SET_DATA = 'SET_DATA',
    SORT_COLUMN = 'SORT_COLUMN',
    SEND_ROW_TO_BOTTOM = 'SEND_ROW_TO_BOTTOM',
    SEND_DATA_TO_BOTTOM_DATA_LINES = 'SEND_DATA_TO_BOTTOM_DATA_LINES',
    REMOVE_ROW_FROM_BOTTOM = 'REMOVE_ROW_FROM_BOTTOM',
    TOGGLE_ADD_MODE = 'TOGGLE_ADD_MODE',
    ADD_LINE = 'ADD_LINE',
    TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING',
    TOGGLE_IS_ERROR = 'TOGGLE_IS_ERROR',
    TOGGLE_FORM_EMPTY_ERROR = 'TOGGLE_FORM_EMPTY_ERROR'

const initialState = {
    data: [
        // {
        //     id: 101,
        //     firstName: 'Sue',
        //     lastName: 'Corson',
        //     email: 'DWhalley@in.gov',
        //     phone: '(612)211-6296',
        //     address: {
        //         streetAddress: '9792 Mattis Ct',
        //         city: 'Waukesha',
        //         state: 'WI',
        //         zip: '22178'
        //     },
        //     description: 'et lacus magna dolor...',
        // }

    ],
    sortOrder: null,
    bottomRow: [],
    bottomDataLines: [],
    isAddLineActive: false,
    isFetching: false,
    isError: false,
    isFormEmptyError: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_DATA: {
            return {
                ...state,
                data: action.data
            }
        }
        case ADD_LINE: {
            return {
                ...state,
                data: [...state.data, action.payload]
            }
        }
        case SORT_COLUMN: {
            if (action.sortOrder === 'toTop') {
                action.param === "id" || action.param === "phone"
                    ? state.data.sort((a, b) => b[action.param] - a[action.param])
                    : state.data.sort((a, b) => {
                        const nameA = a[action.param].toLowerCase(), nameB = b[action.param].toLowerCase()
                        if (nameA < nameB)
                            return -1
                        if (nameA > nameB)
                            return 1
                        return 0
                    })
            } else if (action.sortOrder === 'toBottom') {
                action.param === "id" || action.param === "phone"
                    ? state.data.sort((a, b) => a[action.param] - b[action.param])
                    : state.data.sort((a, b) => {
                        const nameA = a[action.param].toLowerCase(), nameB = b[action.param].toLowerCase()
                        if (nameA > nameB)
                            return -1
                        if (nameA < nameB)
                            return 1
                        return 0
                    })
            }
            return {
                ...state,
                data: [...state.data],
                sortOrder: action.sortOrder
            }
        }
        case SEND_ROW_TO_BOTTOM: {
            return {
                ...state,
                bottomRow: [...state.bottomRow, action.payload]
            }
        }
        case SEND_DATA_TO_BOTTOM_DATA_LINES: {
            return {
                ...state,
                bottomDataLines: [...state.bottomDataLines, action.payload]
            }
        }
        case REMOVE_ROW_FROM_BOTTOM: {
            return {
                ...state,
                bottomRow: []
            }
        }
        case TOGGLE_ADD_MODE: {
            return {
                ...state,
                isAddLineActive: action.value
            }
        }
        case TOGGLE_IS_FETCHING: {
            return {
                ...state,
                isFetching: action.value
            }
        }
        case TOGGLE_IS_ERROR: {
            return {
                ...state,
                isError: action.value
            }
        }
        case TOGGLE_FORM_EMPTY_ERROR: {
            return {
                ...state,
                isFormEmptyError: action.value
            }
        }
        default: {
            return state
        }
    }
}

export const setData = (data) => {
    return {
        type: SET_DATA,
        data
    }
}
export const addLine = (payload) => {
    return {
        type: ADD_LINE,
        payload
    }
}
export const sortColumn = (param, sortOrder) => {
    return {
        type: SORT_COLUMN,
        param,
        sortOrder
    }
}
export const sendRowToBottom = (payload) => {
    return {
        type: SEND_ROW_TO_BOTTOM,
        payload
    }
}
export const sendDataToBottomDataLines = (payload) => {
    return {
        type: SEND_DATA_TO_BOTTOM_DATA_LINES,
        payload
    }
}
export const removeRowFromBottom = () => {
    return {
        type: REMOVE_ROW_FROM_BOTTOM
    }
}
export const toggleAddMode = (value) => {
    return {
        type: TOGGLE_ADD_MODE,
        value
    }
}
export const toggleIsFetching = (value) => {
    return {
        type: TOGGLE_IS_FETCHING,
        value
    }
}
export const toggleIsError = (value) => {
    return {
        type: TOGGLE_IS_ERROR,
        value
    }
}
export const toggleFormEmptyError = (value) => {
    return {
        type: TOGGLE_FORM_EMPTY_ERROR,
        value
    }
}
export default reducer;

export const getData = (amount) => {
    return async (dispatch) => {
        try {
            dispatch(toggleIsError(false))
            if (amount === 'small') {
                dispatch(toggleIsFetching(true))
                const response = await API.getSmallAmount()
                dispatch(setData(response.data))
                dispatch(toggleIsFetching(false))
            } else if (amount === 'large') {
                dispatch(toggleIsFetching(true))
                const response = await API.getBigAmount()
                dispatch(setData(response.data))
                dispatch(toggleIsFetching(false))
            }
        } catch (e) {
            dispatch(toggleIsFetching(false))
            dispatch(toggleIsError(true))
        }
    }
}