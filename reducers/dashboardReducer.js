

import {
    GET_DASHBOARD
} from '../actions/dashboard'


const initialState = {
    data: {
        sales: {
            total: 0,
            previous: 0,
            weekly: [0],
        },
        orders: {
            total: 0,
            previous: 0,
            weekly: [0]
        },
        bump: {
            total: 0,
            previous: 0,
            weekly: [0]
        },
        orders_per_hour: {
            labels: [0],
            data: [0]
        },
        category_sales: {
            categories: [''],
            series: [0]
        }
    }

};

const dashboard = (state = initialState, action) => {
    switch (action.type) {

        case GET_DASHBOARD:

            return {
                ...state,
                data: action.data
            }


        default:
            return state


    }

}
export default dashboard;