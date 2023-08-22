import {
  ReactNode,
  createContext as createReactContext,
  useCallback,
  useContext,
  useRef,
  useSyncExternalStore,
} from 'react';

type Primitive = boolean | number | string | null | undefined;
type Context = Record<string, Primitive>;

export function createContext<Data extends Context>(initialData: Data) {
  type UseDataContextReturn = {
    get: () => Data;
    set: (value: Partial<Data>) => void;
    subscribe: (callback: () => void) => () => void;
  };

  const useDataContext = (): UseDataContextReturn => {
    const data = useRef(initialData);

    const get = useCallback(() => data.current, []);

    const subscribers = useRef(new Set<() => void>());

    const set = useCallback((value: Partial<Data>) => {
      data.current = { ...data.current, ...value };

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

  const DataContext = createReactContext<UseDataContextReturn | null>(null);

  const Provider = ({ children }: { children: ReactNode }) => (
    <DataContext.Provider value={useDataContext()}>
      {children}
    </DataContext.Provider>
  );

  const useData = <Snapshot extends Data[keyof Data]>(
    selector: (data: Data) => Snapshot,
  ): Snapshot => {
    const dataContext = useContext(DataContext);

    if (!dataContext) {
      throw new Error('Data context not found!');
    }

    const { subscribe, get } = dataContext;

    return useSyncExternalStore(
      subscribe,
      () => selector(get()),
      () => selector(initialData),
    );
  };

  const useSetData = () => {
    const dataContext = useContext(DataContext);

    if (!dataContext) {
      throw new Error('Data context not found!');
    }

    const { set } = dataContext;

    // eslint-disable-next-line react-hooks/exhaustive-deps
    return useCallback((partialData: Partial<Data>) => set(partialData), []);
  };

  return {
    Provider,
    useData,
    useSetData,
  };
}
