import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCEzKxTwb0t-J6H_bwoto8z3PFJwhd6EBs",
    authDomain: "codify24-52659.firebaseapp.com",
    projectId: "codify24-52659",
    storageBucket: "codify24-52659.appspot.com",
    messagingSenderId: "442850822241",
    appId: "1:442850822241:web:4ec1f569fe87aec24b4220",
    measurementId: "G-X5Z5TMR7BH"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const resourcesContainer = document.getElementById('resources-container');

onAuthStateChanged(auth, user => {
    if (user) {
        // User is logged in, fetch and display resources
        fetchResources();
    } else {
        // User is not logged in, you could show a message or redirect
        resourcesContainer.innerHTML = '<p>Please log in to view resources.</p>';
    }
});

async function fetchResources() {
    try {
        const querySnapshot = await getDocs(collection(db, "resources"));
        if (querySnapshot.empty) {
            resourcesContainer.innerHTML = '<p>No resources have been added yet.</p>';
            return;
        }

        let html = '';
        querySnapshot.forEach((doc) => {
            const resource = doc.data();
            html += `
                <div class="res-cont">
                    <div class="res-head">
                        <p id="subject">${resource.subject || 'N/A'}</p>
                    </div>
                    <div class="res-in">
                        <div class="img-cont">
                            <img id="sub-img" src="${resource.imageUrl || 'assets/default-book.png'}" alt="${resource.title}" />
                        </div>
                        <div id="about">
                            <p><strong>${resource.title || 'No Title'}</strong><br />Author/s: ${resource.author || 'N/A'}<br />Edition: ${resource.edition || 'N/A'}</p>
                        </div>
                        <div class="download">
                            <a href="${resource.downloadUrl}" target="_blank" rel="noopener noreferrer">
                                <button>View Resource</button>
                            </a>
                        </div>
                    </div>
                </div>
            `;
        });
        resourcesContainer.innerHTML = html;

    } catch (error) {
        console.error("Error fetching resources:", error);
        resourcesContainer.innerHTML = '<p>Sorry, we could not load the resources at this time.</p>';
    }
}