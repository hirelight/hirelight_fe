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

export const oneWayQuestions = [
    {
        id: 1,
        topic: "Merle",
        questions: [
            {
                id: 1,
                description: "Morbi non quam nec dui luctus rutrum.",
                thinkLength: "Distributed",
                answerLength: "website",
                numOfTakes: 1,
            },
            {
                id: 2,
                description:
                    "Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl. Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum. Curabitur in libero ut massa volutpat convallis.",
                thinkLength: "conglomeration",
                answerLength: "complexity",
                numOfTakes: 4,
            },
        ],
    },
    {
        id: 2,
        topic: "Vivien",
        questions: [
            {
                id: 1,
                description:
                    "Vestibulum sed magna at nunc commodo placerat. Praesent blandit.",
                thinkLength: "policy",
                answerLength: "Ameliorated",
                numOfTakes: 4,
            },
        ],
    },
    {
        id: 3,
        topic: "Vanna",
        questions: [
            {
                id: 1,
                description:
                    "Morbi ut odio. Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.",
                thinkLength: "budgetary management",
                answerLength: "Seamless",
                numOfTakes: 4,
            },
            {
                id: 2,
                description:
                    "Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede. Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem. Fusce consequat. Nulla nisl. Nunc nisl.",
                thinkLength: "high-level",
                answerLength: "superstructure",
                numOfTakes: 4,
            },
            {
                id: 3,
                description:
                    "Nulla nisl. Nunc nisl. Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.",
                thinkLength: "upward-trending",
                answerLength: "help-desk",
                numOfTakes: 3,
            },
            {
                id: 4,
                description:
                    "Nunc nisl. Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum. In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo. Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros.",
                thinkLength: "radical",
                answerLength: "circuit",
                numOfTakes: 3,
            },
        ],
    },
    {
        id: 4,
        topic: "Lazare",
        questions: [
            {
                id: 1,
                description:
                    "Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.",
                thinkLength: "Configurable",
                answerLength: "contextually-based",
                numOfTakes: 3,
            },
            {
                id: 2,
                description:
                    "Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus. Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero. Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.",
                thinkLength: "structure",
                answerLength: "Phased",
                numOfTakes: 1,
            },
        ],
    },
    {
        id: 5,
        topic: "Quill",
        questions: [
            {
                id: 1,
                description:
                    "Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum. Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo.",
                thinkLength: "archive",
                answerLength: "extranet",
                numOfTakes: 2,
            },
            {
                id: 2,
                description:
                    "Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis. Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl.",
                thinkLength: "Switchable",
                answerLength: "Integrated",
                numOfTakes: 1,
            },
            {
                id: 3,
                description:
                    "Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet. Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.",
                thinkLength: "migration",
                answerLength: "leading edge",
                numOfTakes: 4,
            },
            {
                id: 4,
                description:
                    "Suspendisse potenti. Cras in purus eu magna vulputate luctus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.",
                thinkLength: "even-keeled",
                answerLength: "utilisation",
                numOfTakes: 2,
            },
        ],
    },
];
