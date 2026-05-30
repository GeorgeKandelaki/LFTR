export function filterObj(obj, keysToFilter) {
    const filteredObj = {};

    for (const [key, value] of Object.entries(obj)) {
        if (keysToFilter.includes(key)) continue;

        filteredObj[key] = value;
    }

    return filteredObj;
}
