# What I've learned - Dongjin

## Basic understanding
  1. Initialize
    - Engine, scene 생성    
    - 카메라, 빛 설정

  2. Import
    - BABYLON.SceneLoader.LoadAssetContainerAsync 통해서 import 해온다
      - LoadAssetContainerAsync는 불러온 파일을 씬에 바로 적용하지 않고, 모든 asset을 지닌 container 형태로 가져온다.
    - 가져온 asset에 ID를 부여하며 객체를 만듦
    - asset container의 animationGroups를 통해 motion data 추출
      - animationGroups은 애니메이션들과 메쉬들을 이어주고 그룹으로 컨트롤 가능하게 만들어준다.

  3. Asset & motion 선택
    - 현재의 모션 데이터를 통해 AnitmationGroup 생성

  4. Visualize
    - 현재 scene에 존재하는 skeletonViewer, meshes, geometries, skeletons, transformNodes를 제거
    - 선택된 asset의 데이터로 scene에 meshes, geometries, skeletons, transformNodes 새로 추가하고 skeletonViewer 생성
      - from rendering bones and joints, to visualizing skin weights, the Skeleton Viewer is sure to make it quick and easy to debug pesky rigging issues inside your scene.

  5. Play & Pause Stop
    - AnimationGroup 통해서 컨트롤

  6. export

# Mini Plask

> React, Babylon, TypeScript, Styled-Components

- Base Project for Understanding Plask and Babylon

- You Can

  1. Import and export .glb files.
  2. Visualize model.
  3. Debug with SkeletonViewer.
  4. Control animations.

- Data Structures

  - The project has similar data structure to the Plask app.
  - Asset has meshes, geometries, skeleton, bones and transformNodes, which can be rendered on the canvas.
  - Motion has assetId and motionData, which can be used to make animationGroup to control.
  - MotionData are similar to tracks of Plask, which have transformKeys consist of frame and value.

- How to Use

  1. Fork this repository.
  2. Understand the Plask app by comparing with this project.
  3. And add any functions you want.
  4. Recommend to add functions in the real Plask app.

     (like attaching gizmo, editing keyframes, customizing camera, and so on.)

  5. Make PR for this repository if you want my review or comments.
