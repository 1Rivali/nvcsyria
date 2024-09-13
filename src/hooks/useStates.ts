import { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import { apiVersion, baseUrl } from '../config/constants';
import { IState, IStatesResponse } from '../types/stateTypes';

// Define types for the API response

const useStates = () => {
    const [states, setStates] = useState<IState[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<AxiosError | null>(null);

    useEffect(() => {
        const fetchStates = async () => {
            try {
                const response = await axios.get<IStatesResponse>(`${baseUrl}/${apiVersion}/states`, {
                    headers: { "Accept": "application/json" }
                });
                setStates(response.data.data);
            } catch (err) {
                setError(err as AxiosError);
            } finally {
                setLoading(false);
            }
        };

        fetchStates();
    }, []); // Empty dependency array means this effect runs once on mount

    return { states, loading, error };
};

export default useStates;
