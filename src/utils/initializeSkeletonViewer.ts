import { DEFAULT_SKELETON_VIEWER_OPTION } from '../constants/index';
import { Asset } from '../types/index';
import * as BABYLON from "@babylonjs/core";

function initializeSkeletonViewer(currentAsset: Asset, scene: BABYLON.Scene, skeletonViewer: BABYLON.SkeletonViewer | null) {
  const {
    meshes,
    geometries,
    skeleton,
    transformNodes,
  } = currentAsset;

  if (skeletonViewer) {
    skeletonViewer.dispose();
  }

  scene.meshes.forEach((mesh) => {
    mesh.getChildMeshes().forEach((childMesh) => {
      scene.removeMesh(childMesh);
    });
    scene.removeMesh(mesh);
  });

  scene.geometries.forEach((geometry) => {
    scene.removeGeometry(geometry);
  });

  scene.skeletons.forEach((skeleton) => {
    scene.removeSkeleton(skeleton);
  });

  scene.transformNodes.forEach((transformNode) => {
    scene.removeTransformNode(transformNode);
  });

  meshes.forEach((mesh) => {
    mesh.isPickable = false;
    scene.addMesh(mesh);
  });

  geometries.forEach((geometry) => {
    scene.addGeometry(geometry);
  });

  scene.addSkeleton(skeleton);

  transformNodes.forEach((transformNode) => {
    scene.addTransformNode(transformNode);
  });

  return new BABYLON.SkeletonViewer(
    skeleton,
    meshes[0],
    scene,
    true,
    meshes[0].renderingGroupId,
    DEFAULT_SKELETON_VIEWER_OPTION
  );
}

export default initializeSkeletonViewer;