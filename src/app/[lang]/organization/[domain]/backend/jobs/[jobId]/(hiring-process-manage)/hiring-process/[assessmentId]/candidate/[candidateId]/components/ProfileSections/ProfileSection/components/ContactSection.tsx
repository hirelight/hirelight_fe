import React from "react";

interface IContactSection {
    email: string;
    address?: string;
    phone?: string;
}

const ContactSection = ({ email, address, phone }: IContactSection) => {
    return (
        <div>
            <div className="mb-6">
                <strong className="text-sm text-neutral-600 uppercase">
                    Contact details
                </strong>
            </div>
            <div>
                {address && (
                    <div className="mb-4">
                        <div className="flex">
                            <div className="basis-40 mr-6 text-sm text-neutral-500 flex gap-2">
                                <span>Address</span>
                            </div>
                            <div className="w-full flex flex-col gap-2 items-start text-neutral-600 text-sm">
                                <span>{address}</span>
                            </div>
                        </div>
                    </div>
                )}
                {phone && (
                    <div className="mb-4">
                        <div className="flex">
                            <div className="basis-40 mr-6 text-sm text-neutral-500 flex gap-2">
                                <span>Phone</span>
                            </div>
                            <div className="w-full flex flex-col gap-2 items-start text-neutral-600 text-sm">
                                <span>{phone}</span>
                            </div>
                        </div>
                    </div>
                )}
                <div>
                    <div className="flex">
                        <div className="basis-40 mr-6 text-sm text-neutral-500 flex gap-2">
                            <span>Email</span>
                        </div>
                        <div className="w-full flex flex-col gap-2 items-start text-neutral-600 text-sm">
                            <span>{email}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactSection;
