

import {
    ADD_NEW,
    UPDATE,
    DONE,
    UNDO,
    CLEAR_ALL,
    COMPLETED_UNDO,
    SAVE_BUMP_DELAY
} from '../actions/tickets'

const initialState = {
    pending: [{
        id: "1",
        note: 'hello',
        createdTime: 1585521770000,
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
    },
    {
        id: "2",
        note: 'null',
        createdTime: 1574561334000,
        time: "10:00am",
        orderType: "Dine-in",
        employee: "Aaron",
        orderNumber: "15",
        lineItems: [
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
    },
    {
        id: "3",
        note: 'hello',
        createdTime: 1574561334000,
        time: "10:00am",
        orderType: "Dine-in",
        employee: "Aaron",
        orderNumber: "3",
        lineItems: [
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
    },
    {
        id: "4",
        note: 'hello',
        createdTime: 1574561334000,
        time: "10:00am",
        orderType: "Dine-in",
        employee: "Aaron",
        orderNumber: "4",
        lineItems: [
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
    },
    {
        id: "5",
        note: 'hello',
        createdTime: 1574561334000,
        time: "10:00am",
        orderType: "Dine-in",
        employee: "Aaron",
        orderNumber: "20",
        lineItems: [
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
    },
    {
        id: "6",
        note: 'hello',
        createdTime: 1574561334000,
        time: "10:00am",
        orderType: "Dine-in",
        employee: "Aaron",
        orderNumber: "32",
        lineItems: [
            {
                qty: 1,
                item: "MINI",
                note: "no onions",
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
    }],
    completed: []
};

const tickets = (state = initialState, action) => {
    switch (action.type) {

        case ADD_NEW:
            if (state.pending.filter(ticket => ticket.id === action.data.id).length > 0) {
                return { ...state }
            } else {
                return {
                    ...state,
                    pending: state.pending.concat(action.data)
                }
            }


        case UPDATE:
            var newPending = state.pending
            try {
                var index = state.pending.findIndex((ticket => ticket.id === action.data.id))
                var newData = action.data
                newData.updated = !newPending[index].updated
                newPending[index] = newData

                return {
                    ...state,
                    pending: newPending
                }

            } catch {

                return {
                    ...state,
                    pending: state.pending.concat(action.data)
                }
            }



        case DONE:
            return {
                ...state,
                pending: state.pending.filter(ticket => ticket.id !== action.data.id),
                completed: [action.data, ...state.completed]
            }

        case UNDO:

            newPending = state.pending.concat(state.completed.slice(0, 1))
            var sortedPending = newPending.sort((a, b) =>
                parseInt(a.orderNumber) > parseInt(b.orderNumber) ? 1 : -1
            );

            return {
                ...state,
                pending: sortedPending,
                completed: state.completed.slice(1, state.completed.length)
            }

        case CLEAR_ALL:

            return {
                ...state,
                pending: [],
                completed: [...state.pending, ...state.completed]
            }

        case COMPLETED_UNDO:

            selected = state.completed.find(order => order.id === action.id)


            return {
                ...state,
                pending: [selected, ...state.pending],
                completed: state.completed.filter(order => order.id !== action.id)
            }



        default:
            return state


    }

}
export default tickets;