let array = [];
const arraySize = 50;
const arrayContainer = document.getElementById('array-container');

function randomizeArray() {
    array = Array.from({ length: arraySize }, () => Math.floor(Math.random() * 300) + 10);
    displayArray();
}

function displayArray() {
    arrayContainer.innerHTML = '';
    array.forEach(value => {
        const bar = document.createElement('div');
        bar.classList.add('array-bar');
        bar.style.height = `${value}px`;
        arrayContainer.appendChild(bar);
    });
}

async function swap(arr, i, j) {
    await new Promise(resolve => setTimeout(resolve, 50));
    [arr[i], arr[j]] = [arr[j], arr[i]];
    displayArray();
}

async function bubbleSort() {
    for (let i = 0; i < array.length - 1; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            if (array[j] > array[j + 1]) {
                await swap(array, j, j + 1);
            }
        }
    }
}

async function selectionSort() {
    for (let i = 0; i < array.length; i++) {
        let minIdx = i;
        for (let j = i + 1; j < array.length; j++) {
            if (array[j] < array[minIdx]) {
                minIdx = j;
            }
        }
        if (minIdx !== i) {
            await swap(array, i, minIdx);
        }
    }
}

async function insertionSort() {
    for (let i = 1; i < array.length; i++) {
        let key = array[i];
        let j = i - 1;
        while (j >= 0 && array[j] > key) {
            array[j + 1] = array[j];
            j--;
            displayArray();
            await new Promise(resolve => setTimeout(resolve, 50));
        }
        array[j + 1] = key;
        displayArray();
    }
}

async function mergeSort() {
    await mergeSortHelper(array, 0, array.length - 1);
}

async function mergeSortHelper(arr, l, r) {
    if (l >= r) {
        return;
    }
    const m = l + Math.floor((r - l) / 2);
    await mergeSortHelper(arr, l, m);
    await mergeSortHelper(arr, m + 1, r);
    await merge(arr, l, m, r);
}

async function merge(arr, l, m, r) {
    const n1 = m - l + 1;
    const n2 = r - m;
    const left = arr.slice(l, m + 1);
    const right = arr.slice(m + 1, r + 1);
    let i = 0, j = 0, k = l;
    while (i < n1 && j < n2) {
        if (left[i] <= right[j]) {
            arr[k++] = left[i++];
        } else {
            arr[k++] = right[j++];
        }
        displayArray();
        await new Promise(resolve => setTimeout(resolve, 50));
    }
    while (i < n1) {
        arr[k++] = left[i++];
        displayArray();
        await new Promise(resolve => setTimeout(resolve, 50));
    }
    while (j < n2) {
        arr[k++] = right[j++];
        displayArray();
        await new Promise(resolve => setTimeout(resolve, 50));
    }
}

async function quickSort() {
    await quickSortHelper(array, 0, array.length - 1);
}

async function quickSortHelper(arr, low, high) {
    if (low < high) {
        const pi = await partition(arr, low, high);
        await quickSortHelper(arr, low, pi - 1);
        await quickSortHelper(arr, pi + 1, high);
    }
}

async function partition(arr, low, high) {
    const pivot = arr[high];
    let i = low - 1;
    for (let j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            await swap(arr, i, j);
        }
    }
    await swap(arr, i + 1, high);
    return i + 1;
}

async function heapSort() {
    const n = array.length;
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        await heapify(array, n, i);
    }
    for (let i = n - 1; i > 0; i--) {
        await swap(array, 0, i);
        await heapify(array, i, 0);
    }
}

async function heapify(arr, n, i) {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    if (left < n && arr[left] > arr[largest]) {
        largest = left;
    }
    if (right < n && arr[right] > arr[largest]) {
        largest = right;
    }
    if (largest !== i) {
        await swap(arr, i, largest);
        await heapify(arr, n, largest);
    }
}

randomizeArray();
