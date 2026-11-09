import { useLayoutEffect, useRef } from "react";
import { Journey } from "./Journey";
import { initAnimations } from "./animations";

export function App() {
  const root = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => initAnimations(root.current!), []);
  return (
    <div ref={root}>
      <Journey />
    </div>
  );
}
