
import { Sorted, Unsorted, Alpha, Beta } from 'Colors'
const { max, min } = Math


export default function* (size, items) {
    const counter = {}
    let Max = max.apply(null, items)
    let Min = min.apply(null, items)

    for (let i = 0; i < size; i++) {
        yield [Alpha, i];
        if (items[i] in counter)
            counter[items[i]].push(i);
        else
            counter[items[i]] = [i];
    }

    let c = 0,
        replaced_index,
        old_items = [...items];
    for (let i = Min; i <= Max; i++) {
        if (!(i in counter)) continue;
        while (counter[i].length) {
            replaced_index = counter[i].pop();
            yield [Alpha, c];
            yield [Beta, replaced_index];
            yield [Unsorted, c];
            yield [Unsorted, replaced_index];
            [items[c], old_items[replaced_index]] = [old_items[replaced_index], items[c]];
            yield [Beta, replaced_index];
            yield [Sorted, c++];
        }
    }

    for (let i = 0; i < size; i++) {
        yield [Sorted, i];
    }

}
