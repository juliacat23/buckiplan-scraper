import { SURVEY_COURSE_ID } from '../constants';

export type ExamFulfillment = {
    readonly courseId: number;
    readonly courseRquivalents?: Record<string, number[]>;
    readonly minimumScore: number;
    readonly credits: number;
    readonly majorsExcluded?: string[];
};

export type ExamFulfillments = Record<string, ExamFulfillment[]>;
export type ExamData = Record<'AP' | 'IB', ExamFulfillments>;

export const OTHER_COLLEGES = 'OTHER_COLLEGES';

const examData: ExamData = {
    AP: {
        'Art History': [{ courseId: 100, minimumScore: 3, credits: 3 }],
        Biology: [
            { courseId: 101, minimumScore: 3, credits: 3 },
            { courseId: 102, minimumScore: 4, credits: 4 },
            { courseId: 103, minimumScore: 5, credits: 8 },
        ],
        Chemistry: [
            { courseId: 104, minimumScore: 3, credits: 3 },
            { courseId: 105, minimumScore: 4, credits: 5 },
        ],
        'Chinese Language and Culture': [
            { courseId: 106, minimumScore: 3, credits: 8 },
            { courseId: 107, minimumScore: 4, credits: 12 },
            { courseId: 108, minimumScore: 5, credits: 17 },
        ],
        'Computer Science Principles': [
            { courseId: 109, minimumScore: 3, credits: 3 },
        ],
        'Computer Science A': [
            { courseId: 110, minimumScore: 3, credits: 3 },
            { courseId: 111, minimumScore: 4, credits: 6 },
        ],
        'English Language and Composition': [
            { courseId: 112, minimumScore: 3, credits: 3 },
        ],
        'English Literature and Composition': [
            { courseId: 113, minimumScore: 3, credits: 3 },
        ],
        'Environmental and Natural Resources': [
            { courseId: 114, minimumScore: 3, credits: 3 },
        ],
        'French Language and Culture': [
            { courseId: 115, minimumScore: 3, credits: 8 },
            { courseId: 116, minimumScore: 4, credits: 12 },
            { courseId: 117, minimumScore: 5, credits: 15 },
        ],
        'German Language and Culture': [
            { courseId: 118, minimumScore: 3, credits: 8 },
            { courseId: 119, minimumScore: 4, credits: 12 },
            { courseId: 120, minimumScore: 5, credits: 15 },
        ],
        'Government and Politics: United States': [
            { courseId: 121, minimumScore: 3, credits: 3 },
        ],
        'Government and Politics: Comparative': [
            { courseId: 122, minimumScore: 3, credits: 3 },
        ],
        'European History': [{ courseId: 123, minimumScore: 3, credits: 3 }],
        'United States History': [
            { courseId: 124, minimumScore: 3, credits: 6 },
        ],
        'World History': [{ courseId: 125, minimumScore: 3, credits: 6 }],
        'Human Geography': [{ courseId: 126, minimumScore: 3, credits: 3 }],
        'Italian Language and Culture': [
            { courseId: 127, minimumScore: 3, credits: 8 },
            { courseId: 128, minimumScore: 4, credits: 12 },
            { courseId: 129, minimumScore: 5, credits: 15 },
        ],
        'Japanese Language and Culture': [
            { courseId: 130, minimumScore: 3, credits: 8 },
            { courseId: 131, minimumScore: 4, credits: 12 },
            { courseId: 132, minimumScore: 5, credits: 17 },
        ],
        Latin: [
            { courseId: 133, minimumScore: 3, credits: 10 },
            { courseId: 134, minimumScore: 4, credits: 13 },
            { courseId: 135, minimumScore: 5, credits: 16 },
        ],
        'Music Theory': [
            { courseId: 136, minimumScore: 3, credits: 2 },
            { courseId: 137, minimumScore: 4, credits: 4 },
        ],
        'Physics 1': [{ courseId: 138, minimumScore: 3, credits: 5 }],
        'Physics 2': [{ courseId: 139, minimumScore: 3, credits: 5 }],
        'Physics C: Electricity and Magnetism': [
            { courseId: 140, minimumScore: 3, credits: 5 },
        ],
        'Physics C: Mechanics': [
            { courseId: 141, minimumScore: 3, credits: 5 },
        ],
        Psychology: [{ courseId: 142, minimumScore: 3, credits: 3 }],
        Research: [{ courseId: 143, minimumScore: 3, credits: 3 }],
        Seminar: [{ courseId: 144, minimumScore: 3, credits: 3 }],
        'Spanish Language and Culture': [
            { courseId: 145, minimumScore: 3, credits: 8 },
            { courseId: 146, minimumScore: 4, credits: 15 },
        ],
        'Spanish Literature and Culture': [
            { courseId: 147, minimumScore: 3, credits: 8 },
            { courseId: 148, minimumScore: 4, credits: 15 },
        ],
        Statistics: [
            { courseId: 149, minimumScore: 3, credits: 3 },
            { courseId: 150, minimumScore: 4, credits: 3 },
        ],
        '2-D Art and Design': [{ courseId: 151, minimumScore: 3, credits: 3 }],
        '3-D Art and Design': [{ courseId: 152, minimumScore: 3, credits: 3 }],
        Drawing: [{ courseId: 153, minimumScore: 3, credits: 3 }],
        Microeconomics: [{ courseId: 154, minimumScore: 3, credits: 3 }],
        Macroeconomics: [{ courseId: 155, minimumScore: 3, credits: 3 }],
        'Calculus AB': [{ courseId: 156, minimumScore: 3, credits: 5 }],
        'Calculus BC': [{ courseId: 157, minimumScore: 3, credits: 10 }],
    },
    IB: {
        'Arabic A1': [{ courseId: 200, minimumScore: 4, credits: 3 }],
        'American History': [{ courseId: 201, minimumScore: 4, credits: 6 }],
        Biology: [{ courseId: 202, minimumScore: 4, credits: 8 }],
        Chemistry: [{ courseId: 203, minimumScore: 4, credits: 5 }],
        Economics: [
            {
                courseId: 204,
                minimumScore: 4,
                credits: 6,
            },
        ],
        'English A: Language and Literature': [
            { courseId: 205, minimumScore: 4, credits: 6 },
        ],
        'English A: Literature': [
            { courseId: 206, minimumScore: 4, credits: 6 },
        ],
        Film: [{ courseId: 207, minimumScore: 4, credits: 3 }],
        'French A: Language and Literature': [
            { courseId: 208, minimumScore: 6, credits: 8 },
        ],
        'French A: Literature': [
            { courseId: 209, minimumScore: 6, credits: 8 },
        ],
        'French B': [{ courseId: 210, minimumScore: 6, credits: 8 }],
        Geography: [{ courseId: 211, minimumScore: 4, credits: 3 }],
        'History of Europe': [{ courseId: 212, minimumScore: 4, credits: 6 }],
        'History of Asia/Oceana': [
            { courseId: 213, minimumScore: 4, credits: 6 },
        ],
        Math: [{ courseId: 214, minimumScore: 4, credits: 5 }],
        Philosophy: [{ courseId: 215, minimumScore: 4, credits: 3 }],
        Physics: [{ courseId: 216, minimumScore: 4, credits: 10 }],
        Psychology: [{ courseId: 217, minimumScore: 4, credits: 3 }],
        'Social and Cultural Anthropology': [
            { courseId: 218, minimumScore: 4, credits: 3 },
        ],
        'Spanish A: Language and Literature': [
            { courseId: 219, minimumScore: 5, credits: 8 },
            { courseId: 220, minimumScore: 6, credits: 12 },
        ],
        'Spanish A: Literature': [
            { courseId: 221, minimumScore: 6, credits: 12 },
        ],
        'Spanish B': [{ courseId: 222, minimumScore: 6, credits: 12 }],
        'World History': [{ courseId: 223, minimumScore: 4, credits: 6 }],
    },
};

export default examData;
