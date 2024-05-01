import { useContext } from "react";
import { Context } from "./Draw";
function Rect() {
    let context=useContext(Context)
    let targetObject=context.targetObject
    let bBoxColor = context.bBoxColor;
  return Object.keys(targetObject.current).map((e) => {
    return (
      <g stroke={bBoxColor.current} strokeWidth={1} fill="none" key={`${e}g`}>
        <rect
          x={targetObject.current[e][1]}
          y={targetObject.current[e][2]}
          width={targetObject.current[e][3]}
          height={targetObject.current[e][4]}
          key={`${e}r`}
     //     fill={`${bBoxColor}00`}
          onDragStart={(e)=>{
            console.log(e);
          }}
          className="ini"
        />
        <circle
          cx={targetObject.current[e][1]}
          cy={targetObject.current[e][2]}
          r={5}
          fill="white"
          key={`${e}c1`}
        />
        <circle
          cx={targetObject.current[e][1]}
          cy={targetObject.current[e][6]}
          r={5}
          fill="white"
          key={`${e}c2`}
        />
        <circle
          cx={targetObject.current[e][5]}
          cy={targetObject.current[e][6]}
          r={5}
          fill="white"
          key={`${e}c3`}
        />
        <circle
          cx={targetObject.current[e][5]}
          cy={targetObject.current[e][2]}
          r={5}
          fill="white"
          key={`${e}c4`}
        />
      </g>
    );
  });
}
export default Rect;
