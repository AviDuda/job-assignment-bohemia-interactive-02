export function getRandom<T>(arr: T[]) {
    return arr[Math.floor(Math.random() * arr.length)];
}

export const PRICE_FILTER: Array<{ name: string; value: string; check: (price: number) => boolean }> = [
    {
        name: "Less than $20",
        value: "less_than_twenty",
        check: (price) => price < 20,
    },
    {
        name: "$20 - $100",
        value: "twenty_to_two_hundred",
        check: (price) => price >= 20 && price < 100,
    },
    {
        name: "$100 - $200",
        value: "hundred_to_two_hundred",
        check: (price) => price >= 100 && price < 200,
    },
    {
        name: "More than $200",
        value: "more_than_two_hundred",
        check: (price) => price >= 200,
    },
];
