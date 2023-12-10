import createTree from "./createTree.js"


document.addEventListener('DOMContentLoaded', () => {

    const world = document.getElementById('world')

    const treeStructure = []

    const onAdd = () => {
        world.innerHTML = ''
        const tree = createTree(treeStructure, onAdd)
        world.appendChild(tree)
    }

    const tree = createTree(treeStructure, onAdd)

    world.appendChild(tree)
})