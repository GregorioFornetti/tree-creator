
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

    if (centers.length !== 0) {
        // Criação das linhas verticas abaixo do nó
        let inferiorLineRow = linesContainer.querySelector(`#line-${currentRow}`)
        if (!inferiorLineRow) {
            inferiorLineRow = document.createElement('div')
            inferiorLineRow.id = `line-${currentRow}`
            inferiorLineRow.classList.add('line-row')
            inferiorLineRow.dataset.row = currentRow

            let added = false
            for (let lineRow of linesContainer.children) {
                if (parseInt(lineRow.dataset.row) > currentRow) {
                    linesContainer.insertBefore(inferiorLineRow, lineRow)
                    added = true
                    break
                }
            }

            if (!added) {
                linesContainer.appendChild(inferiorLineRow)
            }
        }

        const nodeInfLineBox = document.createElement('div')
        nodeInfLineBox.classList.add('line-box')
        nodeInfLineBox.style.gridRow = 1
        nodeInfLineBox.style.gridColumn = `${((centersMean - 1) * 2) - 1} / span ${nodeColSize + 1}`

        const nodeInfLine = document.createElement('div')
        nodeInfLine.classList.add('vertical-line')

        nodeInfLineBox.appendChild(nodeInfLine)
        inferiorLineRow.appendChild(nodeInfLineBox)

        // Criação das linhas horizontais
        const nodeHorLineBox = document.createElement('div')
        nodeHorLineBox.classList.add('line-box')
        nodeHorLineBox.style.gridRow = 2
        const firstNodeStart = ((centers[0] - 1) * 2)
        const lastNodeEnd = ((centers[centers.length - 1] - 1) * 2) + 1
        nodeHorLineBox.style.gridColumn = `${firstNodeStart} / ${lastNodeEnd}`

        const nodeHorLine = document.createElement('div')
        nodeHorLine.classList.add('horizontal-line')

        nodeHorLineBox.appendChild(nodeHorLine)
        inferiorLineRow.appendChild(nodeHorLineBox)
    }

    treeContainer.appendChild(node)
    return [currentSize, centersMean]
}