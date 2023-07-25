import Message from '@sendbird/uikit-react/Channel/components/Message';
import { AdminMessage, FileMessage, UserMessage } from '@sendbird/chat/message';

import { RenderMessageProps } from 'SendbirdUIKitGlobal';
import { EveryMessage } from 'SendbirdUIKitGlobal';
import { User } from '@sendbird/chat';

// export default function CustomMessage({
//    message,
//   chainBottom,
//   chainTop,
// }: RenderMessageProps) {
//   if (message?.isUserMessage()) {
//     console.log('UserMessage!');
//     return <>{message.message}</>;
//   }
//   if (message?.isFileMessage()) {
//     console.log('FileMessage!');
//     return (
//       <>
//         <img src={message?.thumbnails[0]?.url} />
//       </>
//     );
//   }

//   return null;
// }

export default function CustomMessage({
  message,
  chainTop,
  chainBottom,
}: RenderMessageProps) {
  if (message?.isUserMessage()) {
    return <>user message: {message.message}</>; // your implementation
  }
  if (message?.isAdminMessage()) {
    return <>admin message: {message.message}</>; // your implementation
  }

  return <Message message={message} />;
}
