import { useTypedSelector } from "../../../hooks";
import * as S from "./style";

function TransformWidget() {
  const { gizmoManager } = useTypedSelector(state => state.babylon)

  function handleClick(gizmoType: string) {
    return function(e: React.MouseEvent) {
      if (!gizmoManager) return;
      e.stopPropagation();

      gizmoManager.positionGizmoEnabled = gizmoType === 'position';
      gizmoManager.rotationGizmoEnabled = gizmoType === 'rotation';
      gizmoManager.scaleGizmoEnabled = gizmoType === 'scale';
    }        
  }

  return (
    <S.container>
      <ul>
        <li onClick={handleClick('position')}>
          <button>Postion</button>
        </li>
        <li onClick={handleClick('rotation')}>
          <button>Rotation</button>
        </li>
        <li onClick={handleClick('scale')}>
          <button>Scale</button>
        </li>
      </ul>
    </S.container>
  )
}

export default TransformWidget;