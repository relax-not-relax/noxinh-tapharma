import cartAPI from "../api/cartApi";

export const fetchCart = async () => {
    try {
        const res = await cartAPI.getAll();
        return res.res.data.page.content
    } catch (error) {
        console.error("Failed to fetch categories:", error);
    }
};