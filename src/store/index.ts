import { applyMiddleware, createStore, combineReducers, AnyAction } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk, { ThunkDispatch } from "redux-thunk";
import memo from "./memo/reducer";

const rootReducer = combineReducers({
  memo,
});
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ThunkDispatch<RootState, any, AnyAction>;

export default store;