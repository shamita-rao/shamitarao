document.addEventListener('DOMContentLoaded', () => {
    const questions = document.querySelectorAll('.question-card');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const submitBtn = document.querySelector('.submit-btn');
    const resultCard = document.querySelector('.result-card');
    const scoreElement = document.querySelector('#score');
    const downloadBtn = document.querySelector('#download-card');
    const quizContent = document.querySelector('.quiz-content');
    const progressBar = document.createElement('div');
    let currentQuestionIndex = 0;
    let score = 0;

    // Create and style progress bar
    progressBar.className = 'progress-bar';
    Object.assign(progressBar.style, {
        height: '4px',
        backgroundColor: '#D7A3B8',
        width: '0%',
        position: 'fixed',
        top: '0',
        left: '0',
        transition: 'width 0.3s ease',
        zIndex: '100',
    });
    document.body.prepend(progressBar);

    // Correct answers
    const answers = {
        q1: "2", q2: "1", q3: "3", q4: "2", q5: "2",
        q6: "3", q7: "2", q8: "1", q9: "3", q10: "3"
    };

    // Show current question and update navigation
    const showQuestion = (index) => {
        questions.forEach((question, i) => {
            question.classList.toggle('active', i === index);
        });
        prevBtn.style.display = index === 0 ? 'none' : 'block';
        nextBtn.style.display = index === questions.length - 1 ? 'none' : 'block';
        submitBtn.style.display = index === questions.length - 1 ? 'block' : 'none';
        updateProgress();
    };

    // Update progress bar
    const updateProgress = () => {
        const answered = document.querySelectorAll('input[type="radio"]:checked').length;
        progressBar.style.width = `${(answered / questions.length) * 100}%`;
    };

    // Navigation handlers
    const navigateQuestion = (direction) => {
        currentQuestionIndex += direction;
        showQuestion(currentQuestionIndex);
    };

    nextBtn.addEventListener('click', () => navigateQuestion(1));
    prevBtn.addEventListener('click', () => navigateQuestion(-1));

    // Submit quiz handler
    submitBtn.addEventListener('click', () => {
        // Calculate final score
        score = Object.entries(answers).reduce((total, [question, correctAnswer]) => {
            const userAnswer = document.querySelector(`input[name="${question}"]:checked`);
            return total + (userAnswer && userAnswer.value === correctAnswer ? 1 : 0);
        }, 0);

        // Hide quiz interface
        [quizContent, prevBtn, nextBtn, submitBtn, progressBar].forEach(el => el.style.display = 'none');

        // Show results
        scoreElement.textContent = score;
        resultCard.classList.remove('hidden');
        resultCard.scrollIntoView({ behavior: 'smooth' });

        // Add celebratory effect if score is high
        if (score >= 8) {
            resultCard.style.animation = 'celebrate 0.5s ease';
            setTimeout(() => resultCard.style.animation = '', 500);
        }
    });

    // Download score handler - PNG version (using canvas)
    const generateCanvas = () => {
        const canvas = document.createElement('canvas');
        canvas.width = 800;
        canvas.height = 600;
        const ctx = canvas.getContext('2d');

        // Background styling
        ctx.fillStyle = '#1e1e1e';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Add decorative elements
        ctx.fillStyle = '#D7A3B8';
        ctx.beginPath();
        ctx.arc(100, 100, 50, 0, Math.PI * 2);
        ctx.fill();

        // Main text styling
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 36px "Playfair Display", serif';
        ctx.textAlign = 'center';
        ctx.fillText("How Well Do You Know Shamita?", canvas.width / 2, 100);

        // Score display
        ctx.font = 'bold 72px "Inter", sans-serif';
        ctx.fillStyle = '#D7A3B8';
        ctx.fillText(`${score}/10`, canvas.width / 2, 250);

        // Percentage
        ctx.font = '24px "Inter", sans-serif';
        ctx.fillStyle = '#B8B8B8';
        ctx.fillText(`That's ${score * 10}% correct!`, canvas.width / 2, 300);

        // Date
        ctx.font = '18px "Inter", sans-serif';
        ctx.fillText(`Quiz taken on: ${new Date().toLocaleDateString()}`, canvas.width / 2, 350);

        // Contact info
        ctx.font = '20px "Inter", sans-serif';
        ctx.fillStyle = '#FFC2C8';
        ctx.fillText("Connect with Shamita!:", canvas.width / 2, 420);
        ctx.font = '18px "Inter", sans-serif';
        ctx.fillStyle = '#B8B8B8';
        ctx.fillText("Email: shamita@umich.edu", canvas.width / 2, 460);
        ctx.fillText("LinkedIn: linkedin.com/in/shamitarao", canvas.width / 2, 490);
        ctx.fillText("GitHub: github.com/shamita-rao", canvas.width / 2, 520);

        return canvas;
    };

    downloadBtn.addEventListener('click', () => {
        const canvas = generateCanvas();
        canvas.toBlob((blob) => {
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = `Shamita-Quiz-Score-${score}-10.png`;
            link.click();
        }, 'image/png');
    });

    // Initialize first question
    showQuestion(currentQuestionIndex);
});