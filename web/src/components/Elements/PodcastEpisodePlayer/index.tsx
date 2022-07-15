import { detect as detectBrowser } from 'detect-browser';
import { FixedObject } from 'gatsby-image';
import { useBreakpoint } from 'gatsby-plugin-breakpoints';
import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { StoriesEpisodeDetails } from '../../../../gatsby-node';
import { CircularProgress } from '../../Elements';
import AudioPlayer, { PlayPauseIcon } from '../../Elements/AudioPlayer';
import PlayerContainer from './PlayerContainer';
import * as S from './styles';

interface Props {
  episode: StoriesEpisodeDetails;
  isMock?: boolean;
}

const EpisodePlayer: React.FC<Props> = ({
  episode: { title, coverPhoto, audio, video_url },
  isMock,
}) => {
  const breakpoints = useBreakpoint();
  const [browser, setBrowser] = useState<string | undefined>();
  const [forceReact, setForceReact] = useState<number>(Date.now());

  useEffect(() => {
    setForceReact(Date.now());
  }, [breakpoints.smDown]);

  useEffect(() => {
    try {
      setBrowser(detectBrowser()?.name);
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <>
      {(browser !== 'chrome' && !breakpoints.smDown) || breakpoints.smDown || isMock ? (
        <PlayerContainer title={title} picture={coverPhoto.fixed as FixedObject}>
          <audio controls src={audio} />
        </PlayerContainer>
      ) : (
        <PlayerContainer title={title} picture={coverPhoto.fixed as FixedObject}>
          {video_url ? (
            <S.VideoWrapper>
              <ReactPlayer
                url={video_url}
                width="80%"
                height="220px"
                controls={true}
                allowFullScreen
              />
            </S.VideoWrapper>
          ) : (
            <AudioPlayer src={audio} key={forceReact}>
              {({
                playPause,
                waveRef,
                isPlaying,
                loading,
              }: {
                playPause: () => void;
                waveRef: React.RefObject<HTMLDivElement>;
                isPlaying: boolean;
                loading: boolean;
              }) => (
                <>
                  {loading && (
                    <S.ProgressWrap>
                      <CircularProgress />
                    </S.ProgressWrap>
                  )}
                  <S.WaveWrap>
                    <div>
                      {!loading && (
                        <S.PlayPauseButton color="primary" onClick={() => playPause()}>
                          <PlayPauseIcon isPlaying={isPlaying} />
                        </S.PlayPauseButton>
                      )}
                    </div>
                    <div>
                      <div ref={waveRef} />
                    </div>
                  </S.WaveWrap>
                </>
              )}
            </AudioPlayer>
          )}
        </PlayerContainer>
      )}
    </>
  );
};

export default EpisodePlayer;
