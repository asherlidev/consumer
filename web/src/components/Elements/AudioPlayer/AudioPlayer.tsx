import { useCallback, useEffect, useRef, useState } from 'react';
import colors from '../../../constants/colors';

interface Props {
  src: string;
}

const AudioPlayer: React.FC<Props> = ({ src, children }) => {
  const [audio, setAudio] = useState<WaveSurfer | undefined>();
  const [loading, setLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const unmounted = useRef(false);
  const waveRef = useRef<HTMLDivElement>();

  // use the useEffect cleanup function to know if the component (page) was unmounted
  // so we don't update the state afterwards and thereby introduce a memory leak
  useEffect(
    () => () => {
      unmounted.current = true;
    },
    []
  );

  const onPlay = useCallback(() => {
    if (!unmounted.current) {
      setIsPlaying(true);
    }
  }, []);

  const onStop = useCallback(() => {
    if (!unmounted.current) {
      setIsPlaying(false);
    }
  }, []);

  const onReady = useCallback(() => {
    if (!unmounted.current) {
      setLoading(false);
    }
  }, []);

  const onError = console.error;

  const loadAudio = useCallback(() => {
    if (typeof window !== 'undefined') {
      const WaveSurfer = require('wavesurfer.js');

      const ctx = document.createElement('canvas').getContext('2d');
      const linGrad = ctx?.createLinearGradient(0, 64, 0, 200);
      linGrad?.addColorStop(0.47, colors.primary);
      linGrad?.addColorStop(0.47, colors.primary + '3d');

      const progGradient = ctx?.createLinearGradient(0, 64, 0, 200);
      progGradient?.addColorStop(0.47, colors.primaryDark);
      progGradient?.addColorStop(0.47, colors.primaryDark + '3d');

      const newAudio = WaveSurfer.create({
        container: waveRef.current,
        cursorWidth: 0,
        waveColor: linGrad,
        progressColor: progGradient,
        barWidth: 3,
        normalize: true,
        responsive: true,
      });

      newAudio.on('ready', onReady);

      if (src) newAudio.load(src);

      if (!unmounted.current) {
        setAudio(newAudio);
      }
    }
  }, [onReady, src]);

  useEffect(() => {
    if (audio != null) {
      audio.on('ready', onReady);
      audio.on('play', onPlay);
      audio.on('pause', onStop);
      audio.on('finish', onStop);
      audio.on('error', onError);
    } else {
      loadAudio();
    }

    return () => {
      if (!audio) return;
      audio.cancelAjax();
      audio.unAll();
      audio.destroy();
    };
  }, [audio, loadAudio, onError, onPlay, onReady, onStop]);

  const playPause = useCallback(() => {
    if (!audio) return;

    if (!isPlaying) {
      audio.play();
    } else {
      audio.pause();
    }
  }, [audio, isPlaying]);

  return children({
    waveRef,
    playPause,
    isPlaying,
    loading,
  });
};

export default AudioPlayer;
