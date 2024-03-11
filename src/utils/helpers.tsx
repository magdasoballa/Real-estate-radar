export const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
};

export const formatPrice = (amount) => {
    const amountStr = String(amount);
    const [wholePart, decimalPart] = amountStr.split('.');
    const formattedWholePart = wholePart.split('').reverse().map((digit, index) => {
        if (index > 0 && index % 3 === 0) {
            return digit + ',';
        } else {
            return digit;
        }
    }).reverse().join('');
    let formattedAmount = formattedWholePart;
    if (decimalPart) {
        formattedAmount += '.' + decimalPart;
    }
    return formattedAmount;
}

export const isNewHome = (dateOfIssue) => {
    const currentDate = new Date();
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(currentDate.getMonth() - 3);
    const listingDate = new Date(dateOfIssue);
    return listingDate > threeMonthsAgo;
};