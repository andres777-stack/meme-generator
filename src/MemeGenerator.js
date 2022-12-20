import React from "react";
import './MemeGenerator.css';

class MemeGenerator extends React.Component {

    constructor() {
        super();
        this.state = {
            topText: "",
            bottonText: "",
            randomImage: "https://imgflip.com/s/meme/One-Does-Not-Simply.jpg",
            allMemeImgs: '',
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        fetch("https://api.imgflip.com/get_memes").then(
            response => response.json()).then(
            response => {
                const {memes} = response.data
                console.log(memes[0])
                this.setState({ allMemeImgs: memes });
            }
        )
    }

    handleChange(event) {
        const {name, value} = event.target;
        this.setState({[name]: value});
    }

    handleSubmit(event){
        event.preventDefault();
        const randonNum = Math.floor(Math.random() * this.state.allMemeImgs.length)
        const randonMeme = this.state.allMemeImgs[randonNum].url;
        this.setState({ randomImage: randonMeme })
    }

    render() {
        return (
            <div className="container">
                <form className="meme-form" onSubmit={this.handleSubmit}>
                    <input 
                        name='topText' 
                        value={this.state.topText} 
                        placeholder='Write a toptext here' 
                        onChange={this.handleChange}
                        maxLength='35'
                    />
                    <input 
                        name='bottonText' 
                        value={this.state.bottonText} 
                        placeholder='Write a bottomtext here' 
                        onChange={this.handleChange}
                        maxLength='35'
                    />
                    <button>Generate</button>
                </form>
                <div className="meme">
                    <img src={this.state.randomImage} />
                    <h2 className="topText">{this.state.topText}</h2>
                    <h2 className='bottomText'>{this.state.bottonText}</h2>
                </div>
            </div>
        )
    }
}

export default MemeGenerator