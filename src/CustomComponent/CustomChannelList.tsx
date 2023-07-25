import {
  useChannelListContext,
  ChannelListProvider,
} from '@sendbird/uikit-react/ChannelList/context';
import ChannelPreview from '@sendbird/uikit-react/ChannelList/components/ChannelPreview';
import PlaceHolder from '@sendbird/uikit-react/ui/PlaceHolder';
import ChannelListHeader from '@sendbird/uikit-react/ChannelList/components/ChannelListHeader';

const CustomChannelList = ({ setCurrentChannel }: any) => {
  const {
    allChannels,
    currentChannel,
    initialized,
    loading,
    channelListQuery,
  } = useChannelListContext();

  if (!initialized) {
    return <PlaceHolder type={'LOADING'} />;
  }
  if (loading) {
    return <PlaceHolder type={'WRONG'} />;
  }

  return (
    // <div className='custom-channel-list'>
    <div>
      {allChannels.map((channel) => {
        return (
          // <ChannelListHeader renderHeader={} renderIconButton={} allProfileEdit={} />
          //   <ChannelListHeader
          //   onEdit={() => {
          //     if (allowProfileEdit) {
          //       setShowProfileEdit(true);
          //     }
          //   }}
          //   allowProfileEdit={allowProfileEdit}
          //   renderIconButton={() => (
          //     <AddChannel />
          //   )}
          // />

          <ChannelPreview
            channel={channel}
            isActive={channel.url === currentChannel.url}
            onClick={() => setCurrentChannel(channel.url)}
            renderChannelAction={() => <></>}
            tabIndex={0}
          />
        );
      })}
    </div>
  );
};

const ChannelListWrapper = (props: any) => {
  return (
    <ChannelListProvider>
      <CustomChannelList {...props} />
    </ChannelListProvider>
  );
};
export default ChannelListWrapper;
