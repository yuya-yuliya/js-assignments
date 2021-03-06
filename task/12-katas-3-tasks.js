'use strict';

/**
 * Возвращает true если слово попадается в заданной головоломке.
 * Каждое слово может быть построено при помощи прохода "змейкой" по таблице вверх, влево, вправо, вниз.
 * Каждый символ может быть использован только один раз ("змейка" не может пересекать себя).
 *
 * @param {array} puzzle
 * @param {array} searchStr
 * @return {bool}
 *
 * @example
 *   var puzzle = [ 
 *      'ANGULAR',
 *      'REDNCAE',
 *      'RFIDTCL',
 *      'AGNEGSA',
 *      'YTIRTSP',
 *   ]; 
 *   'ANGULAR'   => true   (первая строка)
 *   'REACT'     => true   (начиная с верхней правой R и дальше ↓ ← ← ↓)
 *   'UNDEFINED' => true
 *   'RED'       => true
 *   'STRING'    => true
 *   'CLASS'     => true
 *   'ARRAY'     => true   (первая колонка)
 *   'FUNCTION'  => false
 *   'NULL'      => false 
 */
function findStringInSnakingPuzzle(puzzle, searchStr) {
    function findInNear(ind, puzzle, subStr){
        if (subStr == 0){
            return true;
        }
        let puzzleWordLen = puzzle[0].length, puzzleLen = puzzle.length * puzzle[0].length;
        let nextInd = 0;
        for (let i = 0; i < 4; i++){
            switch (i){
                case 0:
                    if (ind % puzzleWordLen < puzzleWordLen - 1){
                        nextInd = ind + 1;
                    }
                    else {
                        continue;
                    }
                    break;
                case 1:
                    nextInd = ind + puzzleWordLen;
                    break;
                case 2:
                    if (ind % puzzleWordLen > 0){
                        nextInd = ind - 1;
                    }
                    else{
                        continue;
                    }
                    break;
                case 3:
                    nextInd = ind - puzzleWordLen;
                    break;
            }
            if (nextInd < puzzleLen && nextInd > 0  && puzzle[Math.floor(nextInd / puzzleWordLen)][nextInd % puzzleWordLen] == subStr[0]){
                if (findInNear(nextInd, puzzle, subStr.slice(1))){
                    return true;
                }
            }
        }
        return false;
    }

    let wasFound = false, puzzleLen = puzzle.length * puzzle[0].length, puzzleWordLen = puzzle[0].length;
    for (let ind = 0; ind < puzzleLen && !wasFound; ind++){
        if (puzzle[Math.floor(ind / puzzleWordLen)][ind % puzzleWordLen] == searchStr[0]){
            wasFound = findInNear(ind, puzzle, searchStr.slice(1));
        }
    }
    return wasFound;
}


/**
 * Возвращает все перестановки заданной строки.
 * Принимаем, что все символы в заданной строке уникальные.
 * Порядок перестановок не имеет значения.
 *
 * @param {string} chars
 * @return {Iterable.<string>} все возможные строки, построенные из символов заданной строки
 *
 * @example
 *    'ab'  => 'ab','ba'
 *    'abc' => 'abc','acb','bac','bca','cab','cba'
 */
function* getPermutations(chars) {
    function next(arr){
        let i = arr.length - 2;
        while (i >= 0 && arr[i] > arr[i + 1]){
            i--;
        }
        if (i == -1){
            return false;
        }
        let j = arr.length - 1;
        while (j >= 0 && arr[j] < arr[i]){
            j--;
        }
        let temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
        for (let j = i + 1, k = arr.length - 1; j < k; j++, k--){
            temp = arr[j];
            arr[j] = arr[k];
            arr[k] = temp;
        }
        return true;
    }

    yield chars;
    let arr = chars.split("");
    while (next(arr)){
        yield arr.join("");
    }
}


/**
 * Возвращает наибольшую прибыль от игры на котировках акций.
 * Цены на акции храняться в массиве в порядке увеличения даты.
 * Прибыль -- это разница между покупкой и продажей.
 * Каждый день вы можете либо купить одну акцию, либо продать любое количество акций, купленных до этого, либо ничего не делать.
 * Таким образом, максимальная прибыль -- это максимальная разница всех пар в последовательности цен на акции.
 *
 * @param {array} quotes
 * @return {number} max profit
 *
 * @example
 *    [ 1, 2, 3, 4, 5, 6]   => 15  (купить по 1,2,3,4,5 и затем продать все по 6)
 *    [ 6, 5, 4, 3, 2, 1]   => 0   (ничего не покупать)
 *    [ 1, 6, 5, 10, 8, 7 ] => 18  (купить по 1,6,5 и затем продать все по 10)
 */
function getMostProfitFromStockQuotes(quotes) {
    let profit = 0;
    while (quotes.length > 0){
        let deltaArr = new Array(quotes.length);
        for (let i = 0; i < quotes.length; i++){
            deltaArr[i] = quotes[i] - quotes[0];
        }
        let maxDeltaInd = 0;
        for (let i = 1; i < deltaArr.length; i++){
            if (deltaArr[i] >= deltaArr[maxDeltaInd]){
                maxDeltaInd = i;
            }
        }
        for (let i = 0; i < maxDeltaInd; i++){
            profit -= quotes[i];
        }
        profit += quotes[maxDeltaInd] * maxDeltaInd;
        quotes = quotes.slice(maxDeltaInd + 1);
    }
    return profit;
}


/**
 * Класс, предосатвляющий метод по сокращению url.
 * Реализуйте любой алгоритм, но не храните ссылки в хранилище пар ключ\значение.
 * Укороченные ссылки должны быть как минимум в 1.5 раза короче исходных.
 *
 * @class
 *
 * @example
 *    
 *     var urlShortener = new UrlShortener();
 *     var shortLink = urlShortener.encode('https://en.wikipedia.org/wiki/URL_shortening');
 *     var original  = urlShortener.decode(shortLink); // => 'https://en.wikipedia.org/wiki/URL_shortening'
 * 
 */
function UrlShortener() {
    this.urlAllowedChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"+
                           "abcdefghijklmnopqrstuvwxyz"+
                           "0123456789-_.~!*'();:@&=+$,/?#[]";
}

UrlShortener.prototype = {

    encode: function(url) {
        const shift = 7;
        let utf8CharCode = 0;
        let short = "";
        for (let i = 0; i < url.length; i++) {
            utf8CharCode = (utf8CharCode << shift) | (this.urlAllowedChars.indexOf(url[i]) + 1);
            if ((i + 1) % 2 == 0 || i == url.length - 1) {
                short += String.fromCharCode(utf8CharCode);
                utf8CharCode = 0;
            } 
        }
        return short;
    },
    
    decode: function(code) {
        const shift = 7;
        let utf8CharCode = 0;
        let url = "";
        for (let i = 0; i < code.length; i++) {
            utf8CharCode = code.charCodeAt(i);
            let ind = utf8CharCode >> shift & 0b1111111;
            if (ind != 0) {
                url += this.urlAllowedChars[ind - 1];
            }
            url += this.urlAllowedChars[(utf8CharCode & 0b1111111) - 1];
        }
        return url;
    } 
}


module.exports = {
    findStringInSnakingPuzzle: findStringInSnakingPuzzle,
    getPermutations: getPermutations,
    getMostProfitFromStockQuotes: getMostProfitFromStockQuotes,
    UrlShortener: UrlShortener
};
