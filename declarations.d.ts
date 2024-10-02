// src/declarations.d.ts
declare module '*.svg' {
    import * as React from 'react';

    export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
    const src: string;
    export default src;
}


declare module 'expo-av' {
    import { Component } from 'react';
    import { AVPlaybackStatus, AVPlaybackStatusToSet, AVPlaybackSource } from 'expo-av/build/AV';
    import { Playback } from 'expo-av/build/AV';
    import { AudioMode } from 'expo-av/build/Audio';
    import { VideoProps, VideoState } from 'expo-av/build/Video';

    export class Audio {
        static setAudioModeAsync(mode: AudioMode): Promise<void>;
        static setIsEnabledAsync(value: boolean): Promise<void>;
    }

    export class Video extends Component<VideoProps, VideoState> {
        presentFullscreenPlayer(): void;
        presentFullscreenPlayerAsync(): Promise<void>;
        dismissFullscreenPlayer(): void;
        dismissFullscreenPlayerAsync(): Promise<void>;
        getStatusAsync(): Promise<AVPlaybackStatus>;
        loadAsync(source: AVPlaybackSource, initialStatus?: AVPlaybackStatusToSet, downloadFirst?: boolean): Promise<AVPlaybackStatus>;
        unloadAsync(): Promise<AVPlaybackStatus>;
        setStatusAsync(status: AVPlaybackStatusToSet): Promise<AVPlaybackStatus>;
        replayAsync(status: AVPlaybackStatusToSet): Promise<AVPlaybackStatus>;
        setOnPlaybackStatusUpdate(onPlaybackStatusUpdate?: (status: AVPlaybackStatus) => void): void;
    }
}