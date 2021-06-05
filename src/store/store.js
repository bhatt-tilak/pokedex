import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import RootReducer from "./index-reducer";
import { persistStore } from "redux-persist";

const initialState = {};

const middleWare = [thunk];
const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

export const store = createStore(
  RootReducer,
  initialState,
  composeEnhancers(applyMiddleware(...middleWare))
);

export const persistor = persistStore(store);

export default { store, persistor };
