import { useContext } from 'react';
import { RootStoreContext, IRootStore } from '@stores/index';

export default function useRootStore(): IRootStore {
  const rootStore = useContext(RootStoreContext);
  if (rootStore === null) {
    throw new Error('Store cannot be null, please add a context provider');
  }
  return rootStore;
}
