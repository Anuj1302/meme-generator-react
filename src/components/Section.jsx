import React from "react";
// import memeData from "../memeData";

export default function Section(){
    const[imgurl, setImg] = React.useState({
        topText : "",
        bottomText : "",
        randomImage : "http://i.imgflip.com/1bij.jpg"
    });

    const[allMemeImage, setAllMeme] = React.useState([]);

    React.useEffect(() =>{
        async function getMemes(){
            const allMeme = await fetch("https://api.imgflip.com/get_memes");
            const res = await allMeme.json();
            setAllMeme(res.data.memes);
        } 
        getMemes();
}, [])

//useEffect has 2 paramemeter: 1-Function 2-dependency array(it helps us to allow react render when we want e.g if some variable changes)
// We can also have one more function inside 1st function called cleanUp function to remove all that part.

    function handleClick(){
        
        const random = Math.floor(Math.random() * allMemeImage.length);
        const urll = allMemeImage[random].url;
        setImg(prevImg => ({
            ...prevImg,
            randomImage : urll
        }));
    }
    function handleChange(event){
        const {type, name, value} = event.target;
        setImg(prevState =>{
            return {...prevState, [name] : value}
        })
    }
    
    return(
        
        <main>
            <div className="meme-form">
                    <input className="meme-input" 
                    type="text"
                    placeholder="Top Text"
                    onChange={handleChange}
                    name = "topText"
                    value = {imgurl.topText}>
                </input>
                
                <input className="meme-input"
                    type="text"
                    placeholder="Bottom Text"
                    onChange={handleChange}  
                    name = "bottomText"   >             
                 </input>
                <button onClick={handleClick} className="meme-button" type="submit">Get a new meme Image🖼</button>
            </div>
            <div className="meme">
                <img className="meme--image" src={imgurl.randomImage}/>
                <h2  className="meme--text top">{imgurl.topText}</h2>
                <h2  className="meme--text bottom">{imgurl.bottomText}</h2>
            </div>
            
        </main>
    )
}