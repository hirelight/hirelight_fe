"use client";

import React from "react";
import videojs, { ReadyCallback } from "video.js";
import Player from "video.js/dist/types/player";
import "video.js/dist/video-js.css";

export const videoJsOptions = {
    autoplay: false,
    playbackRates: [0.5, 1, 1.25, 1.5, 2],
    controls: true,
    responsive: true,
    fluid: true,
    sources: [],
};

type VideoWrapperProps = {
    options?: any;
    onReady?: () => void;
};

const VideoWrapper: React.FC<VideoWrapperProps> = React.memo(
    function VideoWrapper({ options = videoJsOptions, onReady }) {
        const videoRef = React.useRef<HTMLDivElement | null>(null);
        const playerRef = React.useRef<Player | null>(null);

        const handlePlayerReady = (player: Player) => {
            playerRef.current = player;

            // You can handle player events here, for example:
            player.on("waiting", () => {
                videojs.log("player is waiting");
            });

            player.on("dispose", () => {
                videojs.log("player will dispose");
            });
        };

        React.useEffect(() => {
            // Make sure Video.js player is only initialized once
            if (!playerRef.current) {
                // The Video.js player needs to be _inside_ the component el for React 18 Strict Mode.
                const videoElement = document.createElement("video-js");

                videoElement.classList.add("vjs-big-play-centered");

                if (videoRef.current)
                    videoRef.current.appendChild(videoElement);

                const player = (playerRef.current = videojs(
                    videoElement,
                    options,
                    () => {
                        videojs.log("player is ready");
                        handlePlayerReady(player);
                    }
                ));

                // You could update an existing player in the `else` block here
                // on prop change, for example:
            } else {
                const player = playerRef.current;

                player.autoplay(options.autoplay);
                player.src(options.sources);
            }
        }, [onReady, options, videoRef]);

        // Dispose the Video.js player when the functional component unmounts
        React.useEffect(() => {
            const player = playerRef.current;

            return () => {
                if (player && !player.isDisposed()) {
                    player.dispose();
                    playerRef.current = null;
                }
            };
        }, [playerRef]);

        return (
            <div className="w-full max-w-full">
                <div data-vjs-player>
                    <div ref={videoRef} />
                </div>
            </div>
        );
    }
);

export default VideoWrapper;
