"use client";
import React, { useEffect, useState } from "react";

const TIMER: () => { time: number; name: string }[] = () => {
  const dateNow = new Date();
  const countDownDate = new Date(
    `${
      dateNow.getMonth() + 2
    } ${dateNow.getDate()}, ${dateNow.getFullYear()} 10:50:50`
  );

  const distance = countDownDate.getTime() - dateNow.getTime();

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  return [
    // { name: "Days", time: `${days < 10 ? 0 : 0}${days}` },
    // { name: "Hours", time: `${hours < 10 ? 0 : 0}${hours}` },
    // { name: "Mins", time: `${minutes < 10 ? 0 : 0}${minutes}` },
    // { name: "Secs", time: `${seconds < 10 ? 0 : 0}${seconds}` },
    { name: "Days", time: days },
    { name: "Hours", time: hours },
    { name: "Mins", time: minutes },
    { name: "Secs", time: seconds },
  ];
};

export default function Timer() {
  const [timer, setTimer] = useState([{ name: "days", time: 30 }]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimer(TIMER());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="grid grid-cols-4 mt-6 py-3 bg-white rounded-md">
      {timer.map((timer, index) => (
        <div
          key={index}
          className=" text-head-color flex flex-col items-center time_content"
        >
          <span className="countdown font-mono text-5xl">
            <span
              className="text-[3rem]"
              style={{ "--value": timer.time } as React.CSSProperties}
            ></span>
          </span>
          <span className="text-[.9rem]">{timer.name}</span>
        </div>
      ))}
    </div>
  );
}
