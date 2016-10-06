var app = {

  currentExample: {},
  history: [],
  types: [],
  correctCount: 0,
  incorrectCount: 0,
  inputAnswer: null,

  generateExample: function(type) {
    var example = {};

    if (type == 'addition') {

      example = {
        "firstNumber": Math.round (Math.random() * 50),
        "secondNumber":  Math.round (Math.random() * 50),
        "type": type,
        "sign": '+'
      };

    } else if (type == 'subtraction') {

      example = {
        "firstNumber": Math.round (Math.random() * 80),
        "secondNumber":  Math.round (Math.random() * 20),
        "type": type,
        "sign": '-'
      }

    } else if (type == 'multiplication') {

      example = {
        "firstNumber": Math.round (Math.random() * 20),
        "secondNumber":  Math.round (Math.random() * 5),
        "type": type,
        "sign": '*'
      }

    } else if (type == 'division') {

      var max = 100,
          min = 20;

           do {
              var first   = Math.floor(Math.floor(Math.random()*(max-min+1)+min) / 2) * 2,
                  second  = Math.floor(Math.floor(Math.random()*(min-1+1)+1) / 2) * 2;

              if(second == 0) {
               second = 1;
              }
           } while(first % second);

       example = {
        "firstNumber": first,
        "secondNumber":  second,
        "type": type,
        "sign": '/'
       }
      
    }

    return example;

  },

  checkResult: function(exampleObj) {
    var inputValue = this.inputAnswer.value,
      eObj = exampleObj,
      type = eObj.type,
      correctCountBox = document.querySelector('.js-correctCount'),
      incorrectCountBox =  document.querySelector('.js-incorrectCount');

    if (type == 'addition') {
      
      if (eObj.firstNumber + eObj.secondNumber == inputValue) {
        eObj.correct = true;
        this.correctCount += 1;
        correctCountBox.innerHTML = this.correctCount;
      } else {
        eObj.correct = false;
        this.incorrectCount += 1;
        incorrectCountBox.innerHTML = this.incorrectCount;
      }

    } else if (type == 'subtraction') {

      if (eObj.firstNumber - eObj.secondNumber == inputValue) {
        eObj.correct = true;
        this.correctCount += 1;
        correctCountBox.innerHTML = this.correctCount;
      } else {
        eObj.correct = false;
        this.incorrectCount += 1;
        incorrectCountBox.innerHTML = this.incorrectCount;
      }

    } else if (type == 'multiplication') {

      if (eObj.firstNumber * eObj.secondNumber == inputValue) {
        eObj.correct = true;
        this.correctCount += 1;
        correctCountBox.innerHTML = this.correctCount;
      } else {
        eObj.correct = false;
        this.incorrectCount += 1;
        incorrectCountBox.innerHTML = this.incorrectCount;
      }
    
    } else if (type == 'division') {
      if (eObj.firstNumber / eObj.secondNumber == inputValue) {
        eObj.correct = true;
        this.correctCount += 1;
        correctCountBox.innerHTML = this.correctCount;
      } else {
        eObj.correct = false;
        this.incorrectCount += 1;
        incorrectCountBox.innerHTML = this.incorrectCount;
      }
    }

    eObj.userAnswer = inputValue;

    this.history.push(eObj);

  },

  showExample: function(exampleObj) {

    var exampleBox = document.querySelectorAll('.js-panel-example')[0];

    exampleBox.innerHTML = exampleObj.firstNumber +' '+ exampleObj.sign +' '+ exampleObj.secondNumber +' = ?';

  },

  init: function() {

    var that = this;
    var generateBtnFirst = document.querySelectorAll('.js-generate')[0];
    var generateBtnNext = document.querySelectorAll('.js-next')[0];

    this.currentIndex = 0;
    this.inputAnswer = document.querySelector('.js-answerField');
    this.answerUser = document.querySelector('.js-answerFieldView');

    generateBtnFirst.onclick = function() {

      that.generalCount = document.querySelector('.js-count-examples').value;

      var checkboxes = document.querySelectorAll('.js-exampleType');

      for (var i = 0; i <= checkboxes.length - 1; i++) {
        if (checkboxes[i].checked) {
          that.types.push(checkboxes[i].value)
        }
      }

      var typeToGenerate = Math.floor ( Math.random() * that.types.length);
      
      that.currentExample = that.generateExample( that.types[typeToGenerate]);

      that.showExample(that.currentExample)

      that.currentIndex += 1;

    }

    generateBtnNext.onclick = function() {

      var history = that.history;

      that.answerUser.innerHTML = 'Your answer is ' + that.inputAnswer.value;

      if (that.inputAnswer.value != '') {
        that.checkResult(that.currentExample);

        if (that.currentIndex < that.generalCount) {
          var typeToGenerate = Math.floor ( Math.random() * that.types.length);
        
          that.currentExample = that.generateExample( that.types[typeToGenerate]);

          that.showExample(that.currentExample)
          that.inputAnswer.value = '';

          that.currentIndex += 1;


        } else {

          history.forEach(function(item, i, history) {
            console.log( 'example ' + item.firstNumber + item.sign + item.secondNumber + ' of ' + item.type + ' is ' + item.correct );
          });

          var body = document.getElementsByTagName("body")[0]; // assuming it exists
          var docfrag = document.createDocumentFragment();
          

          history.forEach(function(item, i) {
            var li = document.createElement("li");
            li.textContent = (i+1) + ' : ' + item.type + ' is ' + item.correct;
            docfrag.appendChild(li);
          });

          body.appendChild(docfrag);

            }


      } else {
        alert('Please enter the answer')
      }

    }

    this.inputAnswer.onkeypress = function(evt) {
      var theEvent = evt || window.event;
      var key = theEvent.keyCode || theEvent.which;

      key = String.fromCharCode( key );
      var regex = /[0-9]/;
      if( !regex.test(key) ) {
        theEvent.returnValue = false;
        if(theEvent.preventDefault) theEvent.preventDefault();
      }
    }


  }


}

app.init();

