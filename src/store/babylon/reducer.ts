import { ActionType, getType } from "typesafe-actions";
import * as Actions from "./actions";

const initialState = {
}

const reducer = (
  state: initialState = initialState,
  action: ActionType<typeof Actions>
) => {
  // switch (action.type) {
    // case getType(Actions.:      
    //   return {
    //     ...state,
    //   }
    default:
      return state;

  }
}

export default reducer;