import { Title } from '@/shared/components';
import { Provider } from '@/shared/context';
import { boxStyle } from '@/shared/styles';

import { Home } from './Home';

export const App = () => (
  <Provider>
    <div style={boxStyle}>
      <Title>App</Title>

      <Home />
    </div>
  </Provider>
);
