import React from "react";

interface ICoverLetterSection {
    content: string;
}

const CoverLetterSection = ({ content }: ICoverLetterSection) => {
    return (
        <div>
            {" "}
            <div className="mb-6">
                <strong className="text-sm text-neutral-600 uppercase">
                    Cover letter
                </strong>
            </div>
            <div>
                <p className="text-sm text-neutral-500">{content}</p>
            </div>
        </div>
    );
};

export default CoverLetterSection;
