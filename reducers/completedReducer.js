

import {
    ADD_NEW,
    DONE,
    UNDO,
    CLEAR_ALL
} from '../actions/tickets'

const initialState = {
    completed: [{
        id: "1",
        createdTime: 1574561334000,
        time: "10:00am",
        orderType: "Togo",
        employee: "Aaron",
        orderNumber: "1",
        lineItems: [
            {
                qty: 3,
                item: "MINI",
                mods: [
                    {
                        name: "Rice",
                        amount: 0,
                        qty: 2
                    },
                    {
                        name: "Bean",
                        amount: 0,
                        qty: 1
                    }
                ]
            },
            {
                qty: 1,
                item: "MINI",
                mods: [
                    {
                        name: "Rice",
                        amount: 0,
                        qty: 1
                    },
                    {
                        name: "Bean",
                        amount: 0,
                        qty: 1
                    }
                ]
            },
            {
                qty: 1,
                item: "MINI",
                mods: [
                    {
                        name: "Rice",
                        amount: 0,
                        qty: 1
                    },
                    {
                        name: "Bean",
                        amount: 0,
                        qty: 1
                    }
                ]
            },
            {
                qty: 1,
                item: "MINI",
                mods: [
                    {
                        name: "Rice",
                        amount: 0,
                        qty: 1
                    },
                    {
                        name: "Bean",
                        amount: 0,
                        qty: 1
                    }
                ]
            }
        ]
    }]
};

const completedReducer = (state = initialState, action) => {
    switch (action.type) {

        case ADD_NEW:
            return {
                ...state,
                orders: state.orders.concat(action.data)
            };

        case DONE:
            return {
                ...state,
                orders: state.orders.filter(item => item.id !== action.id),
                completed: state.completed.concat(action.data),
            }

        case UNDO:
            if (state.completed.length > 0) {
                var ticket = state.completed.findIndex(order => order.id === id)
                var newOrder = state.orders.concat(state.completed[ticket])

                var newCompleted = state.completed
                    .splice(ticket, 1)

                var newOrders = newOrder.sort((a, b) =>
                    parseInt(a.orderNumber) > parseInt(b.orderNumber) ? 1 : -1
                );
            }

            return {
                ...state,
                orders: newOrders,
                completed: state.completed.splice(action.id)
            }

        case CLEAR_ALL:

            return {
                ...state,
                orders: state.orders.unshift(state.completed),
                completed: []
            }

        default:
            return state


    }

}
export default completedReducer;