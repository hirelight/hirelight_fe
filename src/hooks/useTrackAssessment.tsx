import React, { useEffect, useRef } from "react";

const useTrackAssessment = (
    taskFunction: () => void,
    intervalInSeconds: number
) => {
    const intervalRef = useRef<NodeJS.Timer | null>(null);

    const startAutoTask = () => {
        console.log("start task");
        // Start the interval
        intervalRef.current = setInterval(() => {
            taskFunction();
        }, intervalInSeconds * 1000); // Convert seconds to milliseconds
    };

    const stopAutoTask = () => {
        console.log("auto task");
        // Stop the interval
        if (intervalRef.current !== null) {
            clearInterval(intervalRef.current);
        }
    };

    useEffect(() => {
        // Clean up the interval when the component unmounts
        return () => {
            stopAutoTask();
        };
    }, [taskFunction, intervalInSeconds]);

    return [startAutoTask, stopAutoTask];
};

export default useTrackAssessment;
