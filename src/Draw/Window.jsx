import { useContext, useEffect } from "react";
import { Context } from "./Draw";
import { keydownfx } from "./Download";
import { up } from "./Functions/Mouse";
import { promptfx } from "./Download";
function WindowFx() {
  let context = useContext(Context);
  let cwidth = context.cwidth;
  let cheight = context.cheight;
  let setRender = context.setRender;
  let hovercolor = context.hovercolor;
  let canvas = context.canvas;
  let link = context.link;
  let vg = context.vg;
  let edit = context.edit;
  let target = context.target;
  let vgcolor = context.vgcolor;
  let vgpath = context.vgpath;
  let vgpathxy = context.vgpathxy;
  let targetObject = context.targetObject;
  let thick = context.thick;
  let bBoxColor = context.bBoxColor;
  useEffect(() => {
    window.onresize = () => {
      cwidth.current = window.innerWidth;
      cheight.current = window.innerHeight;
      setRender((r) => r + 1);
    };
    window.onkeydown = (e) => {
      if (e.ctrlKey) {
      } else {
        vgpathxy.current = {};
        if (
          e.key === "Delete" &&
          Object.values(targetObject.current).length > 0
        ) {
          Object.values(targetObject.current)
            .reverse()
            .map((m) => {
              keydownfx(
                e,
                vg,
                canvas,
                link,
                edit,
                setRender,
                vgcolor,
                vgpath,
                m[7]
              );
            });
          targetObject.current = {};
        } else {
          // edit draw download
          keydownfx(
            e,
            vg,
            canvas,
            link,
            edit,
            setRender,
            vgcolor,
            vgpath,
            "m"
          );
        }
      }
    };
    window.onmousedown = (e) => {
      if (edit.current && hovercolor.current >= 0) {
        if (e.target.tagName === "path") {
          target.current = [];
          let ObjectData = targetObject.current;
          if (!e.ctrlKey) {
            targetObject.current = {};
          }
          target.current.push(
            Array.from(vg.current.children).filter((e) => e.tagName === "path")[
              hovercolor.current
            ]
          );
          target.current.push(target.current[0].getBBox().x - 2);
          target.current.push(target.current[0].getBBox().y - 2);
          target.current.push(target.current[0].getBBox().width + 4);
          target.current.push(target.current[0].getBBox().height + 4);
          target.current.push(target.current[1] + target.current[3]);
          target.current.push(target.current[2] + target.current[4]);
          target.current.push(hovercolor.current);
          target.current[0].setAttribute(
            "stroke",
            vgcolor.current[hovercolor.current]
          );
          Object.values(ObjectData).filter((e) => e[0] === target.current[0])
            .length
            ? delete targetObject.current[hovercolor.current]
            : (targetObject.current[hovercolor.current] = target.current);
         console.log(Object.values(ObjectData).map(e=>e));
          setRender((r) => r + 1);
        } else {
          targetObject.current = {};
          setRender((r) => r + 1);
        }
      } else {
        if (!e.ctrlKey) {
          targetObject.current = {};
          setRender((r) => r + 1);
        }
      }
    };
    window.onmouseover = (e) => {
      if (e.target.tagName === "path") {
        hovercolor.current = Array.from(vg.current.children)
          .filter((e) => e.tagName === "path")
          .map((m, i) => {
            if (e.target === m) {
              return i;
            }
          })
          .filter((e) => e !== undefined)[0];
        edit.current && e.target.setAttribute("stroke", bBoxColor.current);
        edit.current &&
          e.target.setAttribute("stroke-width", thick.current + 2);
      }
    };
    window.onmouseout = (e) => {
      if (e.target.tagName === "path") {
        //&& e.target !== target.current[0]
        edit.current &&
          e.target.setAttribute("stroke", vgcolor.current[hovercolor.current]);
        edit.current && e.target.setAttribute("stroke-width", thick.current);
        hovercolor.current = -1;
      }
    };
  }, []);

  return <></>;
}
export default WindowFx;
