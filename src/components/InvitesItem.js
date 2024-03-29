import user_white from "../Images/User White.svg";
import check from "../Images/Check.svg"
import {useState, useEffect, useContext} from "react";
import { db } from '../firebase';
import { collection, doc, deleteDoc} from "firebase/firestore";
import {GameContext} from "../components/DashboardCard";


export default function InvitesItem({setNetworkError, setNetworkReason, socket, count ,item, index, playerId, userId, username, setRoom, setGamePlayers, setOrientation}) {
    
    const [colorStyle, setColorStyle] = useState("player-line");

    const {setOpponentUserName, setOpponentUserId, setOpponentPlayerId, setOpponentWin, setOpponentLoss} = useContext(GameContext);

    const joinPlayer = async (e) => {
        e.preventDefault();  

        setOpponentUserName(item.item.requestUserName);
        setOpponentUserId(item.item.requestUserID);
        setOpponentPlayerId(item.item.requestPlayerID);
        setOpponentWin(item.item.requestWin);
        setOpponentLoss(item.item.requestLoss);

        handleSoccetJoinRoom();
    }

    const handleSoccetJoinRoom = () => {
        
        if (!item.item.requestRoom) return;
        
        socket.emit("joinRoom", { roomId: item.item.requestRoom }, (response) => {
            if (response.error) {
                setNetworkError(true);
                setNetworkReason("Joining");
                return
            }
            
            setRoom(response.RoomUpdate.roomId);
            setGamePlayers(response.RoomUpdate.players);
            setOrientation("black");
            
            const userCollection = collection(db, 'users');
            const DocRef = doc(userCollection, userId);
            const inviteCollection = collection(DocRef,'invites');
            const DocRef2 = doc(inviteCollection, item.id);
            deleteDoc(DocRef2);
        });
    }

    const rowListStyling = () => {
        //alternate odd and even list item colors
        //when less than 7 items are in a list then dont allow scroll
        if (Math.abs(index % 2) == 1){
            if (count <= 7){
                setColorStyle("player-line odd-color");
            } else {
                setColorStyle("player-line player-line-scroll odd-color");
            }

        } else{
            
            if (count <= 7){
                setColorStyle("player-line even-color");
            } else {
                setColorStyle("player-line player-line-scroll even-color");
            }
        }
    }
    
    useEffect(() =>{
        rowListStyling();
    },[count])
      

    return (

        <li>
            <div class={colorStyle}>
                <img class="player-icon" src={user_white}></img>
                <h3 class="player-username">{item.item.requestUserName}</h3>
                <div class="player-request" onClick={joinPlayer}>
                    <img class="request-icon" src={check}></img>
                    <h3 class="request-text">Join</h3>
                </div>
            </div>
        </li>

    );
}