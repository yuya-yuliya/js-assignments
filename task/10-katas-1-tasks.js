'use strict';

/**
 * Возвращает массив из 32 делений катушки компаса с названиями.
 * Смотрите детали здесь:
 * https://en.wikipedia.org/wiki/Points_of_the_compass#32_cardinal_points
 *
 * @return {array}
 *
 * Пример возвращаемого значения :
 *  [
 *     { abbreviation : 'N',     azimuth : 0.00 ,
 *     { abbreviation : 'NbE',   azimuth : 11.25 },
 *     { abbreviation : 'NNE',   azimuth : 22.50 },
 *       ...
 *     { abbreviation : 'NbW',   azimuth : 348.75 }
 *  ]
 */
function createCompassPoints() {
    //ОПТИМИЗИРОВАТЬ!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    let delta = 11.25, count = 0;
    function CompassPoint(abbr)
    {
        return {abbreviation: abbr, azimuth: delta * count++};
    }
    var sides = ['N','E','S','W'];  // use array of cardinal directions only!
    let arr = [];
    for (let i = 0; i < sides.length; i++){
        let side1 = sides[i], side2 = sides[(i + 1) % sides.length];
        arr.push(CompassPoint(side1));
        arr.push(CompassPoint(side1 + 'b' + side2));
        if (i % 2 == 0){
            arr.push(CompassPoint(side1 + side1 + side2));
            arr.push(CompassPoint(side1 + side2 + 'b' + side1));
            arr.push(CompassPoint(side1 + side2));
            arr.push(CompassPoint(side1 + side2 + 'b' + side2));
            arr.push(CompassPoint(side2 + side1 + side2));
        }
        else {
            arr.push(CompassPoint(side1 + side2 + side1));
            arr.push(CompassPoint(side2 + side1 + 'b' + side1));
            arr.push(CompassPoint(side2 + side1));
            arr.push(CompassPoint(side2 + side1 + 'b' + side2));
            arr.push(CompassPoint(side2 + side2 + side1));
        }
        arr.push(CompassPoint(side2 + 'b' + side1));
    }
    return arr;
}


/**
 * Раскройте фигурные скобки указанной строки.
 * Смотрите https://en.wikipedia.org/wiki/Bash_(Unix_shell)#Brace_expansion
 *
 * Во входной строке пары фигурных скобок, содержащие разделенные запятыми подстроки,
 * представляют наборы подстрок, которые могут появиться в этой позиции на выходе.
 *
 * @param {string} str
 * @return {Iterable.<string>}
 *
 * К СВЕДЕНИЮ: Порядок выходных строк не имеет значения.
 *
 * Пример:
 *   '~/{Downloads,Pictures}/*.{jpg,gif,png}'  => '~/Downloads/*.jpg',
 *                                                '~/Downloads/*.gif'
 *                                                '~/Downloads/*.png',
 *                                                '~/Pictures/*.jpg',
 *                                                '~/Pictures/*.gif',
 *                                                '~/Pictures/*.png'
 *
 *   'It{{em,alic}iz,erat}e{d,}, please.'  => 'Itemized, please.',
 *                                            'Itemize, please.',
 *                                            'Italicized, please.',
 *                                            'Italicize, please.',
 *                                            'Iterated, please.',
 *                                            'Iterate, please.'
 *
 *   'thumbnail.{png,jp{e,}g}'  => 'thumbnail.png'
 *                                 'thumbnail.jpeg'
 *                                 'thumbnail.jpg'
 *
 *   'nothing to do' => 'nothing to do'
 */
function* expandBraces(str) {
    let stack = [], wasPrinted = [];
    let regExpr = /\{([^{}]+)\}/;
    stack.push(str);
    while (stack.length > 0){
        let curr = stack.pop();
        let match = curr.match(regExpr);
        if (match){
            let subStr = match[1].split(",");
            subStr.forEach((value) => {stack.push(curr.replace(match[0], value));});
        }
        else if (wasPrinted.indexOf(curr) == -1) {
            wasPrinted.push(curr);
            yield curr;
        }
    }
}


/**
 * Возвращает ZigZag матрицу
 *
 * Основная идея в алгоритме сжатия JPEG -- отсортировать коэффициенты заданного изображения зигзагом и закодировать их.
 * В этом задании вам нужно реализовать простой метод для создания квадратной ZigZag матрицы.
 * Детали смотрите здесь: https://en.wikipedia.org/wiki/JPEG#Entropy_coding
 * https://ru.wikipedia.org/wiki/JPEG
 * Отсортированные зигзагом элементы расположаться так: https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/JPEG_ZigZag.svg/220px-JPEG_ZigZag.svg.png
 *
 * @param {number} n - размер матрицы
 * @return {array}  массив размером n x n с зигзагообразным путем
 *
 * @example
 *   1  => [[0]]
 *
 *   2  => [[ 0, 1 ],
 *          [ 2, 3 ]]
 *
 *         [[ 0, 1, 5 ],
 *   3  =>  [ 2, 4, 6 ],
 *          [ 3, 7, 8 ]]
 *
 *         [[ 0, 1, 5, 6 ],
 *   4 =>   [ 2, 4, 7,12 ],
 *          [ 3, 8,11,13 ],
 *          [ 9,10,14,15 ]]
 *
 */
function getZigZagMatrix(n) {
    //throw new Error('Not implemented');
    let arr = new Array(n).fill(0).map(value => new Array(n).fill(0));
    let currValue = 0;
    for (let i = 0; i <= (n - 1) * 2; i++){
        let j = i < n ? i : (n - 1);
        let k = i < n ? 0 : (i - j);
        for (j, k; j >= 0 && k < n; j--, k++){
            if (i % 2 == 0){
                arr[j][k] = currValue++;
            }
            else {
                arr[k][j] = currValue++;
            }
        }
    }
    return arr;
}


/**
 * Возвращает true если заданный набор костяшек домино может быть расположен в ряд по правилам игры.
 * Детали игры домино смотрите тут: https://en.wikipedia.org/wiki/Dominoes
 * https://ru.wikipedia.org/wiki/%D0%94%D0%BE%D0%BC%D0%B8%D0%BD%D0%BE
 * Каждая костяшка представлена как массив [x,y] из значений на ней.
 * Например, набор [1, 1], [2, 2], [1, 2] может быть расположен в ряд ([1, 1] -> [1, 2] -> [2, 2]),
 * тогда как набор [1, 1], [0, 3], [1, 4] не может.
 * К СВЕДЕНИЮ: в домино любая пара [i, j] может быть перевернута и представлена как [j, i].
 *
 * @params {array} dominoes
 * @return {bool}
 *
 * @example
 *
 * [[0,1],  [1,1]] => true
 * [[1,1], [2,2], [1,5], [5,6], [6,3]] => false
 * [[1,3], [2,3], [1,4], [2,4], [1,5], [2,5]]  => true
 * [[0,0], [0,1], [1,1], [0,2], [1,2], [2,2], [0,3], [1,3], [2,3], [3,3]] => false
 *
 */
function canDominoesMakeRow(dominoes) {
    let count = new Array(7).fill(0);
    dominoes.forEach(element => {
        if (element[0] == element[1]){
            if (count[element[0]] != 0){
                count[element[0]] += 2;
            }
            else {
                count[element[0]] += 0.5;
            }
        }
        else {
            for (let i = 0; i < 2; i++){
                if (count[element[i]] % 1 != 0){
                    count[element[i]] += 0.5;
                }
                else {
                    count[element[i]]++;
                }
            }
        }
    });
    let countOnes = count.reduce((prev, curr) => prev + curr % 2, 0);
    return (countOnes % 2 != 0 || countOnes > 2) ? false : true;

}


/**
 * Возвращает строковое представление заданного упорядоченного списка целых чисел.
 *
 * Строковое представление списка целых чисел будет состоять из элементов, разделенных запятыми. Элементами могут быть:
 *   - отдельное целое число
 *   - или диапазон целых чисел, заданный начальным числом, отделенным от конечного числа черточкой('-').
 *     (Диапазон включает все целые числа в интервале, включая начальное и конечное число)
 *     Синтаксис диапазона должен быть использован для любого диапазона, где больше двух чисел.
 *
 * @params {array} nums
 * @return {bool}
 *
 * @example
 *
 * [ 0, 1, 2, 3, 4, 5 ]   => '0-5'
 * [ 1, 4, 5 ]            => '1,4,5'
 * [ 0, 1, 2, 5, 7, 8, 9] => '0-2,5,7-9'
 * [ 1, 2, 4, 5]          => '1,2,4,5'
 */
function extractRanges(nums) {
    function print(str, range, value){
        if (str.length != 0){
            str += ",";
        }
        switch (range.isRange){
            case 0:
                str += range.startRange;
                break;
            case 0.5:
                str += range.startRange + "," + range.endRange;
                break;
            case 1:
                str += range.startRange + "-" + range.endRange;
                break;
        }
        range.isRange = 0;
        range.endRange = undefined;
        range.startRange = value;
        return str;
    }
    let Range = {
        isRange: 0, 
        startRange: undefined, 
        endRange: undefined
    };
    let str = "";
    nums.forEach((element) => {
        if (Range.isRange == 0){
            if (Range.startRange == undefined){
                Range.startRange = element;
            }
            else if (element - Range.startRange == 1){
                Range.endRange = element;
                Range.isRange = 0.5;
            }
            else {
                str = print(str, Range, element);
            }
        }
        else if (Range.isRange == 0.5){
            if (element - Range.endRange == 1){
                Range.isRange = 1;
                Range.endRange = element;
            }
            else {
                str = print(str, Range, element);
            }
        }
        else {
            if (element - Range.endRange == 1){
                Range.endRange = element;
            }
            else {
                str = print(str, Range, element);
            }
        }
    });
    str = print(str, Range, 0);
    return str;
}

module.exports = {
    createCompassPoints : createCompassPoints,
    expandBraces : expandBraces,
    getZigZagMatrix : getZigZagMatrix,
    canDominoesMakeRow : canDominoesMakeRow,
    extractRanges : extractRanges
};
