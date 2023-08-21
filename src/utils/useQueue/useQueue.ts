import { useCallback, useRef, useState } from 'react';

export const useQueue = <T>() => {
  const q = useRef<T[]>([]);
  const [queue, setQueue] = useState(q.current);

  const emit = useCallback(() => setQueue(q.current), []);

  const enq = useCallback(
    (...newItems: T[]) => {
      q.current = [...q.current, ...newItems];

      emit();
    },
    [emit],
  );

  const deq = useCallback(
    (callback: (item: T) => void = () => {}) => {
      const [item, ...rest] = q.current;

      if (q.current.length !== 0) {
        callback(item);

        q.current = rest;
        emit();
      }

      return item;
    },
    [emit],
  );

  const dump = useCallback(
    (callback: (item: T) => void = () => {}) => {
      if (q.current.length !== 0) {
        q.current.forEach((item) => callback(item));

        q.current = [];
        emit();
      }
    },
    [emit],
  );

  return { queue, enq, deq, dump };
};
