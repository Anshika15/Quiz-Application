const questions = [
    {
        title : 'In binary heap, whenever the root is removed then the rightmost element of last level is replaced by the root. Why?',
        options : [
            'It is the easiest possible way.', 
            'To make sure that it is still complete binary tree.', 
            'Because left and right subtree might be missing.', 
            'None of the above!'
        ],
        answer : '1',
        score : 1
    },
    {
        title : 'Which of these alogrithmic approach tries to achieve localized optimum solution ?',
        options : [
            'Greedy approach',
            'Divide and conquer approach',
            'Dynamic approach',
            'All of the above'
        ],
        answer : '0',
        score : 1
    },
    {
        title : 'In the deletion operation of max heap, the root is replaced by ?',
        options : [
            'next available value in the left sub-tree.',
            'next available value in the right sub-tree.',
            'any random value from the heap.',
            'last element of the last level'
        ],
        answer : '3',
        score : 1
    },
    {
        title : "If we choose Prim's Algorithm for uniquely weighted spanning tree instead of Kruskal's Algorithm, then ?",
        options : [
            "we'll get a different spanning tree.",
            "we'll get the same spanning tree.",
            'spanning will have less edges.',
            'spanning will not cover all vertices.'
        ],
        answer : '1',
        score : 1
    },
    {
        title : 'In order traversal of binary search tree will produce ?',
        options : [
            'unsorted list',
            'reverse of input',
            'sorted list',
            'none of the above'
        ],
        answer : '2',
        score : 1
    },
    {
        title : 'Given a hash table T with 25 slots that stores 2000 elements, the load factor α for T is ?',
        options : [
            '80',
            '0.0125',
            '8000',
            '1.25'
        ],
        answer : '0',
        score : 1
    },
    {
        title : 'A stable sorting algorithm ?',
        options : [
            'does not crash.',
            'does not run out of memory.',
            'does not change the sequence of appearance of elements.',
            'does not exists.'
        ],
        answer : '0',
        score : 1
    },
    {
        title : 'Which one of the following is an application of Queue Data Structure ?',
        options : [
            'When a resource is shared among multiple consumers.',
            'When data is transferred asynchronously (data not necessarily received at same rate as sent) between two processes',
            'Load Balancing',
            'All of the above'
        ],
        answer : '3',
        score : 1
    },
    {
        title : 'How many undirected graphs (not necessarily connected) can be constructed out of a given set V= {V 1, V 2,…V n} of n vertices ?',
        options : [
            'n(n-l)/2',
            '2^n',
            'n!',
            '2^(n(n-1)/2)'
        ],
        answer : '3',
        score : 1
    },
    {
        title : 'Which of the following bitwise operations will you use to set a particular bit to 1?',
        options : [
            'OR',
            'XOR',
            'AND',
            'NOR'
        ],
        answer : '0',
        score : 1
    }
];

var question;
var questionNum;
var reset;
var labels;
var form;
var score;

function start()
{
    document.body.innerHTML = `<h1 class = "quiz-heading" >Quiz</h1>

    <div class="app-body">
    <h1 class="answer-key">Answer Key</h1>

    <div class="question-card">

        <h3><div id="question"></div></h3>
         <form onsubmit="myFunction()">
                <input type="radio" id="op1" name="op" value="0">
                <label for="op1">op1</label>

                <br>

                <input type="radio" id="op2" name="op" value="1">
                <label for="op2">op2</label>

                <br>

                <input type="radio" id="op3" name="op" value="2">
                <label for="op3">op3</label>
                
                <br>

                <input type="radio" id="op4" name="op" value="3">
                <label for="op4">op4</label>
                
                <br>

                <div id = "res" class="idle">Empty</div>
                <br>
                <div class="alert alert-success" style="display: none;" id="suc">
                <strong>Success!</strong>
                </div>
                <div class="alert alert-danger" style="display: none;" id="inc">
                <strong>Incorrect</strong>
                </div>
                
                <br>

                <input type="submit" name="submit" value = 'Submit' class = "submit btn btn-warning"/>
        </form>
    </div>
    <button class="btn btn-primary">Restart</button>
    </div>`;
    question = document.getElementById("question");
    labels = document.getElementsByTagName("label");
    form = document.querySelector("form");
    questionNum = -1;
    score = 0;
    reset = document.querySelector("button");
    form.addEventListener("submit", handleSubmit);
    reset.addEventListener("click", start);
    getQuestion();
}

start();

function getQuestion()
{
    questionNum++;
    var temp = questions[questionNum].title;
    question.innerHTML= temp;

    for(var i = 0; i < 4; i++)
        labels[i].innerHTML = questions[questionNum].options[i];
}

function handleSubmit(e)
{
    e.preventDefault();
    if(!form.op.value)
        alert("please select an option");

    else if(form.submit.classList.contains('btn-warning'))       {
        evaluate();
        form.submit.classList.remove('btn-warning');
        form.submit.value = "Next"
        form.submit.classList.add('btn-success');
    }

    else if(questionNum < questions.length - 1 && form.submit.classList.contains('btn-success')) {
        getQuestion();
        resetradio();
        form.submit.classList.remove('btn-success');
        form.submit.value = "Submit"
        form.submit.classList.add('btn-warning');
        form.reset();
    }

    else if(form.submit.classList.contains('btn-success')) {
        restartScreen();
        form.submit.classList.remove('btn-success');
        form.submit.value = "Submit"
        form.submit.classList.add('btn-warning');
        form.reset();
    }
}

function evaluate()
{
    if(form.op.value == questions[questionNum].answer) {
        document.getElementById("suc").style.display = "block";
        score += questions[questionNum].score;

    } 
    else {
        document.getElementById("inc").style.display = "block";
    }
    document.querySelectorAll('[type="radio"]').forEach((radio) => {
        radio.setAttribute("disabled","");
    })
}

function resetradio() {
    document.querySelectorAll('[type="radio"]').forEach((radio) => {
        radio.removeAttribute("disabled");
    });

    document.getElementById("inc").style.display = "none";
    document.getElementById("suc").style.display = "none";
}

function restartScreen()
{
    document.querySelector('.quiz-heading').innerHTML = `Score : ${score}`;
    const card = document.querySelector('.question-card');
    card.innerHTML = "<ul>";
    questions.forEach((ques) => {
        const html = `
        <li>${ques.title} <div class="alert alert-success">${ques.options[ques.answer]}</div></li>
        `;
        card.innerHTML += html;
    });
    card.innerHTML += "</ul>";
    document.querySelector('.answer-key').style.display ='block';
    document.querySelector('button').style.display ='block';
    document.querySelector('button').style.visibility ='visible';
}

