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

function* editDetails(action) {
  console.log('in edit details saga', action.payload);
  try {
    // Trying to edit stuff details
    yield axios.put(`/api/stuff/details/${action.payload.id}`, action.payload);
    yield put({ type: 'FETCH_DETAILS', payload: action.payload.id });
  }
  catch (error) {
    console.log(`Couldn't EDIT stuff details`, error);
  }
}

function* detailsSaga() {
  yield takeLatest('FETCH_DETAILS', fetchDetails);
  yield takeLatest('EDIT_DETAILS', editDetails);
}

export default detailsSaga;
