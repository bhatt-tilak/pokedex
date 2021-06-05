// combine reducer
import { combineReducers } from "redux";
// persistor if needed to persist  something to localstorage
import { persistReducer } from "redux-persist";
// reference to local  storage
import storage from "redux-persist/lib/storage";

// import slices

// persist confir
const authPersistConfig = {
  key: "auth",
  storage: storage,
};

// combine reducer  to create  one  reducer for the state
const appReducer = combineReducers({});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
