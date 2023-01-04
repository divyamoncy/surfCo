export async function getAllCompanies() {

    try {
        const response = await fetch('/search?name=');
        return await response.json();
    } catch (error) {
        return [];
    }

}