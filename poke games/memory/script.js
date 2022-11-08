function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}class PlayFooter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      elapsed: 0 };

  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.gameOver !== this.props.gameOver && nextProps.gameOver) {
      clearInterval(this.timer);

      this.setState({ elapsed: 0 });
    }
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState({ elapsed: this.state.elapsed + 1 });
    }, 1000);
  }

  render() {
    return /*#__PURE__*/(
      React.createElement("div", { className: "area__footer" }, /*#__PURE__*/
      React.createElement("p", null, "Turns : ", this.props.turns), /*#__PURE__*/
      React.createElement("p", null, "Time : ", this.state.elapsed, " sec")));


  }}


class Tile extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    if (this.props.status === "unselected") {
      this.props.onClickListener(this.props.index);
    } else {
      console.warn("The tile has already been " + this.props.status);
    }
  }

  render() {
    return /*#__PURE__*/(
      React.createElement("div", {
        onClick: this.handleClick,
        className:
        "tile " + (
        this.props.status === "selected" ?
        "tile--selected" :
        this.props.status === "matched" ?
        "tile--selected tile--matched" :
        "") }, /*#__PURE__*/


      React.createElement("div", { className: "tile--front" }), /*#__PURE__*/
      React.createElement("div", {
        className: "tile--back",
        style: { backgroundColor: this.props.accent } 
      },
      React.createElement("img", {
        src:this.props.icon,
        height:"33px",
        width:"33px"
      }))));



  }}
class PlayArea extends React.Component {


  constructor(props) {
    super(props);_defineProperty(this, "tiles", [{ name: "Pikachu", accent: "#ffc82f", icon: "./pikachu.svg" }, { name: "Charmander", accent: "#ff7618", icon: "./charmander.svg" }, { name: "Bulbasaur", accent: "#a2e3c5", icon: "./bulbasaur.svg"}, { name: "Squirtle", accent: "#74d5cc", icon: "./squirtle.svg" }, { name: "Snorlax", accent: "#0d5c9e", icon: "./Snorlax.png" }, { name: "electrode", accent: "#dc4d64", icon: "./electro.png" }, { name: "mewto", accent: "#eae4c5", icon: "./mewto.png" }, { name: "ratarat", accent: "#a962e8", icon: "ratarat.png" }]);

    this.state = {
      tiles: [],
      turns: 0,
      activeTile: null };


    this.handleClick = this.handleClick.bind(this);
    this.resetPlayArea = this.resetPlayArea.bind(this);
  }

  shuffleTiles(tiles) {
    let j, x, i;

    for (i = tiles.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = tiles[i];
      tiles[i] = tiles[j];
      tiles[j] = x;
    }

    return tiles;
  }

  multiplyTiles(tiles) {
    return tiles.
    map(item => {
      // Use Object.assign to create a new object rather than passing the same reference twice
      return [item, Object.assign({}, item)];
    }).
    reduce((a, b) => {
      return a.concat(b);
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.gameOver !== this.props.gameOver && !nextProps.gameOver) {
      const newTiles = this.tiles.map(e => {
        e.status = "unselected";

        return e;
      });

      this.setState({
        tiles: this.shuffleTiles(this.multiplyTiles(newTiles)) });

    }
  }

  handleClick(index) {
    // Update turns on every click
    this.setState({ turns: this.state.turns + 1 });

    const selectedTile = this.state.tiles[index];
    const updatedTiles = this.state.tiles.slice();

    selectedTile.status = "selected";
    updatedTiles[index] = selectedTile;

    this.setState({
      tiles: updatedTiles });


    if (this.state.activeTile === null) {
      this.setState({
        activeTile: selectedTile });

    } else if (selectedTile.name === this.state.activeTile.name) {
      let matched = 0;

      const updatedTiles = this.state.tiles.map(e => {
        if (e.name === selectedTile.name) e.status = "matched";
        if (e.status === "matched") matched++;

        return e;
      });

      this.setState({
        tiles: updatedTiles,
        activeTile: null });


      if (matched === 16) this.resetPlayArea();
    } else {
      const _this = this;

      setTimeout(function () {
        const updatedTiles = _this.state.tiles.map(e => {
          if (
          e.name === _this.state.activeTile.name ||
          e.name === selectedTile.name)
          {
            e.status = "unselected";
          }

          return e;
        });

        _this.setState({
          activeTile: null,
          tiles: updatedTiles });

      }, 700);
    }
  }

  resetPlayArea() {
    this.props.onGameOver(this.state.turns);

    this.setState({
      tiles: [],
      turns: 0,
      activeTile: null });

  }

  render() {
    let cindex = 0;
    return /*#__PURE__*/(
      React.createElement("div", { className: "area__wrapper" }, /*#__PURE__*/
      React.createElement("h1", { className: "area__head" }, "The Memory Games"), /*#__PURE__*/
      React.createElement("ul", { className: "area" },
      this.state.tiles.map((e) => /*#__PURE__*/
      React.createElement(Tile, {
        index: cindex++,
        status: e.status,
        icon: e.icon,
        accent: e.accent,
        onClickListener: this.handleClick }))),



      !this.props.gameOver ? /*#__PURE__*/
      React.createElement(PlayFooter, { turns: this.state.turns, gameOver: this.props.gameOver }) :
      null));


  }}


class PlayModal extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return /*#__PURE__*/(
      React.createElement("div", { className: this.props.gameOver ? "modal__wrapper" : "hidden" }, /*#__PURE__*/
      React.createElement("div", { className: "modal" }, /*#__PURE__*/
      React.createElement("div", { className: "modal--top overlay" }, /*#__PURE__*/
      React.createElement("p", null, /*#__PURE__*/
      React.createElement("b", null, "High Score"), " : ", this.props.highScore, " pts")), /*#__PURE__*/


      React.createElement("div", { className: "modal--bottom" }, /*#__PURE__*/
      React.createElement("p", null, "Hey there, You think you\u2019ve got a sharp memory? Let\u2019s see how far you can go."), /*#__PURE__*/



      React.createElement("button", { className: "modal__btn", onClick: this.props.onPlayClick }, "Play")))));






  }}


class App extends React.Component {
  constructor() {
    super();

    this.state = {
      score: 0,
      gameOver: true };


    this.initCards = this.initCards.bind(this);
    this.restartGame = this.restartGame.bind(this);
  }

  initCards() {
    this.setState({
      score: 0,
      gameOver: false });

  }

  restartGame(turns) {
    const score = Math.round(120 / turns * 100);

    this.setState({
      score: score,
      gameOver: true });

  }

  render() {
    return /*#__PURE__*/(
      React.createElement("div", null, /*#__PURE__*/
      React.createElement(PlayModal, {
        gameOver: this.state.gameOver,
        highScore: this.state.score,
        onPlayClick: this.initCards }), /*#__PURE__*/

      React.createElement(PlayArea, {
        gameOver: this.state.gameOver,
        onGameOver: this.restartGame })));



  }}


ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.getElementById("root"));