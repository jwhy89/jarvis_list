import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_STUFF" actions
function* fetchStuff() {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };
    
    const response = yield axios.get('api/stuff', config);
    
    yield put({ type: 'SET_STUFF', payload: response.data });
  } catch (error) {
    console.log('Stuff get request failed', error);
  }
}

function* stuffSaga() {
  yield takeLatest('FETCH_STUFF', fetchStuff);
}

export default stuffSaga;
