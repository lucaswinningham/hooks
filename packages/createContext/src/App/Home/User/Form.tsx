import { Title } from '@/shared/components';
import { useAtomicData, useSetData } from '@/shared/context';
import { boxStyle } from '@/shared/styles';

import { ChangeEvent } from 'react';

const NameInput = () => {
  const name = useAtomicData(({ user: { name } }) => name);
  const setData = useSetData();

  const handleNameChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    setData({ user: { name: value } });
  };

  return (
    <div style={boxStyle}>
      <Title>NameInput</Title>

      <div style={boxStyle}>
        <label htmlFor="person-name">Name:</label>
        <input
          type="text"
          id="person-name"
          name="name"
          onChange={handleNameChange}
          value={name ?? ''}
        />
      </div>
    </div>
  );
};

const AgeInput = () => {
  const age = useAtomicData(({ user: { age } }) => age);
  const setData = useSetData();

  const handleAgeChange = ({ target: { valueAsNumber } }: ChangeEvent<HTMLInputElement>) => {
    setData({ user: { age: Number.isNaN(valueAsNumber) ? undefined : valueAsNumber } });
  };

  return (

    <div style={boxStyle}>
      <Title>AgeInput</Title>

      <div style={boxStyle}>
        <label htmlFor="person-age">Age:</label>
        <input
          type="number"
          id="person-age"
          name="age"
          onChange={handleAgeChange}
          value={age ?? ''}
        />
      </div>
    </div>
  );
};

const AliveInput = () => {
  const alive = useAtomicData(({ user: { alive } }) => alive);
  const setData = useSetData();

  const handleAliveChange = ({ target: { checked } }: ChangeEvent<HTMLInputElement>) => {
    setData({ user: { alive: checked } });
  };

  return (

    <div style={boxStyle}>
      <Title>AliveInput</Title>

      <div style={boxStyle}>
        <label htmlFor="person-alive">Alive:</label>
        <input
          type="checkbox"
          id="person-alive"
          name="alive"
          onChange={handleAliveChange}
          checked={!!alive}
        />
      </div>
    </div>
  );
};

export const Form = () => {
  return (
    <div style={boxStyle}>
      <Title>Form</Title>

      <NameInput />
      <AgeInput />
      <AliveInput />
    </div>
  );
};
