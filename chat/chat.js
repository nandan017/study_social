// Replace with your Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyCEzKxTwb0t-J6H_bwoto8z3PFJwhd6EBs",
    authDomain: "codify24-52659.firebaseapp.com",
    databaseURL: "https://codify24-52659-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "codify24-52659",
    storageBucket: "codify24-52659.appspot.com",
    messagingSenderId: "442850822241",
    appId: "1:442850822241:web:4ec1f569fe87aec24b4220",
    measurementId: "G-X5Z5TMR7BH"
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
          <img src="/chat/assets/reply-all-svgrepo-com.svg" id="reply-mark" alt=""> Reply (${repliesCount})
        </button>
        <div class="replies-container">${repliesHTML}</div>
        <div class="reply-area mt-2">
            <textarea class="reply-input" placeholder="Write your reply..."></textarea>
            <button class="submit-reply-button" data-question-id="${questionId}">
              <img src="/chat/assets/sent-svgrepo-com.svg" id="sent-mark" alt=""> Submit Reply
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

