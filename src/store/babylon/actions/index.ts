import { createAction } from "typesafe-actions";
import * as BABYLON from "@babylonjs/core";
import { Motion, Asset } from "../../../types";

export const initBabylon = createAction(
  'babylon/INIT',
  (gizmoManager: BABYLON.GizmoManager, scene: BABYLON.Scene) => ({ gizmoManager, scene })
)();

export const setSkeletonViewer = createAction(
  'babylon/SET_SKELETON_VIEWER',
  (skeletonViewer: BABYLON.SkeletonViewer) => ({ skeletonViewer })
)();

export const addMotions = createAction(
  'babylon/ADD_MOTIONS',
  (motions: Motion[]) => ({ motions })
)();

export const addAssets = createAction(
  'babylon/ADD_ASSETS',
  (assets: Asset[]) => ({ assets })
)();

export const setCurrentAnimationGroup = createAction(
  'babylon/SET_CURRENT_ANIMATION_GROUP',
  (animationGroup: BABYLON.AnimationGroup) => ({ animationGroup })
)();

export const setCurrentMotion = createAction(
  'babylon/SET_CURRENT_MOTION',
  (motion: Motion) => ({ motion })
)();

export const setCurrentAsset = createAction(
  'babylon/SET_CURRENT_ASSET',
  (asset: Asset) => ({ asset })
)();