import axios from 'axios';
import { put, takeLatest, takeEvery } from 'redux-saga/effects';

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

function* deleteStuff(action) {
    console.log('hit the delete stuff saga', action);
    try {
        yield axios.delete(`/stuff/${action.payload}`)
        yield put({
            // call get request and rerender w/ new list values
            type: 'SET_STUFF'
        });
    } catch (error) {
        console.log(`Couldn't delete project`, error);
        alert(`Sorry, couldn't delete the project. Try again later`);
    }
}

function* stuffSaga() {
  yield takeEvery('DELETE_STUFF', deleteStuff);
  yield takeLatest('FETCH_STUFF', fetchStuff);
}

export default stuffSaga;
