import create from "zustand";
import { remove } from "lodash";

type diagramStoreType = {
  name: string;
  VMs: vmOptions[];
  addVM: Function;
  removeVM: Function;
  changeVM: Function;
};

type vmOptions = {
  id: string;
  name: string;
  cores?: number;
  cpulimit?: number;
  description?: string;
  freeze?: boolean;
  memory?: number;
  onBoot?: boolean;
};

type diagramType = {
  diagramMap: Map<string, any>;
  name?: string;
  addVM: Function;
  removeVM: Function;
};

export const useDiagramStore = create<diagramType>((set, get) => ({
  diagramMap: new Map<string, any>(),
  addVM: (vm: vmOptions) => {
    set({ diagramMap: get().diagramMap.set(vm.id, vm) });
  },
  removeVM: (id: string) => {
    get().diagramMap.delete(id);
  },
}));

export const useVMStore = create<diagramStoreType>((set, get) => ({
  name: "",
  VMs: [],
  addVM: (vm: vmOptions) => {
    set({ VMs: get().VMs.concat(vm) });
  },
  removeVM: (id: string) => {
    set({
      VMs: remove(get().VMs, (vm) => {
        vm.id === id;
      }),
    });
  },
  changeVM: (vm: vmOptions) => {
    set({
      VMs: remove(get().VMs, (vms) => {
        vms.id === vm.id;
      }),
    });
    set({ VMs: get().VMs.concat(vm) });
  },
}));
