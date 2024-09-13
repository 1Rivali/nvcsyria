

export interface IStoriesResponse {
    data: IStory[];
}


export interface IStoryAttributes {
    title: string;
    body: string;
    teller: string;
    clicks: number;
    created_at: string;
    keywords: any;
}

export interface IStoryPlace {
    type: string;
    id: number;
    attributes: {
        name: string;
    };
}

export interface IStoryTag {
    type: string;
    id: number;
    attributes: {
        name: string;
    };
}

export interface IStoryRelationships {
    place: {
        data: {
            type: string;
            id: number;
        };
        link: string;
    };
}

export interface IStoryIncludes {
    place: IStoryPlace;
    category: IStoryTag[];
}

export interface IStory {
    type: string;
    id: number;
    attributes: IStoryAttributes;
    relationships: IStoryRelationships;
    includes: IStoryIncludes;
}

export interface IStoryResponse {
    data: IStory;
}

export interface IStoryFilters {
    tag?: string | number;
    teller?: string;
    title?: string;
    state?: string | number;
    created_at?: string;
    sort?: string;
}