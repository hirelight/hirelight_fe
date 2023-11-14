export interface IKit {
    id?: string;
    title: string;
    contents: IKitContent[];
}

export interface IKitContent {
    name: string;
    requirements: string;
}
