import createGrid from '../grid.js';

describe('createGrid', () => {
    it('used to create column-wise grid', () => {
        const input = [
            { height: 400, width: 40 },
            { height: 100, width: 40 },
            { height: 200, width: 340 },
            { height: 100, width: 40 },
            { height: 200, width: 40 },
            { height: 200, width: 40 },
            { height: 200, width: 40 }
        ];
        
        const output = [
            [{ height: 400, width: 40 }, { height: 200, width: 40 }],
            [
                { height: 100, width: 40 },
                { height: 100, width: 40 },
                { height: 200, width: 40 }
            ],
            [{ height: 200, width: 340 }, { height: 200, width: 40 }]
        ];

        expect(createGrid(input, 3)).toEqual(output);
    })
});
