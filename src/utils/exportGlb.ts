import { DEFAULT_FPS } from '../constants/index';
import { GLTF2Export, IExportOptions } from "@babylonjs/serializers/glTF";
import * as BABYLON from "@babylonjs/core";
import { Asset, Motion } from "../types";

function exportGlb(scene: BABYLON.Scene, currentMotion: Motion, currentAsset: Asset) {
  const options: IExportOptions = {
    shouldExportNode: (node: BABYLON.Node) => {
      return (
        !node.name.includes("joint") &&
        !node.name.includes("ground") &&
        !node.name.includes("scene")
      );
    },
  };

  scene.animationGroups.forEach((animationGroup) => {
    scene.removeAnimationGroup(animationGroup);
  });

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

  GLTF2Export.GLBAsync(scene, currentAsset.name, options).then((glb) => {
    glb.downloadFiles();
  });
}

export default exportGlb;