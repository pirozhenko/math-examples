var app = {
  settings: {
    count:         document.querySelector('.js-count-examples'),
    example:       document.querySelector('.js-panel-example'),
    answerPanel:   document.querySelector('.js-panel-answer'),
    add:           document.querySelector('.js-add'),
    sub:           document.querySelector('.js-sub'),
    mult:          document.querySelector('.js-mult'),
    dev:           document.querySelector('.js-dev'),
    key:           document.querySelector('.js-btn'),
    arrInput:      [],
    panel:         document.querySelector('.js-panel-input-answer'),
    tab1:          document.querySelector('.js-tabs1'),
    titleTab1:     document.querySelector('.js-title-tabs1'),
    tab2:          document.querySelector('.js-tabs2'),
    titleTab2:     document.querySelector('.js-title-tabs2'),
    panelTrue:     document.querySelector('.js-panel-true'),
    panelFalse:    document.querySelector('.js-panel-false'),
    countTrue:     1,
    countFalse:    1,
    msgAnswer:     'Ваш ответ: ',
    msgCountTrue:  'Правильных всего: ',
    msgCountFalse: 'Неправельных всего: ',
    res:           ' '
  },

  expression: function (first, second, sign) {
    var exampleExpr   = first + sign + second + ' = ?',
        example       = this.settings.example;
    example.innerHTML = exampleExpr;
    console.log(exampleExpr);
  },

  addFunc: function () {
    var first   = Math.round (Math.random() * 50),
        second  = Math.round (Math.random() * 50),
        answer  = first + second,
        sign    = ' + ';

    app.expression(first, second, sign);
    app.settings.res = answer;
  },

  multFunc: function () {
    var first   = Math.round (Math.random() * 20),
        second  = Math.round (Math.random() * 5),
        answer  = first * second;
        sign    = ' * ';

    app.expression(first, second, sign);
    app.settings.res = answer;
  },

  devFunc: function () {
    var first   = Math.round (Math.random() * 100),
        second  = Math.round (Math.random() * 100),
        answer  = first / second,
        sign    = ' / ';

    app.expression(first, second, sign);
    app.settings.res = answer;
  },

  subFunc: function () {
    var first   = Math.round (Math.random() * 100),
        second  = Math.round (Math.random() * 20),
        answer  = first - second,
        sign    = ' - ';

    app.expression(first, second, sign);
    app.settings.res = answer;
  },

  getChar: function (event) {
    var panel         = this.settings.panel,
        answerPanel   = this.settings.answerPanel,
        panelTrue     = this.settings.panelTrue,
        panelFalse    = this.settings.panelFalse,
        msgCountTrue  = this.settings.msgCountTrue,
        msgCountFalse = this.settings.msgCountFalse,
        msgAnswer     = this.settings.msgAnswer

      if (event.which == null) {
        if (event.keyCode < 32) {
          return null;
        }else {
          return String.fromCharCode(event.keyCode); // IE
        }
      }

      if (event.charCode == 13) {
        //вывод ответа в строку при нажатии на enter
        answerPanel.innerHTML = 'Ваш ответ: ' + panel.value;
        //если ответ пользователя ревен ответу на пример
        if (panel.value == app.settings.res ) {
          //вывод сообщения и колличества правельных ответов
          panelTrue.innerHTML = msgCountTrue + this.settings.countTrue;
          this.settings.countTrue++;

          } else {
            //вывод сообщения и колличества неправельных ответов
            panelFalse.innerHTML = msgCountFalse + this.settings.countFalse;
            this.settings.countFalse++;
          }
          //после нажатия на enter строка обнуляется
          panel.value = '';
      }

      if (event.which != 0 && event.charCode != 0) {
        if (event.which < 32) {
          return null;
        } else {
          return String.fromCharCode(event.which);
        }
      }

      return null;
  },

  init: function () {

    var add      = this.settings.add,
        sub      = this.settings.sub,
        mult     = this.settings.mult,
        dev      = this.settings.dev,
        key      = this.settings.key,
        count    = this.settings.count,
        
        tab1     = this.settings.tab1,
        titleTab1= this.settings.titleTab1,
        tab2     = this.settings.tab2,
        titleTab2= this.settings.titleTab2,

        addFunc  = this.addFunc,
        subFunc  = this.subFunc,
        multFunc = this.multFunc,
        devFunc  = this.devFunc,
        arrInput = this.settings.arrInput;


        arrInput.push(this.settings.add, this.settings.sub, this.settings.mult, this.settings.dev);

        key.addEventListener("click", function(e) {

          tab1.removeClass('is-active');
          titleTab1.removeClass('is-active');

          tab2.addClass('is-active');
          titleTab2.addClass('is-active');

          var countAll = 0;

          var arrInputChecked = [];

          for (var i = 0; i < count.value; i++) {

            for (var j = 0; j < arrInput.length; j++) {

             if( arrInput[j].checked ) {

                var del = arrInput[j].className.substr(3);
                arrInputChecked.push(del + 'Func()');

              }
            }

            var rand = Math.floor ( Math.random() * arrInputChecked.length);
            eval(arrInputChecked[rand]);

            countAll += 1;

          }
          console.log(countAll);
        });

      this.settings.panel.onkeypress = function(e) {
      e = e || event;

      if (e.ctrlKey || e.altKey || e.metaKey) {
        return
      };
      var chr = app.getChar(e);
      if (chr == null) {
        return;
      };
      if (chr < '0' || chr > '9') {
        return false;
      }
    };

    Element.prototype.hasClass = function (className) {
        return new RegExp(' ' + className + ' ').test(' ' + this.className + ' ');
    };

    Element.prototype.addClass = function (className) {
        if (!this.hasClass(className)) {
            this.className += ' ' + className;
        }
        return this;
    };

    Element.prototype.removeClass = function (className) {
        var newClass = ' ' + this.className.replace(/[\t\r\n]/g, ' ') + ' ';
        if (this.hasClass(className)) {
            while (newClass.indexOf( ' ' + className + ' ') >= 0) {
                newClass = newClass.replace(' ' + className + ' ', ' ');
            }
        this.className = newClass.replace(/^\s+|\s+$/g, ' ');
        }
        return this;
    };
  }
};
app.init();