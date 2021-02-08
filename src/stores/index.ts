import { createContext } from 'react';
import { types, Instance } from 'mobx-state-tree';

const RootStore = types.model({});

export const rootStore = RootStore.create({});

export type IRootStore = Instance<typeof RootStore>;

export const RootStoreContext = createContext<null | IRootStore>(null);
