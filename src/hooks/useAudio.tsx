import IcecastMetadataPlayer from "icecast-metadata-player";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";

type AudioSources = "icecast" | "mp3";

interface AudioProps {
  audioType: AudioSources;
  endpoint?: string;
  audioElement: HTMLAudioElement;
}

interface AudioControls {
  muteAudio: () => void;
  startAudio: () => void;
  setAudioSrc: (src: string) => void;
  isInitialized: boolean;
  muted: boolean;
}

export default function useAudio({
  audioType,
  endpoint,
  audioElement,
}: AudioProps): AudioControls {
  const [icecast, setIcecast] = useState<IcecastMetadataPlayer>();
  const [muted, setMuted] = useState<boolean>(true);
  const [src, setSrc] = useState<string>(endpoint);
  const [isInitialized, setIsInitialized] = useState(false);
  const [tempMuted, setTempMuted] = useState(false);
  function muteAudio() {
    setMuted(true);
    (async () => {
      if (audioType === "icecast") icecast?.stop();
      if (audioType === "mp3") audioElement?.pause();
    })();
  }
  function startAudio() {
    setMuted(false);
    (async () => {
      alert("play!")
      if (audioType === "icecast") icecast?.play();
      if (audioType === "mp3") await audioElement?.play();
    })();
  }
  function setAudioSrc(src: string) {
    setSrc(src);
    if (audioType === "mp3") {
      alert("set audio!")
      audioElement.src = src;
    }
  }

  useEffect(() => {
    return () => {
      audioElement?.pause();
    };
  }, []);

  useEffect(() => {
    (async () => {
      if (audioType === "icecast" && src) {
        const IcecastMetadataPlayer = await import("icecast-metadata-player");
        const player = new IcecastMetadataPlayer.default(src, {
          onMetadata: (meta) => { },
          onError(message, error?) { },
          audioElement,
        });

        setIcecast(player);
        setIsInitialized(true);
      }
      // if (audioType === "mp3") {
      //     let audio = new Audio(src);
      //     audio.pause();
      //     setAudioElement(audio);
      // }
    })();
  }, [src]);

  useEffect(() => {
    // if (icecast) {
    // console.log("state", icecast?.)
    // commandStack.forEach((cmd) => cmd());
    // }
  }, [isInitialized]);
  return { muteAudio, startAudio, setAudioSrc, isInitialized, muted };
}
