let G = [
  [0, 's', 0, 0, 0, 0],
  [0, 1, 1, 0, 1, 0],
  [0, 0, 1, 0, 1, 1],
  ['e', 0, 1, 1, 1, 0],
  [0, 1, 1, 0, 0, 0]
]

const container = document.createElement('div');
const button    = document.querySelector('.start');
container.classList.add('container');
container.style.display = 'grid';
container.style.margin = `100px auto`;
container.style.width = `${100*G[0].length}px`;
container.style.gridTemplateColumns = `repeat(${G[0].length}, 100px)`;
document.body.appendChild(container);
let i = 0;
for (let row of G) {
  let j = 0;
  for (let node of row) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.id = `${i}-${j}`;
    if (node == 1)
      cell.textContent = '.';
    else if (node == 's')
      cell.textContent = 'S';
    else if (node == 'e')
      cell.textContent = 'E';
    else
      cell.textContent = '#';
    container.appendChild(cell);
    j++;
  }
  i++;
}


let queue = [];
let visited = [];
let obj = {}
for (let i = 0; i < G.length; i++) {
  let arr = [];
  for (let j = 0; j < G[0].length; j++) {
    arr.push ( {
      row: null,
      nth: null,
      predecessor: null,
      visited: null
    });
  }
  visited.push(arr);
}
const start = {row: 0, nth: 1, predecessor: 0, visited: null};
queue.push(start);
//------------------------------------------------------------------------------
button.addEventListener('click', ()=> {
while (queue.length) {
  let u = queue.shift();
  let c = document.getElementById(`${u.row}-${u.nth}`);
  visited[u.row][u.nth].visited = true;
  if (c.textContent === '#') {
    c.style.backgroundColor = 'salmon';
    c.style.color = 'white';
  }
  else
    c.style.backgroundColor = 'lightyellow';
  //up
  // if (c.textContent === 'E') { break; }
  if (u.row - 1 >= 0) {
    if (visited[u.row][u.nth].visited == null) {
      let v = {row: u.row - 1, nth: u.nth, predecessor: [u.row, u.nth], visited: null};
      if (v.visited === null) {
        queue.push(v);
      }
    }
  }
  //right
  if (u.nth + 1 < G[0].length) {
    if (visited[u.row][u.nth+1].visited == null) {
      let v = {row: u.row, nth: u.nth + 1, predecessor: [u.row, u.nth], visited: null};
      if (v.visited === null) {
        queue.push(v);
      }
    }
  }
  //down
  if (u.row + 1 < G.length) {
    if (visited[u.row+1][u.nth].visited == null) {
      let v = {row: u.row + 1, nth: u.nth, predecessor: [u.row, u.nth], visited: null};
      if (v.visited === null) {
        queue.push(v);
      }
    }
   }
  //left
   if (u.nth - 1 >= 0) {
     if (visited[u.row][u.nth - 1].visited == null){
       let v = {row: u.row, nth: u.nth - 1, predecessor: [u.row, u.nth], visited: null};
       if (v.visited === null) {
         queue.push(v);
       }
     }
   }
}
});