import React from "react";
import './dancin.css';
const smugDance = "https://thumbs.gfycat.com/NimbleOptimisticHyracotherium-size_restricted.gif";

function dancin() {
    return (
        <div className="dancin">
            <header className="crt">
                <img src={smugDance}/>
                <p>
                    plz hire me :)
                </p>
            </header>
        </div>
    )
}

export default dancin;