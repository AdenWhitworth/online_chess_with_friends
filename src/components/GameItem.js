
import {useState, useEffect} from "react";

export default function GamesItem({count, item, index}) {
    
    const [colorStyle, setColorStyle] = useState("");

    const rowListStyling = () => {
        //alternate odd and even list item colors
        //when less than 6 items are in a list then dont allow scroll
        if (Math.abs(index % 2) == 1){
            if (count <= 6){
                setColorStyle("moves-line odd-color");
            } else {
                setColorStyle("moves-line moves-scroll odd-color");
            }

        } else{
            
            if (count <= 6){
                setColorStyle("moves-line even-color");
            } else {
                setColorStyle("moves-line moves-scroll even-color");
            }
        }
    }
    
    useEffect(() =>{
        rowListStyling();
    },[count])

    return (

        <li>
            <div class={colorStyle}>
                <h3 class="move-number">{index+1}.</h3>
                <h3 class="move-white">{item.item[0]}</h3>
                <h3 class="move-black">{item.item[1]}</h3>
            </div>
        </li>

    );
}