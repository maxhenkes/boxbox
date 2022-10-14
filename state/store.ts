import create from "zustand";
import { persist } from "zustand/middleware";
import { createDataSlice } from "./dataSlice";
import { createVisualSlice } from "./visualSlice";

export const useDiagramStore = create<any>(
  persist(
    (...a) => ({
      ...createDataSlice(...a),
      ...createVisualSlice(...a),
    }),
    { name: "diagramStore", version: 3 },
  ),
);
