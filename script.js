function createGrid(){
    const slider = document.getElementById('slider');
    const gridSize = slider.getAttribute('value');
    const canvas = document.getElementById('canvas');
    canvas.style.setProperty('--grid-size', gridSize);
    for (let i = 0; i < (gridSize * gridSize); i++) {
        let div = document.createElement('div');    
        canvas.appendChild(div);
    }
}

function sketchStart() {
    createGrid();
}

sketchStart()