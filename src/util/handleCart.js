import cartAPI from "../api/cartApi";

export const changeAmount = async (item, amount, setValue) => {
    setValue(true);
    const data = {
        productId: item.id,
        amount: amount,
    };
    try {
        await cartAPI.update(data);
        setValue(false);
    } catch (error) {
        console.log("Failed to update amount: ", error);
        setValue(false);
    }
};


