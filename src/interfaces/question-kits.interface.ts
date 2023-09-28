export interface IKit {
    id?: number;
    title: string;
    contents: IKitContent[];
}

export interface IKitContent {
    name: string;
    requirements: string;
}
