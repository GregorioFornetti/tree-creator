import createTree from "./createTree.js"


document.addEventListener('DOMContentLoaded', () => {

    const world = document.getElementById('world')

    const treeStructure = [
        [
            [
                [],
                [],
                [],
                [],
                [],
                []
            ],
            []
        ],
        [
            [],
            []
        ]
    ]

    const tree = createTree(treeStructure)

    world.appendChild(tree)
})