const generateBtn = document.getElementById("generate-btn");
const arrayContainer = document.getElementById("array-container");
const startingArray = document.getElementById("starting-array");
const sortBtn = document.getElementById("sort-btn");
let currentArray = [];

// Генерирует случайное целое число от 1 до 100
const generateElement = () => Math.floor(Math.random() * 100) + 1;

// function to return an array containing five random integers
function generateArray() {
    return Array.from({
        length: 5
    }, generateElement)
};

// function creates and returns an empty div element
function generateContainer() {
    const div = document.createElement('div');
    div.classList.add('step-container'); // for styling if needed
    return div;
}

// function should fill the element passed as the first argument to the function with five 
// span elements with the text of an integer from the array passed as the second argument to the function
function fillArrContainer(container, array) {
    container.innerHTML = "";
    array.forEach((number) => {
        const span = document.createElement("span");
        span.textContent = number;
        span.style.margin = '5px';
        span.style.padding = '5px';
        container.appendChild(span);
    });
}

// return true if first element <= second
const isOrdered = (a, b) => a <= b;

// swaps array elements if they are not ordered
const swapElements = (arr, i) => {
    if (!isOrdered(arr[i], arr[i + 1])) {
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
    }
}
// highlights two compared elements in a div
const highlightCurrentEls = (container, i) => {
    const children = container.children;
    if (children[i] && children[i + 1]) {
        children[i].style.border = "2px dashed red";
        children[i + 1].style.border = "2px dashed red";
    }
}

// generating an array
generateBtn.addEventListener("click", () => {
    currentArray = generateArray();
    startingArray.innerHTML = '';
    arrayContainer.querySelectorAll('.step-container').forEach(e => e.remove());
    fillArrContainer(startingArray, currentArray);
});

sortBtn.addEventListener("click", () => {
    const steps = []
    const arr = [...currentArray];
    arrayContainer.querySelectorAll('.step-container').forEach(e => e.remove());

    const arraysAreEqual = (a, b) =>
        a.length === b.length && a.every((v, i) => v === b[i]);

    for (let i = 0; i < arr.length; i++) {
        let firstStep = null;
        let fourthStep = null;

        for (let j = 0; j < arr.length - 1; j++) {
            // save a copy of the array and index
            const snapshot = {
                arr: [...arr],
                index: j
            };
            steps.push(snapshot);

            if (j === 0) firstStep = snapshot.arr;
            if (j === 3) fourthStep = snapshot.arr;

            swapElements(arr, j);
        }

        // if arrays at j=0 and j=3 are equal, stop both loops
        if (firstStep && fourthStep && arraysAreEqual(firstStep, fourthStep)) {
            break;
        }
    }
    startingArray.innerHTML = "";
    fillArrContainer(startingArray, steps[0].arr);
    highlightCurrentEls(startingArray, steps[0].index);

    for (let i = 1; i < steps.length; i++) {
        const stepDiv = generateContainer();
        fillArrContainer(stepDiv, steps[i].arr);
        highlightCurrentEls(stepDiv, steps[i].index);
        arrayContainer.appendChild(stepDiv);
    }
    const finalDiv = generateContainer();
    finalDiv.style.border = "2px solid green";
    fillArrContainer(finalDiv, steps[steps.length - 1].arr);
    arrayContainer.appendChild(finalDiv);
});

/*
sortBtn.addEventListener("click", () => {
    if (currentArray.length !== 5) return;

    const arr = [...currentArray];
    const steps = [];

    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - 1; j++) {

            steps.push({
                array: [...arr],
                index: j
            });

            swapElements(arr, j);
        }
    }

    steps.push({
        array: [...arr],
        index: -1
    });

    [...arrayContainer.children].forEach((child) => {
        if (child !== startingArray) arrayContainer.removeChild(child);
    });

    startingArray.innerHTML = "";
    fillArrContainer(startingArray, steps[0].array);
    highlightCurrentEls(startingArray, steps[0].index);

    for (let i = 1; i < steps.length; i++) {
        const stepDiv = generateContainer();
        fillArrContainer(stepDiv, steps[i].array);
        if (steps[i].index !== -1) {
            highlightCurrentEls(stepDiv, steps[i].index);
        }
        arrayContainer.appendChild(stepDiv);
    }

    console.log(arrayContainer.children.length);
});

const sortArray = [];
const array = [100, 18, 80, 94, 1];

const arraysAreEqual = (a, b) =>
    a.length === b.length && a.every((v, i) => v === b[i]);

const sort = (array) => {
    const arr = [...array]; // копия исходного массива

    for (let i = 0; i < arr.length; i++) {
        let firstStep = null;
        let thirdStep = null;

        for (let j = 0; j < arr.length - 1; j++) {
            // сохраняем копию массива и индекс
            const snapshot = {
                arr: [...arr],
                index: j
            };
            sortArray.push(snapshot);

            if (j === 0) firstStep = snapshot.arr;
            if (j === 3) thirdStep = snapshot.arr;

            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }

        // если массивы на j=0 и j=3 равны, остановим оба цикла
        if (firstStep && thirdStep && arraysAreEqual(firstStep, thirdStep)) {
            break;
        }
    }

    return arr;
};

const result = sort(array);
console.log("Итоговый массив:", result);
console.log("Шаги сортировки:", sortArray);
*/