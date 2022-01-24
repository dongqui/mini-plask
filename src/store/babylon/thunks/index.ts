import type { Thunk } from "../../../types";
import * as BABYLON from "@babylonjs/core";
import { 
  createCamera, 
  createHemisphericLight, 
  createDirectionalLight, 
  createAndAttachJointOnBones, 
  initializeSkeletonViewer, 
  createAssetAndMotionData, 
  getSplittedFileName 
} from "../../../utils";
import * as babylonActions from "../actions";
import { DEFAULT_FPS, DEFAULT_FROM, DEFAULT_TO } from './../../../constants/index';


function handleSceneReady(scene: BABYLON.Scene) {
  scene.useRightHandedSystem = true;
  scene.clearColor = BABYLON.Color4.FromColor3(
    BABYLON.Color3.FromHexString("#202020")
  );
  createCamera(scene);
  createHemisphericLight(scene);
  createDirectionalLight(scene);
};

function initGizmoManager(scene: BABYLON.Scene) {
  const gizmoManager = new BABYLON.GizmoManager(scene);
  gizmoManager.positionGizmoEnabled = true;

  return gizmoManager;
}

export function initBabylonThunk(renderingCanvas: HTMLCanvasElement):Thunk {  
  return async (dispatch) => {
    BABYLON.Animation.AllowMatricesInterpolation = true;
      const engine = new BABYLON.Engine(renderingCanvas, true);
      const innerScene = new BABYLON.Scene(engine);

      innerScene.onReadyObservable.addOnce((scene) => {
        handleSceneReady(scene);

        const gizmoManager = initGizmoManager(scene);
        dispatch(babylonActions.initBabylon(gizmoManager, scene));
      });
      
      innerScene.onDisposeObservable.addOnce(() => {
        window.location.reload();
      });

      engine.runRenderLoop(() => {
        innerScene.render();
      });
  };
}

export function visulizeThunk(): Thunk {
  return (dispatch, getState) => {
    const { currentAsset, scene, gizmoManager, skeletonViewer } = getState().babylon;
    if (!currentAsset || !scene || !gizmoManager) return;
    
    const innerSkeletonViewer = initializeSkeletonViewer(currentAsset, scene, skeletonViewer);
    dispatch(babylonActions.setSkeletonViewer(innerSkeletonViewer));
    createAndAttachJointOnBones(currentAsset, scene, gizmoManager);
  }  
}

export function uploadFileThunk(file: File): Thunk {
  return async  (dispatch, getState) => {
    const { scene } = getState().babylon;
    const [fileName, fileExtension] = getSplittedFileName(file.name);
    if (!scene || (fileExtension !== 'glb' && fileExtension !== 'fbx')) return;
    const loadedAssetContainer = await BABYLON.SceneLoader.LoadAssetContainerAsync(
      "file:",
      file,
      scene
    );
    const { motions, asset } = createAssetAndMotionData(loadedAssetContainer, fileName, fileExtension);    
    dispatch(babylonActions.addAssets([asset]));
    dispatch(babylonActions.addMotions(motions));
  }
}

export function createAndSetCurrentAnimationGroupThunk(): Thunk {
  return async (dispatch, getState) => {
    const { currentMotion } = getState().babylon;

    if (!currentMotion) return;

    const newAnimationGroup = new BABYLON.AnimationGroup(currentMotion.name);
    currentMotion.motionData.forEach((motionDatum) => {
      let animation: BABYLON.Animation;
      if (motionDatum.property === "rotationQuaternion") {
        animation = new BABYLON.Animation(
          motionDatum.name,
          motionDatum.property,
          DEFAULT_FPS,
          BABYLON.Animation.ANIMATIONTYPE_QUATERNION,
          BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
        );
      } else {
        animation = new BABYLON.Animation(
          motionDatum.name,
          motionDatum.property,
          DEFAULT_FPS,
          BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
          BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
        );
      }
      animation.setKeys(motionDatum.transformKeys);

      newAnimationGroup.addTargetedAnimation(animation, motionDatum.target);
    });

      newAnimationGroup.normalize(DEFAULT_FROM, DEFAULT_TO);
      dispatch(babylonActions.setCurrentAnimationGroup(newAnimationGroup));
    }
}