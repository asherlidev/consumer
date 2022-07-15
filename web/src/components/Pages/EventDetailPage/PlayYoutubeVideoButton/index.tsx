import React, { useMemo, useState } from 'react';
import ModalVideo from 'react-modal-video';
import { getYoutubeVideoId } from '../../../../utils/youtube';
import playIcon from './playIcon.svg';
import * as S from './styles';

interface Props {
  youtubeVideoUrl: string;
}

const PlayYoutubeVideoButton: React.FC<Props> = ({ youtubeVideoUrl }) => {
  const [showYoutubeModal, setShowYoutubeModal] = useState(false);

  const youtubeVideoId = useMemo(() => getYoutubeVideoId(youtubeVideoUrl), [youtubeVideoUrl]);

  return (
    <>
      {youtubeVideoId && (
        <ModalVideo
          channel="youtube"
          isOpen={showYoutubeModal}
          videoId={youtubeVideoId}
          onClose={() => {
            setShowYoutubeModal(false);
          }}
        />
      )}
      <S.WatchVideoButton
        onClick={() => {
          setShowYoutubeModal(true);
        }}
      >
        <img src={playIcon} alt="Play video icon" />
      </S.WatchVideoButton>
    </>
  );
};

export default PlayYoutubeVideoButton;
