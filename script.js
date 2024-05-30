document.addEventListener("DOMContentLoaded", function() {
    const homeLink = document.getElementById("home");
    const subjectsLink = document.getElementById("subjects");
    const practiceLink = document.getElementById("practice");
    const aboutLink = document.getElementById("about");
    const contactLink = document.getElementById("contact");

    const contentDiv = document.getElementById("content");

    // Sample subjects and questions
    const subjects = [
        { name: "Mathematics", questions: [
            { question: "What is 2 + 2?", options: ["3", "4", "5", "6"], answer: "4" },
            { question: "What is the area of a square with side length 5?", options: ["15", "20", "25", "30"], answer: "25" },
            { question: "Simplify 3x + 5x - 2x.", options: ["6x", "5x", "8x", "10x"], answer: "6x" }
        ]},
        { name: "Science", questions: [
            { question: "What is photosynthesis?", options: ["A process of making electricity from light", "A process of making food by plants using sunlight", "A process of converting water into oxygen", "A process of converting carbon dioxide into water"], answer: "A process of making food by plants using sunlight" },
            { question: "What are the three states of matter?", options: ["Solid, gas, plasma", "Liquid, gas, plasma", "Solid, liquid, gas", "Solid, liquid, plasma"], answer: "Solid, liquid, gas" },
            { question: "What is Newton's first law of motion?", options: ["Every action has an equal and opposite reaction", "Force equals mass times acceleration", "An object at rest will stay at rest and an object in motion will stay in motion unless acted upon by an external force", "An object will float if its density is less than the density of the fluid it is placed in"], answer: "An object at rest will stay at rest and an object in motion will stay in motion unless acted upon by an external force" }
        ]}
    ];

    // Event listeners for navigation links
    homeLink.addEventListener("click", function(event) {
        event.preventDefault();
        setContent("Welcome to the Marugame Study Website!", "Select a subject from the navigation to get started.");
    });

    subjectsLink.addEventListener("click", function(event) {
        event.preventDefault();
        let subjectList = "<h2>Subjects</h2><ul>";
        subjects.forEach(subject => {
            subjectList += `<li><a href="#" class="subject-link">${subject.name}</a></li>`;
        });
        subjectList += "</ul>";
        setContent("Subjects", subjectList);
        const subjectLinks = document.querySelectorAll(".subject-link");
        subjectLinks.forEach((link, index) => {
            link.addEventListener("click", function(event) {
                event.preventDefault();
                displayQuestions(subjects[index]);
            });
        });
    });

    practiceLink.addEventListener("click", function(event) {
        event.preventDefault();
        setContent("Practice", "Choose a subject from the Subjects tab to start practicing.");
    });

    aboutLink.addEventListener("click", function(event) {
        event.preventDefault();
        setContent("About", "Learn more about the Marugame Study Website and its purpose.");
    });

    contactLink.addEventListener("click", function(event) {
        event.preventDefault();
        setContent("Contact", "Get in touch with us if you have any questions or feedback.");
    });

    // Function to set content in the main section
    function setContent(title, content) {
        contentDiv.innerHTML = `<h2>${title}</h2>${content}`;
    }

    // Function to display questions for a subject
    function displayQuestions(subject) {
        let questionsHTML = `<h2>${subject.name} Questions</h2>`;
        subject.questions.forEach((question, index) => {
            questionsHTML += `<div class="question">
                                <p>${index + 1}. ${question.question}</p>
                                <form id="form${index}">
                                    ${question.options.map((option, i) => `<input type="radio" id="q${index}o${i}" name="q${index}" value="${option}">
                                                                        <label for="q${index}o${i}">${option}</label><br>`).join('')}
                                    <button type="submit">Check Answer</button>
                                    <p id="feedback${index}"></p>
                                </form>
                              </div>`;
        });
        contentDiv.innerHTML = questionsHTML;
        subject.questions.forEach((question, index) => {
            const form = document.getElementById(`form${index}`);
            form.addEventListener('submit', function(event) {
                event.preventDefault();
                const selectedOption = form.querySelector('input[name="q'+index+'"]:checked');
                if (selectedOption) {
                    const userAnswer = selectedOption.value;
                    if (userAnswer === question.answer) {
                        document.getElementById(`feedback${index}`).innerHTML = "<span style='color: green;'>Correct!</span>";
                    } else {
                        document.getElementById(`feedback${index}`).innerHTML = "<span style='color: red;'>Incorrect. Please try again.</span>";
                    }
                } else {
                    document.getElementById(`feedback${index}`).innerHTML = "<span style='color: red;'>Please select an option.</span>";
                }
            });
        });
    }
});
