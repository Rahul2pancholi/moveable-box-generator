let i = 0;
export function getUniqID(prefix = "id-") {
    return `prefix${i++}`;
}