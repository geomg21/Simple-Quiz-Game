const quizData = [
    {
      question: 'What is the correct way to declare a variable in JavaScript?',
      options: ['variable x = 10;', 'var x = 10; ', 'x = 10; ', 'int x = 10;'],
      answer: 'var x = 10;',
    },
    {
      question: 'How do you check if a variable is an array in JavaScript? ',
      options: [' isArray(x) ', 'x.isArray() ', ' x instanceof Array ', ' typeof Array '],
      answer: 'isArray(x) ',
    },
    {
      question: 'How do you properly comment on a single line in JavaScript? ',
      options: ['# This is a comment. ', '// This is a comment. ', ' /* This is a comment. */ ', '<!-- This is a comment. --> '],
      answer: '// This is a comment.',
    },
    {
      question: ' Which loop is guaranteed to execute the block of code at least once? ',
      options: ['for loop', 'do...while loop ', 'while loop ', 'none'],
      answer: 'do...while loop ',
    },
    {
      question: 'Which operator is used to combine two or more strings in JavaScript?',
      options: [
        ' && ',
        ' || ',
        '+ ',
        '- ',
      ],
      answer: '+ ',
    },
    {
      question: ' Which comparison operator checks for both value and type equality in JavaScript?',
      options: ['== ', '=== ', '=', ' <=> '],
      answer: '===',
    },
    {
      question: ' What is the index of the first element in an array? ',
      options: [
        '0',
        '-1',
        '1 ',
        '10 ',
      ],
      answer: '0 ',
    },
    {
      question: 'What keyword is used to return a value from a JavaScript function?',
      options: ['value ', 'result ', 'return ', 'output '],
      answer: 'return ',
    },
    {
      question: 'Which keyword is used to refer to the current instance of a class inside its methods?',
      options: [
        'self ',
        'this ',
        'it ',
        'current ',
      ],
      answer: 'this ',
    },
    {
      question: 'Which keyword is used to declare block-scoped variables in ES6? ',
      options: ['var ', 'let ', 'const ', 'variable '],
      answer: 'let ',
    },
  ];
  
  const quizContainer = document.getElementById('quiz');
  const resultContainer = document.getElementById('result');
  const submitButton = document.getElementById('submit');
  const retryButton = document.getElementById('retry');
  const showAnswerButton = document.getElementById('showAnswer');
  
  let currentQuestion = 0;
  let score = 0;
  let incorrectAnswers = [];
  
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
  function displayQuestion() {
    const questionData = quizData[currentQuestion];
  
    const questionElement = document.createElement('div');
    questionElement.className = 'question';
    questionElement.innerHTML = questionData.question;
  
    const optionsElement = document.createElement('div');
    optionsElement.className = 'options';
  
    const shuffledOptions = [...questionData.options];
    shuffleArray(shuffledOptions);
  
    for (let i = 0; i < shuffledOptions.length; i++) {
      const option = document.createElement('label');
      option.className = 'option';
  
      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = 'quiz';
      radio.value = shuffledOptions[i];
  
      const optionText = document.createTextNode(shuffledOptions[i]);
  
      option.appendChild(radio);
      option.appendChild(optionText);
      optionsElement.appendChild(option);
    }
  
    quizContainer.innerHTML = '';
    quizContainer.appendChild(questionElement);
    quizContainer.appendChild(optionsElement);
  }
  
  function checkAnswer() {
    const selectedOption = document.querySelector('input[name="quiz"]:checked');
    if (selectedOption) {
      const answer = selectedOption.value;
      if (answer === quizData[currentQuestion].answer) {
        score++;
      } else {
        incorrectAnswers.push({
          question: quizData[currentQuestion].question,
          incorrectAnswer: answer,
          correctAnswer: quizData[currentQuestion].answer,
        });
      }
      currentQuestion++;
      selectedOption.checked = false;
      if (currentQuestion < quizData.length) {
        displayQuestion();
      } else {
        displayResult();
      }
    }
  }
  
  function displayResult() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'inline-block';
    resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
  }
  
  function retryQuiz() {
    currentQuestion = 0;
    score = 0;
    incorrectAnswers = [];
    quizContainer.style.display = 'block';
    submitButton.style.display = 'inline-block';
    retryButton.style.display = 'none';
    showAnswerButton.style.display = 'none';
    resultContainer.innerHTML = '';
    displayQuestion();
  }
  
  function showAnswer() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'none';
  
    let incorrectAnswersHtml = '';
    for (let i = 0; i < incorrectAnswers.length; i++) {
      incorrectAnswersHtml += `
        <p>
          <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
          <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
          <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
        </p>
      `;
    }
  
    resultContainer.innerHTML = `
      <p>You scored ${score} out of ${quizData.length}!</p>
      <p>Incorrect Answers:</p>
      ${incorrectAnswersHtml}
    `;
  }
  
  submitButton.addEventListener('click', checkAnswer);
  retryButton.addEventListener('click', retryQuiz);
  showAnswerButton.addEventListener('click', showAnswer);
  
  displayQuestion();