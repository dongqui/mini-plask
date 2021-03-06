import { applyMiddleware, createStore, combineReducers, AnyAction } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk, { ThunkDispatch } from "redux-thunk";
import babylon from './babylon/reducer';

const rootReducer = combineReducers({
  babylon,
});
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ThunkDispatch<RootState, any, AnyAction>;

export default store;