
const nodeColSize = 2  // Usar números pares apenas


export default function createTree(treeStructure, onAdd) {
    const treeContainer = document.createElement('div')
    treeContainer.id = 'tree'

    const linesContainer = document.createElement('div')
    linesContainer.id = 'lines'
    treeContainer.appendChild(linesContainer)

    const [treeSize, _] = createSubTree(treeStructure, treeContainer, linesContainer, onAdd, 1, 1)

    treeContainer.style.gridTemplateColumns = `repeat(${treeSize}, var(--tree-col-size))`

    for (let lineRow of linesContainer.children) {
        lineRow.style.gridTemplateColumns = `repeat(${treeSize}, var(--tree-col-size) var(--tree-col-gap))`
    }

    return treeContainer
}

function createSubTree(subTreeStructure, treeContainer, linesContainer, onAdd, currentRow, startCol) {
    const node = document.createElement('div')
    node.classList.add('node')
    node.style.gridRow = currentRow
    node.addEventListener('click', () => {
        subTreeStructure.push([])
        onAdd()
    })

    // Criação do nó
    let currentSize = 0
    const centers = []
    for (const subTree of subTreeStructure) {
        const [subTreeSize, nodeCenter] = createSubTree(subTree, treeContainer, linesContainer, onAdd, currentRow + 1, startCol + currentSize)
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

    // Criação das linhas verticas acima do nó
    if (currentRow !== 1) {
        let superiorLineRow = linesContainer.querySelector(`#line-${currentRow - 1}`)
        if (!superiorLineRow) {
            superiorLineRow = document.createElement('div')
            superiorLineRow.id = `line-${currentRow - 1}`
            superiorLineRow.classList.add('line-row')
            superiorLineRow.dataset.row = currentRow - 1

            let added = false
            for (let lineRow of linesContainer.children) {
                if (parseInt(lineRow.dataset.row) > currentRow - 1) {
                    linesContainer.insertBefore(superiorLineRow, lineRow)
                    added = true
                    break
                }
            }

            if (!added) {
                linesContainer.appendChild(superiorLineRow)
            }
        }

        const nodeSupLineBox = document.createElement('div')
        nodeSupLineBox.classList.add('line-box')
        nodeSupLineBox.style.gridRow = 3
        nodeSupLineBox.style.gridColumn = `${((centersMean - 1) * 2) - 1} / span ${nodeColSize + 1}`

        const nodeSupLine = document.createElement('div')
        nodeSupLine.classList.add('vertical-line')

        nodeSupLineBox.appendChild(nodeSupLine)
        superiorLineRow.appendChild(nodeSupLineBox)
    }

    treeContainer.appendChild(node)
    return [currentSize, centersMean]
}