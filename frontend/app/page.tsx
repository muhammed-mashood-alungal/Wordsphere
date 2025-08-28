'use client'
import { Button, HStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function Home() {
  const [width , setWidth] = useState(0);
  useEffect(()=>{
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  },[]);
  return(
    <>
      {width < 600 ? <h1>HELLO</h1> : <h1>HELLO WORLD</h1>}
    </>
  )
}
