"use server"
const apiKey = process.env.API_KEY;
import { cookies } from "next/headers";

export async function Lookup(LookupData:string, type:string) {
    const data = await geolocateIpAddress(LookupData, type);
    await SaveLookup(data);
    return data;

}
async function SaveLookup(LookupData: string) {
    // get user lookups from cookies
    let userLookups: string[] = [];
    const cookiestore = cookies();
    if (cookiestore.has('lookups')) {
        let cookie = cookiestore.get('lookups');
        console.log(cookie);
        if (cookie) {
            // value contains an array, each element is a lookup object with json data put it into an array we can push to
            userLookups = await JSON.parse(cookie.value);
        }
        else {
            userLookups = [];
        }
    }
    else {
        userLookups = [];
    }
    console.log("user lookups");
    console.log(userLookups);
    
    // add new lookup to user lookups
    userLookups.push(LookupData);
    // save user lookups to cookies
    cookies().set('lookups', JSON.stringify(userLookups));
    
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
        console.log(url);
        const response = await fetch(url);
        const data = response.json();
        console.log(data);
        return data;
    } catch (error: any) {
        console.error('Error:', error.message);
        throw error;
    }
}

