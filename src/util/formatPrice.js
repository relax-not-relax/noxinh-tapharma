export default function formatPrice(priceString) {
    const price = parseFloat(priceString);
    if (isNaN(price)) return '';

    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
}