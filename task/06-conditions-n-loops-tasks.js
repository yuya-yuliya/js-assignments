'use strict';

/**************************************************************************************************
 *                                                                                                *
 * Пожалуйста, прочтите информацию по ссылкам перед выполнением заданий:                                 *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling  *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration              *
 *                                                                                                *
 **************************************************************************************************/


/**
 * Возврщает 'Fizz','Buzz' или начальное число согласно следеющим правилам:
 * 1) если не подпадает под следйющте правила вернуть начальное число
 * 2) число делится нацело на 3 вернуть 'Fizz'
 * 3) число кратно 5 вернуть 'Buzz'
 * 4) если число кратно 3 и 5 одновременно вернуть 'FizzBuzz'
 *
 * @param {number} num
 * @return {any}
 *
 * @example
 *   2 =>  2
 *   3 => 'Fizz'
 *   5 => 'Buzz'
 *   4 => 4
 *  15 => 'FizzBuzz'
 *  20 => 'Buzz'
 *  21 => 'Fizz'
 *
 */
function getFizzBuzz(num) {
    let result = "";
    if (num % 3 == 0){
        result += "Fizz";
    }
    if (num % 5 == 0){
        result += "Buzz";
    }
    if (result == ""){
        return num;
    }
    else {
        return result;
    }
}


/**
 * Возвращает факториал переданного целого числа n.
 *
 * @param {number} n
 * @return {number}
 *
 * @example:
 *   1  => 1
 *   5  => 120
 *   10 => 3628800
 */
function getFactorial(n) {
    let fact = 1;
    for (let i = 2; i <= n; i++){
        fact *= i;
    }
    return fact;
}


/**
 * Возвращается сумму целых чисел в промежутке между переданными числами, включая их
 *
 * @param {number} n1
 * @param {number} n2
 * @return {number}
 *
 * @example:
 *   1,2   =>  3  ( = 1+2 )
 *   5,10  =>  45 ( = 5+6+7+8+9+10 )
 *   -1,1  =>  0  ( = -1 + 0 + 1 )
 */
function getSumBetweenNumbers(n1, n2) {
    let sum = 0;
    for (let i = n1; i <= n2; i++){
        sum += i;    
    }
    return sum;
}


/**
 * Возвращает true, если с помощью трех переданных длин сторон a,b,c можно
 * посроить треугольник, если нет - false
 *
 * @param {number} a
 * @param {number} b
 * @param {number} c
 * @return {bool}
 *
 * @example:
 *   1,2,3    =>  false
 *   3,4,5    =>  true
 *   10,1,1   =>  false
 *   10,10,10 =>  true
 */
function isTriangle(a,b,c) {
    if ((a + b > c) && (a + c > b) && (b + c > a)){
        return true;
    }
    else {
        return false;
    }
}


/**
 * Возвращает true, если 2 определенных прямоуголника перекрываются, если нет false.
 * Каждый прямоуголник представлен обьектом
 *  {
 *     top: 5,
 *     left: 5,
 *     width: 20,
 *     height: 10
 *  }
 *
 *  (5;5)
 *     -------------
 *     |           |
 *     |           |  height = 10
 *     -------------
 *        width=20
 *
 * NOTE: Пожлауйтса используйте принцип задания координат для canvas (https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Drawing_shapes#The_grid),
 * этот способ отличается от декартовой системы координат.
 *
 * @param {object} rect1
 * @param {object} rect2
 * @return {bool}
 *
 * @example:
 *   { top: 0, left: 0, width: 10, height: 10 },
 *   { top: 5, left: 5, width: 20, height: 20 }    =>  true
 *
 *   { top: 0, left: 0, width: 10, height: 10 },
 *   { top:20, left:20, width: 20, height: 20 }    =>  false
 *
 */
function doRectanglesOverlap(rect1, rect2) {
    if ((rect1.left + rect1.width > rect2.left) && (rect1.top + rect1.height > rect2.top)){
        return true;
    }
    else {
        return false;
    }
}


/**
 * Возвращает true если точка лежим в пределах круга, если нет то false
 * Круг представляет собой объект:
 *  {
 *     center: {
 *       x: 5,
 *       y: 5
 *     },
 *     radius: 20
 *  }
 *
 * Точка представляет собой объект:
 *  {
 *     x: 5,
 *     y: 5
 *  }
 *
 * @param {object} circle
 * @param {object} point
 * @return {bool}
 *
 * @example:
 *   { center: { x:0, y:0 }, radius:10 },  { x:0, y:0 }     => true
 *   { center: { x:0, y:0 }, radius:10 },  { x:10, y:10 }   => false
 *
 */
function isInsideCircle(circle, point) {
    if (Math.hypot(circle.center.x - point.x, circle.center.y - point.y) < circle.radius){
        return true;
    }
    return false;
}


/**
 * Возврщает первый неповторяющийся символ в строке, если его нет то возвращает null.
 *
 * @param {string} str
 * @return {string}
 *
 * @example:
 *   'The quick brown fox jumps over the lazy dog' => 'T'
 *   'abracadabra'  => 'c'
 *   'entente' => null
 */
function findFirstSingleChar(str) {
    for (let i = 0; i < str.length; i++){
        if (str.indexOf(str[i]) == i){
            if (str.indexOf(str[i], i + 1) == -1){
                return str[i];
            }
        }
    }
    return null;
}


/**
 * Возвращает интервальную строку по 2 определенным числам и (включить / исключить) критериям.
 * Подробное описание задачи: https://en.wikipedia.org/wiki/Interval_(mathematics)
 *
 * Обратите внимание на то, что меньшее число должно идти первым в описании
 *
 * @param {number} a
 * @param {number} b
 * @param {bool} isStartIncluded
 * @param {bool} isEndIncluded
 * @return {string}
 *
 * @example
 *   0, 1, true, true   => '[0, 1]'
 *   0, 1, true, false  => '[0, 1)'
 *   0, 1, false, true  => '(0, 1]'
 *   0, 1, false, false => '(0, 1)'
 * меньшее число должно быть впереди :
 *   5, 3, true, true   => '[3, 5]'
 *
 */
function getIntervalString(a, b, isStartIncluded, isEndIncluded) {
    let interval_str = "";
    if (isStartIncluded){
        interval_str += "[";
    }
    else {
        interval_str += "(";
    }
    if (a < b){
        interval_str += a + ", " + b;
    }
    else{
        interval_str += b + ", " + a;
    }
    if (isEndIncluded){
        interval_str += "]";
    }
    else {
        interval_str += ")";
    }
    return interval_str;
}


/**
 * Переворачивает переданную строку (ставит все символы строки в обратном порядке)
 *
 * @param {string} str
 * @return {string}
 *
 * @example:
 * 'The quick brown fox jumps over the lazy dog' => 'god yzal eht revo spmuj xof nworb kciuq ehT'
 * 'abracadabra' => 'arbadacarba'
 * 'rotator' => 'rotator'
 * 'noon' => 'noon'
 */
function reverseString(str) {
    let new_str = "";
    for (let i = 0; i < str.length; i++){
        new_str = str[i] + new_str;
    }
    return new_str;
}


/**
 * Переворачивает переданное целое число (ставит все цифры числа в обратном порядке)
 *
 * @param {number} num
 * @return {number}
 *
 * @example:
 *   12345 => 54321
 *   1111  => 1111
 *   87354 => 45378
 *   34143 => 34143
 */
function reverseInteger(num) {
    let new_num = 0;
    while (num > 0){
        new_num = new_num * 10 + num % 10;
        num = Math.trunc(num / 10);
    }
    return new_num;
}


/**
 * Проверяет на валидность CCN (credit card number) и возвращает true если CCN валиден
 * и возвращает false в противном случае.
 *
 * Описание алгоритма по ссылке : https://en.wikipedia.org/wiki/Luhn_algorithm
 *
 * @param {number} cnn
 * @return {boolean}
 *
 * @example:
 *   79927398713      => true
 *   4012888888881881 => true
 *   5123456789012346 => true
 *   378282246310005  => true
 *   371449635398431  => true
 *
 *   4571234567890111 => false
 *   5436468789016589 => false
 *   4916123456789012 => false
 */
function isCreditCardNumber(ccn) {
    let arr = [];
    let ccn_str = ccn.toString();
    for (let i = 0; i < ccn_str.length; i++){
        let num = Number.parseInt(ccn_str[i]);
        if ((i % 2 == 0 && ccn_str.length % 2 == 0) || (i % 2 == 1 && ccn_str.length % 2 == 1)) {
            num *= 2;
            arr.push(num > 9? num - 9 : num);
        }
        else {
            arr.push(num);
        }
    }
    let sum = arr.reduce((prev, curr) => prev + curr, 0);
    return sum % 10 == 0;
}


/**
 * Возвращает сумму всех цифр переданного чила след. образом:
 *   step1 : найти сумму всех цифр исходного числа
 *   step2 : если сумма на step1 больше 9 нужно проделать step1 с полученной суммой
 *
 * @param {number} n
 * @return {number}
 *
 * @example:
 *   12345 ( 1+2+3+4+5 = 15, 1+5 = 6) => 6
 *   23456 ( 2+3+4+5+6 = 20, 2+0 = 2) => 2
 *   10000 ( 1+0+0+0+0 = 1 ) => 1
 *   165536 (1+6+5+5+3+6 = 26,  2+6 = 8) => 8
 */
function getDigitalRoot(num) {
    let sum_digits = 0;
    do {
        sum_digits = 0;
        while (num > 0){
            sum_digits += num % 10;
            num = Math.trunc(num / 10);
        }
        num = sum_digits;
    }
    while (sum_digits > 9);
    return sum_digits;
}



/**
 * Возвращает true если переданная строка представляет собой правильную скобочную
 * структура, если нет -false
 * Правильная скобочная структура состоит из соответствующих закрывающихся,
 * открывающихся фигурных скобок, стоящих на соответствующих местях.
 * Скобочная последовательность может содержать:  [],(),{},<>
 *
 * @param {string} str
 * @return {boolean}
 *
 * @example:
 *   '' => true
 *   '[]'  => true
 *   '{}'  => true
 *   '()   => true
 *   '[[]' => false
 *   ']['  => false
 *   '[[][][[]]]' => true
 *   '[[][]][' => false
 *   '{)' = false
 *   '{[(<{[]}>)]}' = true
 */
function isBracketsBalanced(str) {
    let openBracketsStack = [], brackets = "[](){}<>";
    for (let i = 0; i < str.length; i++){
        if (brackets.indexOf(str[i]) % 2 == 0){
            openBracketsStack.push(str[i]);
        }
        else if (brackets.indexOf(str[i]) % 2 != 0){
            let openBracket = openBracketsStack.pop();
            if (brackets.indexOf(str[i]) - brackets.indexOf(openBracket) != 1){
                return false;
            }
        }
    }
    if (openBracketsStack.length == 0){
        return true;
    }
    else {
        return false;
    }
}


/**
 * Возвращает строку, составленной на основе периода от переданного начала и конца периода
 * Конечная строка должна удовлетворять следующим правилам:
 *
 * ---------------------------------------------------------------------
 *   Difference                 |  Result
 * ---------------------------------------------------------------------
 *    0 to 45 seconds           |  a few seconds ago
 *   45 to 90 seconds           |  a minute ago
 *   90 seconds to 45 minutes   |  2 minutes ago ... 45 minutes ago
 *   45 to 90 minutes           |  an hour ago
 *  90 minutes to 22 hours      |  2 hours ago ... 22 hours ago
 *  22 to 36 hours              |  a day ago
 *  36 hours to 25 days         |  2 days ago ... 25 days ago
 *  25 to 45 days               |  a month ago
 *  45 to 345 days              |  2 months ago ... 11 months ago
 *  345 to 545 days (1.5 years) |  a year ago
 *  546 days+                   |  2 years ago ... 20 years ago
 * ---------------------------------------------------------------------
 *
 * @param {Date} startDate
 * @param {Date} endDate
 * @return {string}
 *
 * @example
 *   Date('2000-01-01 01:00:00.100'), Date('2000-01-01 01:00:00.200')  => 'a few seconds ago'
 *   Date('2000-01-01 01:00:00.100'), Date('2000-01-01 01:00:05.000')  => '5 minutes ago'
 *   Date('2000-01-01 01:00:00.100'), Date('2000-01-02 03:00:05.000')  => 'a day ago'
 *   Date('2000-01-01 01:00:00.100'), Date('2015-01-02 03:00:05.000')  => '15 years ago'
 *
 */
function timespanToHumanString(startDate, endDate) {
    let timeSpan = (endDate - startDate) / 1000;
    let strArr = [
        "a few seconds ago",
        "a minute ago", "minutes ago",
        "an hour ago", "hours ago",
        "a day ago", "days ago",
        "a month ago", "months ago",
        "a year ago", "years ago",
    ];
    let minute = 60, hour = 60 * minute, day = 24 * hour, month = 30 * day, year = 365 * day;
    let timeArr = [
        45, 90, 45 * minute, 90 * minute, 22 * hour,
        36 * hour, 25 * day, 45 * day,
        345 * day, 545 * day
    ];
    let count = 0;
    switch (true){
        case timeArr[0] >= timeSpan:
            return strArr[0];
        case timeArr[1] >= timeSpan:
            return strArr[1];
        case timeArr[2] >= timeSpan:
            count = (timeSpan / minute) % 1 <= 0.5 ? Math.floor(timeSpan / minute) : Math.round(timeSpan / minute);
            return count + " " + strArr[2];
        case timeArr[3] >= timeSpan:
            return strArr[3];
        case timeArr[4] >= timeSpan:
            count = (timeSpan / hour) % 1 <= 0.5 ? Math.floor(timeSpan / hour) : Math.round(timeSpan / hour);
            return count + " " + strArr[4];
        case timeArr[5] >= timeSpan:
            return strArr[5];
        case timeArr[6] >= timeSpan:
            count = (timeSpan / day) % 1 <= 0.5 ? Math.floor(timeSpan / day) : Math.round(timeSpan / day);
            return count + " " + strArr[6];
        case timeArr[7] >= timeSpan:
            return strArr[7];
        case timeArr[8] >= timeSpan:
            count = (timeSpan / month) % 1 <= 0.5 ? Math.floor(timeSpan / month) : Math.round(timeSpan / month);
            return count + " " + strArr[8];
        case timeArr[9] >= timeSpan:
            return strArr[9];
        default:
            return Math.round(timeSpan / year) + " " + strArr[10];
    }
}

/**
 * Вернуть строку с представление числа в n-ой (бинарной, десятичной, и т.д., где n<=10) системе исчисления.
 * Более подробное описание
 * https://en.wikipedia.org/wiki/Binary_number
 * https://en.wikipedia.org/wiki/Ternary_numeral_system
 * https://en.wikipedia.org/wiki/Radix
 *
 * @param {number} num
 * @param {number} n, radix of the result
 * @return {string}
 *
 * @example:
 *   1024, 2  => '10000000000'
 *   6561, 3  => '100000000'
 *    365, 2  => '101101101'
 *    365, 3  => '111112'
 *    365, 4  => '11231'
 *    365, 10 => '365'
 */
function toNaryString(num, n) {
    let str = "";
    while (num > 0){
        str = (num % n).toString() + str;
        num = Math.trunc(num / n);
    }
    return str;
}


/**
 * Возбращает общий путь к директории из всех путей переданных в массиве
 *
 * @param {array} pathes
 * @return {string}
 *
 * @example:
 *   ['/web/images/image1.png', '/web/images/image2.png']  => '/web/images/'
 *   ['/web/assets/style.css', '/web/scripts/app.js',  'home/setting.conf'] => ''
 *   ['/web/assets/style.css', '/.bin/mocha',  '/read.me'] => '/'
 *   ['/web/favicon.ico', '/web-scripts/dump', '/webalizer/logs'] => '/'
 */
function getCommonDirectoryPath(pathes) {
    let dir_path = pathes[0];
    for (let i = 1; i < pathes.length; i++){
        let j = 0;
        while (pathes[i][j] == dir_path[j]){
            j++;
        }
        dir_path = dir_path.substring(0, j);
        dir_path = dir_path.substring(0, dir_path.lastIndexOf("/") + 1);
    }
    return dir_path;
}


/**
 * Возвращает произведение двух переданных матриц.
 * Более подробное описание: https://en.wikipedia.org/wiki/Matrix_multiplication
 *
 * @param {array} m1
 * @param {array} m2
 * @return {array}
 *
 * @example:
 *   [[ 1, 0, 0 ],       [[ 1, 2, 3 ],           [[ 1, 2, 3 ],
 *    [ 0, 1, 0 ],   X    [ 4, 5, 6 ],     =>     [ 4, 5, 6 ],
 *    [ 0, 0, 1 ]]        [ 7, 8, 9 ]]            [ 7, 8, 9 ]]
 *
 *                        [[ 4 ],
 *   [[ 1, 2, 3]]    X     [ 5 ],          =>     [[ 32 ]]
 *                         [ 6 ]]
 *
 */
function getMatrixProduct(m1, m2) {
    if (m1.length == m2[0].length){
        let new_matrix = new Array(m1.length).fill(0).map(el => new Array(m2[0].length).fill(0));
        for (let i = 0; i < new_matrix.length; i++){
            for (let j = 0; j < new_matrix[0].length; j++){
                let new_value = 0;
                for (let k = 0; k < m1[0].length; k++){
                    new_value += m1[i][k] * m2[k][j];
                }
                new_matrix[i][j] = new_value;
            }
        }
        return new_matrix;
    }
    else {
        return [];
    }
}


/**
 * Возвращает результат игры крестики-нолики для текущих позиций 'X', 'O'
 * Более подробное описание: https://en.wikipedia.org/wiki/Tic-tac-toe
 *
 * Позиции X и O представлены в виде матрицы 3x3 cо значениями: 'X','0', undefined
 * Функция должна возвращать победиля игры по текущей позиции.
 * Результат должен быть в виде: 'X' или '0' или undefined
 *
 * @param {array} position
 * @return {string}
 *
 * @example
 *
 *   [[ 'X',   ,'0' ],
 *    [    ,'X','0' ],       =>  'X'
 *    [    ,   ,'X' ]]
 *
 *   [[ '0','0','0' ],
 *    [    ,'X',    ],       =>  '0'
 *    [ 'X',   ,'X' ]]
 *
 *   [[ '0','X','0' ],
 *    [    ,'X',    ],       =>  undefined
 *    [ 'X','0','X' ]]
 *
 *   [[    ,   ,    ],
 *    [    ,   ,    ],       =>  undefined
 *    [    ,   ,    ]]
 *
 */
function evaluateTicTacToePosition(position) {
    let player = undefined, isWin = false;
    for (let i = 0; i < 3 && !isWin; i++){
        player = position[i][0];
        let isPlayer = true;
        for (let j = 1; j < 3 && isPlayer; j++){
            if (position[i][j] != player){
                isPlayer = false;
            }
        }
        if (isPlayer && player != undefined){
            isWin = true
        }
    }
    if (!isWin){
        for (let i = 0; i < 3 && !isWin; i++){
            player = position[0][i];
            let isPlayer = true;
            for (let j = 1; j < 3 && isPlayer; j++){
                if (position[j][i] != player){
                    isPlayer = false;
                }
            }
            if (isPlayer && player != undefined){
                isWin = true
            }
        }
        if (!isWin){
            player = position[0][0];
            let isPlayer = true;
            for (let i = 1; i < 3 && isPlayer; i++){
                if (player != position[i][i]){
                    isPlayer = false;
                }
            }
            if (isPlayer && player != undefined){
                isWin = true
            }
            if (!isWin){
                player = position[2][0];
                let isPlayer = true;
                for (let i = 1; i >= 0 && isPlayer; i--){
                    if (player != position[i][2 - i]){
                        isPlayer = false;
                    }
                }
                if (isPlayer && player != undefined){
                    isWin = true
                }
            }
        }
    }
    if (isWin){
        return player;
    }
    else {
        return undefined;
    }
}


module.exports = {
    getFizzBuzz: getFizzBuzz,
    getFactorial: getFactorial,
    getSumBetweenNumbers: getSumBetweenNumbers,
    isTriangle: isTriangle,
    doRectanglesOverlap: doRectanglesOverlap,
    isInsideCircle: isInsideCircle,
    findFirstSingleChar: findFirstSingleChar,
    getIntervalString : getIntervalString,
    reverseString: reverseString,
    reverseInteger: reverseInteger,
    isCreditCardNumber: isCreditCardNumber,
    getDigitalRoot: getDigitalRoot,
    isBracketsBalanced: isBracketsBalanced,
    timespanToHumanString : timespanToHumanString,
    toNaryString: toNaryString,
    getCommonDirectoryPath: getCommonDirectoryPath,
    getMatrixProduct: getMatrixProduct,
    evaluateTicTacToePosition : evaluateTicTacToePosition
};
