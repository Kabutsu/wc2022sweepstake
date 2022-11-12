import { TPlayerData } from "src/pages/player-info";

export type TDefaultObject = {
    [param: string]: any;
};

export enum Group {
    A,
    B,
    C,
    D,
    E,
    F
};

export type TCountry = {
    id: number;
    name: string;
    group: Group;
    groupSeed: 1 | 2 | 3 | 4;
}

export type TPlayerDraw = {
    playerData: TPlayerData;
    countries: Array<TCountry>;
}

export type DataOptionType = {
    label: string;
    value: number;
    disabled?: boolean;
}
