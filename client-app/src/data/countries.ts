import { Group, TCountry } from 'src/types/general';

export const countries: Array<TCountry> = [
    { id: 6, name: 'Italy', group: Group.A, groupSeed: 1, },
    { id: 9, name: 'Switzerland', group: Group.A, groupSeed: 2, },
    { id: 17, name: 'Turkey', group: Group.A, groupSeed: 4, },
    { id: 12, name: 'Wales', group: Group.A, groupSeed: 3, },
    
    { id: 1, name: 'Belgium', group: Group.B, groupSeed: 1, },
    { id: 23, name: 'Finland', group: Group.B, groupSeed: 4, },
    { id: 7, name: 'Denmark', group: Group.B, groupSeed: 2, },
    { id: 20, name: 'Russia', group: Group.B, groupSeed: 3, },
    
    { id: 11, name: 'Netherlands', group: Group.C, groupSeed: 1, },
    { id: 16, name: 'Ukraine', group: Group.C, groupSeed: 3, },
    { id: 15, name: 'Austria', group: Group.C, groupSeed: 2, },
    { id: 24, name: 'North Macedonia', group: Group.C, groupSeed: 4, },
    
    { id: 3, name: 'England', group: Group.D, groupSeed: 1, },
    { id: 10, name: 'Croatia', group: Group.D, groupSeed: 2, },
    { id: 22, name: 'Scotland', group: Group.D, groupSeed: 4, },
    { id: 21, name: 'Czech Republic', group: Group.D, groupSeed: 3, },
    
    { id: 5, name: 'Spain', group: Group.E, groupSeed: 1, },
    { id: 13, name: 'Sweden', group: Group.E, groupSeed: 2, },
    { id: 14, name: 'Poland', group: Group.E, groupSeed: 3, },
    { id: 18, name: 'Slovakia', group: Group.E, groupSeed: 4, },
    
    { id: 19, name: 'Hungary', group: Group.F, groupSeed: 4, },
    { id: 4, name: 'Portugal', group: Group.F, groupSeed: 2, },
    { id: 2, name: 'France', group: Group.F, groupSeed: 1, },
    { id: 8, name: 'Germany', group: Group.F, groupSeed: 3, },
]