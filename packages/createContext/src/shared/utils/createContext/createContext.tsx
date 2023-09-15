import {
  ReactNode,
  createContext as createReactContext,
  useCallback,
  useContext,
  useRef,
  useSyncExternalStore,
} from 'react';
import merge from 'ts-deepmerge';
import { PartialDeep, Primitive } from 'type-fest';

type Context = Record<string, unknown>;

export const createContext = <Data extends Record<string, unknown>>(initialData: Data) => {
  const useDataContext = () => {
    const data = useRef(initialData);

    const get = useCallback(() => data.current, []);

    const subscribers = useRef(new Set<() => void>());

    const set = useCallback((value: PartialDeep<Data, { recurseIntoArrays: true }>) => {
      data.current = merge(data.current, value) as Data;

      subscribers.current.forEach((callback) => callback());
    }, []);

    const subscribe = useCallback((callback: () => void) => {
      subscribers.current.add(callback);

      return () => subscribers.current.delete(callback);
    }, []);

    return {
      get,
      set,
      subscribe,
    };
  }

  const DataContext = createReactContext<ReturnType<typeof useDataContext> | null>(null);

  const Provider = ({ children }: { children: ReactNode }) => (
    <DataContext.Provider value={useDataContext()}>
      {children}
    </DataContext.Provider>
  );

  function useData<Snapshot>(selector: (data: Data) => Snapshot): Snapshot {
    const dataContext = useContext(DataContext);

    if (!dataContext) {
      throw new Error('Data context not found');
    }

    return useSyncExternalStore(
      dataContext.subscribe,
      () => selector(dataContext.get()),
      () => selector(initialData),
    );
  }

  // const useAtomicData = <Snapshot extends Primitive>(selector: (data: Data) => Snapshot): Snapshot => {
  //   const dataContext = useContext(DataContext);

  //   if (!dataContext) {
  //     throw new Error('Data context not found');
  //   }

  //   return useSyncExternalStore(
  //     dataContext.subscribe,
  //     () => selector(dataContext.get()),
  //     () => selector(initialData),
  //   );
  // };

  const useAtomicData = <Snapshot extends Primitive>(...params: Parameters<typeof useData<Snapshot>>): Snapshot => (
    useData<Snapshot>(...params)
  );

  const useObjectData = <Snapshot extends Record<string, unknown>>(...params: Parameters<typeof useData<Snapshot>>): Snapshot => (
    useData<Snapshot>(...params)
  );

  const useArrayData = <Snapshot extends Array<unknown>>(...params: Parameters<typeof useData<Snapshot>>): Snapshot => (
    useData<Snapshot>(...params)
  );

  const useSetData = () => {
    const dataContext = useContext(DataContext);

    if (!dataContext) {
      throw new Error('Data context not found!');
    }

    return dataContext.set;
  };

  return {
    Provider,
    useAtomicData,
    useObjectData,
    useArrayData,
    useSetData,
  };
}
