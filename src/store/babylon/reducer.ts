import { ActionType, getType } from "typesafe-actions";
import * as Actions from "./actions";
import { BabyonState } from "../../types";

const initialState: BabyonState = {
  gizmoManager: null,
  scene: null,
  currentMotion: null,
  currentAnimationGroup: null,
  currentAsset: null,
  motions: [],
  assets: [],
  skeletonViewer: null,
}

const reducer = (
  state: BabyonState = initialState,
  action: ActionType<typeof Actions>
) => {
  switch (action.type) {    
    case getType(Actions.initBabylon):      
      return {
        ...state,
        gizmoManager: action.payload.gizmoManager,
        scene: action.payload.scene,
      }
    
    case getType(Actions.setSkeletonViewer):
      return {
        ...state,
        skeletonViewer: action.payload.skeletonViewer,
      }

    case getType(Actions.addMotions):
      return {
        ...state,
        motions: [...state.motions, ...action.payload.motions],
      }

    case getType(Actions.addAssets):
      return {
        ...state,
        assets: [...state.assets, ...action.payload.assets],
      }

    case getType(Actions.setCurrentAnimationGroup):
      return {
        ...state,
        currentAnimationGroup: action.payload.animationGroup,
      }
      
    case getType(Actions.setCurrentMotion):
      return {
        ...state,
        currentMotion: action.payload.motion,
      }

    case getType(Actions.setCurrentAsset):
      return {
        ...state,
        currentAsset: action.payload.asset,
      }

    default:
      return state;

  }
}

export default reducer;