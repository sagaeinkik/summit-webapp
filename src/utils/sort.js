'use strict';

// Sorteringsfunktion
export function sortArray(array, sortBy, latestSort) {
    let sortedArray = [...array]; // Skapa en kopia av arrayen

    // Sortera arrayen
    sortedArray.sort((a, b) => {
        const aValue = a[sortBy];
        const bValue = b[sortBy];

        if (typeof aValue === 'string' && typeof bValue === 'string') {
            return aValue.localeCompare(bValue);
        }

        if (typeof aValue === 'number' && typeof bValue === 'number') {
            return aValue - bValue;
        }

        return 0;
    });

    // Om sortBy är samma som latestSort, vänd ordningen
    if (sortBy === latestSort.value) {
        sortedArray.reverse();
        latestSort.value = null;
    } else {
        latestSort.value = sortBy;
    }

    return sortedArray;
}
