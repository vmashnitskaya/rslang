export default function Randomizer(number) {
    const randomIndex = Math.floor(Math.random() * (number + 1));
    return randomIndex;
}
