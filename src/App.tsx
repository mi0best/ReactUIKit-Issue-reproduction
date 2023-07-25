import './App.css';
import '@sendbird/uikit-react/dist/index.css';

import React, { useState, useRef, useMemo } from 'react';

import ChannelList from '@sendbird/uikit-react/ChannelList';
import Channel from '@sendbird/uikit-react/Channel';
import ChannelSettings from '@sendbird/uikit-react/ChannelSettings';
import SendbirdProvider from '@sendbird/uikit-react/SendbirdProvider';
import MessageInput from '@sendbird/uikit-react/Channel/components/MessageInput';
import Message from '@sendbird/uikit-react/Channel/components/Message';

// import { useChannelContext } from '@sendbird/uikit-react/Channel/context';
// import MessageSearch from '@sendbird/uikit-react/MessageSearch';
// import channelUI from '@sendbird/uikit-react/Channel/components/ChannelUI';

import { APP_ID, USER_ID, NICKNAME } from './const';
import { NoMessagesPlaceholder } from './NoMessagePlaceholder';
import { MessageMetaArray } from '@sendbird/chat/message';
import type { FileMessageCreateParams } from '@sendbird/chat/message';
import { LogLevel } from '@sendbird/chat';

import ChannelListWrapper from './CustomComponent/CustomChannelList';
import CustomMessage from './CustomComponent/CustomMessage';

// interface MessageMetaArray {
//   key: string;
//   value?: string[];
// }
const CHANNEL_URL = '';

// const CustomInput = () => {
//   const globalStore = useSendbirdStateContext();
//   const sdk = sendBirdSelectors.getSdk(globalStore);
//   const sendFileMessage = sendBirdSelectors.getSendFileMessage(globalStore);
//   return (
//     <div>
//       <input
//         type='file'
//         id='custom-input'
//         onChange={() => {
//           const params: FileMessageCreateParams = {};
//           params.file = document.querySelector('#custom-input').files[0];
//           sendFileMessage(CHANNEL_URL, params);
//         }}
//       />
//     </div>
//   );
// };

function App() {
  const [currentChannelUrl, setCurrentChannelUrl] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  // const now = new Date().valueOf();
  var now = Date.now();
  var twoWeeksago = new Date('2023-02-01T12:01:04.753Z').valueOf();

  // const CustomChannelUI = (setCurrentChannelUrl) => {
  //   const { emojiContainer, nicknamesMap, emojiAllMap } = useChannelContext();
  //   return <div>{/* implement your custom channel ui */}</div>;
  // };

  // const chatInput = (
  //   <div>
  //     <MessageInput />
  //   </div>
  // );

  // useRef
  const query = useRef({
    channelListQuery: {
      limit: 100,
    },
  });

  const chatInput = () => {
    return (
      <input
        style={{
          borderWidth: 1,
          height: 40,
          width: '100%',
          backgroundColor: 'read',
        }}
      />
    );
  };

  const [stringSet] = React.useState({
    BUTTON__INVITE: '멤버초대',
    CHANNEL_SETTING__MEMBERS__INVITE_MEMBER: '멤버초대',
    MODAL__INVITE_MEMBER__TITLE: '멤버초대',
  });

  const myColorSet = {
    '--sendbird-light-primary-300': '#9702E7',
  };

  return (
    <div className='App'>
      <SendbirdProvider
        appId={APP_ID}
        userId={USER_ID}
        nickname={NICKNAME}
        stringSet={stringSet}
        isMentionEnabled
        isVoiceMessageEnabled
        // config={{ logLevel: 'error' }}
        config={{
          userMention: {
            maxMentionCount: 10,
            maxSuggestionCount: 15,
          },
        }}
        colorSet={myColorSet}
      >
        <>
          <div className='sendbird-app__channellist-wrap'>
            {/* ChannelList has wrong props will fix in 2.0.1
          // @ts-ignore */}
            <ChannelList
              // *** channelList query: need to fill the filters here
              // queries={query.current}
              onChannelSelect={(channel) => {
                if (channel?.url) {
                  setCurrentChannelUrl(channel.url);
                }
              }}
            />
            {/* <ChannelListWrapper
              // CustomChannelList by MY

              setCurrentChannel={setCurrentChannelUrl}
            /> */}
          </div>
          <div className='sendbird-app__conversation-wrap'>
            {/* <CustomChannelUI /> */}
            <Channel
              showSearchIcon={true}
              // startingPoint={twoWeeksago}
              // queries={{
              //   messageListParams: { prevResultSize: 0, nextResultSize: 30 },
              // }}
              onSearchClick={() => {
                console.log('onSearchClick!');
              }}
              // isReactionEnabled={true}
              channelUrl={currentChannelUrl}
              // renderMessageInput={chatInput}
              // renderMessageInput={() => <CustomizedMessageInput />}
              renderPlaceholderEmpty={() => <NoMessagesPlaceholder />}
              // renderChannelHeader={() => <></>}
              // renderUserProfile={() => <></>}
              onChatHeaderActionClick={() => {
                console.log('show channel setting!!');
                setShowSettings(true);
              }}
              renderMessage={({ message, chainTop, chainBottom }) => (
                <CustomMessage
                  message={message}
                  chainTop={chainTop}
                  chainBottom={chainBottom}
                />
              )}
              // renderMessage={({ message, chainTop, chainBottom }) => {
              //   if (message.messageType === 'user') {
              //     return (
              //       <CustomMessage
              //         message={message}
              //         // chainTop={false}
              //         // chainBottom={false}
              //       />
              //     );
              //     // or return <CustomMessage  message={message as UserMessage} />
              //   }
              //   return null;
              // }}
              // renderMessage={({ message, chainTop, chainBottom }) => {
              //   if (message.messageType === 'user') {
              //     return <CustomMessage message={message} />;
              //     // or return <CustomMessage  message={message as UserMessage} />
              //   }
              //   return null;
              // }}

              // renderMessage={({message}) => {
              //   return <CustomMessage
              //     message={message}
              //   />
              // }}

              // renderMessage={({ message, chainTop, chainBottom }) => {
              //   if (message.messageType === 'user') {
              //     return <CustomMessage message={message} />;
              //   }
              //   return null;
              // }}
            />
          </div>
          {/* <div>
          <MessageSearch channelUrl={currentChannelUrl}
                searchString={textInput: string}
                messageSearchQuery={query: MessageSearchQuery}
                renderSearchItem={({ message, onResultClick }) => {
                    return () => <CustomSearchItem message={message} />;
                }}
                onResultLoaded={(message, error) => {}}
                onResultClick={(message) => {}}
                />
        </div> */}
          <div>
            {showSettings && (
              <div className='sendbird-app__settingspanel-wrap'>
                <ChannelSettings
                  channelUrl={currentChannelUrl}
                  onCloseClick={() => {
                    setShowSettings(false);
                  }}
                  children={undefined}
                />
              </div>
            )}
          </div>
        </>
      </SendbirdProvider>
    </div>
  );
}

export default App;
