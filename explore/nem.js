// nem.js

// Responsive Navigation
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Modal Functionality
const modal = document.getElementById('videoModal');
const modalImg = document.getElementById('modalImg');
const modalTitle = document.getElementById('modalTitle');
const modalTime = document.getElementById('modalTime');
const modalDescription = document.getElementById('modalDescription');
const closeModal = document.querySelector('.modal .close');

const videoCards = document.querySelectorAll('.smallc');

videoCards.forEach(card => {
    card.addEventListener('click', () => {
        const title = card.getAttribute('data-title');
        const time = card.getAttribute('data-time');
        const description = card.getAttribute('data-description');
        const imgSrc = card.getAttribute('data-img');

        modalTitle.textContent = title;
        modalTime.textContent = `Duration: ${time}`;
        modalDescription.textContent = description;
        modalImg.src = imgSrc;
        modalImg.alt = `${title} Thumbnail`;

        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    });
});

// Close Modal when 'x' is clicked
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Restore scrolling
});

// Close Modal when clicking outside the modal content
window.addEventListener('click', (e) => {
    if (e.target == modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore scrolling
    }
});

// Load More Functionality
const loadMoreBtn = document.getElementById('loadMore');
const videosContainer = document.querySelector('.videos');

// Sample additional videos data
const additionalVideos = [
    {
        title: "Course-7 : JavaScript Essentials",
        time: "12hrs",
        description: "Master the fundamentals of JavaScript with this comprehensive course tailored for aspiring developers.",
        img: "/study_social/assets/IMG_6066[1].JPG"
    },
    {
        title: "Course-8 : React for Beginners",
        time: "20hrs",
        description: "Dive into React and build dynamic user interfaces with this beginner-friendly course.",
        img: "/study_social/assets/IMG_6067[1].JPG"
    },
    {
        title: "Course-9 : Advanced CSS Techniques",
        time: "10hrs",
        description: "Enhance your CSS skills with advanced techniques and best practices for modern web development.",
        img: "/study_social/assets/IMG_6068[1].JPG"
    },
    {
        title: "Course-10 : Node.js Fundamentals",
        time: "18hrs",
        description: "Learn the basics of Node.js and build scalable backend applications with this in-depth course.",
        img: "/study_social/assets/IMG_6069[1].JPG"
    }
    // Add more video objects as needed
];

// Function to create and append video cards
function loadAdditionalVideos() {
    additionalVideos.forEach(video => {
        const card = document.createElement('div');
        card.classList.add('smallc');
        card.setAttribute('data-title', video.title);
        card.setAttribute('data-time', video.time);
        card.setAttribute('data-description', video.description);
        card.setAttribute('data-img', video.img);

        card.innerHTML = `
            <img class="thumb" src="${video.img}" alt="${video.title} Thumbnail" />
            <div class="time">
                <p>Time: ${video.time}</p>
            </div>
            <div class="title">
                <p>${video.title}</p>
            </div>
            <div class="desc">
                <p>${video.description}</p>
            </div>
        `;

        // Add event listener for modal
        card.addEventListener('click', () => {
            modalTitle.textContent = video.title;
            modalTime.textContent = `Duration: ${video.time}`;
            modalDescription.textContent = video.description;
            modalImg.src = video.img;
            modalImg.alt = `${video.title} Thumbnail`;

            modal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        });

        videosContainer.appendChild(card);
    });

    // Hide the Load More button after loading
    loadMoreBtn.style.display = 'none';
}

// Event listener for Load More button
loadMoreBtn.addEventListener('click', loadAdditionalVideos);
