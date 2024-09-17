// Import Firebase functions and initialize
import { initializeApp,createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";
import { getAuth, signInWithPopup, GoogleAuthProvider, OAuthProvider } from "firebase/auth";

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
    signUpBtn.addEventListener('click', () => {
        const name = document.getElementById('name-input').value;
        const email = document.getElementById('email-input').value;
        const password = document.getElementById('password-input').value;
        createUserWithEmailAndPassword(auth, name, email, password)
            .then((userCredential) => {
                // Sign-up successful
                const user = userCredential.user;
                console.log('User signed up:', user);
            })
            .catch((error) => {
                console.error('Error signing up:', error.message);
            });
    });
}

// Sign in function
const signInBtn = document.getElementById('sign-in');
signInBtn.addEventListener('click', () => {
    const email = document.querySelector('.input[type="text"]').value;
    const password = document.querySelector('.input[type="password"]').value;
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Sign-in successful
            const user = userCredential.user;
            console.log('User signed in:', user);
        })
        .catch((error) => {
            console.error('Error signing in:', error.message);
        });
});

// Google sign-in
const googleBtn = document.getElementById('google-btn');
googleBtn.addEventListener('click', () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
        .then((result) => {
            // Google sign-in successful
            console.log('Google sign-in:', result.user);
        })
        .catch((error) => {
            console.error('Error signing in with Google:', error.message);
        });
});

// Apple sign-in
const appleBtn = document.getElementById('apple-btn');
appleBtn.addEventListener('click', () => {
    const provider = new OAuthProvider('apple.com');
    signInWithPopup(auth, provider)
        .then((result) => {
            // Apple sign-in successful
            console.log('Apple sign-in:', result.user);
        })
        .catch((error) => {
            console.error('Error signing in with Apple:', error.message);
        });
});