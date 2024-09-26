// Replace with your Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyBfQi6a1MtBtUjqqi2YyqkLFg1wDP1Q9dc",
    authDomain: "fir-334d1.firebaseapp.com",
    databaseURL: "https://fir-334d1-default-rtdb.firebaseio.com",
    projectId: "fir-334d1",
    storageBucket: "fir-334d1.appspot.com",
    messagingSenderId: "219054024057",
    appId: "1:219054024057:web:350b5f9eebc30544463ba8",
    measurementId: "G-D40VG3NT3Q"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const database = firebase.database();
const questionsRef = database.ref('questions');

// Get DOM elements
const questionsContainer = document.getElementById('questions-container');
const questionInput = document.getElementById('question-input');
const postQuestionButton = document.getElementById('post-question-button');

// Function to display questions and replies
function displayQuestion(questionId, questionData) {
    const questionCard = document.createElement('div');
    questionCard.classList.add('question-card');
    
    // Count the number of replies
    const replies = questionData.replies ? Object.values(questionData.replies) : [];
    const repliesCount = replies.length;

    let repliesHTML = '';
    if (repliesCount > 0) {
        for (const reply of replies) {
            repliesHTML += `<div class="reply">${reply.text}</div>`;
        }
    }

    questionCard.innerHTML = `
        <h5>${questionData.text}</h5>
        <button class="btn-reply" data-question-id="${questionId}">
          <i class="fas fa-reply"></i> Reply (${repliesCount})
        </button>
        <div class="replies-container">${repliesHTML}</div>
        <div class="reply-area mt-2">
            <textarea class="reply-input" placeholder="Write your reply..."></textarea>
            <button class="submit-reply-button" data-question-id="${questionId}">
              <i class="fas fa-paper-plane"></i> Submit Reply
            </button>
        </div>
    `;

    questionsContainer.appendChild(questionCard);
}


// Function to handle posting new questions
postQuestionButton.addEventListener('click', () => {
    const questionText = questionInput.value.trim();
    if (questionText !== '') {
        questionsRef.push({
            text: questionText
        });
        questionInput.value = ''; // Clear input field after posting
    }
});

// Listen for new questions being added
questionsRef.on('child_added', (snapshot) => {
    const questionData = snapshot.val();
    const questionId = snapshot.key;
    displayQuestion(questionId, questionData);
});

// Function to handle replying to a question
// Function to handle replying to a question
questionsContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-reply')) {
        const replyArea = e.target.nextElementSibling.nextElementSibling;
        replyArea.style.display = replyArea.style.display === 'block' ? 'none' : 'block'; // Toggle reply area
    }

    if (e.target.classList.contains('submit-reply-button')) {
        const questionId = e.target.getAttribute('data-question-id');
        const replyInput = e.target.previousElementSibling;
        const replyText = replyInput.value.trim();
        if (replyText !== '') {
            const repliesRef = questionsRef.child(questionId).child('replies');
            repliesRef.push({
                text: replyText
            });
            replyInput.value = ''; // Clear input field after submitting reply
            
            // Update reply count on button
            const btnReply = e.target.closest('.question-card').querySelector('.btn-reply');
            const currentCount = parseInt(btnReply.textContent.match(/\d+/)) || 0;
            btnReply.textContent = `Reply (${currentCount + 1})`; // Update count
        }
    }
});

