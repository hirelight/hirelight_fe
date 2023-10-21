import React from "react";

const EditAddTemplateSkeleton = () => {
    return (
        <div className="min-h-[200px] rounded-md p-4 w-full">
            <div className="animate-pulse flex space-x-4">
                <div className="flex-1 space-y-6 py-1">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <div className="h-5 w-20 bg-slate-200 rounded mb-2"></div>
                            <div className="h-10 bg-slate-200 rounded"></div>
                        </div>
                        <div></div>
                        <div>
                            <div className="h-5 w-36 bg-slate-200 rounded mb-2"></div>
                            <div className="h-10 bg-slate-200 rounded"></div>
                        </div>
                        <div>
                            <div className="h-5 w-36 bg-slate-200 rounded mb-2"></div>
                            <div className="h-10 bg-slate-200 rounded"></div>
                        </div>
                    </div>
                    <div className="min-h-[200px] bg-slate-200 rounded"></div>
                </div>
            </div>
        </div>
    );
};

export default EditAddTemplateSkeleton;
