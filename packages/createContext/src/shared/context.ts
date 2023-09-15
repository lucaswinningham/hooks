import type { App } from '@/shared/types';
import { createContext } from '@/shared/utils';

const initial: App = { user: {}, feed: [], messaging: {} };

const { Provider, useAtomicData, useObjectData, useArrayData, useSetData } = createContext<App>(initial);

export { Provider, useAtomicData, useObjectData, useArrayData, useSetData };


// Jotai

// import { useState, useEffect } from 'react';

// type Listener = () => void;
// type Listeners = Set<Listener>;

// type AtomState<T = any> = {
//   value: T;
//   listeners: Listeners;
// };

// type Atom<T = any> = { init: T };

// export function atom<T>(init: T): Atom<T> {
//   return { init };
// }

// const map = new WeakMap<Atom, AtomState>();

// function getState<T>(atom: Atom<T>) {
//   let state: AtomState<T> | undefined = map.get(atom);

//   if (!state) {
//     state = { value: atom.init, listeners: new Set<Listener>() };
//     map.set(atom, state);
//   }

//   return state;
// }

// export function useGetAtom<T>(atom: Atom<T>) {
//   const state = getState(atom);
//   const [value, setValue] = useState<T>(state.value);

//   useEffect(() => {
//     const callback = () => setValue(state.value);

//     state.listeners.add(callback);

//     return () => state.listeners.delete(callback);
//   }, []);

//   return value;
// }

// export function useSetAtom<T>(atom: Atom<T>) {
//   const state = getState(atom);

//   const setAtom = (value: T) => {
//     state.value = value;
//     state.listeners.forEach((listener) => listener());
//   };

//   return setAtom;
// }

// export function useAtom<T>(atom: Atom<T>) {
//   return [
//     useGetAtom(atom),
//     useSetAtom(atom),
//   ];
// }