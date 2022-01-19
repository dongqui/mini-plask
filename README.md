# What I've learned - Dongjin

<br>

## Basic understanding
1. Initialize
    - Engine, scene 생성    
    - 카메라, 빛 설정

2. Import
    - BABYLON.SceneLoader.LoadAssetContainerAsync 통해서 import 해온다
      - LoadAssetContainerAsync는 불러온 파일을 씬에 바로 적용하지 않고, 모든 asset을 지닌 container 형태로 가져온다.
    - 가져온 asset에 ID를 부여하며 객체를 만듦
    - asset container의 animationGroups를 통해 motion data 추출
      - animationGroup은 애니메이션과 (mesh 또는 transformNode)를 연결해주고 그룹으로 컨트롤 가능하게 만들어준다.
      > Mesh에 연결된 애니메이션은 직접 Mesh의 속성 (position, rotationQuaternion, scaling)을 frame에 따라 변경해준다.TransformNode에 연결된 애니메이션은 TransformNode를 움직이고, 이어서 TransfomNode에 연결된 Bone 또한 따라서 움직이는 방식으로 애니메이션이 동작한다. 이때 glb 파일을 바빌론 엔진으로 로드하는 경우 항상 transformNode를 사용해 애니메이션이 적용되도록 설계되어 있다. <br>
      -by Cha

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
 export 로직 중간에 scene에서 animationGroup은 제거 이유는...!?<br>
 >export 로직에서 scene에서 animationGroup을 제거한 이유는 Plask의 설계를 따르기 위함입니다. 가장 기본적으로는 scene export 시 등록되어 있는 animationGroup들이 포함된 채로 export 되지만, Plask의 경우, export 시에 모션을 선택하거나 filter를 적용하거나 혹은 길이를 normalize 하던 것을 없애주기 때문에, export 시에 현재의 animationGroup은 모두 없애고 export 옵션에 맞춘 animationGroup을 생성해서 등록하고 export 해준다고 이해하시면 좋을 것 같습니다!<br>
 -by Cha


<br>
<br>

## Joint 생성
 - 각각의 bone에 joint를 생성하여 부착한다!
   - BABYLON.MeshBuilder.CreateSphere -> bone이 meshe의 부모로 있기 때문에 메쉬 생성후 본에 부착 (Mesh.attachToBone)
>Issue<br>
joint 클릭 안되는 이슈는 mesh가 클릭 되어서 그런것이 아닌가 생각이 듭니다.
renderingGroupId를 mesh.renderingGroupId 보다 높은 숫자로 주셨는데도 해결이 안된 상태라면, meshes import 시에 mesh.pickable = false 로 주면 mesh가 pick 대상에서 제외됩니다. (실제 plask에서도 이 방법을 사용했습니다.)
cf) mesh -> meshe 오타 있읍니다 ㅎ<br>
-by cha<br><br>
-> Mesh.isPicable = false로 해결!


<br>
<br>