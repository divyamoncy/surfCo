export interface Company {
    name: string,
    country_code: string,
    state_code: string,
    id: string,
    entity_type: string,
    homepage_url: string,
    city: string,
    overview: string,
    entity_id: string,
    ipos: string[],
    acquired: string[],
    acquiredBy: string[]
}
export interface SearchParams {
    name: string,
    countryCode: string,
    ipo: string,
    hasAcquired: string,
    hasBeenAcquired: string
}
export interface IPO {
    id: string,
    ipo_id: string,
    object_id: string,
    valuation_amount: number,
    valuation_currency_code: string,
    raised_amount: number,
    raised_currency_code: string,
    public_at: string,
    stock_symbol: string,
    source_url: string,
    source_description: string
}

export interface Acquisition {
    id: string,
    acquisition_id: string,
    acquiring_object_id: string,
    acquired_object_id: string,
    price_amount: number,
    price_currency_code: string,
    acquired_at: string,
    source_url: string,
    source_description: string,
    acquiredCompany?: string,
    acquirerCompany?: string,
    timestamp: number
}

export async function getAllCompanies(filterParams: SearchParams) {
    let url = '/search?name=' + filterParams.name + '&countryCode=' + filterParams.countryCode + '&ipo=' + filterParams.ipo + '&hasAcquired=' + filterParams.hasAcquired + '&hasBeenAcquired=' + filterParams.hasBeenAcquired;
    console.log(url);
    try {
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        return [];
    }

}

export async function getIpoByCompanyId(companyId: string) { 
    try {
        const response = await fetch('/ipo?companyId='+companyId);
        return await response.json();
    } catch (error) {
        return [];
    }

}

export async function getAllAcquisitionsByCompanyId(companyId: string) { 
    try {
        const response = await fetch('/acquisitions?companyId='+companyId);
        return await response.json();
    } catch (error) {
        return [];
    }

}

export async function getAllAcquiredByByCompanyId(companyId: string) { 
    try {
        const response = await fetch('/acquirer?companyId='+companyId);
        return await response.json();
    } catch (error) {
        return [];
    }

}