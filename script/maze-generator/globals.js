// Global variables
let mazeNodes = {};

// Check if globals are defined
if (typeof maxMaze === 'undefined') { maxMaze = 0; }
if (typeof maxSolve === 'undefined') { maxSolve = 0; }
if (typeof maxCanvas === 'undefined') { maxCanvas = 0; }
if (typeof maxCanvasDimension === 'undefined') { maxCanvasDimension = 0; }
if (typeof maxWallsRemove === 'undefined') { maxWallsRemove = 300; }

// Update remove max walls html
// 适配新布局：增加空值检查
const removeMaxWallsText = document.querySelector('.desc span');
if (removeMaxWallsText) {
    removeMaxWallsText.innerHTML = maxWallsRemove;
}

const removeWallsInput = document.getElementById('remove_walls');
if (removeWallsInput) {
    removeWallsInput.max = maxWallsRemove;
}

const download = document.getElementById("download");
if (download) {
    download.addEventListener("click", downloadImage, false);
    download.setAttribute('download', 'maze.png');
}

function initMaze() {
    // 此函数内容已移至 app.js，保留空定义防止旧引用报错，或直接由 app.js 覆盖
}
function initSolve() { }
function downloadImage(e) { }