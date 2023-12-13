import React, { useCallback, useEffect, useRef } from "react";

const useTrackAssessment = (
    taskFunction: () => void,
    intervalInSeconds: number
) => {
    const intervalRef = useRef<NodeJS.Timer | null>(null);

    const startAutoTask = () => {
        if (intervalRef.current !== null) {
            // Start the interval
            intervalRef.current = setInterval(() => {
                taskFunction();
            }, intervalInSeconds * 1000); // Convert seconds to milliseconds
        }
    };

    const stopAutoTask = () => {
        // Stop the interval
        if (intervalRef.current !== null) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    };

    useEffect(() => {
        // Clean up the interval when the component unmounts
        return () => {
            stopAutoTask();
        };
    }, [taskFunction]);

    return [startAutoTask, stopAutoTask];
};

export default useTrackAssessment;
