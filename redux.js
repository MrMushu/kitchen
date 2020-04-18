import React, { Component } from 'react';



import { createStore } from 'redux'
import { render } from 'react-dom'

const initialState = {
    counter: 0
}

const reducer = (state = initialState) => {
    return state
}

const store = createStore(reducer)

