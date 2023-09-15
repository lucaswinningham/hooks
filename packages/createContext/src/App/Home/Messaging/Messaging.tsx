import { Title } from '@/shared/components';
import { useAtomicData } from '@/shared/context';
import { boxStyle } from '@/shared/styles';
import { Id, Message as MessageType, Thread as ThreadType } from '@/shared/types';

const DELIMITER = '|';

// use context again?

const ContentDisplay = ({ participantId, messageId }: { participantId: Id, messageId: Id }) => {
  const content = useAtomicData(({ messaging }) => (
    (messaging[participantId].thread.messages.find(({ id }) => id === messageId) ?? {}).content
  ));

  return <div style={boxStyle}>Content: {content}</div>;
};

const UnreadDisplay = ({ participantId, messageId }: { participantId: Id, messageId: Id }) => {
  const unread = useAtomicData(({ messaging }) => (
    (messaging[participantId].thread.messages.find(({ id }) => id === messageId) ?? {}).unread
  ));

  return <div style={boxStyle}>Unread: {(unread ?? '').toString()}</div>;
};

const Message = ({ participantId, messageId }: { participantId: Id, messageId: Id }) => (
  <div style={boxStyle}>
    <ContentDisplay participantId={participantId} messageId={messageId} />
    <UnreadDisplay participantId={participantId} messageId={messageId} />
  </div>
);

const Messages = ({ participantId }: { participantId: Id }) => {
  const messageIdsStr = useAtomicData(({ messaging }) => (
    messaging[participantId].thread.messages.map(({ id }) => id).sort().join(DELIMITER)
  ));
  const messageIds = messageIdsStr ? messageIdsStr.split(DELIMITER) : [];

  return (
    <div style={boxStyle}>
      <Title>Messages</Title>

      {messageIds.map((messageId) => (
        <Message key={messageId} participantId={participantId} messageId={messageId} />
      ))}
    </div>
  );
};

const Participant = ({ participantId }: { participantId: Id }) => {
  return (
    <div style={boxStyle}>
      <Title>Participant: {participantId}</Title>

      <Messages participantId={participantId} />
    </div>
  );
};

const Threads = () => {
  const participantIdsStr = useAtomicData(({ messaging }) => Object.keys(messaging).sort().join(DELIMITER));
  const participantIds = participantIdsStr ? participantIdsStr.split(DELIMITER) : [];

  return (
    <>
      {participantIds.map((participantId) => (
        <Participant key={participantId} participantId={participantId} />
      ))}
    </>
  );
};

const unreadMessages = (messages: Array<MessageType>) => (
  messages.reduce((acc, { unread }) => unread ? acc + 1 : acc, 0)
);

const Unread = () => {
  const unreadCount = useAtomicData(({ messaging }) => (
    Object.values(messaging).reduce<number>((acc, { thread: { messages } }) => acc + unreadMessages(messages), 0))
  );

  return (
    <div style={boxStyle}>
      <Title>Unread: {unreadCount}</Title>
    </div>
  );
};

export const Messaging = () => (
  <div style={boxStyle}>
    <Title>Messaging</Title>

    <Unread />
    <Threads />
  </div>
);
