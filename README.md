# What I've learned - Dongjin

### Basic understanding
1. Initialize
    - Engine, scene 생성    
    - 카메라, 빛 설정

2. Import
    - BABYLON.SceneLoader.LoadAssetContainerAsync 통해서 import 해온다
      - LoadAssetContainerAsync는 불러온 파일을 씬에 바로 적용하지 않고, 모든 asset을 지닌 container 형태로 가져온다.
    - 가져온 asset에 ID를 부여하며 객체를 만듦
    - asset container의 animationGroups를 통해 motion data 추출
      - animationGroup은 애니메이션과 (mesh 또는 transformNode)를 연결해주고 그룹으로 컨트롤 가능하게 만들어준다.
      > Mesh에 연결된 애니메이션은 직접 Mesh의 속성 (position, rotationQuaternion, scaling)을 frame에 따라 변경해준다.TransformNode에 연결된 애니메이션은 TransformNode를 움직이고, 이어서 TransfomNode에 연결된 Bone 또한 따라서 움직이는 방식으로 애니메이션이 동작한다. 이때 glb 파일을 바빌론 엔진으로 로드하는 경우 항상 transformNode를 사용해 애니메이션이 적용되도록 설계되어 있다. by Cha

3. Asset & motion 선택
    - 현재의 모션 데이터를 통해 AnitmationGroup 생성

4. Visualize
    - 현재 scene에 존재하는 skeletonViewer, meshes, geometries, skeletons, transformNodes를 제거
    - 선택된 asset의 데이터로 scene에 meshes, geometries, skeletons, transformNodes 새로 추가하고 skeletonViewer 생성
      - from rendering bones and joints, to visualizing skin weights, the Skeleton Viewer is sure to make it quick and easy to debug pesky rigging issues inside your scene.

5. Play & Pause Stop
    - AnimationGroup 통해서 컨트롤

6. export
 - 현재 모션에서 animationGroup은 생성 후  export
 > Question<br>
 export 로직 중간에 scene에서 animationGroup은 제거 이유는...!?
 

### Joint 생성
 - 각각의 bone에 joint를 생성하여 부착한다!
   - BABYLON.MeshBuilder.CreateSphere -> bone이 meshe의 부모로 있기 때문에 메쉬 생성후 본에 부착 (Mesh.attachToBone)
>Issue<br>
클릭 이벤트가 실행되는 joint가 있고, 안 되는 Joint가 있다...!?
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
