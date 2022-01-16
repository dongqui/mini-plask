import * as BABYLON from '@babylonjs/core';
import { Asset } from "../types";

function handleClickJoint(event: BABYLON.ActionEvent) {
    alert('hello');
}

function handleHoverJoint(scene: BABYLON.Scene) {
    return function(event: BABYLON.ActionEvent) {
        scene.hoverCursor = 'pointer';   
    }    
}

function registerActionManagerOnJoint(joint: BABYLON.Mesh, scene: BABYLON.Scene) {
    joint.actionManager = new BABYLON.ActionManager(scene);

    joint?.actionManager?.registerAction(
        new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickDownTrigger, handleClickJoint)
    );

    joint?.actionManager?.registerAction(
        new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger, handleHoverJoint(scene))
    );
}

function createJoints(assetId: string, bone: BABYLON.Bone, meshe: BABYLON.AbstractMesh, scene: BABYLON.Scene) {    
    const joint = BABYLON.MeshBuilder.CreateSphere(`${bone.name}_joint`, { diameter: 3 }, scene);
    joint.id = `${assetId}//${bone.name}//joint`;
    joint.renderingGroupId = 2;
    joint.attachToBone(bone, meshe);  
    
    return joint;
}

function createAndAttachJointOnBones(asset: Asset, scene: BABYLON.Scene) {
    const { id: assetId, meshes, bones } = asset;
    bones.forEach((bone) => {
        const joint = createJoints(assetId, bone, meshes[0], scene);
        registerActionManagerOnJoint(joint, scene);
    });
}

export default createAndAttachJointOnBones;