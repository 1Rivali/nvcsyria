import { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import { IStoriesResponse, IStory, IStoryFilters } from '../types/storyTypes'; // Ensure correct path
import { apiVersion, baseUrl } from '../config/constants';



const useStories = (filters: IStoryFilters) => {
    const [stories, setStories] = useState<IStory[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<AxiosError | null>(null);

    useEffect(() => {
        const fetchStories = async () => {
            setLoading(true);
            setError(null); // Reset error state before a new fetch
            try {
                const response = await axios.get<IStoriesResponse>(`${baseUrl}/${apiVersion}/stories`, {
                    params: filters,  // Send filters as query parameters
                    headers: { "Accept": "application/json" },
                });
                setStories(response.data.data);
            } catch (err) {
                setError(err as AxiosError);
            } finally {
                setLoading(false);
            }
        };

        fetchStories();
    }, [filters]); // Fetch data whenever filters change

    return { stories, loading, error };
};

export default useStories;
