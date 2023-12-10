
const nodeColSize = 2

export default function createTree(treeStructure) {
    const treeContainer = document.createElement('div')
    treeContainer.id = 'tree'

    const treeSize = createSubTree(treeStructure, treeContainer, 1, 1)

    treeContainer.style.gridTemplateColumns = `repeat(${treeSize}, var(--tree-col-size))`

    return treeContainer
}

function createSubTree(subTreeStructure, treeContainer, currentRow, startCol) {
    const node = document.createElement('div')
    node.classList.add('node')
    node.style.gridRow = currentRow

    let currentSize = 0
    for (const subTree of subTreeStructure) {
        const subTreeSize = createSubTree(subTree, treeContainer, currentRow + 1, startCol + currentSize)
        currentSize += subTreeSize
    }
    currentSize = Math.max(currentSize, nodeColSize)
    const currentNodeStart = startCol + Math.round(currentSize / 2) - Math.round(nodeColSize / 2)
    node.style.gridColumn = `${currentNodeStart} / span ${nodeColSize}`

    treeContainer.appendChild(node)
    console.log(currentSize)
    return currentSize
}