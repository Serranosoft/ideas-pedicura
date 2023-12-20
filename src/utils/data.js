export const categories_raw = [
    {
        name: "Brillantes",
        qty: 9,
        image: "https://mollydigital.manu-scholz.com/wp-content/uploads/2023/11/unas-pies-brillantes-6.jpg",
    },
    {
        name: "Dibujos",
        qty: 12,
        image: "https://mollydigital.manu-scholz.com/wp-content/uploads/2023/11/unas-pies-dibujos-9.jpg",
    },
    {
        name: "Elegantes",
        qty: 8,
        image: "https://mollydigital.manu-scholz.com/wp-content/uploads/2023/11/unas-pies-elegantes-2.jpg",
    },
    {
        name: "Florecitas",
        qty: 10,
        image: "https://mollydigital.manu-scholz.com/wp-content/uploads/2023/11/unas-pies-florecitas-1.jpg",
    },
    {
        name: "Francesas",
        qty: 9,
        image: "https://mollydigital.manu-scholz.com/wp-content/uploads/2023/11/unas-pies-francesas-2.jpg",
    },
    {
        name: "Navidad",
        qty: 9,
        image: "https://mollydigital.manu-scholz.com/wp-content/uploads/2023/11/unas-pies-navidad-7.jpg",
    },
    {
        name: "Oscuras",
        qty: 13,
        image: "https://mollydigital.manu-scholz.com/wp-content/uploads/2023/11/unas-pies-oscuras-11.jpg",
    },
    {
        name: "Sencillas",
        qty: 9,
        image: "https://mollydigital.manu-scholz.com/wp-content/uploads/2023/11/unas-pies-sencillas-8.jpg",
    },
    {
        name: "Verano",
        qty: 10,
        image: "https://mollydigital.manu-scholz.com/wp-content/uploads/2023/11/unas-pies-verano-9.jpg",
    },
]

export async function fetchImages(category, length) {
    const images = [];
    let result = "";
    
    const urlSegment = "https://mollydigital.manu-scholz.com/wp-content/uploads/2023/11/unas-pies-"
    const patternWithoutÑ = category.replace("ñ", "n");
    const pattern = patternWithoutÑ.replace(/ /g, '-').toLowerCase();  

    for (let i = 1; i <= length; i++) {
        result = urlSegment + pattern + "-" + i +".jpg"
        images.push(result);
    }

    return images;
}