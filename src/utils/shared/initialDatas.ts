import { IAppFormField, IAppFormSection } from "@/interfaces";

export const intialAppForm: IAppFormSection[] = [
    {
        name: "Personal information",
        fields: [
            {
                id: "name",
                required: true,
                label: "Name",
                type: "text",
                maxLength: 127,
            },
            {
                id: "email",
                required: true,
                label: "Email",
                type: "email",
                maxLength: 255,
            },
            {
                id: "headline",
                required: false,
                label: "Headline",
                type: "text",
                maxLength: 255,
            },
            {
                id: "phone",
                required: false,
                label: "Phone",
                type: "phone",
                helper: "The hiring team may use this number to contact you about this job.",
                maxLength: 255,
            },
            {
                id: "address",
                required: false,
                label: "Address",
                type: "text",
            },
            {
                id: "avatar",
                required: false,
                label: "Photo",
                type: "file",
                supportedFileTypes: [".jpg", ".jpeg", ".gif", ".png"],
                supportedMimeTypes: ["image/jpeg", "image/gif", "image/png"],
                maxFileSize: 12000000,
            },
        ],
    },
    {
        name: "Profile",
        fields: [
            {
                id: "education",
                required: false,
                label: "Education",
                type: "group",
                fields: [
                    {
                        id: "school",
                        required: true,
                        label: "School",
                        type: "text",
                        maxLength: 255,
                    },
                    {
                        id: "field_of_study",
                        required: false,
                        label: "Field of study",
                        type: "text",
                        maxLength: 255,
                    },
                    {
                        id: "degree",
                        required: false,
                        label: "Degree",
                        type: "text",
                        maxLength: 255,
                    },
                    {
                        id: "start_date",
                        required: false,
                        label: "Start date",
                        type: "date",
                    },
                    {
                        id: "end_date",
                        required: false,
                        label: "End date",
                        type: "date",
                    },
                ],
            },
            {
                id: "experience",
                required: false,
                label: "Experience",
                type: "group",
                fields: [
                    {
                        id: "title",
                        required: true,
                        label: "Title",
                        type: "text",
                        maxLength: 255,
                    },
                    {
                        id: "company",
                        required: false,
                        label: "Company",
                        type: "text",
                        maxLength: 255,
                    },
                    {
                        id: "industry",
                        required: false,
                        label: "Industry",
                        type: "text",
                        maxLength: 255,
                    },
                    {
                        id: "summary",
                        required: false,
                        label: "Summary",
                        type: "paragraph",
                    },
                    {
                        id: "start_date",
                        required: false,
                        label: "Start date",
                        type: "date",
                    },
                    {
                        id: "end_date",
                        required: false,
                        label: "End date",
                        type: "date",
                    },
                    {
                        id: "current",
                        required: false,
                        label: "I currently work here",
                        type: "boolean",
                    },
                ],
            },
            {
                id: "summary",
                required: false,
                label: "Summary",
                type: "paragraph",
            },
            {
                id: "resume",
                required: false,
                label: "Resume",
                type: "file",
                supportedFileTypes: [".pdf", ".doc", ".docx", ".odt", ".rtf"],
                supportedMimeTypes: [
                    "application/pdf",
                    "application/msword",
                    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                    "application/vnd.oasis.opendocument.text",
                    "application/rtf",
                ],
                maxFileSize: 12000000,
            },
        ],
    },
    {
        name: "Details",
        fields: [
            {
                id: "cover_letter",
                required: false,
                label: "Cover letter",
                type: "paragraph",
            },
        ],
    },
];

export const appFormSections: IAppFormSection[] = [
    {
        name: "Personal information",
        fields: [
            {
                id: "name",
                required: true,
                label: "Name",
                type: "text",
                maxLength: 127,
            },
            {
                id: "email",
                required: true,
                label: "Email",
                type: "email",
                maxLength: 255,
            },
            {
                id: "headline",
                required: false,
                label: "Headline",
                type: "text",
                maxLength: 255,
            },
            {
                id: "phone",
                required: false,
                label: "Phone",
                type: "phone",
                helper: "The hiring team may use this number to contact you about this job.",
                maxLength: 255,
            },
            {
                id: "address",
                required: false,
                label: "Address",
                type: "text",
            },
            {
                id: "avatar",
                required: false,
                label: "Photo",
                type: "file",
                supportedFileTypes: [".jpg", ".jpeg", ".gif", ".png"],
                supportedMimeTypes: ["image/jpeg", "image/gif", "image/png"],
                maxFileSize: 12000000,
            },
        ] as IAppFormField[],
    },
    {
        name: "Profile",
        fields: [
            {
                id: "education",
                required: false,
                label: "Education",
                type: "group",
                fields: [
                    {
                        id: "school",
                        required: true,
                        label: "School",
                        type: "text",
                        maxLength: 255,
                    },
                    {
                        id: "field_of_study",
                        required: false,
                        label: "Field of study",
                        type: "text",
                        maxLength: 255,
                    },
                    {
                        id: "degree",
                        required: false,
                        label: "Degree",
                        type: "text",
                        maxLength: 255,
                    },
                    {
                        id: "start_date",
                        required: false,
                        label: "Start date",
                        type: "date",
                    },
                    {
                        id: "end_date",
                        required: false,
                        label: "End date",
                        type: "date",
                    },
                ],
            },
            {
                id: "experience",
                required: false,
                label: "Experience",
                type: "group",
                fields: [
                    {
                        id: "title",
                        required: true,
                        label: "Title",
                        type: "text",
                        maxLength: 255,
                    },
                    {
                        id: "company",
                        required: false,
                        label: "Company",
                        type: "text",
                        maxLength: 255,
                    },
                    {
                        id: "industry",
                        required: false,
                        label: "Industry",
                        type: "text",
                        maxLength: 255,
                    },
                    {
                        id: "summary",
                        required: false,
                        label: "Summary",
                        type: "paragraph",
                    },
                    {
                        id: "start_date",
                        required: false,
                        label: "Start date",
                        type: "date",
                    },
                    {
                        id: "end_date",
                        required: false,
                        label: "End date",
                        type: "date",
                    },
                    {
                        id: "current",
                        required: false,
                        label: "I currently work here",
                        type: "boolean",
                    },
                ],
            },
            {
                id: "summary",
                required: false,
                label: "Summary",
                type: "paragraph",
            },
            {
                id: "resume",
                required: false,
                label: "Resume",
                type: "file",
                supportedFileTypes: [".pdf", ".doc", ".docx", ".odt", ".rtf"],
                supportedMimeTypes: [
                    "application/pdf",
                    "application/msword",
                    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                    "application/vnd.oasis.opendocument.text",
                    "application/rtf",
                ],
                maxFileSize: 12000000,
            },
        ] as IAppFormField[],
    },
    {
        name: "Details",
        fields: [
            {
                id: "cover_letter",
                required: false,
                label: "Cover letter",
                type: "paragraph",
            },
            {
                id: "QA_7197549",
                required: true,
                label: "Test paragraph?",
                type: "paragraph",
            },
            {
                id: "QA_7197550",
                required: true,
                label: "Test short answer",
                type: "text",
                maxLength: 127,
            },
            {
                id: "QA_7197551",
                required: true,
                label: "Test yes/no with disqualify on asnwer no",
                type: "boolean",
            },
            {
                id: "QA_7197552",
                required: true,
                label: "Test dropdown answer",
                type: "dropdown",
                options: [
                    {
                        name: "3547804",
                        value: "anser1",
                    },
                    {
                        name: "3547805",
                        value: "answer 2",
                    },
                    {
                        name: "3547806",
                        value: "answer 3",
                    },
                ],
                singleOption: true,
            },
            {
                id: "QA_7197553",
                required: true,
                label: "Test MC question(only one answer allowed)",
                type: "multiple",
                options: [
                    {
                        name: "3547807",
                        value: "choice 1",
                    },
                    {
                        name: "3547808",
                        value: "choice 2",
                    },
                    {
                        name: "3547809",
                        value: "choice 3",
                    },
                ],
                singleOption: true,
            },
            {
                id: "QA_7197554",
                required: true,
                label: "Test MC question",
                type: "multiple",
                options: [
                    {
                        name: "3547810",
                        value: "choice 1",
                    },
                    {
                        name: "3547811",
                        value: "choice 2",
                    },
                    {
                        name: "3547812",
                        value: "choice 3",
                    },
                ],
                singleOption: false,
            },
            {
                id: "QA_7197555",
                required: true,
                label: "Test Date",
                type: "date",
            },
            {
                id: "QA_7197556",
                required: true,
                label: "Test number",
                type: "number",
                max: 9999999999999,
            },
            {
                id: "QA_7197557",
                required: true,
                label: "Test file",
                type: "file",
                supportedFileTypes: [
                    ".pdf",
                    ".doc",
                    ".docx",
                    ".odt",
                    ".rtf",
                    ".ppt",
                    ".pptx",
                    ".png",
                    ".jpg",
                    ".jpeg",
                    ".gif",
                    ".tiff",
                    ".xlsx",
                    ".xls",
                    ".zip",
                ],
                supportedMimeTypes: [
                    "application/pdf",
                    "application/msword",
                    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                    "application/vnd.oasis.opendocument.text",
                    "application/rtf",
                    "application/vnd.ms-powerpoint",
                    "application/vnd.openxmlformats-officedocument.presentationml.presentation",
                    "image/png",
                    "image/jpeg",
                    "image/gif",
                    "image/tiff",
                    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                    "application/vnd.ms-excel",
                    "application/zip",
                ],
                maxFileSize: 20000000,
            },
        ] as IAppFormField[],
    },
] as IAppFormSection[];

export const jobFunctions = [
    { id: 0, name: "Accounting" },
    { id: 1, name: "Administrative" },
    { id: 2, name: "Arts and Design" },
    { id: 3, name: "Business Development" },
    { id: 4, name: "Community and Social Services" },
    { id: 5, name: "Consulting" },
    { id: 6, name: "Education" },
    { id: 7, name: "Engineering" },
    { id: 8, name: "Entrepreneurship" },
    { id: 9, name: "Finance" },
    { id: 10, name: "Healthcare Services" },
    { id: 11, name: "Human Resources" },
    { id: 12, name: "Information Technology" },
    { id: 13, name: "Legal" },
    { id: 14, name: "Marketing" },
    { id: 15, name: "Media and Communication" },
    { id: 16, name: "Military and Protective Services" },
    { id: 17, name: "Operations" },
    { id: 18, name: "Product Management" },
    { id: 19, name: "Program and Project Management" },
    { id: 20, name: "Purchasing" },
    { id: 21, name: "Quality Assurance" },
    { id: 22, name: "Real Estate" },
    { id: 23, name: "Research" },
    { id: 24, name: "Sales" },
    { id: 25, name: "Support" },
];

export const workModalities = [
    { id: 0, name: "Full-time" },
    { id: 1, name: "Part-time" },
    { id: 2, name: "Remote" },
];

export const experienceLevels = [
    { id: 0, name: "Internship" },
    { id: 1, name: "Entry level" },
    { id: 2, name: "Associate" },
    { id: 3, name: "Mid-Senior level" },
    { id: 4, name: "Director" },
    { id: 5, name: "Executive" },
];

export const currencyList = [
    { code: "AED", name: "United Arab Emirates Dirham" },
    { code: "AMD", name: "Armenian Dram" },
    { code: "ANG", name: "Netherlands Antillean Guilder" },
    { code: "ARS", name: "Argentine Peso" },
    { code: "AUD", name: "Australian Dollar" },
    { code: "BAM", name: "Bosnia-Herzegovina Convertible Mark" },
    { code: "BDT", name: "Bangladeshi Taka" },
    { code: "BGN", name: "Bulgarian Lev" },
    { code: "BHD", name: "Bahraini Dinar" },
    { code: "BND", name: "Brunei Dollar" },
    { code: "BOB", name: "Bolivian Boliviano" },
    { code: "BRL", name: "Brazilian Real" },
    { code: "BWP", name: "Botswanan Pula" },
    { code: "BYN", name: "Belarusian Ruble" },
    { code: "CAD", name: "Canadian Dollar" },
    { code: "CHF", name: "Swiss Franc" },
    { code: "CLP", name: "Chilean Peso" },
    { code: "CNY", name: "Chinese Yuan" },
    { code: "COP", name: "Colombian Peso" },
    { code: "CRC", name: "Costa Rican ColÃ³n" },
    { code: "CZK", name: "Czech Koruna" },
    { code: "DKK", name: "Danish Krone" },
    { code: "DOP", name: "Dominican Peso" },
    { code: "DZD", name: "Algerian Dinar" },
    { code: "EGP", name: "Egyptian Pound" },
    { code: "EUR", name: "Euro" },
    { code: "FJD", name: "Fijian Dollar" },
    { code: "GBP", name: "British Pound Sterling" },
    { code: "GEL", name: "Georgian Lari" },
    { code: "GHS", name: "Ghanaian Cedi" },
    { code: "HKD", name: "Hong Kong Dollar" },
    { code: "HRK", name: "Croatian Kuna" },
    { code: "HUF", name: "Hungarian Forint" },
    { code: "IDR", name: "Indonesian Rupiah" },
    { code: "ILS", name: "Israeli New Sheqel" },
    { code: "INR", name: "Indian Rupee" },
    { code: "IQD", name: "Iraqi Dinar" },
    { code: "ISK", name: "Icelandic KrÃ³na" },
    { code: "JMD", name: "Jamaican Dollar" },
    { code: "JOD", name: "Jordanian Dinar" },
    { code: "JPY", name: "Japanese Yen" },
    { code: "KES", name: "Kenyan Shilling" },
    { code: "KRW", name: "South Korean Won" },
    { code: "KWD", name: "Kuwaiti Dinar" },
    { code: "KZT", name: "Kazakhstani Tenge" },
    { code: "LAK", name: "Laotian Kip" },
    { code: "LBP", name: "Lebanese Pound" },
    { code: "LKR", name: "Sri Lankan Rupee" },
    { code: "LTL", name: "Lithuanian Litas" },
    { code: "MAD", name: "Moroccan Dirham" },
    { code: "MMK", name: "Myanma Kyat" },
    { code: "MOP", name: "Macanese Pataca" },
    { code: "MUR", name: "Mauritian Rupee" },
    { code: "MXN", name: "Mexican Peso" },
    { code: "MYR", name: "Malaysian Ringgit" },
    { code: "NAD", name: "Namibian Dollar" },
    { code: "NGN", name: "Nigerian Naira" },
    { code: "NIO", name: "Nicaraguan CÃ³rdoba" },
    { code: "NOK", name: "Norwegian Krone" },
    { code: "NPR", name: "Nepalese Rupee" },
    { code: "NZD", name: "New Zealand Dollar" },
    { code: "OMR", name: "Omani Rial" },
    { code: "PAB", name: "Panamanian Balboa" },
    { code: "PEN", name: "Peruvian Nuevo Sol" },
    { code: "PHP", name: "Philippine Peso" },
    { code: "PKR", name: "Pakistani Rupee" },
    { code: "PLN", name: "Polish Zloty" },
    { code: "PYG", name: "Paraguayan Guarani" },
    { code: "QAR", name: "Qatari Rial" },
    { code: "RON", name: "Romanian Leu" },
    { code: "RSD", name: "Serbian Dinar" },
    { code: "RUB", name: "Russian Ruble" },
    { code: "SAR", name: "Saudi Riyal" },
    { code: "SEK", name: "Swedish Krona" },
    { code: "SGD", name: "Singapore Dollar" },
    { code: "SVC", name: "Salvadoran ColÃ³n" },
    { code: "THB", name: "Thai Baht" },
    { code: "TND", name: "Tunisian Dinar" },
    { code: "TRY", name: "Turkish Lira" },
    { code: "TWD", name: "New Taiwan Dollar" },
    { code: "TZS", name: "Tanzanian Shilling" },
    { code: "UAH", name: "Ukrainian Hryvnia" },
    { code: "UGX", name: "Ugandan Shilling" },
    { code: "USD", name: "US Dollar" },
    { code: "UYU", name: "Uruguayan Peso" },
    { code: "UZS", name: "Uzbekistan Som" },
    { code: "VES", name: "Venezuelan BolÃ­var" },
    { code: "VND", name: "Vietnamese Dong" },
    { code: "XCD", name: "East Caribbean Dollar" },
    { code: "XOF", name: "CFA Franc BCEAO" },
    { code: "XPF", name: "CFP Franc" },
    { code: "ZAR", name: "South African Rand" },
];

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
    type: string;
    iconUrl: string;
}[] = [
    {
        id: 1,
        stageName: "Sourced",
        type: "default",
        iconUrl: "http://dummyimage.com/115x100.png/cc0000/ffffff",
    },
    {
        id: 2,
        stageName: "Review CV",
        type: "default",
        iconUrl: "http://dummyimage.com/122x100.png/cc0000/ffffff",
    },
    {
        id: 3,
        stageName: "Multiple choice",
        type: "multiple-choice",
        iconUrl: "http://dummyimage.com/142x100.png/cc0000/ffffff",
    },
    {
        id: 4,
        stageName: "One-way assessment",
        type: "one-way",
        iconUrl: "http://dummyimage.com/173x100.png/cc0000/ffffff",
    },
    {
        id: 5,
        stageName: "Technical interview",
        type: "face-to-face",
        iconUrl: "http://dummyimage.com/117x100.png/5fa2dd/ffffff",
    },
    {
        id: 6,
        stageName: "Hired",
        type: "default",
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
