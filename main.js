let G = [
  ['s', 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 0, 1, 0, 1],
  [0, 0, 1, 0, 1, 0, 1],
  [1, 0, 1, 1, 1, 1, 1],
  [1, 0, 1, 0, 0, 1, 0],
  [1, 1, 1, 1, 0, 1, 0],
  [1, 1, 1, 1, 0, 1, 'e']
]

//check if neighbour # don't add to queue just
//set visited to true and change the color to red

const container = document.createElement('div');
const startButton = document.querySelector('.start');
const reloadButton = document.querySelector('.reload');

container.classList.add('container');
container.style.display = 'grid';
container.style.margin = `100px auto`;
container.style.width = `${100 * G[0].length}px`;
container.style.gridTemplateColumns = `repeat(${G[0].length}, 100px)`;
document.body.appendChild(container);

reloadButton.addEventListener('click', (e) => {
  location.reload();
});

function interactive(e) {
  const [row, col] = e.target.id.split("-");
  if (e.target.textContent == ".") {
    e.target.style.backgroundColor = "black";
    e.target.textContent = "#";
    G[row][col] = 0;
  }
  else if (e.target.textContent == "#") {
    e.target.style.backgroundColor = "red";
    e.target.textContent = "E";
    e.target.style.color = 'white';
    G[row][col] = 'e';
  }
  else if (e.target.textContent == "E" && startIndex == null) {
    e.target.style.backgroundColor = "blue";
    e.target.textContent = "S";
    e.target.style.color = 'white';
    G[row][col] = 's';
    startIndex = [row, col];
  } else if (e.target.textContent == "S") {
    e.target.style.backgroundColor = "rgba(237, 237, 237, 0.605)";
    e.target.textContent = ".";
    e.target.style.color = 'black';
    G[row][col] = 1;
    startIndex = null;
  } else {
    e.target.style.backgroundColor = "rgba(237, 237, 237, 0.605)";
    e.target.textContent = ".";
    e.target.style.color = 'black';
    G[row][col] = 1;
  }
}

let i = 0;
let startIndex = [0, 0];

for (let row of G) {
  let j = 0;
  for (let node of row) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.id = `${i}-${j}`;
    cell.addEventListener('click', interactive)
    if (node == 1) {
      cell.textContent = '.';
      cell.style.background = 'rgba(237, 237, 237, 0.605)';
    }
    else if (node == 's') {
      cell.textContent = 'S';
      cell.style.background = 'blue';
      cell.style.color = 'white';
    }
    else if (node == 'e') {
      cell.textContent = 'E';
      cell.style.background = 'red';
      cell.style.color = 'white';
    }
    else {
      cell.textContent = '#';
      cell.style.background = 'black';
    }
    container.appendChild(cell);
    j++;
  }
  i++;
}


startButton.addEventListener('click', (e) => {
  e.target.disabled = true;
  let queue = [];
  let visited = [];
  let coord;
  for (let i = 0; i < G.length; i++) {
    let arr = [];
    for (let j = 0; j < G[0].length; j++) {
      arr.push({
        row: i,
        nth: j,
        predecessor: null,
        visited: null
      });
    }
    visited.push(arr);
  }
  const start = visited[startIndex[0]][startIndex[1]];
  start.visited = true;
  queue.push(start);

  let found = false;
  let timerId = setInterval(function () {
    if (queue.length && !found) {
      let u = queue.shift();
      let c = document.getElementById(`${u.row}-${u.nth}`);
      if (c.textContent !== '#' && c.textContent !== 'S') {
        c.style.backgroundColor = '#FFFF66';
      }
      if (c.textContent === 'E') {
        coord = [u.row, u.nth];
        found = true;
      }
      //up
      if (u.row - 1 >= 0) {
        if (visited[u.row - 1][u.nth].visited == null) {
          let v = visited[u.row - 1][u.nth];
          let n = document.getElementById(`${u.row - 1}-${u.nth}`);
          if (n.textContent !== '#') {
            v.predecessor = [u.row, u.nth];
            v.visited = true;
            queue.push(v);
          }
        }
      }
      //right
      if (u.nth + 1 < G[0].length) {
        if (visited[u.row][u.nth + 1].visited == null) {
          let v = visited[u.row][u.nth + 1];
          let n = document.getElementById(`${u.row}-${u.nth + 1}`);
          if (n.textContent !== '#') {
            v.predecessor = [u.row, u.nth];
            v.visited = true;
            queue.push(v);
          }
        }
      }
      //down
      if (u.row + 1 < G.length) {
        if (visited[u.row + 1][u.nth].visited == null) {
          let v = visited[u.row + 1][u.nth];
          let n = document.getElementById(`${u.row + 1}-${u.nth}`);
          if (n.textContent !== '#') {
            v.predecessor = [u.row, u.nth];
            v.visited = true;
            queue.push(v);
          }
        }
      }
      //left
      if (u.nth - 1 >= 0) {
        if (visited[u.row][u.nth - 1].visited == null) {
          let v = visited[u.row][u.nth - 1];
          let n = document.getElementById(`${u.row}-${u.nth - 1}`);
          if (n.textContent !== '#') {
            v.predecessor = [u.row, u.nth];
            v.visited = true;
            queue.push(v);
          }
        }
      }
    } else {
      let x = coord[0];
      let y = coord[1];
      console.log('before' + x + ' ' + y);
      let timeout = setInterval(function () {
        if (visited[x][y].predecessor !== null) {
          const b = document.getElementById(`${x}-${y}`);
          coord = visited[x][y].predecessor;
          b.style.backgroundColor = 'green';
          x = coord[0];
          y = coord[1];
        } else { clearInterval(timeout); }
      }, 300);

      clearInterval(timerId);
    }
  }, 600);
});
