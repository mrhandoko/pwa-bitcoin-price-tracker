const defaultState = {
  bitcoinRate: 0,
};

export default (state = defaultState, action = {}) => {
  switch (action.type) {
    case 'FETCH_BITCOIN_RATE_FULFILLED': {
      return {
        ...state,
        bitcoinRate: action.payload,
      };
    }
    default:
      return state;
  }
};
