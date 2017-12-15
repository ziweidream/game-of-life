let userInput = false;
let generation = 0;
let speed = 70;
let size = 60;
let cells = [];
let arrStyles = [];
for (let i = 0; i < size; i++) {
  arrStyles[i] = [];
  for (let j = 0; j < size; j++) {
    arrStyles[i][j] = {};
  }
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      generations: generation,
      updateBoard: this.update()
    };
  }

  componentDidMount() {
    this.boardID = setInterval(() => this.run(), speed);
  }

  componentWillUnmount() {
    clearInterval(this.boardID);
  }

  run() {
    this.setState({generations: generation, updateBoard: this.update()});
  }

  update() {
    if (generation === 0 && userInput == false) {
      for (let i = 0; i < size; i++) {
        cells[i] = [];
        for (let j = 0; j < size; j++) {
          let rand = Math.floor(Math.random() * 2);
          cells[i][j] = rand;
        }
      }
    }
    generation += 1;
    let styles;
    function isAlive(x, y) {
      if (cells[x] && cells[x][y]) {
        return true;
      }
    }
    function sumNeighbours(x, y) {
      let sum = 0;
      if (isAlive(x - 1, y - 1)) {
        sum++;
      }
      if (isAlive(x - 1, y)) {
        sum++;
      }
      if (isAlive(x - 1, y + 1)) {
        sum++;
      }
      if (isAlive(x, y - 1)) {
        sum++;
      }
      if (isAlive(x, y + 1)) {
        sum++;
      }
      if (isAlive(x + 1, y - 1)) {
        sum++;
      }
      if (isAlive(x + 1, y)) {
        sum++;
      }
      if (isAlive(x + 1, y + 1)) {
        sum++;
      }
      return sum;
    }

    let temp = [];
    cells.map((row, x) => {
      temp[x] = [];
      row.map((cell, y) => {
        let life = 0;
        let num = sumNeighbours(x, y);

        if (cell > 0) {
          if (num === 2 || num === 3) {
            life = 1;
          } else {
            life = 0;
          }

        } else {
          if (num === 3) {
            life = 1;
          } else {
            life = 0;
          }

        }

        temp[x][y] = life;
      });
    });

    cells = temp;
    cells.map((row, x) => {
      row.map((cell, y) => {

        if (cell) {
          styles = {
            backgroundColor: 'green'
          };
        } else {
          styles = {
            backgroundColor: 'white'
          };
        }

        arrStyles[x][y] = styles;
      });
    });
    return arrStyles;
  }

  makeAlive(x, y) {
    userInput = true;
    cells[x][y] = 1;
    arrStyles[x][y] = {
      backgroundColor: 'green'
    };
    this.setState({generations: generation, updateBoard: arrStyles})
  }

  runGame() {
    this.componentDidMount();
  }

  clearGame() {
    clearInterval(this.boardID);
    userInput = false;
    generation = 0;
    for (var i = 0; i < size; i++) {
      cells[i] = [];
      for (var j = 0; j < size; j++) {
        cells[i][j] = 0;
      }
    }
    for (var i = 0; i < size; i++) {
      arrStyles[i] = [];
      for (var j = 0; j < size; j++) {
        arrStyles[i][j] = {};
      }
    }
    this.setState({generations: generation, updateBoard: arrStyles})
  }

  changeSpeed(str) {
    switch (str) {
      case 'slow':
        speed = 300;
        break;
      case 'medium':
        speed = 180;
        break;
      case 'fast':
        speed = 70;
    }
    return speed;
  }

  changeSize(m) {
    switch (m) {
      case 40:
        size = 40;
        break;
      case 50:
        size = 50;
        break;
      case 60:
        size = 60;
    }
    return size;
  }

  render() {
    const rows = Array.from({
      length: size
    }, (v, i) => i);
    for (let i = 0; i < rows.length; i++) {
      rows[i] = Array.from({
        length: size
      }, (v, i) => i);
    }
    return (<div>

      <div className="col-md-2">
        <div id="gameSize">
          <p>Board Size</p>
          <div class="btn-group-vertical">
            <button type="button" className="btn btn-success btn-lg buttons" onClick={() => this.changeSize(40)}>40x40</button>
            <button type="button" className="btn btn-success btn-lg buttons" onClick={() => this.changeSize(50)}>50x50</button>
            <button type="button" className="btn btn-success btn-lg buttons" onClick={() => this.changeSize(60)}>60x60</button>
          </div>
        </div>
      </div>
      <div className="col-md-8">
        <div className="panel panel-default">
          <div className="panel-heading">
            <span id="gameName">Game of Life</span>
            <button type="button" id="start" className="btn btn-success btn-lg buttons" onClick={() => this.runGame()}>Start</button>
            <button type="button" className="btn btn-success btn-lg buttons" onClick={() => clearInterval(this.boardID)}>Pause</button>
            <button type="button" id="clear" className="btn btn-success btn-lg buttons" onClick={() => this.clearGame()}>Clear</button>
            <span id="gameGeneration">Generations: {this.state.generations}</span>
          </div>
        </div>
        <table>
          <tbody>
            {
              rows.map((row) => <tr>
                {row.map((cell) => <td style={this.state.updateBoard[rows.indexOf(row)][row.indexOf(cell)]} onClick={() => this.makeAlive(rows.indexOf(row), row.indexOf(cell))}></td>)}
              </tr>)
            }
          </tbody>
        </table>
      </div>
      <div className="col-md-2">
        <div id="gameSpeed">
          <p>Sim Speed</p>
          <div class="btn-group-vertical">
            <button type="button" className="btn btn-success btn-lg buttons" onClick={() => this.changeSpeed('slow')}>Slow</button>
            <button type="button" className="btn btn-success btn-lg buttons" onClick={() => this.changeSpeed('medium')}>Medium</button>
            <button type="button" className="btn btn-success btn-lg buttons" onClick={() => this.changeSpeed('fast')}>Fast</button>
          </div>
        </div>

      </div>

    </div>);
  }
}

ReactDOM.render(<Board/>, document.getElementById('root'));
