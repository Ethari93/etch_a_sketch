let gridSize;
let containerSize; 

let selectedColorScheme = "rainbow";
let currentColor = 255;

const container = document.querySelector("#container");
const etch_canvas = document.querySelector("#etch-canvas");

const colorSchemes = {
    black: {
        name: "Black",
        default: true,
        color: () => "#000000"
    },
    rainbow: {
        name: "Rainbow",
        default: false,
        color: () => `rgb(${randomNumber(0,255)},${randomNumber(0,255)},${randomNumber(0,255)})`
    },
    grayscale: {
        name: "Grayscale",
        default: false,
        color: () => {
            currentColor <= 1 ? currentColor = 255 : currentColor -= 1;
            return `rgb(${currentColor},${currentColor},${currentColor})`;
        }
    }
}

function initGrid(){
    //clearing the canvas
    etch_canvas.innerHTML="";

    for(let i = 0; i < Math.pow(gridSize, 2); i += 1){    
        let div = document.createElement("div");
    
        div.classList.add("square");
        etch_canvas.appendChild(div);
    }

    console.log(Math.pow(gridSize, 2));
    console.log(document.querySelectorAll(".square"))
}

function initContainer(){
    getContainerSize();

    container.style['width'] = containerSize + "px";

    etch_canvas.style['height'] = containerSize + "px";
    etch_canvas.style['width'] = containerSize + "px";
    etch_canvas.style['grid-template-columns'] = `repeat(${gridSize}, auto)`
    etch_canvas.style['grid-template-rows'] = `repeat(${gridSize}, auto)`
}

function getContainerSize(){
    gridSize = document.querySelector("#squares_per_side").value;
    containerSize = document.querySelector("#canvas_size").value;
}

function initButtons(){
    etchInputs();
    resetButton();
    selectColorButton();
}

function colorCell(cell){
    cell.style['background'] = colorSchemes[selectedColorScheme].color();
}

function styleGrid(){
    let squares = document.querySelectorAll(".square");
    squares.forEach((square) => {
        square.addEventListener('mouseenter', () => colorCell(square));
    });
}

function etchInputs(){
    let controls = document.querySelectorAll("#etch-controls input");
    controls.forEach((input) =>{
        console.log(input);
        input.addEventListener('change', () => renderSketch());
    })
}

function resetButton(){
    const resetBtn = document.querySelector("#reset");
    resetBtn.addEventListener('click', () => {
        renderSketch();
    });
}

function randomNumber(min, max) {  
    return Math.random() * (max - min) + min; 
} 

function selectColorButton(){
    let select = document.querySelector("#color_scheme");
    select.addEventListener('change', () => changeColorScheme(select.value));
    
    for(color in colorSchemes){
        let option = document.createElement("option");
        option.value = color;
        option.text = colorSchemes[color].name;

        if(colorSchemes[color].default){
            option.selected = true;
            selectedColorScheme = color;
        }

        select.appendChild(option);
    }
}

function changeColorScheme(value){
    selectedColorScheme = value;
}

function renderSketch(){
    initContainer();
    initGrid();
    styleGrid();
}

function initEvents(){
    renderSketch();
    initButtons();
}

initEvents();