const fileIcon = document.querySelector(".file-icon")
const fileWindow = document.querySelector("#file-window")
const chromeIcon = document.querySelector(".chrome-icon")
const chromeWindow = document.querySelector('#chrome-window')
const calculatorWindow = document.querySelector('#calculator-window');
const calculatorIcon = document.querySelector('.calculator-icon');
const vsCodeIcon = document.querySelector('.vs-icon');
const vsCodeWindow = document.querySelector('#vs-window');
const notepadIcon = document.querySelector('.notepad-icon');
const notepadWindow = document.querySelector('#notepad-window');

const windows = document.querySelectorAll('.window');
const titleBar = document.querySelectorAll('.title-bar')

fileIcon.addEventListener('click', function () {
  fileWindow.style.display = 'block';
  fileWindow.style.top = "160px"
  fileWindow.style.left = "200px"
})

chromeIcon.addEventListener("click", function () {
  chromeWindow.style.display = "flex";
  chromeWindow.style.top = "140px"
  chromeWindow.style.left = "220px"
})

calculatorIcon.addEventListener("click", function () {
  calculatorWindow.style.display = "flex"
})

vsCodeIcon.addEventListener("click", function () {
  vsCodeWindow.style.display = "flex";
})
notepadIcon.addEventListener("click", function () {
  notepadWindow.style.display = "flex";
  notepadWindow.style.top = "120px"
  notepadWindow.style.left = "260px"
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

// Make a single window draggable by its header
function makeSingleDraggable(windowEl, headerEl) {
  let offsetX = 0, offsetY = 0;
  headerEl.addEventListener('mousedown', function (e) {
    windowEl.style.position = 'fixed';
    offsetX = e.clientX - windowEl.offsetLeft;
    offsetY = e.clientY - windowEl.offsetTop;
    zIndexCounter++;
    windowEl.style.zIndex = zIndexCounter;
    function mouseMove(e) {
      const newX = e.clientX - offsetX;
      const newY = e.clientY - offsetY;
      windowEl.style.left = `${newX}px`;
      windowEl.style.top = `${newY}px`;
    }
    function mouseUp() {
      document.removeEventListener('mousemove', mouseMove);
      document.removeEventListener('mouseup', mouseUp);
    }
    document.addEventListener('mousemove', mouseMove);
    document.addEventListener('mouseup', mouseUp);
  });
}

makeDraggable()

// maxximum windows
windows.forEach((window) => {
  const maximizeBtn = window.querySelector('.maxmize');
  if (maximizeBtn) {
    maximizeBtn.addEventListener('click', function (e) {
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
  e.preventDefault();
  // Check if right-clicked on a folder
  const folder = e.target.closest('.folder');
  if (folder) {
    folderContextMenu.style.top = e.clientY + 'px';
    folderContextMenu.style.left = e.clientX + 'px';
    folderContextMenu.style.display = 'block';
    contextmenu.style.display = 'none';
  } else {
    contextmenu.style.top = e.clientY + 'px';
    contextmenu.style.left = e.clientX + 'px';
    contextmenu.style.display = 'flex';
    folderContextMenu.style.display = 'none';
  }
});

document.addEventListener('click', function () {
  contextmenu.style.display = 'none';
  folderContextMenu.style.display = 'none';
})

// folder appear in destop screen

const createFolder = document.querySelector('.create-folder')
const destopScreen = document.querySelector(".screen");

let baseName = "new folder";


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
  newFolder.innerHTML = `<img src="./images/folder.png" alt="">
          <p>${newName}</p>`
  newFolder.style.position = 'absolute'
  newFolder.style.top = e.clientY + 'px'
  newFolder.style.left = e.clientX + 'px'
  newFolder.style.zIndex = zIndexCounter++
  destopScreen.appendChild(newFolder)
  contextmenu.style.display = 'none'
})


// double click to open folder (event delegation)
const folderWindow = document.querySelector('.folder-window');

destopScreen.addEventListener("dblclick", function (e) {
  const folder = e.target.closest('.folder');
  if (!folder) return;
  let folderName = folder.querySelector("p").textContent;
  openFolderWindow(folderName, e.clientX, e.clientY)
});

function openFolderWindow(folderName, x, y) {
  let alreadyOpenWindow = document.querySelector(`.folder-window[data-folder-name="${folderName}"]`);
  if (alreadyOpenWindow) {
    alreadyOpenWindow.style.zIndex = zIndexCounter++;
    return;
  }

  const newFolderWindow = document.createElement('div');
  newFolderWindow.classList.add("folder-window", "glass");
  newFolderWindow.setAttribute("data-folder-name", folderName);
  newFolderWindow.style.top = y + "px";
  newFolderWindow.style.left = x + "px";
  newFolderWindow.style.zIndex = zIndexCounter++;

  newFolderWindow.innerHTML = `
    <div class="folder-header">
      <div class="folder-title">📁 ${folderName}</div>
          <div class="window-controls">
            <button class="minimize">-</button>
              <button class="maxmize">
                <i class="ri-fullscreen-line"></i>
              </button>
            <button class="folder-close" title="Close">✕</button>
          </div>
    </div>
    <div class="folder-toolbar">
      <button title="Create New"><span>➕</span> New</button>
      <button title="View Options"><span>🔍</span> View</button>
      <button title="Sort By"><span>⇅</span> Sort</button>
    </div>
    <div class="folder-content">
      <div class="empty-state">
        <img src="https://cdn-icons-png.flaticon.com/512/716/716784.png" alt="Empty Folder"/>
        <p>This folder is empty</p>
      </div>
    </div>
  `;

  // Close button logic
  newFolderWindow.querySelector(".folder-close").addEventListener("click", () => {
    newFolderWindow.remove();
  });
  // folder maximaize
  newFolderWindow.querySelector(".maxmize").addEventListener("click", () => {
    const folderWindow = document.querySelector(".folder-window")

    if (!folderWindow.classList.contains("active")) {
      folderWindow.style.width = "100%";
      folderWindow.style.height = "100%";
      folderWindow.style.top = "0";
      folderWindow.style.left = "0";
      folderWindow.style.zIndex = "100";
      folderWindow.classList.add("active");
    } else {
      folderWindow.style.width = "520px";
      folderWindow.style.height = "360px";
      folderWindow.style.top = y + "px";
      folderWindow.style.left = x + "px";
      folderWindow.classList.remove("active");
    }
  });
  // Make this folder window draggable by its header
  makeSingleDraggable(newFolderWindow, newFolderWindow.querySelector('.folder-header'));

  document.body.appendChild(newFolderWindow);
}


// folder right click to open context Menu

const folderContextMenu = document.querySelector("#folderContextMenu")

folderContextMenu.addEventListener("contextmenu", function (e) {
  e.preventDefault()
  folderContextMenu.style.top = e.clientY + 'px'
  folderContextMenu.style.left = e.clientX + 'px'
  folderContextMenu.style.display = "block"
  contextmenu.style.display = 'none'
})

let selectedFolder = null;

// Update contextmenu event to track selectedFolder
// (replace all uses of folderToDelete with selectedFolder)
document.addEventListener('contextmenu', function (e) {
  e.preventDefault();
  const folder = e.target.closest('.folder');
  if (folder) {
    selectedFolder = folder;
    folderContextMenu.style.top = e.clientY + 'px';
    folderContextMenu.style.left = e.clientX + 'px';
    folderContextMenu.style.display = 'block';
    contextmenu.style.display = 'none';
  } else {
    selectedFolder = null;
    contextmenu.style.top = e.clientY + 'px';
    contextmenu.style.left = e.clientX + 'px';
    contextmenu.style.display = 'flex';
    folderContextMenu.style.display = 'none';
  }
});

// delete folder
document.querySelector(".delete-option").addEventListener("click", function () {
  if (selectedFolder) {
    if (confirm("Are you sure you want to delete this folder?")) {
      selectedFolder.remove();
      selectedFolder = null;
    }
  }
  folderContextMenu.style.display = 'none';
});

// rename folder

document.querySelector(".rename-option").addEventListener('click', function () {
  if (!selectedFolder) return;
  const nameElement = selectedFolder.querySelector('p');
  const oldName = nameElement.textContent;
  const input = document.createElement("input");
  input.type = "text";
  input.value = oldName;
  input.className = "rename-input";
  nameElement.replaceWith(input);
  input.focus();
  input.select();

  function finishRename() {
    const newName = input.value.trim() || oldName;
    const newP = document.createElement('p');
    newP.textContent = newName;
    input.replaceWith(newP);
    if (newName !== oldName) {
      showToast("Folder renamed!", "success");
    } else {
      showToast("Rename cancelled.", "warning");
    }
  }
  input.addEventListener('blur', finishRename);
  input.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      input.blur();
    }
  });
  folderContextMenu.style.display = 'none';
});

// Toast notification function
function showToast(message, type = "info") {
  let toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.classList.add("show");
  }, 10);
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 300);
  }, 2000);
}

// Toast CSS (inject if not present)
if (!document.getElementById('toast-style')) {
  const style = document.createElement('style');
  style.id = 'toast-style';
  style.textContent = `
    .toast {
      position: fixed;
      top: 5%;
      right: 5%;
      left: auto;
      transform: none;
      background: #333;
      color: #fff;
      padding: 10px 24px;
      border-radius: 6px;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.3s, top 0.3s;
      z-index: 9999;
      font-size: 1rem;
    }
    .toast.show {
      opacity: 1;
      top: 7%;
      pointer-events: auto;
    }
    .toast-success { background: #4caf50; }
    .toast-warning { background: #ff9800; }
    .toast-info { background: #2196f3; }
    .toast-error { background: #f44336; }
  `;
  document.head.appendChild(style);
}



const notepadTextarea = document.querySelector(".notepad-textarea")
let timer;

notepadTextarea.addEventListener("input", function (e) {
  clearTimeout(timer);
  timer = setTimeout(() => {
    localStorage.setItem("notepad-text", notepadTextarea.value);
  }, 2000);
})

const savedText = localStorage.getItem("notepad-text");
if (savedText) notepadTextarea.value = savedText;





// chrome browser intrigration

const chromeInput = document.querySelector("#chrome-input")
const chromeIframe = document.querySelector('#chrome-iframe')
const chromeSearchBtn = document.querySelector("#chrome-search")

chromeSearchBtn.addEventListener("click", function () {
  let url = chromeInput.value.trim()
  let searchURL = `https://www.bing.com/search?q=${url}`


  chromeIframe.src = searchURL;
})

chromeInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    chromeSearchBtn.click(); // 👈 Reuse the click logic
  }
});

const thisPc = document.querySelector(".this-pc")

thisPc.addEventListener("click", function () {
  fileWindow.style.display = 'flex';
  fileWindow.style.top = "160px"
  fileWindow.style.left = "200px"
})


// calculator

const InputBox = document.querySelector('#calc-display')
const buttons = document.querySelectorAll(".calc-btn")

let string = '';

Array.from(buttons).forEach((button) => {
  button.addEventListener("click", function (e) {
    if (e.target.innerHTML == '=') {
      string = eval(string)
      document.querySelector('#calc-display').value = string

    } else if (e.target.innerHTML == 'C') {
      string = string.slice(0, -1)
      document.querySelector('#calc-display').value = string
    }else if (e.target.innerHTML == 'AC') {
      string = ""
      document.querySelector('#calc-display').value = string
    } 
     else {
      string = string + e.target.innerHTML
      document.querySelector('#calc-display').value = string
    }
  })
})

const changeWallpaper = document.querySelector('.change-wallpaper')
let currentWallpaperIndex = 0;


const wallpapers = [
  "https://images.unsplash.com/photo-1637937267030-6d571ad57f3f?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1654649451086-dd75d8170a27?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1689852500881-e80588efaed6?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1672044588587-f9f566bc7a77?q=80&w=1460&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1671401275024-7c6f18577d08?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1630926906914-f98970d8894c?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
];


// 🔁 Load saved wallpaper index (if exists)
const savedIndex = localStorage.getItem("currentWallpaperIndex");
currentWallpaperIndex = savedIndex ? parseInt(savedIndex) : 0;

destopScreen.style.backgroundImage = `url('${wallpapers[currentWallpaperIndex]}')`;
destopScreen.style.backgroundSize = 'cover';
destopScreen.style.backgroundPosition = 'center';

changeWallpaper.addEventListener('click', function () {
  currentWallpaperIndex = (currentWallpaperIndex + 1) % wallpapers.length;
  const selectedImage = wallpapers[currentWallpaperIndex];

  destopScreen.style.backgroundImage = `url('${selectedImage}')`;
  destopScreen.style.backgroundSize = 'cover';
  destopScreen.style.backgroundPosition = 'center';

  localStorage.setItem("currentWallpaperIndex", currentWallpaperIndex);
});