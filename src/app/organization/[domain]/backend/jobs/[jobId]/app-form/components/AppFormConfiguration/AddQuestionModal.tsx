import React from "react";

import { CustomInput } from "@/components";

const AddQuestionModal = () => {
    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 h-full flex items-center justify-center bg-slate-500 z-50">
            <div className="bg-white p-8">
                <h2 className="text-lg font-medium uppercase mb-4">
                    Add new question
                </h2>
                <p className="text-neutral-500 text-sm">
                    Ứng viên sau khi chuyển sang giai đoạn khác, giai đoạn hiện
                    tại sẽ được xem như hoàn thành và không thể quay lại được.
                </p>
                <CustomInput title="Title" type="text" placeholder="Question" />
            </div>
        </div>
    );
};

export default AddQuestionModal;
