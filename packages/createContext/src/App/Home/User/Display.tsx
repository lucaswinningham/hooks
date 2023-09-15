import { Title } from '@/shared/components';
import { useAtomicData } from '@/shared/context';
import { boxStyle } from '@/shared/styles';

const IdDisplay = () => {
  const id = useAtomicData(({ user: { id } }) => id);

  return <div style={boxStyle}>Id: {id}</div>;
};

const NameDisplay = () => {
  const name = useAtomicData(({ user: { name } }) => name);

  return <div style={boxStyle}>Name: {name}</div>;
};

const AgeDisplay = () => {
  const age = useAtomicData(({ user: { age } }) => age);

  return <div style={boxStyle}>Age: {age}</div>;
};

const AliveDisplay = () => {
  const alive = useAtomicData(({ user: { alive } }) => alive);

  return <div style={boxStyle}>Alive: {(alive ?? '').toString()}</div>;
};

export const Display = () => {
  return (
    <div style={boxStyle}>
      <Title>Display</Title>

      <IdDisplay />
      <NameDisplay />
      <AgeDisplay />
      <AliveDisplay />
    </div>
  );
};
