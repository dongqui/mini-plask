import { ChangeEvent, useEffect, useRef } from "react";
import "@babylonjs/loaders/glTF";
import styled from "styled-components";
import { exportGlb } from "./utils";
import Dropdown from "./components/Dropdown";
import { DEFAULT_SPEED, DEFAULT_FROM, DEFAULT_TO } from './constants'
import { useTypedDispatch, useTypedSelector } from "./hooks";
import { initBabylonThunk, visulizeThunk, uploadFileThunk, createAndSetCurrentAnimationGroupThunk } from "./store/babylon/thunks";
import * as babylonActions from './store/babylon/actions';


const App = () => {
  const dispatch = useTypedDispatch();
  const { scene, skeletonViewer, assets, motions, currentMotion, currentAsset, currentAnimationGroup } = useTypedSelector(state => state.babyon);
  const renderingCanvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {    
    if (renderingCanvas.current) {
      dispatch(initBabylonThunk(renderingCanvas.current));
    }
  }, [dispatch]);

  function handleImportInputChange(event: ChangeEvent<HTMLInputElement>) {
      const targetFile = event.target.files?.[0];
      if (targetFile) {
        dispatch(uploadFileThunk(targetFile));
      }                  
  }

  function handleVisualizeButtonClick() {
    dispatch(visulizeThunk());
  };

  function handleExportGlbButtonClick() {    
    if (!scene || !currentAsset || !currentMotion) return ;
      
    if (skeletonViewer) {
      skeletonViewer.isEnabled = false;
    }
    
    exportGlb(scene, currentMotion, currentAsset);

    if (skeletonViewer) {
      skeletonViewer.isEnabled = true;
    }
  }

  function handlePlayButtonClick() {
    if (currentAnimationGroup && !currentAnimationGroup.isPlaying) {
      if (currentAnimationGroup.isStarted) {
        currentAnimationGroup.play(true);
      } else {
        currentAnimationGroup.start(
          true,
          DEFAULT_SPEED,
          DEFAULT_FROM,
          DEFAULT_TO
        );
      }
    }
  }

  function handlePauseButtonClick() {
    if (currentAnimationGroup && currentAnimationGroup.isPlaying) {
      currentAnimationGroup.pause();
    }
  }    

  function handleStopButtonClick() {
    if (currentAnimationGroup && currentAnimationGroup.isStarted) {
      currentAnimationGroup.goToFrame(DEFAULT_FROM).stop();
    }
  }

  const assetOptions = assets.map((asset) => ({
    value: asset.name,
    onSelect: () => {
      dispatch(babylonActions.setCurrentAsset(asset));
    }
  }));

  const motionOptions = motions
    .filter((motion) => motion.assetId === currentAsset?.id)
    .map((filteredMotion) => ({
      value: filteredMotion.name,
      onSelect: () => {
        dispatch(babylonActions.setCurrentMotion(filteredMotion));
        dispatch(createAndSetCurrentAnimationGroupThunk());
      },
    }));

  return (
    <Container>
      <header className="button-wrapper">
        <input
          className="import-input"
          type="file"
          accept=".glb, .fbx"
          onChange={handleImportInputChange}
        />
        <Dropdown options={assetOptions} />
        <Dropdown options={motionOptions} />
        <button onClick={handleVisualizeButtonClick}>visualize</button>
        <button onClick={handlePlayButtonClick}>play</button>
        <button onClick={handlePauseButtonClick}>pause</button>
        <button onClick={handleStopButtonClick}>stop</button>
        <button onClick={handleExportGlbButtonClick}>export glb</button>
      </header>
      <main>
        <canvas ref={renderingCanvas} id="renderingCanvas" />
      </main>
      <footer>by kennyCha @Plask</footer>
    </Container>
  );
};

export default App;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;

  .button-wrapper {
    display: flex;
    justify-content: start;
    align-items: center;
    width: 100%;
    height: 22px;

    input {
      width: 200px;
      height: 100%;
    }

    button {
      width: 120px;
      height: 100%;
      border: 0px;
      cursor: pointer;
    }
  }

  main {
    width: 100%;
    height: calc(100vh - 22px);
    border: 1px dotted black;

    #renderingCanvas {
      width: 100%;
      height: 100%;
    }
  }

  footer {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    bottom: 20px;
    width: 100%;
    color: white;
    pointer-events: none;
  }
`;
