import { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import { apiVersion, baseUrl } from '../config/constants';
import { ITag, ITagsResponse } from '../types/tagTypes';




const useTags = () => {
    const [tags, setTags] = useState<ITag[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<AxiosError | null>(null);

    useEffect(() => {
        const fetchTags = async () => {
            try {
                const response = await axios.get<ITagsResponse>(`${baseUrl}/${apiVersion}/tags/`, {
                    headers: { "Accept": "application/json" }
                });
                setTags(response.data.data);
            } catch (err) {
                setError(err as AxiosError);
            } finally {
                setLoading(false);
            }
        };

        fetchTags();
    }, []); // Empty dependency array means this effect runs once on mount

    return { tags, loading, error };
};

export default useTags;
