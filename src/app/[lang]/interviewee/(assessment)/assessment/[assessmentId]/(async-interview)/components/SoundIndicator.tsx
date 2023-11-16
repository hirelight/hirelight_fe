import React, { useState, useRef, useEffect } from "react";

type SoundIndicatorProps = {
    stream: MediaStream;
    context: AudioContext;
    devices: MediaDeviceInfo[];
};

const SoundIndicator: React.FC<SoundIndicatorProps> = ({
    context,
    stream,
    devices,
}) => {
    const [isRecording, setIsRecording] = useState(false);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    const getDevices = () => {
        if (!navigator.mediaDevices?.enumerateDevices) {
            console.log("enumerateDevices() not supported.");
        } else {
            // List cameras and microphones.
            navigator.mediaDevices
                .enumerateDevices()
                .then(devices => {
                    devices
                        .filter(device =>
                            ["audioinput", "videoinput"].includes(device.kind)
                        )
                        .forEach(device => {
                            console.log(device);
                        });
                })
                .catch(err => {
                    console.error(`${err.name}: ${err.message}`);
                });
        }
    };

    useEffect(() => {
        const initializeAudio = async () => {
            try {
                const audioStream = new MediaStream(stream.getAudioTracks());

                const microphone = context.createMediaStreamSource(audioStream);

                const analyser = context.createAnalyser();
                analyser.fftSize = 256;
                const bufferLength = analyser.frequencyBinCount;
                const dataArray = new Uint8Array(bufferLength);

                microphone.connect(analyser);

                const canvas = canvasRef.current;
                if (!canvas) return;
                const canvasCtx = canvas.getContext(
                    "2d"
                ) as CanvasRenderingContext2D;

                const draw = () => {
                    analyser.getByteFrequencyData(dataArray);

                    const loudness =
                        dataArray.reduce((acc, value) => acc + value, 0) /
                        bufferLength;

                    // Use loudness to update a visual indicator (e.g., update canvas or other UI)
                    canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
                    canvasCtx.fillStyle = "green";
                    canvasCtx.fillRect(0, 0, loudness * 3, canvas.height);

                    if (isRecording) {
                        requestAnimationFrame(draw);
                    }
                };

                draw();
            } catch (error) {
                console.error("Error initializing audio:", error);
            }
        };
        initializeAudio();
    }, [context, isRecording, stream]);

    const startRecording = () => {
        // getDevices();
        setIsRecording(true);
    };

    const stopRecording = () => {
        setIsRecording(false);
    };

    return (
        <div>
            <canvas ref={canvasRef} width={300} height={50} />
            <button type="button" onClick={startRecording}>
                Start Recording
            </button>
            <button type="button" onClick={stopRecording}>
                Stop Recording
            </button>
        </div>
    );
};

export default SoundIndicator;
