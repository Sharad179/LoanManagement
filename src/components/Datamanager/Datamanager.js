


export const RegionStateCityMapping = { "West": { "Maharashtra": { "Thane": ["RFBR001"], "Mumbai": ["RFBR002"] },"Gujarat":{"Ahemadabad":["RFBR004","RFBR005"]} }
,"South":{"Karnataka":{"Bangalore":["RFBR003"]}} }


export const PartnersArray = ["PayBingo","Eko"];


export function getRegions(response) {
    let Regions = [];
    return Object.keys(response);
}
export function getStates(response, region) {
    let states = [];
    if (region) {
        states = Object.keys(response[region]);
    }
   
    return states;
}
export function getCities(response, region, stateval) {
    let cities = [];
    if (region && stateval) {
        cities = Object.keys(response[region][stateval]);
    }
    return cities;
}

export function getBranches(response, region, stateval, cityVal) {
    let Branches = [];
    if (region && stateval && cityVal) {
        Branches = response[region][stateval][cityVal];
    }
    return Branches;
}
export function getPartners(response) {
    let Partners = [];
    Partners = response;
    return Partners;
}
export const mapIdTitle = {
    "NoOfContract":"# Contracts",
    "LoanAmount":"Disbursement",
    "Od":"Overdue Amount",
    "OutstandingAmount":"Total Outstanding Amount",
    "Delq30Amount":"Delq 30+ (Amount)",
    "Delq60Amount":"Delq 60+ (Amount)",
    "Delq90Amount":"Delq 90+ (Amount)",
    "WIRR":"WIRR",
    "Delq30Count":"Delq 30+ (Count)",
    "Delq60Count":"Delq 60+ (Count)",
    "Delq90Count":"Delq 90+ (Count)",
    "Delq30LessThan4":"Delq 30+ mob Less than 4",
    "Delq60LessThan12":"Delq 60+ mob Less than or equal to 12",
    "Delq90LessThan12":"Delq 90+ mob Less than or equal to 12",
    "NoOfContractMonthlyList":"Monthly Contract Disbursed"

}
