let currentId = 0;

export const generateId = () => {
    currentId += 1;
    return currentId;
};

export const resetId = () => {
    currentId = 0;
};
