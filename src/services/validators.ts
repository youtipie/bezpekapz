// Клас для валідації ключа
export class KeyValidator {
    static validate(key: string): { isValid: boolean; error?: string } {
        if (!key.trim()) {
            return { isValid: false, error: 'Ключ не може бути порожнім' };
        }

        const keyNum = parseInt(key);
        if (isNaN(keyNum)) {
            return { isValid: false, error: 'Ключ повинен бути числом' };
        }

        if (keyNum < 0) {
            return { isValid: false, error: 'Ключ повинен бути позитивним числом' };
        }

        return { isValid: true };
    }

    // Валідація 2-вимірного вектора (a, b)
    static validate2DVector(vectorStr: string): { isValid: boolean; error?: string; vector?: [number, number] } {
        if (!vectorStr.trim()) {
            return { isValid: false, error: 'Вектор не може бути порожнім' };
        }

        const parts = vectorStr.split(',').map(s => s.trim());
        if (parts.length !== 2) {
            return { isValid: false, error: 'Вектор повинен містити 2 числа через кому (a, b)' };
        }

        const a = parseFloat(parts[0]);
        const b = parseFloat(parts[1]);

        if (isNaN(a) || isNaN(b)) {
            return { isValid: false, error: 'Всі коефіцієнти повинні бути числами' };
        }

        return { isValid: true, vector: [a, b] };
    }

    // Валідація 3-вимірного вектора (a, b, c)
    static validate3DVector(vectorStr: string): { isValid: boolean; error?: string; vector?: [number, number, number] } {
        if (!vectorStr.trim()) {
            return { isValid: false, error: 'Вектор не може бути порожнім' };
        }

        const parts = vectorStr.split(',').map(s => s.trim());
        if (parts.length !== 3) {
            return { isValid: false, error: 'Вектор повинен містити 3 числа через кому (a, b, c)' };
        }

        const a = parseFloat(parts[0]);
        const b = parseFloat(parts[1]);
        const c = parseFloat(parts[2]);

        if (isNaN(a) || isNaN(b) || isNaN(c)) {
            return { isValid: false, error: 'Всі коефіцієнти повинні бути числами' };
        }

        return { isValid: true, vector: [a, b, c] };
    }

    // Валідація текстового ключа (пароль)
    static validatePassword(password: string, language: 'uk' | 'en'): { isValid: boolean; error?: string } {
        if (!password.trim()) {
            return { isValid: false, error: 'Пароль не може бути порожнім' };
        }

        const ukPattern = /^[а-яґєіїьА-ЯҐЄІЇ']+$/;
        const enPattern = /^[a-zA-Z]+$/;

        const pattern = language === 'uk' ? ukPattern : enPattern;

        if (!pattern.test(password)) {
            const langName = language === 'uk' ? 'українські' : 'англійські';
            return { isValid: false, error: `Пароль повинен містити лише ${langName} літери` };
        }

        return { isValid: true };
    }

    // Валідація ключа-вірша
    static validateVerseKey(key: string): { isValid: boolean; error?: string } {
        if (!key.trim()) {
            return { isValid: false, error: 'Ключ-вірш не може бути порожнім' };
        }
        return { isValid: true };
    }
}

// Клас для валідації тексту
export class TextValidator {
    static validate(text: string, language: 'uk' | 'en'): { isValid: boolean; error?: string } {
        if (!text.trim()) {
            return { isValid: false, error: 'Текст не може бути порожнім' };
        }

        const ukPattern = /^[а-яґєіїьА-ЯҐЄІЇ'\s.,!?;:\-()[\]"'0-9]*$/;
        const enPattern = /^[a-zA-Z\s.,!?;:\-()[\]"'0-9]*$/;

        const pattern = language === 'uk' ? ukPattern : enPattern;

        if (!pattern.test(text)) {
            const langName = language === 'uk' ? 'українська' : 'англійська';
            return { isValid: false, error: `Текст містить недопустимі символи для ${langName} мови` };
        }

        return { isValid: true };
    }
}