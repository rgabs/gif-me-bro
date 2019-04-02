const getLowestHeightColumnIndex = (newGrid) => {
    const existingHeights = newGrid.map(g => g.maxHeight);
    return existingHeights.indexOf(Math.min(...existingHeights));
};

const createGrid = (input, columnSize, offset = 0) => {
    let newGrid = [];

    for (let i = 0; i < columnSize; i++) {
        newGrid.push({ maxHeight: 0, columnData: [] });
    }

    input.forEach(element => {
        const indexToPush = getLowestHeightColumnIndex(newGrid);
        newGrid[indexToPush].columnData.push(element);
        newGrid[indexToPush].maxHeight += element.height + offset; 
    });

    return newGrid.map(g => g.columnData);
};



export default createGrid;