var React = require('react');
var ReactDOM = require('react-dom');

var StarsFrame = React.createClass({
  render: function () {
    var numberOfStars = this.props.numberOfStars,
        stars = [];
        
    for (var i = 0; i < numberOfStars; i++) {
      stars.push(
        <span className='glyphicon glyphicon-star'></span>
      );
    }
    return (
      <section id="stars-frame">
        <div className="well">
          { stars }
        </div>
      </section>  
    )
  }  
});

var ButtonFrame = React.createClass({
  render: function () {
    var disabled,
        button,
        correct = this.props.correct;
    
    switch(correct) {
      case true:
        button = (
          <button className="btn btn-success btn-lg"
                  onClick={ this.props.acceptAnswer }>
            <span className="glyphicon glyphicon-ok"></span>
          </button>
        )
        break;
      case false:
        button = (
          <button className="btn btn-danger btn-lg">
            <span className="glyphicon glyphicon-remove"></span>
          </button>
        )
        break;
      default:
        disabled = (this.props.selectedNumbers.length === 0);
        button = (
          <button className="btn btn-primary btn-lg"
                  disabled={ disabled }
                  onClick={ this.props.checkAnswer }>=</button>
        )
    }
    
    return (
      <section id="button-frame">
        { button }
        <br/>
        <button className="btn btn-danger bnt-xs"
                onClick={ this.props.redraw }>
          <span className="glyphicon glyphicon-refresh"></span>
        </button>
      </section>  
    )
  }  
});

var AnswerFrame = React.createClass({
  render: function () {
    var props = this.props,
        selectedNumbers = props.selectedNumbers.map(function (i) {
          return (
            <span onClick={ props.unSelectNumber.bind(null, i) }>{ i }</span>
          )
        });
    
    return (
      <section id="answer-frame">
        <div className="well">
          { selectedNumbers }
        </div>
      </section>  
    )
  }  
});

var NumbersFrame = React.createClass({
  render: function () {
    var numbers = [],
        className,
        selectedNumbers = this.props.selectedNumbers,
        usedNumbers = this.props.usedNumbers,
        selectNumber = this.props.selectNumber;
    
    for(var i = 1; i <= 9; i++) {
      className = "number selected-" + (selectedNumbers.indexOf(i) >= 0);
      className += " used-" + (usedNumbers.indexOf(i) >= 0);
      numbers.push(
        <div className={ className }
             onClick={ selectNumber.bind(null, i) }>{ i }</div>  
      );
    } 
    return (
      <section id="numbers-frame">
        <div className="well">
          { numbers }
        </div>
      </section>  
    )
  }  
});

var Game = React.createClass({
  getInitialState: function () {
    return {
      numberOfStars: Math.floor(Math.random() * 9) + 1,
      selectedNumbers: [],
      correct: null,
      usedNumbers: []
    }
  },
  selectNumber: function (numberSelected) {
    if (this.state.selectedNumbers.indexOf(numberSelected) < 0) {
      this.setState({
        selectedNumbers: this.state.selectedNumbers.concat(numberSelected),
        correct: null
      }); 
    }
  },
  unSelectNumber: function(numberSelected) {
    var selectedNumbers = this.state.selectedNumbers,
        indexOfNumber = selectedNumbers.indexOf(numberSelected);
    
    selectedNumbers.splice(indexOfNumber, 1);
    
    this.setState({
      selectedNumbers: selectedNumbers,
      correct: null
    })
  },
  sumOfSelectedNumbers: function () {
    return this.state.selectedNumbers.reduce(function (p, n) {
      return p + n;
    }, 0)
  },
  checkAnswer: function () {
    var correct = (this.state.numberOfStars === this.sumOfSelectedNumbers());
    
    this.setState({correct: correct});
  },
  acceptAnswer: function () {
    var usedNumbers = this.state.usedNumbers.concate(this.state.selectedNumbers);
    
    this.setState({
      selectedNumbers: [],
      usedNumbers: usedNumbers,
      correct: null,
      numberOfStars: Math.floor(Math.random() * 9) + 1
    });
  },
  redraw: function () {
    this.setState({
      selectedNumbers: [],
      correct: null,
      numberOfStars: Math.floor(Math.random() * 9) + 1
    });
  },
  render: function () {
    var selectedNumbers = this.state.selectedNumbers;
    
    return (
      <section id="game">
        <h1>Nine Game</h1>
        <hr/>
        <div className="clearfix">
          <StarsFrame numberOfStars={ this.state.numberOfStars }/>
          <ButtonFrame selectedNumbers={ selectedNumbers }
                       correct={ this.state.correct }
                       checkAnswer={ this.checkAnswer }
                       acceptAnswer={ this.acceptAnswer }
                       redraw={this.redraw }/>
          <AnswerFrame selectedNumbers={ selectedNumbers }
                       unSelectNumber={ this.unSelectNumber }/>
        </div>
        <NumbersFrame selectedNumbers={ selectedNumbers }
                      selectNumber={ this.selectNumber }
                      usedNumbers={ this.state.usedNumbers }/>
      </section>  
    )
  }  
});

ReactDOM.render(
  <Game/>,
  document.getElementById('container')
);
