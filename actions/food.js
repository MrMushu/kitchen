export const addFood = (food) => (
    {
        type: ADD_FOOD,
        data: food
    }
)

export const addFood = (key) => (
    {
        type: DELETE_FOOD,
        key: key
    }
)