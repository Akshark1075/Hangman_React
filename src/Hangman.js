import React, { Component } from "react";
import "./Hangman.css";
import img0 from "./0.jpg";
import img1 from "./1.jpg";
import img2 from "./2.jpg";
import img3 from "./3.jpg";
import img4 from "./4.jpg";
import img5 from "./5.jpg";
import img6 from "./6.jpg";
import {randomWord} from "./words"
class Hangman extends Component {
  /** by default, allow 6 guesses and use provided gallows images. */
  static defaultProps = {
    maxWrong: 6,
    images: [img0, img1, img2, img3, img4, img5, img6],
      };

  constructor(props) {
    super(props);
    this.state = { nWrong: 0, guessed: new Set(), answer:randomWord(), won:false };
    this.handleGuess = this.handleGuess.bind(this);
    this.handleRestart=this.handleRestart.bind(this);
 
  }

  /** guessedWord: show current-state of word:
    if guessed letters are {a,p,e}, show "app_e" for "apple"
  */
  guessedWord() {
    return this.state.answer
      .split("")
      .map(ltr => (this.state.guessed.has(ltr) ? ltr : "_"));
  }

  /** handleGuest: handle a guessed letter:
    - add to guessed letters
    - if not in answer, increase number-wrong guesses
  */
  handleGuess(evt) {
    let ltr = evt.target.value;
    this.setState((st) => {
      var curwrd=st.guessed.add(ltr)
      var winner=false;
      if(this.state.answer.split("").every(lt=>curwrd.has(lt))){
        winner=true;
      }
      return({
      guessed: st.guessed.add(ltr),
      nWrong: st.nWrong + (st.answer.includes(ltr) ? 0 : 1),
      won:winner
    });
    
  })
  }

  /** generateButtons: return array of letter buttons to render */
  generateButtons() {
    return "abcdefghijklmnopqrstuvwxyz".split("").map((ltr,i) => (
      <button
        value={ltr}
        onClick={this.handleGuess}
        disabled={this.state.guessed.has(ltr)}
        key={i}
      >
        {ltr}
      </button>
    ));
  }

  handleRestart(){
    this.setState({
      nWrong: 0, guessed: new Set(), answer:randomWord(),won:false
    })

  }

  /** render: render game */
  render() {
    return (
      <div className='Hangman'>
        <h1>Hangman</h1>
      <img src={this.props.images[this.state.nWrong]}alt={this.state.nWrong+' Wrong guesses'}/>
          {this.state.nWrong<this.props.maxWrong?this.state.won?<h2 className='Hangman-Winner'>You Won</h2>:'':<h2 className="Hangman-Loser">You lose :(</h2>}
     {this.state.nWrong<=this.props.maxWrong&&!this.state.won?<h4>No. of wrong guesses: {this.state.nWrong}</h4>:this.state.won?'':<h4>Correct Answer is</h4>}
        <p className='Hangman-word'>{this.state.nWrong<this.props.maxWrong?this.guessedWord():this.state.answer}</p>
        <p className='Hangman-btns'>{this.state.nWrong<this.props.maxWrong && !this.state.won?this.generateButtons():''}</p>
      {this.state.nWrong >5 || this.state.won?<button id='Hangman-reset'onClick={this.handleRestart} >Restart Game</button>:'' }
      </div>
    );
  }
}

export default Hangman;
