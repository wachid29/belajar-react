import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import localStorage from "redux-persist/es/storage";
// import session from "redux-persist/lib/storage/session";
import auth from "./auth";

const persistConfig = {
  key: "root",
  storage: localStorage,
  whitelist: ["auth"],
};

const rootReducer = combineReducers({
  auth,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
