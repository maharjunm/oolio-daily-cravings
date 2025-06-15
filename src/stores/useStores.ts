import { useContext } from "react";
import { MobXProviderContext } from "mobx-react";
import type { IRootStore } from "./types";

export default function useStores() {
  return useContext(MobXProviderContext) as IRootStore;
}
