import * as BABYLON from "@babylonjs/core";
import { ThunkAction } from "redux-thunk";
import { AnyAction } from "redux";
import { RootState } from "../store";

export type Extension = "glb" | "fbx";

export interface Asset {
  id: string;
  name: string;
  extension: Extension;
  meshes: BABYLON.AbstractMesh[];
  geometries: BABYLON.Geometry[];
  skeleton: BABYLON.Skeleton;
  bones: BABYLON.Bone[];
  transformNodes: BABYLON.TransformNode[];
}

export interface MotionDatum {
  name: string;
  target: BABYLON.TransformNode;
  property: string;
  transformKeys: BABYLON.IAnimationKey[];
}

export interface Motion {
  id: string;
  name: string;
  assetId: string;
  motionData: MotionDatum[];
}

export interface Option {
  value: string;
  onSelect: any;
}

export type Thunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
  >

export interface BabyonState {
  gizmoManager: BABYLON.GizmoManager | null;
  scene: BABYLON.Scene | null;
  currentMotion: Motion | null;
  currentAnimationGroup: BABYLON.AnimationGroup | null;
  assets: Asset[],
  motions: Motion[],
  currentAsset: Asset | null;
  skeletonViewer: BABYLON.SkeletonViewer | null;
}