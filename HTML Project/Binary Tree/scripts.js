class TreeNode {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class BinaryTree {
    constructor() {
        this.root = null;
    }

    add(value) {
        const newNode = new TreeNode(value);
        if (this.root === null) {
            this.root = newNode;
        } else {
            this.insertNode(this.root, newNode);
        }
    }

    insertNode(node, newNode) {
        if (newNode.value < node.value) {
            if (node.left === null) {
                node.left = newNode;
            } else {
                this.insertNode(node.left, newNode);
            }
        } else {
            if (node.right === null) {
                node.right = newNode;
            } else {
                this.insertNode(node.right, newNode);
            }
        }
    }

    bfs() {
        const result = [];
        const queue = [];
        if (this.root !== null) {
            queue.push(this.root);
            while (queue.length > 0) {
                const node = queue.shift();
                result.push(node);
                if (node.left !== null) queue.push(node.left);
                if (node.right !== null) queue.push(node.right);
            }
        }
        return result;
    }

    dfs() {
        const result = [];
        function traverse(node) {
            if (node !== null) {
                result.push(node);
                traverse(node.left);
                traverse(node.right);
            }
        }
        traverse(this.root);
        return result;
    }
}

const tree = new BinaryTree();

function addNode() {
    const value = document.getElementById('nodeValue').value;
    if (value === '') {
        alert('Please enter a value');
        return;
    }
    tree.add(parseInt(value));
    document.getElementById('nodeValue').value = '';
    drawTree();
}

function drawTree() {
    const container = document.getElementById('treeContainer');
    container.innerHTML = ''; // Clear previous tree
    if (tree.root !== null) {
        drawNode(tree.root, container, 0, container.offsetWidth, 50, 50);
    }
}

function drawNode(node, container, minX, maxX, y, levelGap) {
    const x = (minX + maxX) / 2;
    const nodeElement = document.createElement('div');
    nodeElement.className = 'node';
    nodeElement.style.left = x + 'px';
    nodeElement.style.top = y + 'px';
    nodeElement.innerHTML = node.value;
    container.appendChild(nodeElement);

    if (node.left !== null) {
        const leftX = (minX + x) / 2;
        drawLine(x, y, leftX, y + levelGap, container);
        drawNode(node.left, container, minX, x, y + levelGap, levelGap);
    }

    if (node.right !== null) {
        const rightX = (x + maxX) / 2;
        drawLine(x, y, rightX, y + levelGap, container);
        drawNode(node.right, container, x, maxX, y + levelGap, levelGap);
    }
}

function drawLine(x1, y1, x2, y2, container) {
    const line = document.createElement('div');
    line.className = 'line';
    line.style.left = x1 + 'px';
    line.style.top = y1 + 15 + 'px';
    const length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    line.style.width = length + 'px';
    const angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);
    line.style.transform = `rotate(${angle}deg)`;
    container.appendChild(line);
}

function highlightNode(nodeElement) {
    nodeElement.classList.add('highlight');
    setTimeout(() => {
        nodeElement.classList.remove('highlight');
    }, 500);
}

async function bfsTraversal() {
    const traversal = tree.bfs();
    for (const node of traversal) {
        const nodeElement = document.querySelector(`.node:contains(${node.value})`);
        if (nodeElement) {
            highlightNode(nodeElement);
            await new Promise(resolve => setTimeout(resolve, 500));
        }
    }
}

async function dfsTraversal() {
    const traversal = tree.dfs();
    for (const node of traversal) {
        const nodeElement = document.querySelector(`.node:contains(${node.value})`);
        if (nodeElement) {
            highlightNode(nodeElement);
            await new Promise(resolve => setTimeout(resolve, 500));
        }
    }
}

document.getElementById('treeContainer').addEventListener('click', (event) => {
    if (event.target.classList.contains('node')) {
        alert('Node value: ' + event.target.innerHTML);
    }
});
