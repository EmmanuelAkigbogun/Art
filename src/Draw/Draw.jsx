import { createContext, useRef, useState } from "react";
import Form from "./Form";
import OnLoad from "./OnLoad";
import Svg from "./Svg";
import WindowFx from "./Window";
import Rect from "./Rect";
export let Context = createContext();
function Draw() {
  let thick = useRef((window.innerHeight + window.innerHeight) / 2000);
  let [render, setRender] = useState(0);
  let vgpathxy = useRef({});
  let vgcolor = useRef([]);
  let vg=useRef(null)
  let canvas = useRef(null);
  let link = useRef(null);
  let vgpath = useRef([]);
  let vgidentity = useRef({});
  let cwidth = useRef(window.innerWidth);
  let cheight = useRef(window.innerHeight);
  let mooveboolean = useRef(false);
  let focusbool=useRef([])
  let hovercolor = useRef(-1);
  let target=useRef([0, 0, 0, 0, 0, 0, 0, 0]); 
  let targetObject = useRef({}); 
  let edit=useRef(false)
  let bBoxColor=useRef("#434343")
  let contextData = {
    render: render,
    edit: edit,
    setRender: setRender,
    vgpathxy: vgpathxy,
    thick: thick,
    vg: vg,
    bBoxColor:bBoxColor,
    canvas: canvas,
    link: link,
    vgpath: vgpath,
    vgidentity: vgidentity,
    vgcolor: vgcolor,
    cwidth: cwidth,
    link: link,
    cheight: cheight,
    mooveboolean: mooveboolean,
    focusbool: focusbool,
    hovercolor: hovercolor,
    target: target,
    targetObject:targetObject,
  };
  return (
    <>
      <Context.Provider value={contextData}>
        <Form />
        <OnLoad />
        <WindowFx />
        <svg
          viewBox={`0 0 ${cwidth.current} ${cheight.current}`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          ref={vg}
          id="vg"
        >
          {vgpath.current.map((e, i) => {
            return (
              <path
                key={`val${i}`}
                d={e}
                stroke={vgcolor.current[i]}
                strokeWidth={thick.current}
                strokeLinecap="round"
                strokeDasharray={0}
              />
            );
          })}
          {<Rect />}
        </svg>
        <a href="" ref={link}></a>
        <canvas
          ref={canvas}
          className="none"
          width={7000}
          height={7000}
        ></canvas>
      </Context.Provider>
    </>
  );
}
export default Draw;
