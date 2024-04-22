import { useMemo } from 'react';

export const useRecipeStrategy = (recipes, strategy) => {
    return useMemo(() => strategy(recipes), [recipes, strategy]);
};
