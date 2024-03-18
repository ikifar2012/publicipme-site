"use server"

const apiKey = process.env.API_KEY;

export async function Lookup(LookupData:string, type:string) {
    const data = await geolocateIpAddress(LookupData, type);
    return data;
}

async function geolocateIpAddress(ipAddress: string,  type: string) {
    let lookuptype: string;
        switch (type) {
            case "ip":
                lookuptype = "ipAddress";
                break;
            case "domain":
                lookuptype = "domain";
                break;
            case "email":
                lookuptype = "email";
                break;
            default:
                throw new Error("Invalid lookup type");
        }

    const url = `https://geo.ipify.org/api/v1?apiKey=${apiKey}&${lookuptype}=${ipAddress}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error: any) {
        console.error('Error:', error.message);
        throw error;
    }
}