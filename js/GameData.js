function saveData(player, floor, relics, unselectedRelics) {
    const data = {
        health: player.health,
        maxHealth: player.maxHealth,
        playerRelicIds: player.relics.map(relic => relic.id),
        floorCount: floor.floorCount,
        relics: relics.map(relic => relic.id),
        unselectedRelics: unselectedRelics.map(relic => relic.id)
    };

    localStorage.setItem('data', JSON.stringify(data));
}

function loadData() {
    const data = JSON.parse(localStorage.getItem('data'));
    if (data == null) {
        return;
    }
    return data;
}

function deleteData() {
    localStorage.removeItem('data');
}

function isExistData() {
    return localStorage.getItem('data') != null;
}