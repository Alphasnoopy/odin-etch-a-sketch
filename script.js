const slider = document.getElementById('slider');

const canvas = document.getElementById('canvas');
const slider_Label = document.getElementById('sizeLabel');
let curr_Size = 0;
let div_Num = 1;
let corner_List = [];

function colorChange(e){
    e.target.style.backgroundColor = document.getElementById("colorPicker").value
}

function createGrid(){
    let bottom_Left;
    let top_Right;
    let pixel_List;
    let grid_Diff = 0;
    const gridSize = Number(slider.value);
    canvas.style.setProperty('--grid-size', gridSize);

    if (corner_List.length > 0) {
        bottom_Left = document.getElementById(String(corner_List.pop()));
        top_Right = document.getElementById(String(corner_List.pop()));
        pixel_List = document.querySelectorAll(".pixel");

        top_Right.style.removeProperty('border-top-right-radius');
        bottom_Left.style.removeProperty('border-bottom-left-radius');
        pixel_List.forEach(pixel => {
            pixel.style.backgroundColor = "rgb(206, 201, 201)";
        });
    }

    corner_List.push(gridSize, Math.pow(gridSize, 2) - gridSize + 1);

    if (gridSize >= curr_Size){
        grid_Diff = Math.pow(gridSize,2) - Math.pow(curr_Size,2);
        for (let i = 0; i < grid_Diff; i++) {
            let div = document.createElement('div');  
            div.classList.add('pixel'); 
            div.setAttribute('id', div_Num); 
            canvas.appendChild(div);
            div.addEventListener('mouseover', colorChange);
            div_Num += 1;
        }
    }
    else {
        grid_Diff = Math.pow(curr_Size,2) - Math.pow(gridSize,2);
        for (let i = 0; i < grid_Diff; i++) {
            canvas.removeChild(canvas.lastChild);
            div_Num -= 1;
        }
    }

    top_Right = document.getElementById(String(corner_List[0]));
    bottom_Left = document.getElementById(String(corner_List[1]));
    top_Right.style.cssText = 'border-top-right-radius: 1em;';
    bottom_Left.style.cssText = 'border-bottom-left-radius: 1em;';
    curr_Size = gridSize;

}

function sketchStart() {
    createGrid();
    slider.addEventListener("input", () => {
        const gridSize = slider.value;
        slider_Label.textContent = gridSize;
    });
    slider.addEventListener("change", createGrid);
}

sketchStart()