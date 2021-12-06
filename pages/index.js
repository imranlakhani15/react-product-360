import Head from "next/head";
// import Tridi from 'react-tridi';

import "react-tridi/dist/index.css";
import { useRef, useState } from "react";
import dynamic from "next/dynamic";
import styled from "styled-components";

const Tridi = dynamic(() => import("react-tridi"), {
  ssr: false,
});

const Card = styled.div`
  width: 500px;
  height: 500px;
  padding: 40px;
  background: white;
  border-radius: 20px;
  position: absolute;
  left: ${props => props.x}px;
  top: ${props => props.y}px;
`;

export default function Home() {
  const [isAutoPlayRunning, setIsAutoPlayRunning] = useState(false);
  const [pins, setPins] = useState([
    {
      id: "kwukoogcx71fkgpb3hb",
      frameId: 0,
      x: "0.504902",
      y: "0.686275",
      recordingSessionId: "kwukomkx8n24ksg87if",
    },
    {
      id: "kwukoqdaujej8i2h59s",
      frameId: 0,
      x: "0.733456",
      y: "0.622004",
      recordingSessionId: "kwukomkx8n24ksg87if",
    },
    {
      id: "kwukorpatf0acyua57l",
      frameId: 0,
      x: "0.501225",
      y: "0.388889",
      recordingSessionId: "kwukomkx8n24ksg87if",
    },
    {
      id: "kwukotdsaj28xsfw9d",
      frameId: 0,
      x: "0.278799",
      y: "0.496732",
      recordingSessionId: "kwukomkx8n24ksg87if",
    },
  ]);
  const [currentPin, setcurrentPin] = useState(undefined);
  const tridiRef = useRef(null);

  const frameChangeHandler = (currentFrameIndex) => {
    console.log("current frame index", currentFrameIndex);
  };

  const recordStartHandler = (recordingSessionId) =>
    console.log("on record start", { recordingSessionId, pins });

  const recordStopHandler = (recordingSessionId) =>
    console.log("on record stop", { recordingSessionId, pins });

  const pinClickHandler = (pin) => {
    console.log("on pin click", pin);
    setcurrentPin(pin);
  };

  const onLoadChange = (loaded, percentage) => {
    console.log("have all Image loaded? : " + loaded);
    console.log("current load percentage : " + percentage + "%");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-start w-full flex-1 px-20 text-center">
        <div className="mt-12 relative">
          <Tridi
            ref={tridiRef}
            location="/images"
            format="jpeg"
            count="36"
            onFrameChange={frameChangeHandler}
            autoplaySpeed={70}
            onAutoplayStart={() => setIsAutoPlayRunning(true)}
            onAutoplayStop={() => setIsAutoPlayRunning(false)}
            onRecordStart={recordStartHandler}
            onRecordStop={recordStopHandler}
            onPinClick={pinClickHandler}
            inverse
            showControlBar
            showStatusBar
            pins={pins}
            setPins={setPins}
            hintOnStartup
            hintText="Drag to view"
            onLoadChange={onLoadChange}
            minZoom={0.5}
            zoom={1}
          />

          <button onClick={() => tridiRef.current.prev()}>Prev</button>
          <button onClick={() => tridiRef.current.next()}>Next</button>
          <button
            onClick={() => tridiRef.current.toggleAutoplay(!isAutoPlayRunning)}
          >
            {isAutoPlayRunning ? "Pause" : "Autoplay"}
          </button>
        </div>
        {currentPin ? (
          <Card x={currentPin.x} y={currentPin.y}>
            <p>
              Current Co-ordinates: X - {currentPin.x}, Y - {currentPin.y}
            </p>
          </Card>
        ) : null}
      </main>
    </div>
  );
}
