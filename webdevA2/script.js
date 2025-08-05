// hamburger menu thing
const hamburgerMenu = document.getElementById('hamburger-menu');
const navBtn = document.querySelector('.nav-btn');

hamburgerMenu.addEventListener('click', function () {
    navBtn.classList.toggle('show');
});

// section hiding management
const navButtons = document.querySelectorAll('.nav-btn button');
const section = document.querySelectorAll('.section');

function hideAllSection() {
    section.forEach(function (section) {
        section.classList.remove('active', 'show');
    });
    const intervalQuiz = document.getElementById('interval-quiz');
    intervalQuiz.style.transition = 'none';
    intervalQuiz.classList.remove('expanded');
    setTimeout(function () {
        intervalQuiz.style.transition = '';
    }, 0); // instant
}

function showSection(sectionId) {
    hideAllSection();
    const sectionToShow = document.getElementById(sectionId);
    sectionToShow.classList.add('active');
    setTimeout(function () {
        sectionToShow.classList.add('show');
    }, 10); // let css be applied before showing transition 
}

navButtons.forEach(function (button) {
    button.addEventListener('click', function () {
        const sectionId = button.id.replace('-btn', '');
        showSection(sectionId);
    });
});

showSection('home');

// playing audio from image map
const areas = document.querySelectorAll('area');
const imageMapAudio = document.getElementById('image-map-audio');

areas.forEach(function (area) {
    area.addEventListener('click', function () {
        const soundFile = area.getAttribute('data-sound');
        imageMapAudio.src = soundFile;
        imageMapAudio.play();
    });
});

// quiz button styling
document.getElementById('interval-quiz-button').addEventListener('click', function () {
    var quizSection = document.getElementById('interval-quiz');
    quizSection.classList.toggle('expanded');
});

// quiz stuff
let score = 0;
let questions = document.querySelectorAll('.question');

// Question 1 mcq
questions[0].querySelector('.check-btn').addEventListener('click', function () {
    let selectedAnswer = document.querySelector('input[name="q1"]:checked').value;
    let questionDiv = questions[0];
    if (selectedAnswer === '4th') {
        questionDiv.classList.add('correct');
        score++;
        questionDiv.querySelector('.result').innerHTML = '&#10004;';
    } else {
        questionDiv.classList.add('incorrect');
        questionDiv.querySelector('.result').innerHTML = '&#10006; Correct answer: 4th';
    }
});

// Question 2 open ended
questions[1].querySelector('.check-btn').addEventListener('click', function () {
    let answer = document.getElementById('q2A').value.trim().toLowerCase();
    let questionDiv = questions[1];
    if (answer === '7th' || answer === '7') {
        questionDiv.classList.add('correct');
        score++;
        questionDiv.querySelector('.result').innerHTML = '&#10004;';
    } else {
        questionDiv.classList.add('incorrect');
        questionDiv.querySelector('.result').innerHTML = '&#10006; Correct answer: 7th';
    }
});

// Question 3 checkbox
questions[2].querySelector('.check-btn').addEventListener('click', function () {
  let questionDiv = questions[2];
  let correctAnswers = ['diffPitch', 'pastOctave'];
  let selectedAnswers = [];
  questionDiv.querySelectorAll('input[type="checkbox"]:checked').forEach(function (input) {
    selectedAnswers.push(input.value);
  });
  selectedAnswers.sort();
  correctAnswers.sort();
  if (selectedAnswers.join(',') === correctAnswers.join(',')) {
    questionDiv.classList.add('correct');
    score++;
    questionDiv.querySelector('.result').innerHTML = '&#10004;';
  } else {
    questionDiv.classList.add('incorrect');
    questionDiv.querySelector('.result').innerHTML = '&#10006; Correct answers: Intervals is the difference in pitch of two notes, Intervals can go past an octave';
  }
});

// Final score
document.querySelectorAll('.check-btn').forEach(function (btn, index) {
  btn.addEventListener('click', function () {
    if (index === questions.length - 1) {
      document.querySelector('.final-score').innerHTML = 'Final score: ' + score + ' / ' + questions.length;
    }
  });
});

// reset quiz
document.querySelector('.reset-quiz-btn').addEventListener('click', function () {
    score = 0;
    questions.forEach(function (question) {
        question.classList.remove('correct', 'incorrect');
        question.querySelector('.result').innerHTML = '';
    });
    document.querySelector('.final-score').innerHTML = '';
    document.querySelectorAll('input[type="radio"]').forEach(function (input) {
        input.checked = false;
    });
    document.querySelectorAll('input[type="checkbox"]').forEach(function (input) {
        input.checked = false;
    });
    document.getElementById('q2A').value = '';
});

// staff drawing minigame
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let isDrawing = false;
let lastX, lastY;
let lineWidth = 5;
let strokeColor = '#000000';

// Change stroke colour
document.getElementById('stroke').addEventListener('change', function(event) {
  strokeColor = event.target.value;
});

// Change line width
document.getElementById('line-width').addEventListener('change', function(event) {
  lineWidth = event.target.value;
});

// Clear canvas
document.getElementById('clear').addEventListener('click', function() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// Function to get touch or mouse position
function getPosition(event) {
  if (event.touches) {
    return {
      x: event.touches[0].clientX - canvas.offsetLeft,
      y: event.touches[0].clientY - canvas.offsetTop
    };
  } else {
    return {
      x: event.offsetX,
      y: event.offsetY
    };
  }
}

// handling of touch and mouse inputs to draw lines
canvas.addEventListener('mousedown', function(event) {
  isDrawing = true;
  let pos = getPosition(event);
  lastX = pos.x;
  lastY = pos.y;
  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
});

canvas.addEventListener('touchstart', function(event) {
  isDrawing = true;
  let pos = getPosition(event);
  lastX = pos.x;
  lastY = pos.y;
  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
});

canvas.addEventListener('mousemove', function(event) {
  if (isDrawing) {
    let pos = getPosition(event);
    let x = pos.x;
    let y = pos.y;
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = strokeColor;
    ctx.lineCap = 'round';
    ctx.lineTo(x, y);
    ctx.stroke();
    lastX = x;
    lastY = y;
  }
});

canvas.addEventListener('touchmove', function(event) {
  event.preventDefault(); // prevent scroll
  if (isDrawing) {
    let pos = getPosition(event);
    let x = pos.x;
    let y = pos.y;
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = strokeColor;
    ctx.lineCap = 'round';
    ctx.lineTo(x, y);
    ctx.stroke();
    lastX = x;
    lastY = y;
  }
});

canvas.addEventListener('mouseup', function() {
  isDrawing = false;
});

canvas.addEventListener('touchend', function() {
  isDrawing = false;
});
