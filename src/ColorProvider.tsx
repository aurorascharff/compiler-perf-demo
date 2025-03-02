import { createContext, useContext, useState } from "react";

const ColorContext = createContext<{
  color: string;
  setColor: (color: string) => void;
} | null>(null);

export default function ColorProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [color, setColor] = useState("#ffffff");

  return (
    <ColorContext.Provider value={{ color, setColor }}>
      {children}
    </ColorContext.Provider>
  );
}

export function useColor() {
  const context = useContext(ColorContext);
  if (!context) {
    throw new Error("useColor must be used within a ColorProvider");
  }
  return context;
}
