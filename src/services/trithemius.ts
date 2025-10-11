// Клас для шифру Тритеміуса
export class TrithemiusCipher {
    private static readonly UK_ALPHABET = 'абвгґдеєжзиіїйклмнопрстуфхцчшщьюя';
    private static readonly EN_ALPHABET = 'abcdefghijklmnopqrstuvwxyz';

    static encryptLinear2D(text: string, vector: [number, number], language: 'uk' | 'en'): string {
        const alphabet = language === 'uk' ? this.UK_ALPHABET : this.EN_ALPHABET;
        const n = alphabet.length;
        const [a, b] = vector;

        return text.split('').map((char, i) => {
            const lowerChar = char.toLowerCase();
            const index = alphabet.indexOf(lowerChar);

            if (index === -1) return char;

            const shift = Math.floor(a * i + b) % n;
            const encryptedIndex = (index + shift) % n;
            const encryptedChar = alphabet[encryptedIndex];

            return char === char.toUpperCase() ? encryptedChar.toUpperCase() : encryptedChar;
        }).join('');
    }

    static decryptLinear2D(text: string, vector: [number, number], language: 'uk' | 'en'): string {
        const alphabet = language === 'uk' ? this.UK_ALPHABET : this.EN_ALPHABET;
        const n = alphabet.length;
        const [a, b] = vector;

        return text.split('').map((char, i) => {
            const lowerChar = char.toLowerCase();
            const index = alphabet.indexOf(lowerChar);

            if (index === -1) return char;

            const shift = Math.floor(a * i + b) % n;
            const decryptedIndex = (index + n - (shift % n)) % n;
            const decryptedChar = alphabet[decryptedIndex];

            return char === char.toUpperCase() ? decryptedChar.toUpperCase() : decryptedChar;
        }).join('');
    }

    static encryptQuadratic3D(text: string, vector: [number, number, number], language: 'uk' | 'en'): string {
        const alphabet = language === 'uk' ? this.UK_ALPHABET : this.EN_ALPHABET;
        const n = alphabet.length;
        const [a, b, c] = vector;

        return text.split('').map((char, i) => {
            const lowerChar = char.toLowerCase();
            const index = alphabet.indexOf(lowerChar);

            if (index === -1) return char;

            const shift = Math.floor(a * i * i + b * i + c) % n;
            const encryptedIndex = (index + shift) % n;
            const encryptedChar = alphabet[encryptedIndex];

            return char === char.toUpperCase() ? encryptedChar.toUpperCase() : encryptedChar;
        }).join('');
    }

    static decryptQuadratic3D(text: string, vector: [number, number, number], language: 'uk' | 'en'): string {
        const alphabet = language === 'uk' ? this.UK_ALPHABET : this.EN_ALPHABET;
        const n = alphabet.length;
        const [a, b, c] = vector;

        return text.split('').map((char, i) => {
            const lowerChar = char.toLowerCase();
            const index = alphabet.indexOf(lowerChar);

            if (index === -1) return char;

            const shift = Math.floor(a * i * i + b * i + c) % n;
            const decryptedIndex = (index + n - (shift % n)) % n;
            const decryptedChar = alphabet[decryptedIndex];

            return char === char.toUpperCase() ? decryptedChar.toUpperCase() : decryptedChar;
        }).join('');
    }

    static encryptPassword(text: string, password: string, language: 'uk' | 'en'): string {
        const alphabet = language === 'uk' ? this.UK_ALPHABET : this.EN_ALPHABET;
        const n = alphabet.length;

        return text.split('').map((char, i) => {
            const lowerChar = char.toLowerCase();
            const index = alphabet.indexOf(lowerChar);

            if (index === -1) return char;

            const keyChar = password[i % password.length].toLowerCase();
            const keyIndex = alphabet.indexOf(keyChar);
            const shift = keyIndex !== -1 ? keyIndex : 0;

            const encryptedIndex = (index + shift) % n;
            const encryptedChar = alphabet[encryptedIndex];

            return char === char.toUpperCase() ? encryptedChar.toUpperCase() : encryptedChar;
        }).join('');
    }

    static decryptPassword(text: string, password: string, language: 'uk' | 'en'): string {
        const alphabet = language === 'uk' ? this.UK_ALPHABET : this.EN_ALPHABET;
        const n = alphabet.length;

        return text.split('').map((char, i) => {
            const lowerChar = char.toLowerCase();
            const index = alphabet.indexOf(lowerChar);

            if (index === -1) return char;

            const keyChar = password[i % password.length].toLowerCase();
            const keyIndex = alphabet.indexOf(keyChar);
            const shift = keyIndex !== -1 ? keyIndex : 0;

            const decryptedIndex = (index + n - (shift % n)) % n;
            const decryptedChar = alphabet[decryptedIndex];

            return char === char.toUpperCase() ? decryptedChar.toUpperCase() : decryptedChar;
        }).join('');
    }
}