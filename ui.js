export function getLifespan(birth, death) {
    if (birth === undefined && death === undefined) { return '-' }

    const birthYear = birth != undefined ? birth : ''
    const deathYear = death != undefined ? death : ''

    return `${birthYear} - ${deathYear}`;
}

export const x = 0;
