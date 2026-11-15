import createWebStorage from "redux-persist/lib/storage/createWebStorage";

const createNoopStorage = () => {
    return {
        getItem(): Promise<string | null> {
            return Promise.resolve(null);
        },
        setItem(_key: string, value: string): Promise<string> {
            void _key;
            return Promise.resolve(value);
        },
        removeItem(): Promise<void> {
            return Promise.resolve();
        },
    };
};

const storage = typeof window !== "undefined" ? createWebStorage("local") : createNoopStorage();

export default storage;
