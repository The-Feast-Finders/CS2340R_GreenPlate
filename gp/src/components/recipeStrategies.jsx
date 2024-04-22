
// strategies for sorting

export const sortAlphabetically = (recipes) => {
    return [...recipes].sort((a, b) => a.name.localeCompare(b.name));
};


export const filterByMakeable = (recipes, pantry) => {
    return recipes.filter(recipe => {
        return recipe.ingredients.every(ingredient => {
            const pantryItem = pantry.find(pItem => pItem.ingredient.toLowerCase() === ingredient.name.toLowerCase());
            return pantryItem && pantryItem.quantity >= ingredient.quantity;
        });
    });
};
