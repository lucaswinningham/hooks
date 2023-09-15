import { Title } from '@/shared/components';
import { boxStyle } from '@/shared/styles';

import { Display } from './Display';
import { Form } from './Form';

export const User = () => (
  <div style={boxStyle}>
    <Title>User</Title>

    <Form />
    <Display />
  </div>
);
