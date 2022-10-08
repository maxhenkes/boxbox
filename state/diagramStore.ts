import create from "zustand";

type diagramStoreType = {
  name: string;
  vmOptions: vmOptions;
};

type vmOptions = {
  cores?: number;
  cpulimit?: number;
  description?: string;
  freeze?: boolean;
  memory?: number;
  onBoot?: boolean;
};
