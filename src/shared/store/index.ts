import { createStore } from 'redux';

interface IndexAction {
    type: string;
    payload: object;
}

const initState = {
    data: '',
};

function reducer(state = initState, action: IndexAction) {
    switch (action.type) {
        case 'CHANGE_DATA':
            return { ...state, ...action.payload };
        default:
            return { ...state };
    }
}

export function createClientStore() {
    return createStore(reducer, (window as any).REDUX_STORE);
}

export function createServerStore() {
    return createStore(reducer);
}

