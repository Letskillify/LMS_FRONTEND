import React, { useRef, useState } from 'react'
import { toPng } from 'html-to-image';  // Import the library for image generation
import "../../assets/vendor/css/custom/birthday.css"
import img from "../../assets/img/avatars/7.png"
function StudentBirthdays() {
    return (
        <div className=''>
            <div className='Cards'>
                <div className='birthday'>
                    <img src={img} alt="" />
                    <h1>Happy Birthday John!</h1>
                    <p>I hope your special day will bring you lots of happiness, love, and fun. You deserve them a lot. Enjoy!</p>
                    <p>Hope your day goes great!</p>
                    <button>Download </button>
                    <button onClick={() => setShowCard(false)}>Share</button>
                </div>
                <div className='birthday'>
                   
                    <img src={img} alt="" />
                    <h1>Happy Birthday Divy!</h1>
                    <p>I hope your special day will bring you lots of happiness, love, and fun. You deserve them a lot. Enjoy!</p>
                    <p>Hope your day goes great!</p>
                    <button>Download </button>
                    <button>Share</button>
                </div>
            </div>



        </div>
    );
}



export default StudentBirthdays
