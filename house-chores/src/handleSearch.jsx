export function filterTown(item, search) {
    for (const town of item.location) {
        if (town.toLowerCase().includes(search)) return true
    }
    return false
}