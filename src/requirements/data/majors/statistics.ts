import { CollegeOrMajorRequirement } from '@/requirements/types';
import {
    includesWithSingleRequirement,
    includesWithSubRequirements,
} from '../checkers';

const statRequirements: readonly CollegeOrMajorRequirement[] = [
    {
        name: 'Computer Programming',
        description: 'CSE 1221 or CSE 1222 or CSE 1223 or CSE 1224',
        checker: includesWithSubRequirements(
            ['CSE 1221'],
            ['CSE 1222'],
            ['CSE 1223'],
            ['CSE 1224']
        ),
        fulfilledBy: 'courses',
        perSlotMinCount: [1],
        slotNames: ['Course'],
    },
    {
        name: 'Core Courses',
        description:
            'MATH 2153, MATH 2568, STAT 3201, STAT 3202, STAT 3301, STAT 3302, STAT 3410, STAT 4301, STAT 4302',
        checker: includesWithSubRequirements(
            ['MATH 2153'],
            ['MATH 2568'],
            ['STAT 3201'],
            ['STAT 3202'],
            ['STAT 3301'],
            ['STAT 3302'],
            ['STAT 3410'],
            ['STAT 4301'],
            ['STAT 4302']
        ),
        fulfilledBy: 'courses',
        perSlotMinCount: [1, 1, 1, 1, 1, 1, 1, 1, 1],
        slotNames: [
            'MATH 2153',
            'MATH 2568',
            'STAT 3201',
            'STAT 3202',
            'STAT 3301',
            'STAT 3302',
            'STAT 3410',
            'STAT 4301',
            'STAT 4302',
        ],
    },
    {
        name: 'Core Electives',
        description:
            'Option 1: MATH 3345 and MATH 4547, Option 2: Six hours in Mathematics at the 2000-level or higher ',
        fulfilledBy: 'toggleable',
        fulfilmentOptions: {
            'Option 1': {
                description: 'MATH 3345 and MATH 4547',
                checker: includesWithSubRequirements(
                    ['MATH 3345'],
                    ['MATH 4547']
                ),
                counting: 'courses',
                perSlotMinCount: [1, 1],
                slotNames: ['MATH 3345', 'MATH 4547'],
            },
            'Option 2': {
                description:
                    'Six hours in Mathematics at the 2000-level or higher',
                checker: includesWithSingleRequirement(
                    'MATH 2255',
                    'MATH 2415',
                    'MATH 3345',
                    'MATH 3350',
                    'MATH 3607',
                    'MATH 4350',
                    'MATH 4507',
                    'MATH 4547',
                    'MATH 4548',
                    'MATH 4548',
                    'MATH 4556',
                    'MATH 4557',
                    'MATH 4575',
                    'MATH 4578'
                ),
                fulfilledBy: 'credits',
                perSlotMinCount: [6],
            },
        },
    },
];
