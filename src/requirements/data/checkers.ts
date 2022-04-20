export const includesWithSingleRequirement = (
    ...includes: readonly string[]
): readonly RequirementChecker[] => [
    (course: Course): boolean => courseMatchesCodeOptions(course, includes),
];

/**
 * This function returns an array of checkers.
 * Each checker in the array checks whether a course can satisfy a sub-requirement with in a bigger
 * requirement by checking whether the course code appears in the includes array.
 *
 * Usage:
 * ```typescript
 * const checkers = includesWithSubRequirements(['CS 211*'], ['CS 280*']);
 *
 * checkers[0]({ code: 'CS 2110' }) // returns true
 * checkers[0]({ code: 'CS 2112' }) // returns true
 * checkers[1]({ code: 'CS 2800' }) // returns true
 * checkers[1]({ code: 'CS 2802' }) // returns true
 * checkers[0]({ code: 'CS 2800' }) // returns false
 * checkers[1]({ code: 'CS 2110' }) // returns false
 * checkers[0]({ code: 'CS 3110' }) // returns false
 * checkers[1]({ code: 'CS 3110' }) // returns false
 * ```
 *
 * The above example is equivalent to the old includes field like:
 * ```json
 * {
 *   "includes": [ ["CS 211*"], ["CS 280*"] ]
 * }
 * ```
 *
 * @param includes a list of array of course code pattern to check against.
 * @returns an array of checkers that can be directly assigned to requirement object.
 */
export const includesWithSubRequirements = (
    ...includes: readonly string[][]
): readonly ((course: Course) => boolean)[] =>
    includes.map((subRequirementInclude) => (course: Course) =>
        courseMatchesCodeOptions(course, subRequirementInclude)
    );
