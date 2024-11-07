export default function findAddress(id, dataArray, setState) {
    const selectedItem = dataArray.find((item) => item.id === parseInt(id, 10));
    if (selectedItem) {
        setState(selectedItem);
    }
}