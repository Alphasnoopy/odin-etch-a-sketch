const slider = document.getElementById('slider');
const canvas = document.getElementById('canvas');
const slider_Label = document.getElementById('sizeLabel');
const buttons = document.querySelector("#buttons").childNodes;
let curr_Size = 0;
let div_Num = 1;
let corner_List = [];
let color_Style = "";

// Iterate through each pixel to change back to orginal color
function clearCanvas(){
    let pixel_List;
    pixel_List = document.querySelectorAll(".pixel");

    pixel_List.forEach(pixel => {
        pixel.style.backgroundColor = "rgb(206, 201, 201)";
    });
}

// Color used when hovering over pixel
function colorChange(e){
    switch(color_Style) {
        case "black":
            e.target.style.backgroundColor = "rgb(0, 0, 0)";
            break;
        // Get each rgb value and increase by 10% of 255 (or 25.5)
        case "shade":
            let rgbColor = e.target.style.backgroundColor;
            let rgbArr = rgbColor.substring(4, rgbColor.length-1).split(',').map(function (value){
                return value.trim() - 25.5;
            });
            e.target.style.backgroundColor = `rgb(${rgbArr[0]}, ${rgbArr[1]}, ${rgbArr[2]})`;
            break;
        // Each rgb value is randomly generated using number between 0 and 1 multiplied by 255
        case "rainbow":
            let red_Color = Math.random() * 255;
            let green_Color = Math.random() * 255;
            let blue_Color = Math.random() * 255;
            e.target.style.backgroundColor = `rgb(${red_Color}, ${green_Color}, ${blue_Color})`;
            break;
        default:
            e.target.style.backgroundColor = document.getElementById("colorPicker").value;
    }
}

function createGrid(){
    let bottom_Left;
    let top_Right;
    let grid_Diff = 0;
    const gridSize = Number(slider.value);
    // Set css variable
    canvas.style.setProperty('--grid-size', gridSize);

    // Remove corner pixel radius from previous grid
    if (corner_List.length > 0) {
        bottom_Left = document.getElementById(String(corner_List.pop()));
        top_Right = document.getElementById(String(corner_List.pop()));

        top_Right.style.removeProperty('border-top-right-radius');
        bottom_Left.style.removeProperty('border-bottom-left-radius');
        clearCanvas();
    }

    // Find the new corner pixels
    corner_List.push(gridSize, Math.pow(gridSize, 2) - gridSize + 1);

    // Add pixels if grid size is increased
    // Add id num to find corner pixels and hover event to change color
    if (gridSize >= curr_Size){
        grid_Diff = Math.pow(gridSize,2) - Math.pow(curr_Size,2);
        for (let i = 0; i < grid_Diff; i++) {
            let div = document.createElement('div');  
            div.classList.add('pixel'); 
            div.setAttribute('id', div_Num);
            div.style.backgroundColor =  "rgb(206, 201, 201)"; 
            canvas.appendChild(div);
            div.addEventListener('mouseover', colorChange);
            div_Num += 1;
        }
    }
    // Remove pixels if grid size is decreased
    else {
        grid_Diff = Math.pow(curr_Size,2) - Math.pow(gridSize,2);
        for (let i = 0; i < grid_Diff; i++) {
            canvas.removeChild(canvas.lastChild);
            div_Num -= 1;
        }
    }

    // Style newlyfound corners
    top_Right = document.getElementById(String(corner_List[0]));
    bottom_Left = document.getElementById(String(corner_List[1]));
    top_Right.style.cssText = 'border-top-right-radius: 1em;';
    bottom_Left.style.cssText = 'border-bottom-left-radius: 1em;';
    curr_Size = gridSize;
}

function sleep(ms) {
    return new Promise ((resolve) => {
        setTimeout(resolve, ms)
    });
}

// Shake only main section
// Promise/sleep needed to remove classList or else adding/removing
    // will be synchronous
async function shakeCanvas(){
    const page = document.getElementsByTagName("main")[0];
    page.classList.add('shaking');
    await sleep(300);
    page.classList.remove('shaking');
    clearCanvas();
}

function sketchStart() {
    createGrid();

    // Change label number while dragging
    slider.addEventListener("input", () => {
        const gridSize = slider.value;
        slider_Label.textContent = gridSize;
    });
    slider.addEventListener("change", createGrid);
    buttons.forEach(button => {
        button.addEventListener('mousedown', () => {
            // Clear seperated from buttons or else activated on hover
            if (button.id === "clear") { 
                shakeCanvas();
            }
            else {
                color_Style = button.id;
            }
        })
    })
}

sketchStart()