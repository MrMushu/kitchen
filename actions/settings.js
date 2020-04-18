export const SAVE_SETTINGS = (settings) => (
    {
        type: SAVE_SETTINGS,
        data: settings
    }
)

export const RESET_SETTINGS = () => (
    {
        type: RESET_SETTINGS
    }
)

export const LOG_OUT = () => (
    {
        type: LOG_OUT
    }
)