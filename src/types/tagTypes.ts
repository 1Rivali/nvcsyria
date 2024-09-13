export interface ITagAttributes {
    name: string;
}

export interface ITag {
    type: string;
    id: number;
    attributes: ITagAttributes;
}

export interface ITagsResponse {
    data: ITag[];
}