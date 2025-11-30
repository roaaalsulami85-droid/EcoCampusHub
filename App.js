// ===============================
// GENERAL UTILITIES
// ===============================

// Set current year in footer
function setCurrentYear() {
    const yearElements = document.querySelectorAll('#year');
    yearElements.forEach(element => {
        if (element) {
            element.textContent = new Date().getFullYear();
        }
    });
}

// Form validation
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^05\d{8}$/;
    return re.test(phone);
}

function showError(input, message) {
    const errorElement = document.getElementById(input.id + 'Error');
    if (errorElement) {
        errorElement.textContent = message;
        input.classList.add('error');
    }
}

function clearError(input) {
    const errorElement = document.getElementById(input.id + 'Error');
    if (errorElement) {
        errorElement.textContent = '';
        input.classList.remove('error');
    }
}

// ===============================
// HOME PAGE FUNCTIONALITY
// ===============================

function initHomePage() {
    if (!document.getElementById('carouselTrack')) return;

    const challenges = [
        {
            title: "Use Reusable Cup for a Week",
            description: "Reduce plastic waste by using your own cup for drinks.",
            points: 100,
            type: "recycling",
        },
        {
            title: "Turn Off Lights When Leaving",
            description: "Save energy by turning off lights every time you leave a room.",
            points: 60,
            type: "energy",
        },
        {
            title: "Recycle 5 Plastic Bottles",
            description: "Collect and recycle at least five plastic bottles this week.",
            points: 80,
            type: "recycling",
        },
        {
            title: "Create an eco-awareness post on social media",
            description: "Educate others about sustainability.",
            points: 150,
            type: "water",
        },
        {
            title: "Plant a tree or flower",
            description: "Contribute to a greener environment.",
            points: 120,
            type: "water",
        }
    ];

    const students = [
        {
            name: "Tala Mohandis",
            dept: "CS",
            badges: ["♻️", "⚡"],
            points: 2340,
            challenges: 28
        },
        {
            name: "Sawsan Omar",
            dept: "ENG",
            badges: ["♻️", "⚡"],
            points: 2210,
            challenges: 26
        },
        {
            name: "Roaa Al-Sulami",
            dept: "BUS",
            badges: ["♻️", "🌱"],
            points: 1980,
            challenges: 22
        },
        {
            name: "Lamar Alharbi",
            dept: "CS",
            badges: ["♻️"],
            points: 1760,
            challenges: 19
        },
        {
            name: "Aryam Fadel",
            dept: "ENG",
            badges: ["🌱"],
            points: 1640,
            challenges: 17
        }
    ];

    const events = [
        {
            title: "Campus Clean-Up",
            description: "Join the campus clean-up event and help remove waste while learning proper disposal methods."
        },
        {
            title: "Eco Workshop", 
            description: "A hands-on workshop to teach practical sustainability tips you can apply daily."
        },
        {
            title: "Tree Planting Day",
            description: "Participate in planting new trees across the campus to support a greener environment."
        }
    ];

    // Populate Events
    function displayEvents() {
        const eventsContainer = document.getElementById('events');
        if (!eventsContainer) return;
        
        eventsContainer.innerHTML = '';

        events.forEach(event => {
            const eventCard = document.createElement('div');
            eventCard.className = 'event-card';
            eventCard.innerHTML = `
                <h4>${event.title}</h4>
                <p>${event.description}</p>
            `;
            eventsContainer.appendChild(eventCard);
        });
    }
    displayEvents();

    // Populate Challenges
    const track = document.getElementById("carouselTrack");
    function loadChallenges(filter = "all") {
        track.innerHTML = "";
        const filteredChallenges = challenges.filter(c => filter === "all" || c.type === filter);
        
        filteredChallenges.forEach(c => {
            const div = document.createElement("div");
            div.className = "top-card";
            div.innerHTML = `
                <h4>${c.title}</h4>
                <span>+${c.points} pts</span>
            `;
            track.appendChild(div);
        });
    }

    // Challenge filter event
    const challengeFilter = document.getElementById("challengeFilter");
    if (challengeFilter) {
        challengeFilter.addEventListener("change", e => {
            loadChallenges(e.target.value);
        });
    }

    // Carousel functionality
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");

    if (prevBtn && nextBtn) {
        prevBtn.addEventListener("click", () => {
            track.scrollBy({ left: -200, behavior: 'smooth' });
        });

        nextBtn.addEventListener("click", () => {
            track.scrollBy({ left: 200, behavior: 'smooth' });
        });
    }

    // Load initial challenges
    loadChallenges();

    // Populate Top Students
    const topGrid = document.getElementById("topGrid");
    if (topGrid) {
        students.forEach(s => {
            const card = document.createElement("div");
            card.className = "top-card";
            card.innerHTML = `
                <h4>${s.name}</h4>
                <span>${s.points} pts</span>
            `;
            topGrid.appendChild(card);
        });
    }

    // Daily tip rotation
    const tips = [
        "Daily Tip: Use a reusable water bottle instead of plastic.",
        "Daily Tip: Turn off lights when leaving the room.",
        "Daily Tip: Recycle paper and plastic materials.",
        "Daily Tip: Use public transportation or carpool."
    ];

    const dailyTip = document.getElementById("dailyTip");
    if (dailyTip) {
        let tipIndex = 0;
        setInterval(() => {
            tipIndex = (tipIndex + 1) % tips.length;
            dailyTip.textContent = tips[tipIndex];
        }, 5000);
    }
}

// ===============================
// LOGIN PAGE FUNCTIONALITY
// ===============================

function initLoginPage() {
    const loginForm = document.getElementById('loginForm');
    if (!loginForm) return;

    const demoAccounts = [
        { email: 'student@ecocampus.edu', password: 'demo123' }
    ];

    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    if (emailInput) {
        emailInput.addEventListener('input', () => {
            if (!validateEmail(emailInput.value)) {
                showError(emailInput, 'Please enter a valid email address');
            } else {
                clearError(emailInput);
            }
        });
    }

    if (passwordInput) {
        passwordInput.addEventListener('input', () => {
            if (passwordInput.value.length < 6) {
                showError(passwordInput, 'Password must be at least 6 characters');
            } else {
                clearError(passwordInput);
            }
        });
    }

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        const email = emailInput.value;
        const password = passwordInput.value;

        if (!validateEmail(email)) {
            showError(emailInput, 'Please enter a valid email address');
            isValid = false;
        } else {
            clearError(emailInput);
        }

        if (password.length < 6) {
            showError(passwordInput, 'Password must be at least 6 characters');
            isValid = false;
        } else {
            clearError(passwordInput);
        }

        if (isValid) {
            const demoAccount = demoAccounts.find(acc => 
                acc.email === email && acc.password === password
            );

            if (demoAccount) {
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('userEmail', email);
                window.location.href = 'home.html';
            } else {
                alert('Invalid email or password. Use demo account: student@ecocampus.edu / demo123');
            }
        }
    });
}

// ===============================
// REGISTRATION PAGE FUNCTIONALITY
// ===============================

function initRegistrationPage() {
    const registerForm = document.getElementById('registerForm');
    if (!registerForm) return;

    const fullnameInput = document.getElementById('fullname');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');

    if (fullnameInput) {
        fullnameInput.addEventListener('input', () => {
            if (fullnameInput.value.trim().length < 2) {
                showError(fullnameInput, 'Full name must be at least 2 characters');
            } else {
                clearError(fullnameInput);
            }
        });
    }

    if (emailInput) {
        emailInput.addEventListener('input', () => {
            if (!validateEmail(emailInput.value)) {
                showError(emailInput, 'Please enter a valid email address');
            } else {
                clearError(emailInput);
            }
        });
    }

    if (phoneInput) {
        phoneInput.addEventListener('input', () => {
            if (!validatePhone(phoneInput.value)) {
                showError(phoneInput, 'Please enter a valid Saudi mobile number (05xxxxxxxx)');
            } else {
                clearError(phoneInput);
            }
        });
    }

    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;

        if (!fullnameInput.value.trim()) {
            showError(fullnameInput, 'Full name is required');
            isValid = false;
        }

        if (!validateEmail(emailInput.value)) {
            showError(emailInput, 'Please enter a valid email address');
            isValid = false;
        }

        if (!validatePhone(phoneInput.value)) {
            showError(phoneInput, 'Please enter a valid Saudi mobile number (05xxxxxxxx)');
            isValid = false;
        }

        if (isValid) {
            const userData = {
                fullname: fullnameInput.value,
                email: emailInput.value,
                phone: phoneInput.value,
                points: 0,
                badges: [],
                joinedChallenges: []
            };
            
            localStorage.setItem('userData', JSON.stringify(userData));
            localStorage.setItem('isLoggedIn', 'true');
            alert("🎉 Registration Successful! Welcome to EcoCampus Hub!");
            window.location.href = 'EcoCampusHub_P9.html';
        }
    });
}

// ===============================
// PROFILE PAGE FUNCTIONALITY
// ===============================

function initProfilePage() {
    const ecoPointsElement = document.getElementById('ecoPoints');
    if (!ecoPointsElement) return;

    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    const isLoggedIn = localStorage.getItem('isLoggedIn');

    if (!isLoggedIn) {
        window.location.href = 'login.html';
        return;
    }

    ecoPointsElement.textContent = userData.points || 0;

    let logoutButton = document.querySelector('button[onclick*="logout"]');
    if (!logoutButton) {
        logoutButton = document.querySelector('.logout-btn');
    }

    if (logoutButton) {
        logoutButton.addEventListener('click', function() {
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('userData');
            window.location.href = 'home.html';
        });
    }
}

// ===============================
// CHALLENGES PAGE FUNCTIONALITY
// ===============================

function initChallengesPage() {
    const challengeButtons = document.querySelectorAll('.challenge button');
    
    challengeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const challengeTitle = this.parentElement.querySelector('h3').textContent;
            const challengePoints = this.parentElement.querySelector('.points').textContent;
            
            const userData = JSON.parse(localStorage.getItem('userData') || '{}');
            const isLoggedIn = localStorage.getItem('isLoggedIn');

            if (!isLoggedIn) {
                alert('Please log in to join challenges');
                window.location.href = 'login.html';
                return;
            }

            if (!userData.joinedChallenges) {
                userData.joinedChallenges = [];
            }

            if (userData.joinedChallenges.includes(challengeTitle)) {
                alert('You have already joined this challenge!');
                return;
            }

            userData.joinedChallenges.push(challengeTitle);
            
            const pointsMatch = challengePoints.match(/\d+/);
            if (pointsMatch) {
                userData.points = (userData.points || 0) + parseInt(pointsMatch[0]);
            }

            localStorage.setItem('userData', JSON.stringify(userData));
            
            this.textContent = 'Joined ✓';
            this.disabled = true;
            this.style.backgroundColor = '#4a9a66';
            
            alert(`Successfully joined "${challengeTitle}"!`);
        });
    });
}


// ===============================
// QUIZ PAGE FUNCTIONALITY
// ===============================

function initQuizPage() {
    const quizForm = document.getElementById('quizForm');

    // === Bank of Questions ===
    let questionBank = [

    // === Multiple Choice Questions (10) ===
    {
        question: "Which habit best helps reduce plastic waste?",
        type: "mcq",
        options: [
            { value: "a", text: "Using reusable bags" },
            { value: "b", text: "Buying bottled water daily" }
        ],
        correct: "a"
    },
    {
        question: "Which energy source is renewable?",
        type: "mcq",
        options: [
            { value: "a", text: "Solar power" },
            { value: "b", text: "Coal" }
        ],
        correct: "a"
    },
    {
        question: "What gas mainly contributes to global warming?",
        type: "mcq",
        options: [
            { value: "a", text: "CO₂" },
            { value: "b", text: "Oxygen" }
        ],
        correct: "a"
    },
    {
        question: "What is the best way to save power in computer labs?",
        type: "mcq",
        options: [
            { value: "a", text: "Turn off monitors after use" },
            { value: "b", text: "Keep screens on all day" }
        ],
        correct: "a"
    },
    {
        question: "Which event promotes campus sustainability?",
        type: "mcq",
        options: [
            { value: "a", text: "Green Fair" },
            { value: "b", text: "Gaming Marathon" }
        ],
        correct: "a"
    },
    {
        question: "Which of the following is recyclable?",
        type: "mcq",
        options: [
            { value: "a", text: "Plastic bottles" },
            { value: "b", text: "Used tissues" }
        ],
        correct: "a"
    },
    {
        question: "Which action reduces water waste?",
        type: "mcq",
        options: [
            { value: "a", text: "Fixing leaking taps" },
            { value: "b", text: "Letting water run while brushing" }
        ],
        correct: "a"
    },
    {
        question: "Which transport method reduces carbon footprint?",
        type: "mcq",
        options: [
            { value: "a", text: "Walking or cycling" },
            { value: "b", text: "Driving alone" }
        ],
        correct: "a"
    },
    {
        question: "Which bin should paper waste go into?",
        type: "mcq",
        options: [
            { value: "a", text: "Blue recycling bin" },
            { value: "b", text: "General trash bin" }
        ],
        correct: "a"
    },
    {
        question: "Which is an example of e-waste?",
        type: "mcq",
        options: [
            { value: "a", text: "Old mobile phone" },
            { value: "b", text: "Banana peel" }
        ],
        correct: "a"
    },

    // === TRUE / FALSE Questions (10) ===
    {
        question: "Recycling helps reduce pollution.",
        type: "tf",
        correct: "true"
    },
    {
        question: "Fossil fuels are renewable energy sources.",
        type: "tf",
        correct: "false"
    },
    {
        question: "Turning off lights saves electricity.",
        type: "tf",
        correct: "true"
    },
    {
        question: "Plastic takes only 1 year to decompose.",
        type: "tf",
        correct: "false"
    },
    {
        question: "Trees absorb CO₂ and release oxygen.",
        type: "tf",
        correct: "true"
    },
    {
        question: "Solar energy is harmful to the environment.",
        type: "tf",
        correct: "false"
    },
    {
        question: "Reusing items helps reduce waste.",
        type: "tf",
        correct: "true"
    },
    {
        question: "Leaving devices charging overnight saves energy.",
        type: "tf",
        correct: "false"
    },
    {
        question: "Composting food scraps reduces landfill waste.",
        type: "tf",
        correct: "true"
    },
    {
        question: "Carpooling increases carbon emissions.",
        type: "tf",
        correct: "false"
    }
];


    // Shuffle function
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    // Get random X questions
    function getRandomQuestions(count) {
        let temp = [...questionBank];
        shuffle(temp);
        return temp.slice(0, count);
    }

    let selectedQuestions = [];

    // Render quiz dynamically
function renderQuiz() {
    selectedQuestions = getRandomQuestions(3);

    let html = `<fieldset><legend>Quick Quiz</legend>`;

    selectedQuestions.forEach((q, index) => {

        html += `<div class="form-group quiz-question">
                    <div>${index + 1}) ${q.question}</div>`;

        // ========== MCQ ==========
        if (q.type === "mcq") {
            shuffle(q.options);

            q.options.forEach(opt => {
                html += `
                    <label class="checkbox">
                        <input type="radio" name="q${index}" value="${opt.value}">
                        <span class="checkmark"></span>
                        ${opt.text}
                    </label>
                `;
            });
        }

        // ========== TRUE / FALSE ==========
        else if (q.type === "tf") {
            html += `
                <label class="checkbox">
                    <input type="radio" name="q${index}" value="true">
                    <span class="checkmark"></span> True
                </label>

                <label class="checkbox">
                    <input type="radio" name="q${index}" value="false">
                    <span class="checkmark"></span> False
                </label>
            `;
        }

        html += `</div><br>`;
    });

    html += `<button class="btn btn-primary" type="button" id="submitBtn">Submit</button></fieldset>`;

    quizForm.innerHTML = html;

    document.getElementById("submitBtn").addEventListener("click", calculateScore);
}


    // Calculate score
    function calculateScore() {
        let score = 0;
        let allAnswered = true;

        selectedQuestions.forEach((q, i) => {
            let answer = document.querySelector(`input[name="q${i}"]:checked`);
            if (!answer) allAnswered = false;
            if (answer?.value === q.correct) score++;
        });

        if (!allAnswered) {
            alert("Please answer all questions before submitting!");
            return;
        }

        // Points system
        const isLoggedIn = localStorage.getItem("isLoggedIn");
        let pointsEarned = score * 10;

        if (isLoggedIn) {
            let userData = JSON.parse(localStorage.getItem("userData") || "{}");
            userData.points = (userData.points || 0) + pointsEarned;
            localStorage.setItem("userData", JSON.stringify(userData));
        }

        alert(`You scored ${score}/3! ${isLoggedIn ? `\nEarned ${pointsEarned} points!` : ""}`);

        // Reload quiz with new random questions
        renderQuiz();
    }

    renderQuiz();
}
// ===============================
// LEADERBOARD PAGE FUNCTIONALITY
// ===============================

function initLeaderboardPage() {
    const filterForm = document.querySelector('form');
    const departmentFilter = document.querySelector('select[name="dept"]');
    const timeRangeFilter = document.querySelector('select[name="range"]');

    if (filterForm) {
        filterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const department = departmentFilter?.value;
            const timeRange = timeRangeFilter?.value;
            alert(`Filters applied: ${department || 'All Departments'}, ${timeRange || 'All Time'}`);
        });
    }

    const paginationLinks = document.querySelectorAll('nav[aria-label="Leaderboard pages"] a');
    paginationLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Navigating to page:', this.textContent);
        });
    });
}

// ===============================
// EVENTS PAGE FUNCTIONALITY
// ===============================

function initEventsPage() {
    const registerButtons = document.querySelectorAll('.event-card .btn-primary');
    registerButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const eventTitle = this.parentElement.querySelector('h4').textContent;
            const isLoggedIn = localStorage.getItem('isLoggedIn');

            if (!isLoggedIn) {
                alert('Please log in to register for events');
                window.location.href = 'login.html';
                return;
            }

            this.textContent = 'Registered ✓';
            this.disabled = true;
            this.style.backgroundColor = '#4a9a66';
            
            alert(`Successfully registered for "${eventTitle}"!`);
        });
    });
}

// ===============================
// USER PAGE FUNCTIONALITY
// ===============================

function initUserPage() {
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    const isLoggedIn = localStorage.getItem('isLoggedIn');

    if (!isLoggedIn) {
        window.location.href = 'login.html';
        return;
    }

    const pointsElement = document.querySelector('h2');
    if (pointsElement && pointsElement.textContent.includes('Eco Points')) {
        pointsElement.innerHTML = `Eco Points: <span>${userData.points || 0}</span>`;
    }

    const level = Math.floor((userData.points || 0) / 100);
    const nextLevelPoints = (level + 1) * 100;
    
    const levelElement = document.querySelector('p');
    if (levelElement && levelElement.textContent.includes('Level')) {
        levelElement.textContent = `Level: ${level} | Next level at ${nextLevelPoints} pts`;
    }
}

// ===============================
// CONTACT FORM FUNCTIONALITY
// ===============================

function initContactForm() {
    const contactForm = document.querySelector('.login-form');
    if (!contactForm) return;

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name')?.value;
        const email = document.getElementById('email')?.value;
        const message = document.getElementById('message')?.value;

        if (name && email && message) {
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        } else {
            alert('Please fill in all fields.');
        }
    });
}

// ===============================
// RESOURCES PAGE FUNCTIONALITY - Aryam
// ===============================

function initResourcesPage() {
    const yearSpan = document.getElementById("year");
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    const tips = [
        "Use a reusable water bottle instead of plastic.",
        "Turn off lights when you leave the room.",
        "Sort your waste correctly.",
        "Bring your own cup to campus cafés.",
        "Take shorter showers to save water.",
        "Use natural light instead of lamps.",
        "Unplug chargers when not in use.",
        "Use reusable bags instead of plastic.",
        "Recycle paper and plastic properly."
    ];

    const tipEl = document.getElementById("dailyTip");
    if (tipEl && tips.length > 0) {
        const randomTip = tips[Math.floor(Math.random() * tips.length)];
        tipEl.textContent = "Daily Tip: " + randomTip;
    }

    const searchForm = document.querySelector("main form[role='search']");
    if (!searchForm) return; 

    const searchInput = searchForm.querySelector("input[name='q']");
    const categorySelect = searchForm.querySelector("select[name='category']");

    const articleSection = document.querySelector("section[aria-labelledby='articles-title']");
    const videoSection = document.querySelector("section[aria-labelledby='videos-title']");
    const downloadsSection = document.querySelector("section[aria-labelledby='downloads-title']");

    const articleCards = articleSection ? Array.from(articleSection.querySelectorAll("article")) : [];
    const videoCards = videoSection ? Array.from(videoSection.querySelectorAll("figure")) : [];
    const downloadItems = downloadsSection ? Array.from(downloadsSection.querySelectorAll("li")) : [];

    const allItems = [...articleCards, ...videoCards, ...downloadItems];

    // Set categories
    if (articleCards[0]) articleCards[0].dataset.category = "energy";
    if (articleCards[1]) articleCards[1].dataset.category = "recycling";
    if (articleCards[2]) articleCards[2].dataset.category = "recycling";
    if (videoCards[0]) videoCards[0].dataset.category = "events";
    if (videoCards[1]) videoCards[1].dataset.category = "recycling";
    if (downloadItems[0]) downloadItems[0].dataset.category = "energy";
    if (downloadItems[1]) downloadItems[1].dataset.category = "recycling";
    if (downloadItems[2]) downloadItems[2].dataset.category = "water";

    function filterResources() {
        const term = (searchInput.value || "").trim().toLowerCase();
        const category = (categorySelect.value || "").trim().toLowerCase();

        allItems.forEach((el) => {
            const text = el.textContent.toLowerCase();
            const itemCategory = (el.dataset.category || "").toLowerCase();

            let matchTerm = false;
            if (!term) {
                matchTerm = true;
            } else if (text.includes(term)) {
                matchTerm = true;
            } else if (term === "video" || term === "videos") {
                matchTerm = el.tagName.toLowerCase() === "figure"; 
            } else if (term === "article" || term === "articles" || term === "artical") {
                matchTerm = el.tagName.toLowerCase() === "article";
            } else if (term === "download" || term === "guide" || term === "pdf") {
                matchTerm = el.tagName.toLowerCase() === "li";
            }

            const matchCategory = !category || itemCategory === category;

            if (matchTerm && matchCategory) {
                el.style.display = "";
                el.classList.add("filtered-result");
            } else {
                el.style.display = "none";
                el.classList.remove("filtered-result");
            }
        });
    }

    searchForm.addEventListener("submit", (e) => {
        e.preventDefault();
        filterResources();
    });

    if (searchInput) searchInput.addEventListener("input", filterResources);
    if (categorySelect) categorySelect.addEventListener("change", filterResources);
}

// ===============================
// LEADERBOARD PAGE FUNCTIONALITY - Aryam
// ===============================


function initLeaderboardPage() {
    const filterForm = document.querySelector('form');
    const departmentFilter = document.querySelector('select[name="dept"]');
    const timeRangeFilter = document.querySelector('select[name="range"]');

    if (filterForm) {
        filterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const department = departmentFilter?.value;
            const timeRange = timeRangeFilter?.value;
            
            // In a real app, you would filter data here
            console.log(`Filtering by: Department=${department}, Time Range=${timeRange}`);
            
            // For now, just show a message
            alert(`Filters applied: ${department || 'All Departments'}, ${timeRange || 'All Time'}`);
        });
    }

    // Pagination functionality
    const paginationLinks = document.querySelectorAll('nav[aria-label="Leaderboard pages"] a');
    paginationLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            // In a real app, you would load the corresponding page
            console.log('Navigating to page:', this.textContent);
        });
    });
}

// JS for Leaderboard by Aryam
document.addEventListener("DOMContentLoaded", () => {
  updateYear();
  setupDailyTip();
  initLeaderboardFilters();
});

/* Footer year*/
function updateYear() {
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
}

/* Daily Tip */
function setupDailyTip() {
  const tips = [
    "Use a reusable water bottle instead of plastic.",
    "Turn off lights when you leave the room.",
    "Sort your waste correctly.",
    "Bring your own cup to campus cafés.",
    "Take shorter showers to save water.",
    "Use natural light instead of lamps.",
    "Unplug chargers when not in use.",
    "Use reusable bags instead of plastic.",
    "Recycle paper and plastic properly."
  ];

  const tipEl = document.getElementById("dailyTip");
  if (tipEl && tips.length > 0) {
    const randomTip = tips[Math.floor(Math.random() * tips.length)];
    tipEl.textContent = "Daily Tip: " + randomTip;
  }
}

/* Leaderboard filters (Department + Time Range) */
function initLeaderboardFilters() {
  const table = document.querySelector(".leaderboard-table");
  const filterForm = document.querySelector(".filter-form");
  if (!table || !filterForm) return; 

  const deptSelect = document.getElementById("dept");
  const rangeSelect = document.getElementById("range");
  const boardTitle = document.getElementById("board-title");
  const rows = Array.from(table.querySelectorAll("tbody tr"));

  const rowData = rows.map((row, index) => {
    const cells = row.querySelectorAll("td");
    const dept = cells[2]?.textContent.trim(); 

   
    let ranges = "all";
    if (index === 0) ranges = "all,month,week";      
    else if (index === 1) ranges = "all,month,week"; 
    else if (index === 2) ranges = "all,month";      
    else if (index === 3) ranges = "all,week";       
    else if (index === 4) ranges = "all,week";      

    row.dataset.dept = dept;
    row.dataset.ranges = ranges;

    return { row, dept, ranges };
  });

  function applyLeaderboardFilters(e) {
    if (e) e.preventDefault();

    const selectedDept = (deptSelect?.value || "").trim();  
    const selectedRange = (rangeSelect?.value || "all").trim(); 

    rowData.forEach(({ row, dept, ranges }) => {
      const deptMatch = !selectedDept || dept === selectedDept;
      const rangeList = ranges.split(","); // ["all","month",...]
      const rangeMatch = selectedRange === "all" || rangeList.includes(selectedRange);

      if (deptMatch && rangeMatch) {
        row.style.display = "";
      } else {
        row.style.display = "none";
      }
    });

    if (boardTitle) {
      if (selectedRange === "month") {
        boardTitle.textContent = "This Month's Rankings";
      } else if (selectedRange === "week") {
        boardTitle.textContent = "This Week's Rankings";
      } else {
        boardTitle.textContent = "All-time Rankings";
      }
    }
  }

  filterForm.addEventListener("submit", applyLeaderboardFilters);
  if (deptSelect) deptSelect.addEventListener("change", applyLeaderboardFilters);
  if (rangeSelect) rangeSelect.addEventListener("change", applyLeaderboardFilters);
}

function setupPagination() {
  const table = document.querySelector(".leaderboard-table");
  const pagination = document.querySelector(".pagination");

  if (!table || !pagination) return;

  const rows = Array.from(table.querySelectorAll("tbody tr"));
  const totalPages = 5;
  const rowsPerPage = Math.ceil(rows.length / totalPages);

  let currentPage = 1;

  pagination.innerHTML = `
    <button class="prev">« Prev</button>
    <button class="page-num" data-page="1">1</button>
    <button class="page-num" data-page="2">2</button>
    <button class="page-num" data-page="3">3</button>
    <button class="page-num" data-page="4">4</button>
    <button class="page-num" data-page="5">5</button>
    <button class="next">Next »</button>
  `;

  const prevBtn = pagination.querySelector(".prev");
  const nextBtn = pagination.querySelector(".next");
  const pageButtons = pagination.querySelectorAll(".page-num");

  function showPage(page) {
    currentPage = page;

    rows.forEach((row) => (row.style.display = "none"));

    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    rows.slice(start, end).forEach((row) => {
      row.style.display = "";
    });

    updateButtons();
  }

  function updateButtons() {
    pageButtons.forEach((btn) => {
      const num = Number(btn.dataset.page);
      btn.classList.toggle("active-page", num === currentPage);
    });

    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;
  }

  pageButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const num = Number(btn.dataset.page);
      if (num !== currentPage) showPage(num);
    });
  });

  prevBtn.addEventListener("click", () => {
    if (currentPage > 1) showPage(currentPage - 1);
  });

  nextBtn.addEventListener("click", () => {
    if (currentPage < totalPages) showPage(currentPage + 1);
  });

  showPage(1);
}

document.addEventListener("DOMContentLoaded", () => {
  updateYear();
  setupDailyTip();
  initLeaderboardFilters();
  setupPagination(); 
});
/*End JS of Leaderboard page by Aryam*/
// ===============================
// INITIALIZATION
// ===============================

document.addEventListener('DOMContentLoaded', function() {
    setCurrentYear();

    const path = window.location.pathname;
    const page = path.split('/').pop();

    switch(page) {
        case 'home.html':
        case 'index.html':
        case '':
            initHomePage();
            break;
        case 'login.html':
            initLoginPage();
            break;
        case 'EcoCampusHub_R3.html':
            initRegistrationPage();
            break;
        case 'EcoCampusHub_P9.html':
            initProfilePage();
            break;
        case 'Eco-Challenges.html':
            initChallengesPage();
            break;
        case 'quiz.html':
            initQuizPage();
            break;
        case 'leaderboard.html':
            initLeaderboardPage();
            break;
        case 'event.html':
            initEventsPage();
            break;
        case 'Uesr-page.html':
            initUserPage();
            break;
        case 'about-us.html':
            initContactForm();
            break;
        case 'resources.html':
            initResourcesPage();
            break;
    }

    const protectedPages = ['EcoCampusHub_P9.html', 'Uesr-page.html', 'Eco-Challenges.html'];
    if (protectedPages.includes(page) && !localStorage.getItem('isLoggedIn')) {
        window.location.href = 'login.html';
    }
});
