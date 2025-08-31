import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getDatabase, ref, push, onChildAdded, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

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
const db = getDatabase(app);

const questionsContainer = document.getElementById('questions-container');
const questionInput = document.getElementById('question-input');
const postQuestionButton = document.getElementById('post-question-button');
let currentUser = null;

// Check user's login status
onAuthStateChanged(auth, (user) => {
    if (user) {
        currentUser = user;
        postQuestionButton.disabled = false;
        questionInput.placeholder = `Ask a question as ${user.displayName || 'Anonymous'}...`;
    } else {
        currentUser = null;
        postQuestionButton.disabled = true;
        questionInput.placeholder = 'Please log in to ask a question.';
        window.location.href = '../index.html'; // Redirect to login
    }
});

// Function to create and display a question card
function displayQuestion(questionId, questionData) {
    const questionCard = document.createElement('div');
    questionCard.classList.add('question-card');
    questionCard.dataset.questionId = questionId;

    const repliesCount = questionData.replies ? Object.keys(questionData.replies).length : 0;
    
    questionCard.innerHTML = `
        <p class="question-author">Asked by: <strong>${questionData.authorName || 'Anonymous'}</strong></p>
        <h5 class="question-text">${questionData.text}</h5>
        <button class="btn-reply">Reply (${repliesCount})</button>
        <div class="replies-container" style="display: none;"></div>
        <div class="reply-area" style="display: none;">
            <textarea class="reply-input" placeholder="Write your reply..."></textarea>
            <button class="submit-reply-button">Submit Reply</button>
        </div>
    `;
    questionsContainer.prepend(questionCard); // Add new questions to the top

    // Listen for replies to this specific question
    const repliesRef = ref(db, `questions/${questionId}/replies`);
    onChildAdded(repliesRef, (snapshot) => {
        const replyData = snapshot.val();
        const repliesContainer = questionCard.querySelector('.replies-container');
        const replyElement = document.createElement('div');
        replyElement.classList.add('reply');
        replyElement.innerHTML = `<strong>${replyData.authorName || 'Anonymous'}:</strong> ${replyData.text}`;
        repliesContainer.appendChild(replyElement);
    });
}

// Post a new question
postQuestionButton.addEventListener('click', () => {
    const questionText = questionInput.value.trim();
    if (questionText && currentUser) {
        const questionsRef = ref(db, 'questions');
        push(questionsRef, {
            text: questionText,
            authorId: currentUser.uid,
            authorName: currentUser.displayName,
            timestamp: serverTimestamp()
        });
        questionInput.value = '';
    }
});

// Event delegation for reply buttons and submitting replies
questionsContainer.addEventListener('click', (e) => {
    const target = e.target;
    const questionCard = target.closest('.question-card');
    if (!questionCard) return;

    const questionId = questionCard.dataset.questionId;

    if (target.classList.contains('btn-reply')) {
        const replyArea = questionCard.querySelector('.reply-area');
        const repliesContainer = questionCard.querySelector('.replies-container');
        replyArea.style.display = replyArea.style.display === 'block' ? 'none' : 'block';
        repliesContainer.style.display = 'block'; // Always show replies when toggling
    }

    if (target.classList.contains('submit-reply-button')) {
        const replyInput = questionCard.querySelector('.reply-input');
        const replyText = replyInput.value.trim();
        if (replyText && currentUser) {
            const repliesRef = ref(db, `questions/${questionId}/replies`);
            push(repliesRef, {
                text: replyText,
                authorId: currentUser.uid,
                authorName: currentUser.displayName,
                timestamp: serverTimestamp()
            });
            replyInput.value = '';
        }
    }
});

// Listen for all new questions
const questionsRef = ref(db, 'questions');
onChildAdded(questionsRef, (snapshot) => {
    displayQuestion(snapshot.key, snapshot.val());
});