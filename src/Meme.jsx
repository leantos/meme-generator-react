import React, { useState } from 'react';

export function Meme() {
  const [meme, setMeme] = React.useState({
    topText: "One does not Simply",
    bottomText: "Walk into Mordor",
    imageUrl: "http://i.imgflip.com/1bij.jpg",
  });

  const [allMemes, setAllMemes] = useState([])

  function handleOnChange(event) {
    const { value, name } = event.currentTarget
    setMeme(prevMeme => ({
      ...prevMeme,
      [name]: value
    }))
  }

  React.useState(() => {
    fetch('https://api.imgflip.com/get_memes')
      .then(res => res.json())
      .then(data => setAllMemes(data.data.memes))
  }, [])

  function getMemeImage(){
    const index = Math.floor(Math.random() * allMemes.length)
    const newMemeUrl = allMemes[index].url
    
    setMeme(prevMeme => ({
      ...prevMeme,
      imageUrl: newMemeUrl
    }))
  }

  return (
    <main>
      <div className="form">
        <label>
          Top Text
          <input
            type="text"
            placeholder="One does not simply"
            name="topText"
            onChange={handleOnChange}
          />
        </label>

        <label>
          Bottom Text
          <input
            type="text"
            placeholder="Walk into Mordor"
            name="bottomText"
            onChange={handleOnChange}
          />
        </label>
        <button onClick={getMemeImage}>Get a new meme image 🖼️</button>
      </div>
      <div className="meme">
        <img src={meme.imageUrl} />
        <span className="top">{meme.topText}</span>
        <span className="bottom">{meme.bottomText}</span>
      </div>
    </main>
  );
}
