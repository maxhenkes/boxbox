type vmType = {
  id: string;
  name: string;
  cores?: number;
  cpulimit?: number;
  description?: string;
  freeze?: boolean;
  memory?: number;
  onBoot?: boolean;
};

export const createDataSlice = (set, get) => ({
  diagramMap: new Map<string, vmType>(),
  addDataNode: (vm: vmType) =>
    set((state) => ({ diagramMap: state.diagramMap.set(vm.id, vm) })),
  removeDataNode: (id: string) =>
    set((state) => ({ diagramMap: state.diagramMap.dete(id) })),
  updateDataNode: (vm: vmType) =>
    set((state) => ({ diagramMap: state.diagramMap.set(vm.id, vm) })),
});
