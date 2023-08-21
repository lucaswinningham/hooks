/* eslint-env jest */
import { act, renderHook } from '@next-web/shared/tests/testUtils';

import { useQueue } from './useQueue';

describe('useQueue', () => {
  describe('queue', () => {
    describe('when empty', () => {
      it('returns an empty array', async () => {
        const { result } = renderHook(() => useQueue());

        await act(async () => {
          const { queue } = result.current;

          expect(queue).toEqual([]);
        });
      });
    });

    describe('when not empty', () => {
      it('returns the array', async () => {
        const { result } = renderHook(() => useQueue());

        await act(async () => {
          const { enq } = result.current;

          enq(1, 2, 3);
        });

        await act(async () => {
          const { queue } = result.current;

          expect(queue).toEqual([1, 2, 3]);
        });
      });
    });
  });

  describe('enq', () => {
    describe('when not given any items', () => {
      it('does not add to the queue', async () => {
        const { result } = renderHook(() => useQueue());

        await act(async () => {
          const { enq } = result.current;

          enq();
        });

        await act(async () => {
          const { queue } = result.current;

          expect(queue).toEqual([]);
        });
      });
    });

    describe('when given an item', () => {
      it('adds the item to the queue', async () => {
        const { result } = renderHook(() => useQueue());

        await act(async () => {
          const { enq } = result.current;

          enq('hi');
        });

        await act(async () => {
          const { queue } = result.current;

          expect(queue).toEqual(['hi']);
        });
      });
    });

    describe('when given many items', () => {
      it('adds all items to the queue', async () => {
        const { result } = renderHook(() => useQueue());

        await act(async () => {
          const { enq } = result.current;

          enq(true, false);
        });

        await act(async () => {
          const { queue } = result.current;

          expect(queue).toEqual([true, false]);
        });
      });
    });
  });

  describe('deq', () => {
    describe('when no items are in the queue', () => {
      it('returns undefined', async () => {
        const { result } = renderHook(() => useQueue());

        await act(async () => {
          const { deq } = result.current;

          const item = deq();

          expect(item).toBeUndefined();
        });
      });

      it('does not call the callback', async () => {
        const callback = jest.fn();
        const { result } = renderHook(() => useQueue());

        await act(async () => {
          const { deq } = result.current;

          deq(callback);
        });

        expect(callback).not.toHaveBeenCalled();
      });

      it('queue remains an empty array', async () => {
        const { result } = renderHook(() => useQueue());

        await act(async () => {
          const { deq } = result.current;

          deq();
        });

        await act(async () => {
          const { queue } = result.current;

          expect(queue).toEqual([]);
        });
      });
    });

    describe('when there is one item in the queue', () => {
      const item = BigInt(true);

      it('returns the item', async () => {
        const { result } = renderHook(() => useQueue());

        await act(async () => {
          const { enq } = result.current;

          enq(item);
        });

        await act(async () => {
          const { deq } = result.current;

          const dequeuedItem = deq();

          expect(dequeuedItem).toBe(item);
        });
      });

      it('calls the callback with the item', async () => {
        const callback = jest.fn();
        const { result } = renderHook(() => useQueue());

        await act(async () => {
          const { enq } = result.current;

          enq(item);
        });

        await act(async () => {
          const { deq } = result.current;

          deq(callback);
        });

        expect(callback).toHaveBeenCalledWith(item);
      });

      it('queue becomes an empty array', async () => {
        const { result } = renderHook(() => useQueue());

        await act(async () => {
          const { enq } = result.current;

          enq(item);
        });

        await act(async () => {
          const { deq } = result.current;

          deq();
        });

        await act(async () => {
          const { queue } = result.current;

          expect(queue).toEqual([]);
        });
      });
    });

    describe('when there are many items in the queue', () => {
      const items = [/this/, /that/, /the other/];

      it('returns the first item', async () => {
        const { result } = renderHook(() => useQueue());

        await act(async () => {
          const { enq } = result.current;

          enq(...items);
        });

        await act(async () => {
          const { deq } = result.current;

          const dequeuedItem = deq();

          expect(dequeuedItem).toBe(items[0]);
        });
      });

      it('calls the callback with the first item', async () => {
        const callback = jest.fn();
        const { result } = renderHook(() => useQueue());

        await act(async () => {
          const { enq } = result.current;

          enq(...items);
        });

        await act(async () => {
          const { deq } = result.current;

          deq(callback);
        });

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const [first, ..._rest] = items;

        expect(callback).toHaveBeenCalledWith(first);
      });

      it('queue becomes an array without the first item', async () => {
        const { result } = renderHook(() => useQueue());

        await act(async () => {
          const { enq } = result.current;

          enq(...items);
        });

        await act(async () => {
          const { deq } = result.current;

          deq();
        });

        await act(async () => {
          const { queue } = result.current;

          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const [_first, ...rest] = items;

          expect(queue).toEqual(rest);
        });
      });
    });
  });

  describe('dump', () => {
    describe('when no items are in the queue', () => {
      it('does not call the callback', async () => {
        const callback = jest.fn();
        const { result } = renderHook(() => useQueue());

        await act(async () => {
          const { dump } = result.current;

          dump(callback);
        });

        expect(callback).not.toHaveBeenCalled();
      });

      it('queue remains an empty array', async () => {
        const { result } = renderHook(() => useQueue());

        await act(async () => {
          const { dump } = result.current;

          dump();
        });

        await act(async () => {
          const { queue } = result.current;

          expect(queue).toEqual([]);
        });
      });
    });

    describe('when there is one item in the queue', () => {
      const item = { dump: 'me' };

      it('calls the callback with the item', async () => {
        const callback = jest.fn();
        const { result } = renderHook(() => useQueue());

        await act(async () => {
          const { enq } = result.current;

          enq(item);
        });

        await act(async () => {
          const { dump } = result.current;

          dump(callback);
        });

        expect(callback).toHaveBeenCalledWith(item);
      });

      it('queue becomes an empty array', async () => {
        const { result } = renderHook(() => useQueue());

        await act(async () => {
          const { enq } = result.current;

          enq(item);
        });

        await act(async () => {
          const { dump } = result.current;

          dump();
        });

        await act(async () => {
          const { queue } = result.current;

          expect(queue).toEqual([]);
        });
      });
    });

    describe('when there are many items in the queue', () => {
      const items = [{ flush: 'all' }, { of: 'this' }, { down: 'theDrain' }];

      it('calls the callback for each item', async () => {
        const callback = jest.fn();
        const { result } = renderHook(() => useQueue());

        await act(async () => {
          const { enq } = result.current;

          enq(...items);
        });

        await act(async () => {
          const { dump } = result.current;

          dump(callback);
        });

        expect(callback.mock.calls).toEqual(items.map((item) => [item]));
      });

      it('queue becomes an empty array', async () => {
        const { result } = renderHook(() => useQueue());

        await act(async () => {
          const { enq } = result.current;

          enq(...items);
        });

        await act(async () => {
          const { dump } = result.current;

          dump();
        });

        await act(async () => {
          const { queue } = result.current;

          expect(queue).toEqual([]);
        });
      });
    });
  });
});
