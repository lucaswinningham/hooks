export type Id = string;

// Atomic data
export type User = {
  id: Id;
  name: string;
  age: number;
  alive: boolean;
};

export type Message = {
  id: Id;
  content: string;
  from: Id;
  viewed: boolean;
};

export type Thread = {
  id: Id;
  participants: {
    [participantId: Id]: User;
  };
  messages: Array<Message>;
};

// Denormalized data
export type Messaging = {
  // [participantId: Id]: {
  //   participant: User;
  //   thread: Thread;
  // };
  participants: {
    [participantId: Id]: User;
  };
  threads: {
    [threadId: Id]: Thread;
  };
};

export type Post = {
  id: Id;
  title: string;
  body: string;
};

// Array data
export type Feed = Array<Post>;

export type App = {
  user: User | Record<string, never>;
  messaging: Messaging | Record<string, never>;
  feed: Feed;
};
