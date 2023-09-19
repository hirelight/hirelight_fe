import { EAppFormOption, IAppFormField } from "@/interfaces";
import { IAppFormState } from "@/redux/slices/app-form.slice";

export const personalInfoFields: IAppFormField[] = [
    {
        label: "Name",
        options: [EAppFormOption.MANDATORY],
        inputType: "text",
        selectedOption: EAppFormOption.MANDATORY,
    },
    {
        label: "Email",
        options: [EAppFormOption.MANDATORY],
        inputType: "text",
        selectedOption: EAppFormOption.MANDATORY,
    },
    {
        label: "Headline",
        options: [
            EAppFormOption.MANDATORY,
            EAppFormOption.OPTIONAL,
            EAppFormOption.OFF,
        ],
        inputType: "text",
        selectedOption: EAppFormOption.OPTIONAL,
    },
    {
        label: "Phone",
        options: [
            EAppFormOption.MANDATORY,
            EAppFormOption.OPTIONAL,
            EAppFormOption.OFF,
        ],
        inputType: "tel",
        selectedOption: EAppFormOption.OPTIONAL,
    },
    {
        label: "Address",
        options: [
            EAppFormOption.MANDATORY,
            EAppFormOption.OPTIONAL,
            EAppFormOption.OFF,
        ],
        inputType: "text",
        selectedOption: EAppFormOption.OPTIONAL,
    },
    {
        label: "Photo",
        options: [
            EAppFormOption.MANDATORY,
            EAppFormOption.OPTIONAL,
            EAppFormOption.OFF,
        ],
        inputType: "file",
        selectedOption: EAppFormOption.OPTIONAL,
    },
];

export const profileFields: IAppFormField[] = [
    {
        label: "Education",
        options: [EAppFormOption.OPTIONAL, EAppFormOption.OFF],
        inputType: "add-file",
        selectedOption: EAppFormOption.OPTIONAL,
    },
    {
        label: "Experience",
        options: [EAppFormOption.OPTIONAL, EAppFormOption.OFF],
        inputType: "add-file",
        selectedOption: EAppFormOption.OPTIONAL,
    },
    {
        label: "Summary",
        options: [
            EAppFormOption.MANDATORY,
            EAppFormOption.OPTIONAL,
            EAppFormOption.OFF,
        ],
        inputType: "text-area",
        selectedOption: EAppFormOption.OPTIONAL,
    },
    {
        label: "Resume",
        options: [
            EAppFormOption.MANDATORY,
            EAppFormOption.OPTIONAL,
            EAppFormOption.OFF,
        ],
        inputType: "file",
        selectedOption: EAppFormOption.OPTIONAL,
    },
];

export const detailsFields: IAppFormField[] = [
    {
        label: "Cover letter",
        options: [
            EAppFormOption.MANDATORY,
            EAppFormOption.OPTIONAL,
            EAppFormOption.OFF,
        ],
        inputType: "text-area",
        selectedOption: EAppFormOption.OPTIONAL,
    },
];

export const appFormSections: IAppFormState = {
    datas: [
        {
            title: "Personal information",
            fields: personalInfoFields,
        },
        {
            title: "Profile",
            fields: profileFields,
        },
        {
            title: "Details",
            fields: detailsFields,
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

export const pipelineStages: {
    id: number;
    stageName: string;
    iconUrl: string;
}[] = [
    {
        id: 1,
        stageName: "Perth/Scone Airport",
        iconUrl: "http://dummyimage.com/115x100.png/cc0000/ffffff",
    },
    {
        id: 2,
        stageName: "Orinduik Airport",
        iconUrl: "http://dummyimage.com/122x100.png/cc0000/ffffff",
    },
    {
        id: 3,
        stageName: "Bram Fischer International Airport",
        iconUrl: "http://dummyimage.com/142x100.png/cc0000/ffffff",
    },
    {
        id: 4,
        stageName: "Jérémie Airport",
        iconUrl: "http://dummyimage.com/173x100.png/cc0000/ffffff",
    },
    {
        id: 5,
        stageName: "Beloyarskiy Airport",
        iconUrl: "http://dummyimage.com/117x100.png/5fa2dd/ffffff",
    },
    {
        id: 6,
        stageName: "Menorca Airport",
        iconUrl: "http://dummyimage.com/197x100.png/ff4444/ffffff",
    },
];

export const pipelineTemplates = [
    {
        id: 0,
        name: "Default pipeline",
        pipelineStages: [
            {
                id: 1,
                stageName: "Perth/Scone Airport",
                iconUrl: "http://dummyimage.com/115x100.png/cc0000/ffffff",
            },
            {
                id: 2,
                stageName: "Orinduik Airport",
                iconUrl: "http://dummyimage.com/122x100.png/cc0000/ffffff",
            },
            {
                id: 3,
                stageName: "Bram Fischer International Airport",
                iconUrl: "http://dummyimage.com/142x100.png/cc0000/ffffff",
            },
            {
                id: 4,
                stageName: "Jérémie Airport",
                iconUrl: "http://dummyimage.com/173x100.png/cc0000/ffffff",
            },
            {
                id: 5,
                stageName: "Beloyarskiy Airport",
                iconUrl: "http://dummyimage.com/117x100.png/5fa2dd/ffffff",
            },
            {
                id: 6,
                stageName: "Menorca Airport",
                iconUrl: "http://dummyimage.com/197x100.png/ff4444/ffffff",
            },
        ],
    },
    {
        id: 1,
        name: "Custom pipeline",
        pipelineStages: [
            {
                id: 1,
                stageName: "Perth/Scone Airport",
                iconUrl: "http://dummyimage.com/115x100.png/cc0000/ffffff",
            },
            {
                id: 2,
                stageName: "Orinduik Airport",
                iconUrl: "http://dummyimage.com/122x100.png/cc0000/ffffff",
            },
            {
                id: 3,
                stageName: "Bram Fischer International Airport",
                iconUrl: "http://dummyimage.com/142x100.png/cc0000/ffffff",
            },
            {
                id: 4,
                stageName: "Jérémie Airport",
                iconUrl: "http://dummyimage.com/173x100.png/cc0000/ffffff",
            },
        ],
    },
    {
        id: 2,
        name: "Frontend Pipeline",
        pipelineStages: [
            {
                id: 1,
                stageName: "Perth/Scone Airport",
                iconUrl: "http://dummyimage.com/115x100.png/cc0000/ffffff",
            },
            {
                id: 2,
                stageName: "Orinduik Airport",
                iconUrl: "http://dummyimage.com/122x100.png/cc0000/ffffff",
            },
            {
                id: 3,
                stageName: "Bram Fischer International Airport",
                iconUrl: "http://dummyimage.com/142x100.png/cc0000/ffffff",
            },
        ],
    },
];
