export const setItem = (key: string, item: string) => {
    try {
        if (item === undefined) {
            // throw new Error("Can't store undefined values")
            return;
        }
    
        localStorage.setItem(key, item)
    } catch (error: unknown) {
        console.error(error)
        return;
    }
}

export const getItem = (key: string) => {
    try {
        const item = localStorage.getItem(key)
        
        if (item === null) {
            throw new Error("Key does not exist")
            return;
        }

        return item
    } catch (error: unknown) {
        console.error(error)
        return;
    }
}

export const removeItem = (key: string) => {
    
    localStorage.removeItem(key)
}