import { useEffect, useRef } from "react";


const useDidMoundEffect = (func:any, deps:any) =>{
    const didMount = useRef(false);

    useEffect(()=>{
      if(didMount.current) func();
      else didMount.current = true;
    }, deps);
  }

  export default useDidMoundEffect;