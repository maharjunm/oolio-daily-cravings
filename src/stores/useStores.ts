import React from 'react';
import { MobXProviderContext } from 'mobx-react';
import type { IRootStore } from './types';

export default function useStores() {
  return React.useContext(MobXProviderContext) as IRootStore;
}
