/* eslint-env browser */
var React = require('react');

var Warrior = require('./Warrior');

require('./Fight.css');

var Fight = React.createClass({
  componentDidMount() {
    var win;
    if (window.localStorage.getItem('emojifight-result') !== null) {
      win = window.localStorage.getItem('emojifight-result') != "win";
    } else {
      win = Math.random() < 0.5;
    }
    console.log(win);
    window.localStorage.setItem('emojifight-result', win ? "win" : "lose");

    this.playFightAnimation(win);
  },
  playFightAnimation(win) {
    setTimeout(() =>
      this.setState({ leftEmoji: '💥' }), 500);
    setTimeout(() =>
      this.setState({ leftEmoji: null, rightEmoji: '💥' }), 1000);
    setTimeout(() =>
      this.setState({ leftEmoji: null, rightEmoji: null }), 1500);
    var loser = win ? 'rightEmoji': 'leftEmoji';
    setTimeout(() => this.setState({ [loser]: '💥' }), 1600);
    setTimeout(() => {
      this.setState({ [loser]: '💀', win: win });
      var n = this.props.stake;
      this.props.payout(win ? n : -1 * n);
    }, 2000);
  },
  componentWillUnmount() {
    delete window.replayFight;
  },
  getInitialState() {
    return {
      win: null,
      leftEmoji: null,
      rightEmoji: null
    };
  },
  render() {
    window.fightComponent = this;
    var {cpu} = this.props;
    return (
      <div>
        <h1>Fight!</h1>
        <div className="Fight--headsup">
          <div className="Fight--headsup-item">
            <Warrior
              warrior={this.props.warrior}
              item={this.props.item}
              emoji={this.state.leftEmoji}
            />
          </div>
          <div className="Fight--headsup-item">
            <h2>VS</h2>
          </div>
          <div className="Fight--headsup-item">
            <Warrior cpu
              warrior={cpu.warrior}
              item={cpu.item}
              emoji={this.state.rightEmoji}
            />
          </div>
        </div>
        <div className="Fight--summary">
          {this.state.win === true &&
            <p>You won {this.props.stake} credits!</p>}
          {this.state.win === false &&
            <p>You lost {this.props.stake} credits!</p>}
          {this.state.win !== null &&
            <button onClick={this.props.reset}>
              Play Again
            </button>}
        </div>
      </div>
    );
  }
});

module.exports = Fight;
