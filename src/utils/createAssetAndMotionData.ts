import { Asset, Motion, MotionDatum, Extension } from "../types";
import getRandomStringKey from "./getRandomStringKey";
import * as BABYLON from "@babylonjs/core";

function createAssetAndMotionData(assetContainer: BABYLON.AssetContainer, fileName: string, fileExtension: Extension) {
  const {
    meshes,
    geometries,
    skeletons,
    transformNodes,
    animationGroups,
  } = assetContainer;

  const assetId = getRandomStringKey();
  const newAsset: Asset = {
    id: assetId,
    name: fileName,
    extension: fileExtension,
    meshes,
    geometries,
    skeleton: skeletons[0],
    bones: skeletons[0].bones,
    transformNodes: transformNodes,
  };

  const newMotions: Motion[] = [];
  animationGroups.forEach((animationGroup, idx) => {
    animationGroup.stop();

    const motionData: MotionDatum[] = [];
    animationGroup.targetedAnimations.forEach(
      ({ target, animation }) => {
        motionData.push({
          name: animation.name,
          target,
          property: animation.targetProperty,
          transformKeys: [...animation.getKeys()],
        });
      }
    );

    newMotions.push({
      id: getRandomStringKey(),
      name: animationGroup.name,
      assetId: assetId,
      motionData,
    });
  });

  return { motions: newMotions, asset: newAsset };
}

export default createAssetAndMotionData;