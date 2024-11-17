import { useEffect, useState } from "react";

type props = {
  src: string;
};
export default function LottieData({ src }: props) {
  const [data, setData] = useState();

  useEffect(() => {
    const getJson = async () => {
      const res = await fetch(src);
      const data = await res.json();
      console.log(data);
      setData(data);
    };
    getJson();
  }, [src]);
  return data;
}
