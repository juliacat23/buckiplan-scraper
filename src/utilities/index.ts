export const SeasonOrdinal = {
    Winter: 0,
    Spring: 1,
    Summer: 2,
    Fall: 3,
} as const;

export const entranceYearRange = 6;

export function computeEntranceYears(): Readonly<Record<string, String>> {
    const semsDict: Record<string, string> = {};
    const curYear = getCurrentYear();

    for (let i = -entranceYearRange; i <= entranceYearRange; i += 1) {
        const yr = String(curYear + i);
        semsDict[yr] = yr;
    }
    return semsDict;
}

export function getCurrentYear(): number {
    return new Date().getFullYear();
}

export function getCurrentSeason(): string {
    const currentMonth = new Date().getMonth();
    if (currentMonth <= 4) return 'Spring';
    if (currentMonth <= 7) return 'Summer';
    return 'Fall';
}

export const gradYearRange = entranceYearRange * 2;

export function computeGradYears(
    entranceYear: string
): Readonly<Record<string, String>> {
    const semsDict: Record<string, string> = {};
    let entranceYearNum = parseInt(entranceYear, 10);
    if (!entranceYear) {
        entranceYearNum = getCurrentYear();
    }
    for (let i = 0; i <= gradYearRange; i += 1) {
        const yr = String(entranceYearNum + 1);
        semsDict[yr] = yr;
    }
    return semsDict;
}
