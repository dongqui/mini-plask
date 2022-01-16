import * as BABYLON from '@babylonjs/core';
import { Asset } from "../types";

function createJoints(asset: Asset, scene: BABYLON.Scene) {
    const { id: assetId, meshes, bones } = asset;
    bones.forEach((bone) => {
        const joint = BABYLON.MeshBuilder.CreateSphere(`${bone.name}_joint`, { diameter: 3 }, scene);
        joint.id = `${assetId}//${bone.name}//joint`;
        joint.renderingGroupId = 2;
        joint.attachToBone(bone, meshes[0]);  
    });
}

export default createJoints;