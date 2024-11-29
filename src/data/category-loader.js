import combosAPI from "../api/combosApi";

export const categoryLoader = async () => {
    try {
        const res = await combosAPI.getCombos();
        saveCategoryToSession(res.data.content);
        return res.data.content;
    } catch (error) {
        console.log("Failed to fetch combos:", error);
    }

}

export const saveCategoryToSession = (data) => {
    const simplifiedData = data.map((item) => ({
        id: item.id,
        name: item.name,
        image: item.image,
    }));
    sessionStorage.setItem("categoriesNoxinh", JSON.stringify(simplifiedData));

}