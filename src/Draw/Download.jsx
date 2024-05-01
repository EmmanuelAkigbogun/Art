export let keydownfx = (e, vg, canvas, link,edit,setRender,vgcolor,vgpath,target) => {
    if (e.key === "e" || e.key === "E") {
        edit.current=true;
                setRender((r) => r + 1);
    }
    else if (e.key === "D" || e.key === "d") {
      edit.current = false;
              setRender((r) => r + 1);
    } else if (e.key === "Delete") {
      vgcolor.current = vgcolor.current.filter(
               (e, i) => i !== target
             );
             vgpath.current = vgpath.current.filter(
               (e, i) => i !== target
             );     
                  
                     setRender((r) => r + 1);   
                 
    } 
    else {
      let value = btoa(vg.current.outerHTML);
      if (e.key === "v" || e.key === "v") {
        link.current.href = "data:image/svg+xml;base64," + value;
        link.current.download = "draw";
        link.current.click();
      }
      if (e.key === "p" || e.key === "P" || e.key === "j" || e.key === "J") {
        let ctx = canvas.current.getContext("2d");
        let img = new Image();
        img.src = "data:image/svg+xml;base64," + value;
        img.onload = () => {
          ctx.drawImage(img, 0, 0);
          link.current.href =
            e.key === "j" || e.key === "J"
              ? canvas.current.toDataURL("image/jpeg", 1)
              : canvas.current.toDataURL("image/png", 1);
          link.current.download = "draw";
          link.current.click();
        };
        img.remove();
      }
    }
};
export let bounded = (string, a, z) => {
  return string
    .split(a)
    .join(z)
    .split(z)
    .filter((e, i) => i % 2 !== 0);
};
export let promptfx=()=>{
        let m = {};
        m["key"] = prompt("Function", "svg png jpeg edit draw delete");
           m["key"]=m["key"]
          .replace("svg", "v")
          .replace("png", "p")
          .replace("jpeg", "j")
          .replace("delete", "Delete")
          .replace("edit", "e")
          .replace("draw", "d");
        m["key"] !== "v" &&
        m["key"] !== "p" &&
        m["key"] !== "j" &&
        m["key"] !== "d" &&
        m["key"] !== "e" &&
        m["key"] !== "Delete"
          ? (m["key"] = "d")
          : "";
          return m
}