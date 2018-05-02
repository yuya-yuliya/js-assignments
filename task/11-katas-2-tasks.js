'use strict';

/**
 * Возвращает номер банковского счета, распаршеный из предоставленной строки.
 *
 * Вы работаете в банке, который недавно приобрел аппарат, помогающий в чтении писем и факсов, отправленных филиалами.
 * Аппарат сканирует бумажный документ и генерирует строку с банковсчким счетом, который выглядит следующим образом:
 *
 *    _  _     _  _  _  _  _
 *  | _| _||_||_ |_   ||_||_|
 *  ||_  _|  | _||_|  ||_| _|
 *
 * Каждая строка содержит номер счета, записанный с помощью '|' и '_'.
 * Каждый счет должен иметь 9 цифр в диапазоне от 0 до 9.
 *
 * Ваша задача -- написать функцию, которая будет принимать номер счета строкой, как описано выше, и парсить ее в обычные числа.
 *
 * @param {string} bankAccount
 * @return {number}
 *
 * Example of return :
 *
 *   '    _  _     _  _  _  _  _ \n'+
 *   '  | _| _||_||_ |_   ||_||_|\n'+     =>  123456789
 *   '  ||_  _|  | _||_|  ||_| _|\n'
 *
 *   ' _  _  _  _  _  _  _  _  _ \n'+
 *   '| | _| _|| ||_ |_   ||_||_|\n'+     => 23056789
 *   '|_||_  _||_| _||_|  ||_| _|\n',
 *
 *   ' _  _  _  _  _  _  _  _  _ \n'+
 *   '|_| _| _||_||_ |_ |_||_||_|\n'+     => 823856989
 *   '|_||_  _||_| _||_| _||_| _|\n',
 *
 */
function parseBankAccount(bankAccount) {
    let digits = [
        " _ "+
        "| |"+
        "|_|",
        "   "+
        "  |"+
        "  |",
        " _ "+
        " _|"+
        "|_ ",
        " _ "+
        " _|"+
        " _|",
        "   "+
        "|_|"+
        "  |",
        " _ "+
        "|_ "+
        " _|",
        " _ "+
        "|_ "+
        "|_|",
        " _ "+
        "  |"+
        "  |",
        " _ "+
        "|_|"+
        "|_|",
        " _ "+
        "|_|"+
        " _|"
    ];
    let number = 0;
    let oneStrLength = bankAccount.length / 3;
    for (let i = 0; i + 3 < bankAccount.length / 3; i += 3){
        let digitStr = "";
        for (let j = 0; j < 3; j++){
           digitStr += bankAccount.substr(i + oneStrLength * j, 3) 
        }
        let digit = 0;
        digit = digits.indexOf(digitStr);
        number = number * 10 + digit;
    }
    return number;
}


/**
 * Возвращает строку, в которой будут вставлены переносы строки в правильных местах. Каждая часть до переноса строки должна быть не больше, чем переданное в функцию число.
 * Строка может быть перенесена только по границе слов.
 *
 * @param {string} text
 * @param {number} columns
 * @return {Iterable.<string>}
 *
 * @example :
 *
 *  'The String global object is a constructor for strings, or a sequence of characters.', 26 =>  'The String global object',
 *                                                                                                'is a constructor for',
 *                                                                                                'strings, or a sequence of',
 *                                                                                                'characters.'
 *
 *  'The String global object is a constructor for strings, or a sequence of characters.', 12 =>  'The String',
 *                                                                                                'global',
 *                                                                                                'object is a',
 *                                                                                                'constructor',
 *                                                                                                'for strings,',
 *                                                                                                'or a',
 *                                                                                                'sequence of',
 *                                                                                                'characters.'
 */
function* wrapText(text, columns) {
    let strArr = text.split(" "), col = columns, ind = 0;
    while (ind < strArr.length){
        let newStr = "";
        while (ind < strArr.length && newStr.length + strArr[ind].length < columns){
            if (newStr.length == 0){
                newStr += strArr[ind];
            }
            else {
                newStr += " " + strArr[ind];
            }
            ind++; 
        }
        yield newStr;
    }
    
}


/**
 * Возвращает ранг заданной покерной комбинации.
 * Ранги смотрите тут: https://en.wikipedia.org/wiki/List_of_poker_hands
 * https://ru.wikipedia.org/wiki/%D0%9F%D0%BE%D0%BA%D0%B5%D1%80
 *
 * @param {array} hand
 * @return {PokerRank} rank
 *
 * @example
 *   [ '4♥','5♥','6♥','7♥','8♥' ] => PokerRank.StraightFlush
 *   [ 'A♠','4♠','3♠','5♠','2♠' ] => PokerRank.StraightFlush
 *   [ '4♣','4♦','4♥','4♠','10♥' ] => PokerRank.FourOfKind
 *   [ '4♣','4♦','5♦','5♠','5♥' ] => PokerRank.FullHouse
 *   [ '4♣','5♣','6♣','7♣','Q♣' ] => PokerRank.Flush
 *   [ '2♠','3♥','4♥','5♥','6♥' ] => PokerRank.Straight
 *   [ '2♥','4♦','5♥','A♦','3♠' ] => PokerRank.Straight
 *   [ '2♥','2♠','2♦','7♥','A♥' ] => PokerRank.ThreeOfKind
 *   [ '2♥','4♦','4♥','A♦','A♠' ] => PokerRank.TwoPairs
 *   [ '3♥','4♥','10♥','3♦','A♠' ] => PokerRank.OnePair
 *   [ 'A♥','K♥','Q♥','2♦','3♠' ] =>  PokerRank.HighCard
 */
const PokerRank = {
    StraightFlush: 8,
    FourOfKind: 7,
    FullHouse: 6,
    Flush: 5,
    Straight: 4,
    ThreeOfKind: 3,
    TwoPairs: 2,
    OnePair: 1,
    HighCard: 0
}

function getPokerHandRank(hand) {
    function isRange(valueArr, num){
        let arr = valueArr.slice(0);
        arr.sort((a, b) => a - b);
        if (arr[0] == 0){
            if (arr[1] != 1){
                if (arr[arr.length - 1] == num - 1){
                    arr[0] = num;
                    arr.sort((a, b) => a - b);
                }
                else {
                    return false;
                }
            }
        }
        for (let i = 0; i < arr.length - 1; i++){
            if (arr[i + 1] - arr[i] != 1){
                return false;
            }
        }
        return true;
    }

    function isSameSuits(suitsArr){
        let suit = suitsArr[0];
        for (let i = 1; i < suitsArr.length; i++){
            if (suitsArr[i] != suit){
                return false;
            }
        }
        return true;
    }
    function countSetsSameValues(valueArr, setLen){
        let count = 0, arr = valueArr.slice(0);
        while (arr.length > 0){
            let value = arr[0], countVal = 0;
            while (arr.indexOf(value) != -1){
                countVal++;
                arr.splice(arr.indexOf(value), 1);
            }
            if (countVal == setLen){
                count++;
            }
        }
        return count;
    }
    let suits = "♣♦♥♠";
    let values = "A234567891JQK";
    let handValues = [];
    let handSuits = [];
    hand.forEach((value) => {
        handSuits.push(value[value.length - 1]);
        handValues.push(values.indexOf(value[0]));
    });

    if (countSetsSameValues(handValues, 4) == 1){
        return PokerRank.FourOfKind;
    }
    if (countSetsSameValues(handValues, 3) > 0){
        if (countSetsSameValues(handValues, 2) == 1){
            return PokerRank.FullHouse;
        }
        else {
            return PokerRank.ThreeOfKind;
        }
    }
    switch (countSetsSameValues(handValues, 2)){
        case 1:
            return PokerRank.OnePair;
        case 2:
            return PokerRank.TwoPairs;
    }
    if (isSameSuits(handSuits)){
        if (isRange(handValues, values.length)){
            return PokerRank.StraightFlush;
        }
        else {
            return PokerRank.Flush;
        }
    }
    if (isRange(handValues, values.length)){
        return PokerRank.Straight;
    }
    return PokerRank.HighCard;
    throw new Error('Not implemented');
}


/**
 * Возвращает набор прямоугольников из заданной фигуры.
 * Фигура -- это многострочный набор ASCII символов из '-', '+', '|' и пробелов.
 * Ваша задача -- разбить фигуру на прямоугольники, из которых она составлена.
 *
 * К СВЕДЕНИЮ: Порядок прямоугольников не имеет значения.
 *
 * @param {string} figure
 * @return {Iterable.<string>} decomposition to basic parts
 * 
 * @example
 *
 *    '+------------+\n'+
 *    '|            |\n'+
 *    '|            |\n'+              '+------------+\n'+
 *    '|            |\n'+              '|            |\n'+         '+------+\n'+          '+-----+\n'+
 *    '+------+-----+\n'+       =>     '|            |\n'+     ,   '|      |\n'+     ,    '|     |\n'+
 *    '|      |     |\n'+              '|            |\n'+         '|      |\n'+          '|     |\n'+
 *    '|      |     |\n'               '+------------+\n'          '+------+\n'           '+-----+\n'
 *    '+------+-----+\n'
 *
 *
 *
 *    '   +-----+     \n'+
 *    '   |     |     \n'+                                    '+-------------+\n'+
 *    '+--+-----+----+\n'+              '+-----+\n'+          '|             |\n'+
 *    '|             |\n'+      =>      '|     |\n'+     ,    '|             |\n'+
 *    '|             |\n'+              '+-----+\n'           '+-------------+\n'
 *    '+-------------+\n'
 */
function* getFigureRectangles(figure) {
   let leftBorder = -1, rightBorder = -1;
   let rectStr = "";
   let rowLength = figure.indexOf("\n") + 1;
   let i = 0;
   while (i < figure.length){
       if (leftBorder == -1){
            if (i + rowLength < figure.length && figure[i] == "+" && ((figure[i + 1] == "-" && figure[i + rowLength] == "|") || (figure[i + 1] == "+" && figure[i + rowLength] == "+"))){
                rectStr += figure[i];
                leftBorder = i;
            }
            i++;
        }
        else {
            if (rightBorder == -1){
                if (i + rowLength < figure.length && i - 1 >= 0 && figure[i] == "+" && ((figure[i - 1] == "-" && figure[i + rowLength] == "|") || (figure[i - 1] == "+" && figure[i + rowLength] == "+"))){
                    rectStr += figure[i];
                    rightBorder = i;
                    i += rowLength - (rightBorder - leftBorder);
                    rectStr += "\n";
                }
                else {
                    if (figure[i] == "+"){
                        rectStr += "-";
                    }
                    else {
                        rectStr += figure[i];
                    }
                    i++;
                }
            }
            else if (i % rowLength == rightBorder % rowLength){
                rectStr += figure[i];
                if (i - rowLength >= 0 && i - 1 >= 0 && figure[i] == "+" && ((figure[i - 1] == "-" && figure[i - rowLength] == "|") || (figure[i - 1] == "+" && figure[i - rowLength] == "+"))){
                    i = rightBorder;
                    leftBorder = -1;
                    rightBorder = -1;
                    yield rectStr + "\n";
                    rectStr = "";
                }
                else {
                    i += rowLength - (rightBorder - leftBorder);
                    rectStr += "\n"; 
                }
            }
            else {
                if (figure[i] == "+" && i % rowLength != leftBorder % rowLength){
                    rectStr += "-";
                }
                else {
                    rectStr += figure[i];
                }
                i++;
            }
        }
   }
}


module.exports = {
    parseBankAccount : parseBankAccount,
    wrapText: wrapText,
    PokerRank: PokerRank,
    getPokerHandRank: getPokerHandRank,
    getFigureRectangles: getFigureRectangles
};
