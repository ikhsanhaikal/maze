let G = [
  [0, 0, 0, 1, 0, 0],
  [1, 1, 1, 0, 1, 0],
  [0, 0, 1, 0, 1, 0],
  ['e', 0, 1, 1, 1, 1],
  [1, 0, 1, 0, 0, 's'],
  [1, 1, 1, 1, 0, 0]
]

//check if neighbour # don't add to queue just
//set visited to true and change the color to red

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
    else if (node == 's') {
      cell.textContent = 'S';
      cell.style.background = 'blue';
      cell.style.color = 'white';
    }
    else if (node == 'e')
      cell.textContent = 'E';
    else {
      cell.textContent = '#';
      cell.style.background = 'black';
    }
    container.appendChild(cell);
    j++;
  }
  i++;
}


let queue = [];
let visited = [];
let coord;
for (let i = 0; i < G.length; i++) {
  let arr = [];
  for (let j = 0; j < G[0].length; j++) {
    arr.push ( {
      row: i,
      nth: j,
      predecessor: null,
      visited: null
    });
  }
  visited.push(arr);
}
const start = visited[4][5];
start.visited = true;
queue.push(start);
//------------------------------------------------------------------------------

button.addEventListener('click', ()=> {
  let timerId = setInterval(function() {
    //while (queue.length)
    if (queue.length){
      let u = queue.shift();
      let c = document.getElementById(`${u.row}-${u.nth}`);
      if (c.textContent !== '#' && c.textContent !== 'S') {
        c.style.backgroundColor = '#FFFF66';
      }
      if (c.textContent === 'E') {
        coord = [u.row, u.nth];
      }
      //up
      console.log(u);
      if (u.row - 1 >= 0) {
        if (visited[u.row-1][u.nth].visited == null) {
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
        if (visited[u.row][u.nth+1].visited == null) {
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
        if (visited[u.row+1][u.nth].visited == null) {
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
         if (visited[u.row][u.nth - 1].visited == null){
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
      console.log('before'+ x + ' ' + y);
      let timeout = setInterval(function() {
        if(visited[x][y].predecessor !== null) {
          const b = document.getElementById(`${x}-${y}`);
          console.log(b);
          coord = visited[x][y].predecessor;
          b.style.backgroundColor = 'lightgreen';
          x = coord[0];
          y = coord[1];
        } else { clearInterval(timeout); }
      }, 500);

      clearInterval(timerId);
    }
  }, 1000);

});
