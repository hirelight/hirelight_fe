"use client";

const DifficultyBadge = ({ difficulty }: { difficulty: number }) => {
    switch (difficulty) {
        case 2:
            return (
                <span className="bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300">
                    Medium
                </span>
            );
        case 3:
            return (
                <span className="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">
                    Hard
                </span>
            );
        case 4:
            return (
                <span className="bg-purple-100 text-purple-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-purple-900 dark:text-purple-300">
                    Advance
                </span>
            );
        default:
            return (
                <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                    Easy
                </span>
            );
    }
};

export default DifficultyBadge;
