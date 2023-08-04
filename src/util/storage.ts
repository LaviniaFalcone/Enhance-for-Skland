export const readLocalStorage = <T>(key: string) => {
    const value = localStorage.getItem(key);
    if (!value) return void 0;
    return JSON.parse(value) as T;
};

export const writeLocalStorage = (key: string, value: any) => localStorage.setItem(key, JSON.stringify(value));
export const removeLocalStorage = (key: string) => localStorage.removeItem(key);
export const clearLocalStorage = () => localStorage.clear();

export const readSessionStorage = <T>(key: string) => {
    const value = sessionStorage.getItem(key);
    if (!value) return void 0;
    return JSON.parse(value) as T;
};

export const writeSessionStorage = (key: string, value: any) => sessionStorage.setItem(key, JSON.stringify(value));
export const removeSessionStorage = (key: string) => sessionStorage.removeItem(key);
export const clearSessionStorage = () => sessionStorage.clear();
