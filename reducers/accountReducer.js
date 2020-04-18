

import {
    SAVE_SETTINGS,
    RESET_SETTINGS
} from '../actions/settings'

import { LOGIN } from '../actions/login'

const initialState = {
    merchantId: 'QA6N92XP4MTQ1',
    code: 'fda0b954-6159-d69a-6693-12f5fef5aefc',
    settings: {
        ticketDisplay: 0,
        ticketsPerRow: 6,
        displayOptions: 0,
        colorScheme: 0,
        typeColors: {
            "Togo": 0,
            "Dine-in": 2,
            "Delivery": 3,
            "Take-out": 4
        },
        fontSizes: 1
    }
};

const account = (state = initialState, action) => {
    switch (action.type) {

        case LOGIN:
            order_types = JSON.parse(action.data.order_types)


            var settings = state.settings
            settings.typeColors = order_types
            return {
                ...state,
                merchantId: action.data.merchantId,
                code: action.data.code,
                token: action.data.access_token,
                timezone: action.data.timezone,
                employees: JSON.parse(action.data.employees),
                order_types: order_types,
                settings: settings
            }


        case RESET_SETTINGS:
            return {
                ...state,
                settings: initialState
            }

        case SAVE_SETTINGS:
            return {
                ...state,
                settings: action.data
            }

        default:
            return state


    }

}
export default account;