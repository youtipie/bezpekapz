// Клас для реалізації віршованого шифру
export class VerseCipher {

    /**
     * Створює 2D-масив (сітку) символів з вірша.
     */
    private static createGrid(poem: string): string[][] {
        return poem.split('\n').map(line => line.split(''));
    }

    /**
     * Форматує число у двозначний рядок, додаючи нуль попереду, якщо необхідно.
     */
    private static pad(num: number): string {
        return num.toString().padStart(2, '0');
    }

    /**
     * Шифрує текст за допомогою віршованого шифру.
     */
    static encrypt(text: string, poemKey: string): string {
        if (!poemKey.trim()) {
            throw new Error("Ключ-вірш не може бути порожнім.");
        }

        const grid = this.createGrid(poemKey);
        const encryptedChars: string[] = [];

        for (const char of text) {
            const lowerChar = char.toLowerCase();
            const positions: { row: number, col: number }[] = [];

            // Знаходимо всі можливі позиції для поточного символу
            grid.forEach((row, rowIndex) => {
                row.forEach((gridChar, colIndex) => {
                    if (gridChar.toLowerCase() === lowerChar) {
                        positions.push({ row: rowIndex + 1, col: colIndex + 1 });
                    }
                });
            });

            if (positions.length === 0) {
                // Якщо символ не знайдено у вірші, шифрування неможливе
                throw new Error(`Символ "${char}" не знайдено у вірші-ключі.`);
            }

            // Вибираємо випадкову позицію зі знайдених
            const randomPos = positions[Math.floor(Math.random() * positions.length)];

            // Форматуємо код як РРКК (Рядок-Рядок-Колонка-Колонка)
            const code = `${this.pad(randomPos.row)}${this.pad(randomPos.col)}`;
            encryptedChars.push(code);
        }

        return encryptedChars.join(',');
    }

    /**
     * Розшифровує текст, зашифрований віршованим шифром.
     */
    static decrypt(cipherText: string, poemKey: string): string {
        if (!poemKey.trim()) {
            throw new Error("Ключ-вірш не може бути порожнім.");
        }
        if (!cipherText.trim()) {
            return ""; // Повертаємо порожній рядок, якщо шифротекст порожній
        }

        const grid = this.createGrid(poemKey);
        const codes = cipherText.split(',');
        let decryptedText = '';

        for (const code of codes) {
            if (code.length !== 4 || !/^\d{4}$/.test(code)) {
                throw new Error(`Невірний формат коду: "${code}". Код повинен складатися з 4 цифр.`);
            }

            const row = parseInt(code.substring(0, 2), 10);
            const col = parseInt(code.substring(2, 4), 10);

            if (row > 0 && row <= grid.length && col > 0 && col <= grid[row - 1].length) {
                decryptedText += grid[row - 1][col - 1];
            } else {
                // Якщо координати виходять за межі, дані пошкоджені або ключ невірний
                throw new Error(`Координати (${row}, ${col}) виходять за межі вірша-ключа.`);
            }
        }

        return decryptedText;
    }
}
