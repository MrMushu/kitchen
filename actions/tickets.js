export const ADD_NEW = (ticket) => (
    {
        type: ADD_NEW,
        data: ticket
    }
)

export const UPDATE = (ticket) => (
    {
        type: UPDATE,
        data: ticket
    }
)


export const DONE = (ticket) => (
    Promise.resolve({
        type: DONE,
        data: ticket
    })
)

export const UNDO = () => (
    {
        type: UNDO,
        data: null
    }
)

export const CLEAR_ALL = (key) => (
    {
        type: CLEAR_ALL,
        key: key
    }
)

export const COMPLETED_UNDO = (key) => (
    {
        type: COMPLETED_UNDO,
        id: key
    }
)

