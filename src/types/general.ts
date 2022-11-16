import { TUser } from "./web-server";

export type TDefaultObject = {
    [param: string]: any;
};

export enum Group {
    A,
    B,
    C,
    D,
    E,
    F,
    G,
    H
};

export type TCountry = {
    id: number;
    name: string;
    group: Group;
    groupSeed: 1 | 2 | 3 | 4;
}

export type TPlayerDraw = {
    playerData: TUser;
    countries: Array<TCountry>;
}

export type DataOptionType = {
    label: string;
    value: number;
    disabled?: boolean;
}
