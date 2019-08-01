export const random_colour = () =>
    `rgba(${Math.round(Math.random() * 200)}, ${Math.round(
        Math.random() * 200
    )}, ${Math.round(Math.random() * 200)}, ${Math.round(
        Math.random() * 6 + 1
    ) / 10})`
