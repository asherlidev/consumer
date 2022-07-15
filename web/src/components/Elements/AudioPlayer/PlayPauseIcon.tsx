import React from 'react';
import { PlayIcon, StopIcon } from '../../Icons';

interface Props {
  isPlaying?: boolean;
}

const PlayPauseIcon: React.FC<Props> = ({ isPlaying = false, ...otherProps }) => {
  const Icon = isPlaying ? StopIcon : PlayIcon;
  return <Icon {...otherProps} />;
};

export default PlayPauseIcon;
