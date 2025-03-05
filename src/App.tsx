import "./App.css";

import { useState } from "react";

function SlowComponent({ logStatement }: { logStatement: string }) {
  console.log("SlowComponent render", logStatement);

  const largeArray = Array.from({ length: 10000 }, (_, i) => i);

  return (
    <div className="flex flex-wrap overflow-scroll gap-1">
      {largeArray.map((value) => (
        <div
          key={value}
          className="w-2 h-2 bg-neutral-700"
          style={{
            backgroundColor: `rgb(${value % 255}, ${(value * 2) % 255}, ${
              (value * 3) % 255
            })`,
          }}
        ></div>
      ))}
    </div>
  );
}

function ColorPicker({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <input
      type="color"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full h-12 cursor-pointer rounded border border-white/20 bg-neutral-700 p-1"
    />
  );
}

function DemoComponent() {
  const [color, setColor] = useState("#ffffff");

  return (
    <div className="flex flex-wrap justify-center gap-8">
      <div className="flex flex-col p-4 border border-white h-64 w-96 gap-4">
        <h2 className="text-xl font-bold mb-8 text-center">Color Picker</h2>
        <ColorPicker value={color} onChange={setColor} />
        <div className="mt-2">
          Current value: <br />
          <span className="font-mono">{color}</span>
        </div>
      </div>
      <div className="flex flex-col p-4 border border-white h-64 w-96 gap-2">
        <h2 className="text-xl font-bold text-center">A Slow Component</h2>
        <span className="text-center text-neutral-200 font-light">
          (This component renders 10,000 boxes)
        </span>
        <SlowComponent logStatement="test" />
      </div>
    </div>
  );
}

function ParentComponent() {
  return (
    <div className="flex flex-col min-h-screen">
      <h1 className="text-2xl font-bold text-center py-8 absolute top-0 left-0 right-0">
        React Compiler Demo
      </h1>
      <div className={`flex items-center justify-center flex-grow`}>
        <DemoComponent />
      </div>
    </div>
  );
}

export default ParentComponent;
