
const nodeColSize = 2  // Usar números pares apenas


export default function createTree(treeStructure) {
    const treeContainer = document.createElement('div')
    treeContainer.id = 'tree'

    const [treeSize, _] = createSubTree(treeStructure, treeContainer, 1, 1)

    treeContainer.style.gridTemplateColumns = `repeat(${treeSize}, var(--tree-col-size))`

    return treeContainer
}

function createSubTree(subTreeStructure, treeContainer, currentRow, startCol) {
    const node = document.createElement('div')
    node.classList.add('node')
    node.style.gridRow = currentRow

    let currentSize = 0
    const centers = []
    for (const subTree of subTreeStructure) {
        const [subTreeSize, nodeCenter] = createSubTree(subTree, treeContainer, currentRow + 1, startCol + currentSize)
        centers.push(nodeCenter)
        currentSize += subTreeSize
    }

    let centersMean = 0
    if (currentSize === 0) {
        currentSize = nodeColSize
        node.style.gridColumn = `${startCol} / span ${nodeColSize}`
        centersMean = startCol + Math.ceil(nodeColSize / 2)
    } else {
        centersMean = Math.floor(centers.reduce((acc, center) => acc + center, 0) / centers.length)

        const currentNodeStart = centersMean - Math.round(nodeColSize / 2)
        node.style.gridColumn = `${currentNodeStart} / span ${nodeColSize}`
    }

    treeContainer.appendChild(node)
    return [currentSize, centersMean]
}