'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

export interface CompanyInfo {
    email: string | null;
    phone: string | null;
    address: string | null;
    facebookUrl: string | null;
    instagramUrl: string | null;
    twitterUrl: string | null;
    youtubeUrl: string | null;
    mapUrl: string | null;
    workingHours: string | null;
}

interface CompanyInfoContextType {
    info: CompanyInfo | null;
    loading: boolean;
    error: string | null;
}

const CompanyInfoContext = createContext<CompanyInfoContextType>({
    info: null,
    loading: true,
    error: null,
});

export const useCompanyInfo = () => useContext(CompanyInfoContext);

export function CompanyInfoProvider({ children }: { children: React.ReactNode }) {
    const [info, setInfo] = useState<CompanyInfo | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchInfo = async () => {
            try {
                const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
                const res = await fetch(`${API_URL}/company-info`);
                if (!res.ok) throw new Error('Failed to fetch company info');
                const data = await res.json();
                setInfo(data);
            } catch (err) {
                console.error(err);
                setError(err instanceof Error ? err.message : 'Unknown error');
            } finally {
                setLoading(false);
            }
        };

        fetchInfo();
    }, []);

    return (
        <CompanyInfoContext.Provider value={{ info, loading, error }}>
            {children}
        </CompanyInfoContext.Provider>
    );
}
