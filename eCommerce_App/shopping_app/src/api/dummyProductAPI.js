export async function fetchProductData() {
    try {
        
        const response = await fetch("https://dummyjson.com/products");
        const data = await response.json();
        const updatedData = data.products.map((item) => {
            return { ...item, quantity: 1, isInWishList: false };
        });

        return updatedData;

    } catch (error) {
        console.log("Error in fetchig data", error);
    }

}