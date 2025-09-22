import { adminGetRequest, getRequest } from './axios';
import { MechanicProfileType, PaginatedMechanicProfileResponse, ValidationErrorResponse } from './types';

// api/mechanics.ts
export async function fetchMechanicsByDistance(
    customer_zip: string,
    max_distance: number
): Promise<MechanicProfileType[]> {
    try {
        const URL = 'users/mechanics/distance-filter/';

        const params = {
            customer_zip,
            max_distance,
        };

        const response = await getRequest<MechanicProfileType[]>(URL, params);
        return response.data;
    } catch (error) {
        console.error('Error fetching mechanics:', error);
        // You can choose to rethrow the error or return an empty array
        return [];
    }
}

export async function fetchMechanicProfileById(
    id: string | null
): Promise<MechanicProfileType | null> {
    try{
        const URL = `/users/mechanic-profile/${id}/`;

        const response = await getRequest<MechanicProfileType>(URL);
        return response.data
    } catch (error) {
        console.error('Error fetching mechanics:', error);
        return null
    }
}

interface FetchMechanicsParams {
    search?: string;
    available_day_time?: string;
    page?: number;
    page_size?: number;
    [key: string]: any; // For additional filters
}

export async function fetchMechanicProfileAll(
    params: FetchMechanicsParams
): Promise<PaginatedMechanicProfileResponse> {
    try{
        const URL = '/users/mechanic-profile-all/'

        const response = await adminGetRequest<PaginatedMechanicProfileResponse>(URL, {
            ...params
        })

        return response.data
    } catch(error: any) {
        if (error.response && error.response.status === 400) {
            const validationErrors: ValidationErrorResponse = error.response.data;
            throw new Error(JSON.stringify(validationErrors));
        } else {
            throw new Error('An unexpected error occurred.');
        }
    }
}