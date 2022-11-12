import { countries } from "src/data/countries";
import { shuffleCopy } from "./array";

import { Balance, TDrawData } from "src/pages/player-info";
import { TPlayerDraw } from "src/types/general";

export const findDuplicates = (arr: Array<any>) => new Set(arr).size !== arr.length;

export const validateDraw = (draw: Array<TPlayerDraw>, allowTeamsFromSameGroup: boolean) => {
    const isValid = draw.reduce((v, d) => {
        if (v) {
            if (!allowTeamsFromSameGroup && findDuplicates(d.countries?.map(c => c.group))) {
                return false;
            }
            
            const otherDraws = draw.filter(o => draw.findIndex(i => i === d) >= 0);
    
            otherDraws.forEach((o => {
                const intersection = o.countries?.filter(element => d.countries?.some(e => e.id === element.id));
                if (!!intersection.length) {
                    return false;
                }
            }));
    
            return true;
        }
    }, true);

    return isValid;
};

export const getActiveGroup = (groups: Array<Array<any>>, playersToDraw: number) => {
    return groups.find(x => x.length >= playersToDraw && x.length > 0);
};

export const numberOfRemainingBalancedTeams = (groups: Array<Array<any>>, playerCount: number) => {
    const availableGroups = groups.filter(x => x.length === countries.length / 4 || x.length >= playerCount);
    const remainingTeams = availableGroups.reduce((acc, group) => acc + Math.floor(group.length / playerCount), 0);
    return remainingTeams;
}

export const canDraw = (balanceTeams: boolean, balanceDraw: boolean, activeGroup: any, bigPot: Array<any>, playersToDraw: number) => {
    if (balanceTeams) {
        return balanceDraw
            ? !!activeGroup && activeGroup?.length >= playersToDraw
            : bigPot.length >= playersToDraw;
    }

    return (balanceDraw && typeof activeGroup !== 'undefined') || (!balanceDraw && !!bigPot.length);
}

export const drawTeams = ({ playerData, balanceDraw, balanceTeams, oneTeamEach, allowTeamsFromSameGroup }: TDrawData) => {
    const fullyBalanced = balanceDraw === Balance.Full;

    const teams1 = countries.filter(c => c.groupSeed === 1);
    const teams2 = countries.filter(c => c.groupSeed === 2);
    const teams3 = countries.filter(c => c.groupSeed === 3);
    const teams4 = countries.filter(c => c.groupSeed === 4);

    const players = shuffleCopy(playerData);

    let draw: Array<TPlayerDraw>;
    do {
        draw = [];

        const teams1Shuffle = shuffleCopy(teams1);
        const teams2Shuffle = shuffleCopy(teams2);
        const teams3Shuffle = shuffleCopy(teams3);
        const teams4Shuffle = shuffleCopy(teams4);

        const bigPot = balanceDraw === Balance.None
            ? shuffleCopy(countries)
            : [ ...teams4Shuffle, ...teams3Shuffle, ...teams2Shuffle, ...teams1Shuffle ];

        let continueDraw: boolean = !oneTeamEach;
        let activeGroup: any = getActiveGroup([teams1Shuffle, teams2Shuffle, teams3Shuffle, teams4Shuffle], playerData.length);

        do {

            players.forEach((player, index) => {
                if (canDraw(balanceTeams, fullyBalanced, activeGroup, bigPot, players.length - (index + 1))) {
                    const playerIndex = draw.findIndex(x => x.playerData.id === player.id);
                    const d: TPlayerDraw = playerIndex >= 0
                        ? draw[playerIndex]
                        : { playerData: player, countries: [] };
        
                    const country = fullyBalanced
                        ? activeGroup?.pop()
                        : bigPot.pop();
        
                    d.countries.push(country);
        
                    if (playerIndex < 0) {
                        draw.push(d);
                    }
                }
            });

            activeGroup = getActiveGroup([teams1Shuffle, teams2Shuffle, teams3Shuffle, teams4Shuffle], playerData.length);

            if (oneTeamEach) {
                continueDraw = false;
            } else {
                if (balanceTeams) {
                    continueDraw = fullyBalanced
                        ? numberOfRemainingBalancedTeams([teams1Shuffle, teams2Shuffle, teams3Shuffle, teams4Shuffle], playerData.length) > 0
                        : bigPot.length >= playerData.length;
                } else {
                    continueDraw = canDraw(balanceTeams, fullyBalanced, activeGroup, bigPot, playerData.length);
                }
            }
        } while (continueDraw)
    } while(!validateDraw(draw, allowTeamsFromSameGroup));

    return draw;
};
