import { Title } from '@/shared/components';
import { useSetData } from '@/shared/context';
import { boxStyle } from '@/shared/styles';

import { useEffect } from 'react';

import './Home.css';

import { Messaging } from './Messaging';
import { User } from './User';

const generateRandomBoolean = () => Math.random() < 0.5;

const generateRandomUser = () => ({
  id: crypto.randomUUID(),
  name: crypto.randomUUID(),
  age: Math.floor(Math.random() * 100),
  alive: generateRandomBoolean(),
});

const generateRandomPost = () => ({
  id: crypto.randomUUID(),
  title: crypto.randomUUID(),
  body: crypto.randomUUID(),
});

const [currentUser, ...otherUsers] = Array.from(Array(3)).map(generateRandomUser);
const feed = Array.from(Array(3)).map(generateRandomPost);
const messaging = otherUsers.reduce((acc, participant) => ({
  ...acc,
  [participant.id]: {
    participant,
    thread: {
      id: crypto.randomUUID(),
      messages: [{
        id: crypto.randomUUID(),
        content: crypto.randomUUID(),
        from: currentUser.id,
        unread: generateRandomBoolean(),
      },{
        id: crypto.randomUUID(),
        content: crypto.randomUUID(),
        from: participant.id,
        unread: generateRandomBoolean(),
      }],
    },
  }
}), {});

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function simulateFetch<T>(data: T, ms: number) {
  await sleep(ms);

  return data;
}

type SimulateSocketOptions = { ms?: number, count?: number };
const simulateSocket = (callback: () => void = () => {}, { ms = 6000, count = 5 }: SimulateSocketOptions = {}) => {
  let x = 0;

  const intervalId = setInterval(() => {
    callback();

    x = x + 1;

    if (x >= count) {
      clear();
    }
  }, ms);

  const clear = () => clearInterval(intervalId);

  return clear;
};

export const Home = () => {
  const setData = useSetData();

  useEffect(() => {
    simulateFetch(currentUser, 1000).then((user) => {
      setData({ user });

      simulateFetch(feed, 500).then((feed) => setData({ feed }));
      simulateFetch(messaging, 1000).then((messaging) => setData({ messaging }));
    });

    const clearMessagingSocket = simulateSocket(() => {
      const participantIds = Object.keys(messaging);
      const participantId = participantIds[Math.floor(Math.random() * participantIds.length)];

      setData({ messaging: {
        [participantId]: {
          thread: {
            messages: [{
              id: crypto.randomUUID(),
              content: crypto.randomUUID(),
              from: generateRandomBoolean() ? currentUser.id : participantId,
              unread: generateRandomBoolean(),
            }],
          },
        },
      }})
    });

    return () => {
      clearMessagingSocket();
    };
  }, []);

  return (
    <div style={boxStyle}>
      <Title>Home</Title>

      <div className="container">
        <div className="item">
          <User />
        </div>

        {/* <div className="item"> */}
          {/* <Feed /> */}
        {/* </div> */}

        <div className="item">
          <Messaging />
        </div>
      </div>
    </div>
  );
};
