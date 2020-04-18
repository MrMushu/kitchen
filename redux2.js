import React from 'react';

import { connect } from 'react-redux'


class Kitchen extends Component {
    state = {
        counter: 0
    }
    increaseCounter = () => {
        this.setState({ counter: this.state.counter + 1 })
    }
    decreaseCounter = () => {
        this.setState({ counter: this.state.counter - 1 })
    }

    render() {
        return (
            <View />
        )
    }
}

function mapStateToProps(state) {
    return {
        counter: state.counter
    }
}

function mapDispatchToProps(dispatch) {
    return {
        dispatch(toggleTodo(id))
}
}

export default connect(mapStateToProps)(Kitchen)