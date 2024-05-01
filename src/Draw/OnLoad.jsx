import { useContext, useEffect } from "react";
import { touchmove, touchend, touchstart } from "./Functions/Function";
import { start, move, end } from "./Functions/Touch";
import { Context } from "./Draw"; 
import {down, mousemove, up} from "./Functions/Mouse"
import {keydownfx} from "./Download"
import { promptfx } from "./Download";
 function OnLoad() {
  let context=useContext(Context)
  let vg=context.vg
  let edit=context.edit
  let focusbool=context.focusbool
  let vgpath = context.vgpath;
  let vgcolor = context.vgcolor;
  let canvas = context.canvas;
  let link = context.link;
  let setRender=context.setRender;
  let target=context.target
  let targetObject=context.targetObject
  useEffect(()=>{
    vg.current.addEventListener("touchstart", (e) => {
      focusbool.current[0] = true;
      focusbool.current[1] = e.timeStamp;
      !edit.current&&start(e, context,touchstart);
    });
    vg.current.addEventListener("touchmove", (e) => {
      focusbool.current[1] = 0;
      focusbool.current[0] = false;
      !edit.current && move(e, context, touchmove);
    });
    vg.current.addEventListener("touchend", (e) => {
      if (
          focusbool.current[0] === true &&
          e.timeStamp - focusbool.current[1] > 1000
        ) 
      {
          vgcolor.current.pop();
          vgpath.current.pop();
          keydownfx(
            promptfx(),
            vg,
            canvas,
            link,
            edit,
            setRender,
            vgcolor,
            vgpath,
            target
          );
          targetObject.current = {};
          focusbool.current[1] = 0;
          focusbool.current[0] = false;
      }
      !edit.current && end(e, context, touchend);
    });
    vg.current.addEventListener("mousedown", (e) => {
      !edit.current && down(e, context, vg);
    });
    vg.current.addEventListener("mousemove", (e) => {
      !edit.current && mousemove(e, context, vg,edit);
    });
    vg.current.addEventListener("mouseup", (e) => {
      !edit.current && up(e, context);
    });
  },[])
 }
 export default OnLoad