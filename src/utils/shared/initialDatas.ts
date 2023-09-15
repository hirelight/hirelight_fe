import { EAppFormOption, IAppFormFields } from "@/interfaces";
import { IAppFormState } from "@/redux/slices/app-form.slice";

export const personalInfoFields: IAppFormFields[] = [
    {
        label: "Name",
        options: [EAppFormOption.MANDATORY],
        inputType: "text",
    },
    {
        label: "Email",
        options: [EAppFormOption.MANDATORY],
        inputType: "text",
    },
    {
        label: "Headline",
        options: [
            EAppFormOption.MANDATORY,
            EAppFormOption.OPTIONAL,
            EAppFormOption.OFF,
        ],
        inputType: "text",
    },
    {
        label: "Phone",
        options: [
            EAppFormOption.MANDATORY,
            EAppFormOption.OPTIONAL,
            EAppFormOption.OFF,
        ],
        inputType: "tel",
    },
    {
        label: "Address",
        options: [
            EAppFormOption.MANDATORY,
            EAppFormOption.OPTIONAL,
            EAppFormOption.OFF,
        ],
        inputType: "text",
    },
    {
        label: "Photo",
        options: [
            EAppFormOption.MANDATORY,
            EAppFormOption.OPTIONAL,
            EAppFormOption.OFF,
        ],
        inputType: "file",
    },
];

export const profileFields: IAppFormFields[] = [
    {
        label: "Education",
        options: [EAppFormOption.OPTIONAL, EAppFormOption.OFF],
        inputType: "add-file",
    },
    {
        label: "Experience",
        options: [EAppFormOption.OPTIONAL, EAppFormOption.OFF],
        inputType: "add-file",
    },
    {
        label: "Summary",
        options: [
            EAppFormOption.MANDATORY,
            EAppFormOption.OPTIONAL,
            EAppFormOption.OFF,
        ],
        inputType: "text-area",
    },
    {
        label: "Resume",
        options: [
            EAppFormOption.MANDATORY,
            EAppFormOption.OPTIONAL,
            EAppFormOption.OFF,
        ],
        inputType: "file",
    },
];

export const detailsFields: IAppFormFields[] = [
    {
        label: "Cover letter",
        options: [
            EAppFormOption.MANDATORY,
            EAppFormOption.OPTIONAL,
            EAppFormOption.OFF,
        ],
        inputType: "text-area",
    },
];

export const appFormSections: IAppFormState = {
    datas: [
        {
            title: "Personal information",
            fields: personalInfoFields.map(item => ({
                label: item.label,
                selectedOption:
                    item.options[Math.floor(item.options.length / 2)],
                inputType: item.inputType,
            })),
        },
        {
            title: "Profile",
            fields: profileFields.map(item => ({
                label: item.label,
                selectedOption:
                    item.options[Math.floor(item.options.length / 2)],
                inputType: item.inputType,
            })),
        },
        {
            title: "Details",
            fields: detailsFields.map(item => ({
                label: item.label,
                selectedOption:
                    item.options[Math.floor(item.options.length / 2)],
                inputType: item.inputType,
            })),
        },
    ],
};

export const teamMembers: {
    id: number;
    full_name: string;
    email: string;
    status: string;
    permission: string;
    avatarUrl: string;
}[] = [
    {
        id: 1,
        full_name: "Leonie Byham",
        email: "lbyham0@java.com",
        status: "SA",
        permission: "Construction Manager",
        avatarUrl:
            "https://robohash.org/natusmagnambeatae.png?size=50x50&set=set1",
    },
    {
        id: 2,
        full_name: "Kyrstin Adcock",
        email: "kadcock1@disqus.com",
        status: "OC",
        permission: "Estimator",
        avatarUrl: "https://robohash.org/quiaeos.png?size=50x50&set=set1",
    },
    {
        id: 3,
        full_name: "Woodman Tregiddo",
        email: "wtregiddo2@tmall.com",
        status: "OC",
        permission: "Electrician",
        avatarUrl: "https://robohash.org/etcumat.png?size=50x50&set=set1",
    },
    {
        id: 4,
        full_name: "Jehanna Hinemoor",
        email: "jhinemoor3@fastcompany.com",
        status: "NA",
        permission: "Electrician",
        avatarUrl:
            "https://robohash.org/voluptatibusaliquamnatus.png?size=50x50&set=set1",
    },
    {
        id: 5,
        full_name: "Fiorenze Godbolt",
        email: "fgodbolt4@w3.org",
        status: "SA",
        permission: "Architect",
        avatarUrl: "https://robohash.org/aatducimus.png?size=50x50&set=set1",
    },
    {
        id: 6,
        full_name: "Beverley Windeatt",
        email: "bwindeatt5@skype.com",
        status: "SA",
        permission: "Electrician",
        avatarUrl: "https://robohash.org/laborequiset.png?size=50x50&set=set1",
    },
    {
        id: 7,
        full_name: "Care Helleckas",
        email: "chelleckas6@plala.or.jp",
        status: "EU",
        permission: "Engineer",
        avatarUrl:
            "https://robohash.org/veniamasperioresdistinctio.png?size=50x50&set=set1",
    },
    {
        id: 8,
        full_name: "Gustavus Cantillion",
        email: "gcantillion7@arstechnica.com",
        status: "AF",
        permission: "Construction Expeditor",
        avatarUrl:
            "https://robohash.org/evenietdolorvero.png?size=50x50&set=set1",
    },
    {
        id: 9,
        full_name: "Cosette Hopfer",
        email: "chopfer8@hao123.com",
        status: "AS",
        permission: "Estimator",
        avatarUrl: "https://robohash.org/quooptiofugit.png?size=50x50&set=set1",
    },
    {
        id: 10,
        full_name: "Warde Kynvin",
        email: "wkynvin9@tiny.cc",
        status: "AS",
        permission: "Construction Foreman",
        avatarUrl:
            "https://robohash.org/etsimiliquenecessitatibus.png?size=50x50&set=set1",
    },
];
