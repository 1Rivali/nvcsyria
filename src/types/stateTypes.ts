export interface IStateAttributes {
    name: string;
}

export interface IState {
    type: string;
    id: number;
    attributes: IStateAttributes;
}

export interface IStatesResponse {
    data: IState[];
}
