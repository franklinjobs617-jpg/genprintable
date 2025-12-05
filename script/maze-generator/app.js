function initMaze() {
    const download = document.getElementById("download");
    if (download) {
        download.setAttribute('download', 'maze.png');
        // 保留图标，重置文字
        download.innerHTML = '<i class="fa-solid fa-download mr-2 text-brand-500"></i> Download';
    }

    const settings = {
        width: getInputIntVal('width', 20),
        height: getInputIntVal('height', 20),
        wallSize: getInputIntVal('wall-size', 10),
        removeWalls: getInputIntVal('remove_walls', 0),
        entryType: '',
        bias: '',
        color: '#000000',
        backgroundColor: '#FFFFFF',
        solveColor: '#cc3737',

        // restrictions
        maxMaze: maxMaze,
        maxCanvas: maxCanvas,
        maxCanvasDimension: maxCanvasDimension,
        maxSolve: maxSolve,
        maxWallsRemove: maxWallsRemove,
    }

    const colors = ['color', 'backgroundColor', 'solveColor'];
    for (let i = 0; i < colors.length; i++) {
        const colorInput = document.getElementById(colors[i]);
        settings[colors[i]] = colorInput.value

        if (!isValidHex(settings[colors[i]])) {
            // 修复：在新HTML结构中寻找父容器的 data-default
            let container = colorInput.closest('.color-picker');
            let defaultColor = container.dataset.default;
            colorInput.value = defaultColor;
            settings[colors[i]] = defaultColor;
        }

        // 修复：在新HTML结构中寻找 color-sample
        const colorSample = colorInput.parentNode.querySelector('.color-sample');
        if (colorSample) {
            colorSample.style = 'background-color: ' + settings[colors[i]] + ';';
        }
    }

    if (settings['removeWalls'] > maxWallsRemove) {
        settings['removeWalls'] = maxWallsRemove;
        const removeWallsInput = document.getElementById('remove_walls');
        if (removeWallsInput) {
            removeWallsInput.value = maxWallsRemove;
        }
    }

    const entry = document.getElementById('entry');
    if (entry) {
        settings['entryType'] = entry.options[entry.selectedIndex].value;
    }

    const bias = document.getElementById('bias');
    if (bias) {
        settings['bias'] = bias.options[bias.selectedIndex].value;
    }

    const maze = new Maze(settings);
    maze.generate();
    maze.draw();

    if (download && download.classList.contains('hide')) {
        download.classList.remove("hide");
        download.style.display = 'flex'; // 强制 Flex 以显示图标
    }

    const solveButton = document.getElementById("solve");
    // 解迷按钮原本未隐藏，这里确保它是可见的
    if (solveButton) {
        solveButton.classList.remove('hide');
    }

    mazeNodes = {}
    if (maze.matrix.length) {
        mazeNodes = maze;
    }

    // 平滑滚动到画布区域
    const canvasContainer = document.getElementById("canvas-wrapper");
    if (canvasContainer) {
        canvasContainer.scrollIntoView({ behavior: "smooth", block: "center" });
    }
}

function downloadImage(e) {
    const canvas = document.getElementById('maze');
    const image = canvas.toDataURL("image/png");
    const download = document.getElementById("download");
    // image/octet-stream 强制浏览器下载
    const stream = image.replace("image/png", "image/octet-stream");
    download.setAttribute("href", stream);
}

function initSolve() {
    const download = document.getElementById("download");

    // 更新下载按钮文案，保留图标
    if (download) {
        download.setAttribute('download', 'maze-solved.png');
        download.innerHTML = '<i class="fa-solid fa-download mr-2 text-brand-500"></i> Download Solved';
    }

    if ((typeof mazeNodes.matrix === 'undefined') || !mazeNodes.matrix.length) {
        return;
    }

    const solver = new Solver(mazeNodes);
    solver.solve();
    if (mazeNodes.wallsRemoved) {
        solver.drawAstarSolve();
    } else {
        solver.draw();
    }

    mazeNodes = {}
}