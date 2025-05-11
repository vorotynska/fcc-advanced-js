// build a permutation generator that will take a string and return all 
// possible permutations of the characters in the string

function permuteString(str, prefix = "", results = []) {
    // Базовый случай: если строка пустая, сохраняем накопленный префикс
    if (str.length === 0) {
        results.push(prefix);
        return results;
    }

    for (let i = 0; i < str.length; i++) {
        // Текущий символ
        const currentChar = str[i];
        // Остаток строки без текущего символа
        const remaining = str.slice(0, i) + str.slice(i + 1);
        console.log(`Prefix: "${prefix}", Current Char: "${currentChar}", Remaining: "${remaining}"`);

        // Рекурсивно вызываем с новым префиксом и оставшейся строкой
        permuteString(remaining, prefix + currentChar, results);
    }

    // После всех вызовов убираем дубликаты и возвращаем массив
    return [...new Set(results)];
}

// Пример вызова
const permutations = permuteString("cat");
console.log("Unique permutations:", permutations);