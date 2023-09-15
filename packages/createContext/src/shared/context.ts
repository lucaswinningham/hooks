import type { App } from '@/shared/types';
import { createContext } from '@/shared/utils';

const initial: App = { user: {}, feed: [], messaging: {} };

const { Provider, useAtomicData, useObjectData, useArrayData, useSetData } = createContext<App>(initial);

export { Provider, useAtomicData, useObjectData, useArrayData, useSetData };
