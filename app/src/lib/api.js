import { useAuthStore } from '@/stores/auth';

export const apiFetch = async (url, options = {}) => {
    const auth = useAuthStore();
    
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
    };

    if (auth.token) {
        headers['Authorization'] = `Bearer ${auth.token}`;
    }

    let response = await fetch(url, { ...options, headers });

    if (response.status === 403 && auth.refreshToken) {
        const refreshed = await auth.refreshAccessToken();
        if (refreshed) {
            headers['Authorization'] = `Bearer ${auth.token}`;
            response = await fetch(url, { ...options, headers });
        } else {
            auth.logout();
            window.location.href = '/';
        }
    }

    return response;
};