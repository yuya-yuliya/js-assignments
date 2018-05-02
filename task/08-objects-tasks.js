'use strict';

/**************************************************************************************************
 *                                                                                                *
 * Перед началом работы с заданием, пожалуйста ознакомьтесь с туториалом:                         *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object        *
 *                                                                                                *
 **************************************************************************************************/


/**
 * Возвращает объект Прямоугольник (rectangle) с параметрами высота (height) и ширина (width)
 * и методом getArea(), который возвращает площадь
 *
 * @param {number} width
 * @param {number} height
 * @return {Object}
 *
 * @example
 *    var r = new Rectangle(10,20);
 *    console.log(r.width);       // => 10
 *    console.log(r.height);      // => 20
 *    console.log(r.getArea());   // => 200
 */
function Rectangle(width, height) {
    this.width = width;
    this.height = height;
    Rectangle.prototype.getArea = function () {
        return this.width * this.height;
    }
}


/**
 * Возвращает JSON представление объекта
 *
 * @param {object} obj
 * @return {string}
 *
 * @example
 *    [1,2,3]   =>  '[1,2,3]'
 *    { width: 10, height : 20 } => '{"height":10,"width":20}'
 */
function getJSON(obj) {
    return JSON.stringify(obj);
}


/**
 * Возвращает объект указанного типа из представления JSON
 *
 * @param {Object} proto
 * @param {string} json
 * @return {object}
 *
 * @example
 *    var r = fromJSON(Rectangle.prototype, '{"width":10, "height":20}');
 *
 */
function fromJSON(proto, json) {
    return Object.setPrototypeOf(JSON.parse(json), proto);
}


/**
 * Создатель css селекторов
 *
 * Каждый комплексый селектор может состоять из эелемента, id, класса, атрибута, псевдо-класса и
 * псевдо-элемента
 *
 *    element#id.class[attr]:pseudoClass::pseudoElement
 *              \----/\----/\----------/
 *              Может быть несколько вхождений
 *
 * Любые варианты селекторов могут быть скомбинированы с помощью ' ','+','~','>' .
 *
 * Задача состоит в том, чтобы создать отдельный класс, независимые классы или
 * иерархию классов и реализовать функциональность
 * для создания селекторов css с использованием предоставленного cssSelectorBuilder.
 * Каждый селектор должен иметь метод stringify ()
 * для вывода строкового представления в соответствии с спецификацией css.
 *
 * Созданный cssSelectorBuilder должен использоваться как фасад
 * только для создания ваших собственных классов,
 * например, первый метод cssSelectorBuilder может быть таким:
 *
 * Дизайн класса(ов) полностью зависит от вас,
 * но постарайтесь сделать его максимально простым, понятным и читаемым насколько это возможно.
 *
 * @example
 *
 *  var builder = cssSelectorBuilder;
 *
 *  builder.id('main').class('container').class('editable').stringify()  => '#main.container.editable'
 *
 *  builder.element('a').attr('href$=".png"').pseudoClass('focus').stringify()  => 'a[href$=".png"]:focus'
 *
 *  builder.combine(
 *      builder.element('div').id('main').class('container').class('draggable'),
 *      '+',
 *      builder.combine(
 *          builder.element('table').id('data'),
 *          '~',
 *           builder.combine(
 *               builder.element('tr').pseudoClass('nth-of-type(even)'),
 *               ' ',
 *               builder.element('td').pseudoClass('nth-of-type(even)')
 *           )
 *      )
 *  ).stringify()        =>    'div#main.container.draggable + table#data ~ tr:nth-of-type(even)   td:nth-of-type(even)'
 *
 *  Если нужно больше примеров - можете посмотреть юнит тесты.
 */

class cssSelector {
    constructor(){
        this.selector = new Array(6);
        this.errorMsg = ["Element, id and pseudo-element should not occur more then one time inside the selector",
                    "Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element"];
        this.conbineStr = "";
    }

    check(ind) {
        for (let i = ind + 1; i < this.selector.length; i++){
            if (this.selector[i] != undefined){
                return false;
            }
        }
        return true;
    }

    setSingleValue(value, ind){
        if (this.check(ind)){
            if (this.selector[ind] == undefined){
                this.selector[ind] = value;
            }
            else {
                throw new Error(this.errorMsg[0]);
            }
        }
        else {
            throw new Error(this.errorMsg[1]);
        }
    }

    setArrayValue(value, ind){
        if (this.check(ind)){
            if (this.selector[ind] == undefined){
                this.selector[ind] = [value];
            }
            else {
                this.selector[ind].push(value);
            }
        }
        else {
            throw new Error(this.errorMsg[1]);
        }
    }

    element(value){
        this.setSingleValue(value, 0);
        return this;
    }

    id(value){
        this.setSingleValue(value, 1);
        return this;
    }

    class(value){
        this.setArrayValue(value, 2);
        return this;
    }

    attr(value){
        this.setArrayValue(value, 3);
        return this;
    }

    pseudoClass(value){
        this.setArrayValue(value, 4);
        return this;
    }

    pseudoElement(value){
        this.setSingleValue(value, 5);
        return this;
    }

    stringify(){
        if (this.conbineStr == ""){
            return this.toString();
        }
        else {
            return this.conbineStr;
        }
    }

    toString(){
        let separators = [ "#",".","[","]",":","::"];
        let str = "";
        for (let i = 0; i < this.selector.length; i++){
            if (this.selector[i] != undefined){
                let sepInd = i;
                switch (i){
                    case 0:
                        str += this.selector[i];
                        break;
                    case 1:
                        sepInd = i - 1;
                    case 5:
                        str += separators[sepInd] + this.selector[i];
                        break;
                    case 2:
                        sepInd = i - 1;
                    case 4:
                        this.selector[i].forEach((value) => {str += separators[sepInd] + value});
                        break;
                    case 3:
                        this.selector[i].forEach((value) => {str += separators[2] + value + separators[3]});
                        break;
                }
            }
        }
        return str;
    }

    static combine(selector1, combinator, selector2){
        selector1.conbineStr = selector1.stringify() + " " + combinator + " " + selector2.stringify();
        return selector1;
    }
}

const cssSelectorBuilder = {

    element: function(value) {
        return (new cssSelector).element(value);
    },

    id: function(value) {
        return (new cssSelector).id(value);
    },

    class: function(value) {
        return (new cssSelector).class(value);
    },

    attr: function(value) {
        return (new cssSelector).attr(value);
    },

    pseudoClass: function(value) {
        return (new cssSelector).pseudoClass(value);
    },

    pseudoElement: function(value) {
        return (new cssSelector).pseudoElement(value);
    },

    combine: function(selector1, combinator, selector2) {
        return cssSelector.combine(selector1, combinator, selector2);
    },
};


module.exports = {
    Rectangle: Rectangle,
    getJSON: getJSON,
    fromJSON: fromJSON,
    cssSelectorBuilder: cssSelectorBuilder
};
