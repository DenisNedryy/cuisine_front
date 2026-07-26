
export const recipesMenuData = [
    {
        type: 'folder',
        name: "toutes les recettes",
        nameUrl: "",
        route: "recipes",
    },
    {
        type: 'folder',
        nameUrl: "categories",
        name: "categories",
        route: "recipes",
        children: [
            { type: 'category', name: "entrée", route: "entrée" },
            { type: 'category', name: 'plat', route: "plat" },
            { type: 'category', name: 'dessert', route: "dessert" },
            { type: 'category', name: 'boisson', route: "boisson" },
            { type: 'category', name: 'apéro', route: "apéro" },
            { type: 'category', name: 'petit-déjeuner', route: "petit_dejeuner" },
        ],
    },
    {
        type: 'folder',
        name: "cuissons",
        route: "recipes",
        children: [
            { type: "tag", name: "Au four", route: "four" },
            { type: "tag", name: "À la poêle", route: "poele" },
            { type: "tag", name: "À la casserole", route: "casserole" },
            { type: "tag", name: "À la vapeur", route: "vapeur" },
            { type: "tag", name: "Au gril", route: "grill" },
            { type: "tag", name: "Au barbecue", route: "barbecue" },
            { type: "tag", name: "À la friteuse", route: "friteuse" },
            { type: "tag", name: "À la mijoteuse", route: "mijoteuse" },
            { type: "tag", name: "Au micro-ondes", route: "micro-ondes" },
            { type: "tag", name: "Sans cuisson", route: "sans-cuisson" },
        ],
    },
    {
        type: "folder",
        name: "Régions",
        route: "recipes",
        children: [
            { type: "tag", name: "Française", route: "francaise" },
            { type: "tag", name: "Italienne", route: "italienne" },
            { type: "tag", name: "Espagnole", route: "espagnole" },
            { type: "tag", name: "Portugaise", route: "portugaise" },
            { type: "tag", name: "Grecque", route: "grecque" },
            {
                type: "tag",
                name: "Britannique et irlandaise",
                route: "britannique-irlandaise",
            },
            {
                type: "tag",
                name: "Allemande et autrichienne",
                route: "allemande-autrichienne",
            },
            { type: "tag", name: "Scandinave", route: "scandinave" },
            { type: "tag", name: "Asiatique", route: "asiatique" },
            { type: "tag", name: "Indienne", route: "indienne" },
            {
                type: "tag",
                name: "Moyen-Orientale",
                route: "moyen-orientale",
            },
            { type: "tag", name: "Africaine", route: "africaine" },
            { type: "tag", name: "Américaine", route: "americaine" },
            {
                type: "tag",
                name: "Sud-Américaine",
                route: "sud-americaine",
            },
            { type: "tag", name: "Créole", route: "creole" },
        ],
    },
    {
        type: 'folder',
        name: "Saisons",
        route: "recipes",
        children: [
            { type: 'tag', name: "printemps", route: 'printemps' },
            { type: 'tag', name: 'été', route: 'été' },
            { type: 'tag', name: 'automne', route: 'automne' },
            { type: 'tag', name: 'hiver', route: 'hiver' },
        ],
    },
    {
        type: 'folder',
        name: "tags",
        route: "recipes",
        children: [
            { type: 'tag', name: "ecorcerie", route: 'ecorcerie' },
            { type: 'tag', name: 'diet', route: 'diet' },
        ],
    }
];
