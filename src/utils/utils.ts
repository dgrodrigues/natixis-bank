export const formatDate = (date: string) => {
    const transactionDate = new Date(date);
    const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    const day = ("0" + transactionDate.getDate()).slice(-2);
    const month = monthNames[transactionDate.getMonth()];
    const year = transactionDate.getFullYear();
    return `${day}, ${month} of ${year}`;
};
