export type sciRequirementOption = {
    optionName: string;
    requiredCourses: string[];
};

export const scienceRequirements: sciRequirementOption[] = [
    { optionName: "bioReq", requiredCourses: ["BISC 207", "BISC 208"] },
    {
        optionName: "chemReq",
        requiredCourses: ["CHEM 103", "CHEM 133", "CHEM 104", "CHEM 134"]
    },
    {
        optionName: "geolReq",
        requiredCourses: ["GEOL 105", "GEOL 115", "GEOL 107"]
    },
    { optionName: "geol2Req", requiredCourses: ["GEOL 107", "GEOL 110"] },
    {
        optionName: "physReq",
        requiredCourses: ["PHYS 207", "PHYS 227", "PHYS 208", "PHYS 228"]
    }
];
