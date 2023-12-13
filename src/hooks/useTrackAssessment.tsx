import React, { useCallback, useEffect, useRef } from "react";

const useTrackAssessment = (
    taskFunction: () => void,
    intervalInSeconds: number
) => {
    const intervalRef = useRef<NodeJS.Timer | null>(null);
    const functionRef = useRef<() => void>(taskFunction);

    const startAutoTask = () => {
        if (intervalRef.current === null) {
            console.log("Start track");
            // Start the interval
            intervalRef.current = setInterval(() => {
                functionRef.current();
            }, intervalInSeconds * 1000); // Convert seconds to milliseconds
        }
    };

    const stopAutoTask = () => {
        // Stop the interval
        if (intervalRef.current !== null) {
            console.log("Stop track");
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    };

    useEffect(() => {
        functionRef.current = taskFunction;
    }, [taskFunction]);

    useEffect(() => {
        // Clean up the interval when the component unmounts
        return () => {
            stopAutoTask();
        };
    }, []);

    return [startAutoTask, stopAutoTask];
};

export default useTrackAssessment;
