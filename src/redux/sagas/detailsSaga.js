import axios from 'axios';
import { put, call, takeLatest } from 'redux-saga/effects';

function* fetchDetails(action) {
    try {
      // Trying to get stuff details
      const response = yield call(axios.get, `/api/stuff/details/${action.payload}`);
      yield put({ type: 'SET_DETAILS', payload: response });
    }
    catch (error) {
      console.log(`Couldn't get stuff details`, error);
    }
}

function* detailsSaga() {
  yield takeLatest('FETCH_DETAILS', fetchDetails);
}

export default detailsSaga;
