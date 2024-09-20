import { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import { apiVersion, baseUrl } from '../config/constants';
import { IStory, IStoryResponse } from '../types/storyTypes';

// Define types for the API response


const useStory = (storyId: string) => {
    const [story, setStory] = useState<IStory | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<AxiosError | null>(null);

    useEffect(() => {
        const fetchStory = async () => {
            try {
                const response = await axios.get<IStoryResponse>(`${baseUrl}/${apiVersion}/stories/${storyId}`, {
                    headers: { Accept: "application/json", Authorization: localStorage.getItem("token") }
                });
                setStory(response.data.data);
            } catch (err) {
                setError(err as AxiosError);
            } finally {
                setLoading(false);
            }
        };

        fetchStory();
    }, [storyId]);

    return { story, loading, error };
};

export default useStory;
