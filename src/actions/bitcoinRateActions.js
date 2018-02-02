import { client } from '../api';

const url = '/ticker';

export const fetchBitcoinRate = () => {
  return dispatch => dispatch({
    type: 'FETCH_BITCOIN_RATE',
    payload: client.get(url),
  });
};
