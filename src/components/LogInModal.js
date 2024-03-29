import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import king_logo_black from "../Images/King Logo Black.svg";
import key from "../Images/Key.svg";
import mail from "../Images/Mail.svg";
import closeX from "../Images/close.svg"
import "../App.css";
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import {useState, useEffect} from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth} from '../firebase';

const FillButton = styled(Button)(({ theme }) => ({
    color: '#000000',
    borderColor: '#FFCD05',
    backgroundColor: '#FFCD05',
    width: "70%",
    borderRadius: '26px',
    '&:hover': {
      backgroundColor: '#B78B02',
      borderColor: '#B78B02',
    },
}));

const HollowButton = styled(Button)(({ theme }) => ({
    color: '#FFCD05',
    borderColor: '#FFCD05',
    width: "70%",
    borderRadius: '26px',
    '&:hover': {
      backgroundColor: '#FFF9CD',
      color: '#B78B02',
      borderColor: '#B78B02',
    },
}));

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: "70%", md: 400},
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    outline: '0',
    borderRadius: 5,
};
  

export default function LogInModal({ open, handleLogIn, openSignUp}) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [errorCSS, setErrorCSS] = useState('error-message error-hide');
    
    const onLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            setErrorCSS('error-message error-hide');
            handleLogIn();
        })
        .catch((error) => {
            setError(error.code);
            setErrorCSS('error-message');
        });
    }

    useEffect(() => {
        //reset the error message on each open of the modal
        setErrorCSS('error-message error-hide');
    }, [open]);

    return (
    <Modal open={open}>
        <Box sx={style}>
            <div class="modal-content">
                <img onClick={handleLogIn} class="modal-close" src={closeX}></img>
                <img class="modal-logo" src={king_logo_black}></img>
                <form onSubmit={onLogin}>

                    <div class="input-text input-text-padding">
                    
                        <img class="input-img" src={mail}></img>
                        <input onChange={(e) => setEmail(e.target.value)} required spellCheck="false" type="email" placeholder="Email"></input>
                    
                    </div>

                    <div class="input-text">
                    
                        <img class="input-img" src={key}></img>
                        <input onChange={(e) => setPassword(e.target.value)} required spellCheck="false" type="password" placeholder="Password"></input>
                    
                    </div>

                    <div>
                        <FillButton type="submit" variant="contained">Log In</FillButton>
                    </div>

                    <h4 class={errorCSS} >{error}</h4>

                    <h4>or</h4>
                    <h3>New Player?</h3>

                    <div>
                        <HollowButton onClick={openSignUp} variant="outlined">Sign Up</HollowButton>
                    </div>
                </form>
            </div>
        </Box>
    </Modal>
  );
}