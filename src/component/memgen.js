import React, { Component } from 'react';

class MemGen extends Component{
  constructor(){
    super();
    this.state = {
      topText: "",
      bottomText: "",
      randomImg: "http://i.imgflip.com/1bij.jpg",
      allMemeImgs: []
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleRandom = this.handleRandom.bind(this)
  }

  componentDidMount(){
    fetch("https://api.imgflip.com/get_memes")
      .then(response => response.json())
      .then(response => {
        const {memes} = response.data
        this.setState({ allMemeImgs: memes})
        console.log(this.state.allMemeImgs)
      })
  } 

  handleChange(event){
    const {name, value} = event.target
    this.setState({ [name]: value })
  }

  handleRandom(event){
    event.preventDefault()
    const randNum = Math.floor(Math.random() * this.state.allMemeImgs.length);
    const randImg = this.state.allMemeImgs[randNum].url
    this.setState({randomImg: randImg})
  }

  render(){
    return (
      <div>
        <form className="content-form" onSubmit={this.handleRandom}>
          <input 
            type="text" 
            name="topText" 
            placeholder="Top Text"
            value={this.state.topText} 
            onChange={this.handleChange}
          />
          <input 
            type="text" 
            name="bottomText" 
            placeholder="Bottom Text"
            value={this.state.bottomText} 
            onChange={this.handleChange}
          />

          <button>Generate</button>
        </form>

        <div className="content">
          <img src={this.state.randomImg} alt="meme img"/>
          <h2 className="top">{this.state.topText}</h2>
          <h2 className="bottom">{this.state.bottomText}</h2>
        </div>
      </div>
    );
  }
    
}

export default MemGen;
