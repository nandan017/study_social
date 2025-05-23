// Import Firebase functions and initialize
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCEzKxTwb0t-J6H_bwoto8z3PFJwhd6EBs",
    authDomain: "codify24-52659.firebaseapp.com",
    projectId: "codify24-52659",
    storageBucket: "codify24-52659.appspot.com",
    messagingSenderId: "442850822241",
    appId: "1:442850822241:web:4ec1f569fe87aec24b4220",
    measurementId: "G-X5Z5TMR7BH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Sign up function
const signUpBtn = document.getElementById('sign-up');
if (signUpBtn) {
    signUpBtn.addEventListener('click', (event) => {
        event.preventDefault();
        console.log("Signup button clicked!")
        const name = document.getElementById('name-input').value;
        const email = document.getElementById('email-input').value;
        const password = document.getElementById('password-input').value;
        console.log(name, email, password);

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                // Optionally update profile with name
                updateProfile(user, { displayName: name })
                    .then(() => {
                        console.log('User profile updated:', user);
                    })
                    .catch((error) => {
                        console.error('Error updating profile:', error.message);
                    });
                console.log('User signed up:', user);
                alert("Updated! Try logging in.");
                window.location.href = ("#");
            })
            .catch((error) => {
                console.error('Error signing up:', error.message);
                alert("Error signing up/Account already exists.")
            });
    });
}

// Sign in function
const signInBtn = document.getElementById('sign-in');
signInBtn.addEventListener('click', () => {
    console.log("clicked");
    console.log("clicked");

    const email = document.querySelector('.input[type="text"]').value;
    const password = document.querySelector('.input[type="password"]').value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log("loggedin");
            const user = userCredential.user;
            window.location.href = "../home.html";
            console.log('User signed in:', user);
            alert("Logged in successfully!");
        })
        .catch((error) => {
            console.log(error.code);
            console.error('Error signing in:', error.message);
            alert("Error logging in!",error);
        });
});

// Google sign-in
const googleBtn = document.getElementById('google-btn');
googleBtn.addEventListener('click', () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
        .then((result) => {
            console.log('Google sign-in:', result.user);
            alert("Logged in successfully");
            window.location.href = '../home.html'
        })
        .catch((error) => {
            console.error('Error signing in with Google:', error.message);
            alert("Error logging in!",error);
        });
});

// toggle password
document.getElementById('togglebtn').addEventListener("click", function () {
    var x = document.getElementById("myInput");
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
});

// forgot password
const forgotPasswordForm = document.querySelector('.form-3');
forgotPasswordForm.addEventListener('submit',(event)=>{
    event.preventDefault();
    const email = document.getElementById('email-3').value;
    
    if(email){
        sendPasswordResetEmail(auth, email)
            .then(() => {
                alert("A password reset link has been sent to your email!");
            })
            .catch((error) => {
                console.log("Error code:",error.code);
                console.log("Error message:",error.message);
                alert("Error:"+error.message)
            })
    }
    else{
        alert("Please enter a valid email address.")
    }
})
