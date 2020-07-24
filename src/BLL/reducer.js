import {API} from "../DAL/api";

const SET_DATA = 'SET_DATA',
    SORT_COLUMN = 'SORT_COLUMN',
    SEND_ROW_TO_BOTTOM = 'SEND_ROW_TO_BOTTOM',
    FILTER_USERS = 'FILTER_USERS',
    TOGGLE_ADD_MODE = 'TOGGLE_ADD_MODE'

const initialState = {
    data: [
        {
            id: 101,
            firstName: 'Sue',
            lastName: 'Corson',
            email: 'DWhalley@in.gov',
            phone: '(612)211-6296',
            address: {
                streetAddress: '9792 Mattis Ct',
                city: 'Waukesha',
                state: 'WI',
                zip: '22178'
            },
            description: 'et lacus magna dolor...',
        }

    ],
    sortOrder: null,
    bottomRow: [],
    isAddLineActive: true
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_DATA: {
            return {
                ...state,
                data: action.data
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
        case FILTER_USERS: {
            debugger
            return  {
                ...state,
                data: [...state.data.filter((item, i) => item.id.includes(action.value))]
            }
        }
        case TOGGLE_ADD_MODE: {
            return {
                ...state,
                isAddLineActive: action.value
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
export const filterUsers = (value) => {
    return {
        type: FILTER_USERS,
        value
    }
}
export const toggleAddMode = (value) => {
    return {
        type: TOGGLE_ADD_MODE,
        value
    }
}
export default reducer;

export const getData = (amount) => {
    return async (dispatch) => {

        if (amount === 'small') {
            const response = await API.getSmallAmount()
            dispatch(setData(response.data))
        } else if (amount === 'large') {
            const response = await API.getBigAmount()
            dispatch(setData(response.data))
        }

    }
}