// Клас для шифру Цезаря
export class CaesarCipher {
    private static readonly UK_ALPHABET = 'абвгґдеєжзиіїйклмнопрстуфхцчшщьюя';
    private static readonly EN_ALPHABET = 'abcdefghijklmnopqrstuvwxyz';

    static encrypt(text: string, key: number, language: 'uk' | 'en'): string {
        const alphabet = language === 'uk' ? this.UK_ALPHABET : this.EN_ALPHABET;
        const n = alphabet.length;

        return text.split('').map(char => {
            const lowerChar = char.toLowerCase();
            const index = alphabet.indexOf(lowerChar);

            if (index === -1) return char;

            const encryptedIndex = (index + key) % n;
            const encryptedChar = alphabet[encryptedIndex];

            return char === char.toUpperCase() ? encryptedChar.toUpperCase() : encryptedChar;
        }).join('');
    }

    static decrypt(text: string, key: number, language: 'uk' | 'en'): string {
        const alphabet = language === 'uk' ? this.UK_ALPHABET : this.EN_ALPHABET;
        const n = alphabet.length;

        return text.split('').map(char => {
            const lowerChar = char.toLowerCase();
            const index = alphabet.indexOf(lowerChar);

            if (index === -1) return char;

            const decryptedIndex = (index + n - (key % n)) % n;
            const decryptedChar = alphabet[decryptedIndex];

            return char === char.toUpperCase() ? decryptedChar.toUpperCase() : decryptedChar;
        }).join('');
    }
}