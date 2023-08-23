import React, { useEffect, useState } from "react";
interface slide_buttonsProps {
  data: any;
  item:number
  setItem:(item:number)=>void
  body: (item: number) => React.JSX.Element;
}
const SlideBbuttons: React.FC<slide_buttonsProps> = ({item,setItem, data, body }) => {
  
  const [leftBtn, setleftBtn] = useState(false);
  const [rightBtn, setrightBtn] = useState(false);
  useEffect(() => {
    if (item <= 0) {
      setrightBtn(true);

      setleftBtn(false);
    } else if (item >= data.length - 1) {
      setleftBtn(true);

      setrightBtn(false);
    } else {
      setleftBtn(true);
      setrightBtn(true);
    }
  }, [item]);
  return (
    <div className="flex justify-center mt-4">
      {data.length > 1 ? (
        <>
          {leftBtn && (
            <button
              onClick={(e) => {
                e.preventDefault();
                setItem(item - 1);
              }}
            >
              &lt;
            </button>
          )}
          {body(item)}
          {rightBtn && (
            <button
              onClick={(e) => {
                e.preventDefault();
                setItem(item + 1);
              }}
            >
              &gt;
            </button>
          )}
        </>
      ) : (
        <>{body(item)}</>
      )}
    </div>
  );
};
export default SlideBbuttons;
