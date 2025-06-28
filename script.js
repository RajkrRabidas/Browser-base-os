const fileIcon = document.querySelector(".file-icon")
const fileWindow = document.querySelector("#file-window")
const chromeIcon = document.querySelector(".chrome-icon")
const chromeWindow = document.querySelector('#chrome-window')
const calculatorWindow = document.querySelector('#calculator-window');
const calculatorIcon = document.querySelector('.calculator-icon');
const vsCodeIcon = document.querySelector('.vs-icon');
const vsCodeWindow = document.querySelector('#vs-window');
const settingsIcon = document.querySelector('.settings-icon');
const settingsWindow = document.querySelector('#settings-window');

const windows = document.querySelectorAll('.window');
const titleBar = document.querySelectorAll('.title-bar')

fileIcon.addEventListener('click', function () {
  fileWindow.style.display = 'flex';
})

chromeIcon.addEventListener("click", function () {
  chromeWindow.style.display = "flex"
})

calculatorIcon.addEventListener("click", function () {
  calculatorWindow.style.display = "flex"
})

vsCodeIcon.addEventListener("click", function () {
  vsCodeWindow.style.display = "flex";
})
settingsIcon.addEventListener("click", function () {
  settingsWindow.style.display = "flex";
})

let startX = 0, startY = 0, offsetX = 0, offsetY = 0
let zIndexCounter = 10; // Initialize z-index counter

function makeDraggable() {
  titleBar.forEach((bar) => {
    bar.addEventListener('mousedown', function (e) {
      const windowElement = bar.closest('.window');
      // Ensure window is absolutely or fixed positioned
      windowElement.style.position = 'fixed';

      offsetX = e.clientX - windowElement.offsetLeft;
      offsetY = e.clientY - windowElement.offsetTop;

      // z-index bring to front
      zIndexCounter++;
      windowElement.style.zIndex = zIndexCounter;

      function mouseMove(e) {
        const newX = e.clientX - offsetX;
        const newY = e.clientY - offsetY;
        windowElement.style.left = `${newX}px`;
        windowElement.style.top = `${newY}px`;
      }

      function mouseUp() {
        document.removeEventListener('mousemove', mouseMove);
        document.removeEventListener('mouseup', mouseUp);
      }

      document.addEventListener('mousemove', mouseMove);
      document.addEventListener('mouseup', mouseUp);
    });
  });
}

makeDraggable()

// maxximum windows
windows.forEach((window) => {
  const maximizeBtn = window.querySelector('.maxmize');
  if (maximizeBtn) {
    maximizeBtn.addEventListener('click', function () {
      if (!window.classList.contains("active")) {
        window.style.width = "100%";
        window.style.height = "100%";
        window.style.top = "0";
        window.style.left = "0";
        window.style.zIndex = "100";
        window.classList.add("active");
      } else {
        window.style.width = "50vw";
        window.style.height = "60vh";
        window.style.top = "180px";
        window.style.left = "170px";
        window.classList.remove("active");
      }
    });
  }
});

// close button
windows.forEach((window) => {
  const closeButtons = window.querySelectorAll(".close");
  closeButtons.forEach((btn) => {
    btn.addEventListener('click', function () {
      window.style.display = 'none';
    });
  });
});

// right click to open context Menu
const contextmenu = document.querySelector('.menu-context')

document.addEventListener('contextmenu', function (e) {
  e.preventDefault()
  contextmenu.style.top = e.clientY + 'px'
  contextmenu.style.left = e.clientX + 'px'
  contextmenu.style.display = "flex"
})

document.addEventListener('click', function () {
  contextmenu.style.display = 'none'
})

// folder appear in destop screen

const createFolder = document.querySelector('.create-folder')
const destopScreen = document.querySelector(".screen");

let baseName = "name";


createFolder.addEventListener('click', function (e) {
  e.stopPropagation();
  // folder name dynamically
  let allFolders = document.querySelectorAll(".folder p");
  folderNames = [];
  newName = baseName;
  counter = 1;
  let newFolder = document.createElement("div")
  newFolder.classList.add('folder')
  allFolders.forEach(p => {
    folderNames.push(p.textContent);
  });
  while (folderNames.includes(newName)) {
    newName = `${baseName} (${counter})`;
    counter++;
  }
  newFolder.innerHTML = `<img src="./folder.png" alt="">
          <p>${newName}</p>`
  newFolder.style.position = 'absolute'
  newFolder.style.top = e.clientY + 'px'
  newFolder.style.left = e.clientX + 'px'
  newFolder.style.zIndex = zIndexCounter++
  destopScreen.appendChild(newFolder)
  contextmenu.style.display = 'none'
})


// dubale click to open folder

// double click to open folder (event delegation)

const folderWindow = document.querySelector('.folder-window');
const folderClose = document.querySelector('.folder-close')

document.querySelectorAll(".folder").forEach(folder => {
  folder.addEventListener("dblclick", function () {
      folderWindow.style.display = 'flex';
  });
});



