
import { Sorted, Alpha, Beta } from 'Colors'
const { floor, random } = Math

export default function* (size, items) {
    while (!items.slice(1).every((item, i) => items[i] <= item)) {
        yield* shuffle(size, items)
    }
    for (let i = 0; i < size; i++)
        yield [Sorted, i]
}

function* shuffle(size, items) {
    for (let i = 0; i < size; i++) {
        var random_index = floor(random() * size);
        [items[i], items[random_index]] = [items[random_index], items[i]];
        yield [Alpha, i]
        yield [Beta, random_index]
    }

}
