import React from "react";

import { UserAvatar } from "..";

type AvatarGroupProps = {
    urls: (string | null)[];
};

const AvatarGroup: React.FC<AvatarGroupProps> = ({ urls }) => {
    return (
        <ul className="flex -space-x-2 overflow-hidden">
            {urls.map((url, index) => (
                <li
                    key={index}
                    className="inline-block w-8 h-8 rounded-full ring-2 ring-white"
                >
                    <UserAvatar avatarUrl={url} />
                </li>
            ))}
        </ul>
    );
};

export default AvatarGroup;
