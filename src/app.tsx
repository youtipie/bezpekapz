import React, {useRef, useState} from 'react';
import {FileText, Info, Lock, LogOut, Printer, Save, Unlock, Upload, X} from 'lucide-react';

// Клас для валідації ключа
class KeyValidator {
    static validate(key: string): { isValid: boolean; error?: string } {
        if (!key.trim()) {
            return {isValid: false, error: 'Ключ не може бути порожнім'};
        }

        const keyNum = parseInt(key);
        if (isNaN(keyNum)) {
            return {isValid: false, error: 'Ключ повинен бути числом'};
        }

        if (keyNum < 0) {
            return {isValid: false, error: 'Ключ повинен бути позитивним числом'};
        }

        return {isValid: true};
    }

    // Валідація 2-вимірного вектора (a, b)
    static validate2DVector(vectorStr: string): { isValid: boolean; error?: string; vector?: [number, number] } {
        if (!vectorStr.trim()) {
            return {isValid: false, error: 'Вектор не може бути порожнім'};
        }

        const parts = vectorStr.split(',').map(s => s.trim());
        if (parts.length !== 2) {
            return {isValid: false, error: 'Вектор повинен містити 2 числа через кому (a, b)'};
        }

        const a = parseFloat(parts[0]);
        const b = parseFloat(parts[1]);

        if (isNaN(a) || isNaN(b)) {
            return {isValid: false, error: 'Всі коефіцієнти повинні бути числами'};
        }

        return {isValid: true, vector: [a, b]};
    }

    // Валідація 3-вимірного вектора (a, b, c)
    static validate3DVector(vectorStr: string): {
        isValid: boolean;
        error?: string;
        vector?: [number, number, number]
    } {
        if (!vectorStr.trim()) {
            return {isValid: false, error: 'Вектор не може бути порожнім'};
        }

        const parts = vectorStr.split(',').map(s => s.trim());
        if (parts.length !== 3) {
            return {isValid: false, error: 'Вектор повинен містити 3 числа через кому (a, b, c)'};
        }

        const a = parseFloat(parts[0]);
        const b = parseFloat(parts[1]);
        const c = parseFloat(parts[2]);

        if (isNaN(a) || isNaN(b) || isNaN(c)) {
            return {isValid: false, error: 'Всі коефіцієнти повинні бути числами'};
        }

        return {isValid: true, vector: [a, b, c]};
    }

    // Валідація текстового ключа (пароля)
    static validatePassword(password: string, language: 'uk' | 'en'): { isValid: boolean; error?: string } {
        if (!password.trim()) {
            return {isValid: false, error: 'Пароль не може бути порожнім'};
        }

        const ukPattern = /^[а-яёіїєґА-ЯЁІЇЄҐ]+$/;
        const enPattern = /^[a-zA-Z]+$/;

        const pattern = language === 'uk' ? ukPattern : enPattern;

        if (!pattern.test(password)) {
            const langName = language === 'uk' ? 'українські' : 'англійські';
            return {isValid: false, error: `Пароль повинен містити лише ${langName} літери`};
        }

        return {isValid: true};
    }
}

// Клас для валідації тексту
// Перевіряє чи текст не порожній і чи містить лише допустимі символи для обраної мови
class TextValidator {
    static validate(text: string, language: 'uk' | 'en'): { isValid: boolean; error?: string } {
        if (!text.trim()) {
            return {isValid: false, error: 'Текст не може бути порожнім'};
        }

        const ukPattern = /^[а-яёіїєґА-ЯЁІЇЄҐ\s.,!?;:\-()[\]"'0-9]*$/;
        const enPattern = /^[a-zA-Z\s.,!?;:\-()[\]"'0-9]*$/;

        const pattern = language === 'uk' ? ukPattern : enPattern;

        if (!pattern.test(text)) {
            const langName = language === 'uk' ? 'українська' : 'англійська';
            return {isValid: false, error: `Текст містить недопустимі символи для ${langName} мови`};
        }

        return {isValid: true};
    }
}

// Основний клас для шифру Цезаря
class CaesarCipher {
    private static readonly UK_ALPHABET = 'абвгґдеєжзиіїйклмнопрстуфхцчшщьюя';
    private static readonly EN_ALPHABET = 'abcdefghijklmnopqrstuvwxyz';

    // Шифрування тексту: зсуває символи на ключ
    static encrypt(text: string, key: number, language: 'uk' | 'en'): string {
        const alphabet = language === 'uk' ? this.UK_ALPHABET : this.EN_ALPHABET;
        const n = alphabet.length;

        return text.split('').map(char => {
            const lowerChar = char.toLowerCase();
            const index = alphabet.indexOf(lowerChar);

            if (index === -1) {
                return char;
            }

            const encryptedIndex = (index + key) % n;
            const encryptedChar = alphabet[encryptedIndex];

            return char === char.toUpperCase() ? encryptedChar.toUpperCase() : encryptedChar;
        }).join('');
    }

    // Розшифрування тексту: зсуває символи назад на ключ
    static decrypt(text: string, key: number, language: 'uk' | 'en'): string {
        const alphabet = language === 'uk' ? this.UK_ALPHABET : this.EN_ALPHABET;
        const n = alphabet.length;

        return text.split('').map(char => {
            const lowerChar = char.toLowerCase();
            const index = alphabet.indexOf(lowerChar);

            if (index === -1) {
                return char;
            }

            const decryptedIndex = (index + n - (key % n)) % n;
            const decryptedChar = alphabet[decryptedIndex];

            return char === char.toUpperCase() ? decryptedChar.toUpperCase() : decryptedChar;
        }).join('');
    }
}

// Клас для шифру Тритеміуса
class TrithemiusCipher {
    private static readonly UK_ALPHABET = 'абвгґдеєжзиіїйклмнопрстуфхцчшщьюя';
    private static readonly EN_ALPHABET = 'abcdefghijklmnopqrstuvwxyz';

    // Шифрування з лінійним ключем (2D вектор: a*i + b)
    static encryptLinear2D(text: string, vector: [number, number], language: 'uk' | 'en'): string {
        const alphabet = language === 'uk' ? this.UK_ALPHABET : this.EN_ALPHABET;
        const n = alphabet.length;
        const [a, b] = vector;

        return text.split('').map((char, i) => {
            const lowerChar = char.toLowerCase();
            const index = alphabet.indexOf(lowerChar);

            if (index === -1) {
                return char;
            }

            const shift = Math.floor(a * i + b) % n;
            const encryptedIndex = (index + shift) % n;
            const encryptedChar = alphabet[encryptedIndex];

            return char === char.toUpperCase() ? encryptedChar.toUpperCase() : encryptedChar;
        }).join('');
    }

    // Розшифрування з лінійним ключем (2D вектор)
    static decryptLinear2D(text: string, vector: [number, number], language: 'uk' | 'en'): string {
        const alphabet = language === 'uk' ? this.UK_ALPHABET : this.EN_ALPHABET;
        const n = alphabet.length;
        const [a, b] = vector;

        return text.split('').map((char, i) => {
            const lowerChar = char.toLowerCase();
            const index = alphabet.indexOf(lowerChar);

            if (index === -1) {
                return char;
            }

            const shift = Math.floor(a * i + b) % n;
            const decryptedIndex = (index + n - (shift % n)) % n;
            const decryptedChar = alphabet[decryptedIndex];

            return char === char.toUpperCase() ? decryptedChar.toUpperCase() : decryptedChar;
        }).join('');
    }

    // Шифрування з квадратичним ключем (3D вектор: a*i² + b*i + c)
    static encryptQuadratic3D(text: string, vector: [number, number, number], language: 'uk' | 'en'): string {
        const alphabet = language === 'uk' ? this.UK_ALPHABET : this.EN_ALPHABET;
        const n = alphabet.length;
        const [a, b, c] = vector;

        return text.split('').map((char, i) => {
            const lowerChar = char.toLowerCase();
            const index = alphabet.indexOf(lowerChar);

            if (index === -1) {
                return char;
            }

            const shift = Math.floor(a * i * i + b * i + c) % n;
            const encryptedIndex = (index + shift) % n;
            const encryptedChar = alphabet[encryptedIndex];

            return char === char.toUpperCase() ? encryptedChar.toUpperCase() : encryptedChar;
        }).join('');
    }

    // Розшифрування з квадратичним ключем (3D вектор)
    static decryptQuadratic3D(text: string, vector: [number, number, number], language: 'uk' | 'en'): string {
        const alphabet = language === 'uk' ? this.UK_ALPHABET : this.EN_ALPHABET;
        const n = alphabet.length;
        const [a, b, c] = vector;

        return text.split('').map((char, i) => {
            const lowerChar = char.toLowerCase();
            const index = alphabet.indexOf(lowerChar);

            if (index === -1) {
                return char;
            }

            const shift = Math.floor(a * i * i + b * i + c) % n;
            const decryptedIndex = (index + n - (shift % n)) % n;
            const decryptedChar = alphabet[decryptedIndex];

            return char === char.toUpperCase() ? decryptedChar.toUpperCase() : decryptedChar;
        }).join('');
    }

    // Шифрування з текстовим ключем (паролем)
    static encryptPassword(text: string, password: string, language: 'uk' | 'en'): string {
        const alphabet = language === 'uk' ? this.UK_ALPHABET : this.EN_ALPHABET;
        const n = alphabet.length;

        return text.split('').map((char, i) => {
            const lowerChar = char.toLowerCase();
            const index = alphabet.indexOf(lowerChar);

            if (index === -1) {
                return char;
            }

            const keyChar = password[i % password.length].toLowerCase();
            const keyIndex = alphabet.indexOf(keyChar);
            const shift = keyIndex !== -1 ? keyIndex : 0;

            const encryptedIndex = (index + shift) % n;
            const encryptedChar = alphabet[encryptedIndex];

            return char === char.toUpperCase() ? encryptedChar.toUpperCase() : encryptedChar;
        }).join('');
    }

    // Розшифрування з текстовим ключем (паролем)
    static decryptPassword(text: string, password: string, language: 'uk' | 'en'): string {
        const alphabet = language === 'uk' ? this.UK_ALPHABET : this.EN_ALPHABET;
        const n = alphabet.length;

        return text.split('').map((char, i) => {
            const lowerChar = char.toLowerCase();
            const index = alphabet.indexOf(lowerChar);

            if (index === -1) {
                return char;
            }

            const keyChar = password[i % password.length].toLowerCase();
            const keyIndex = alphabet.indexOf(keyChar);
            const shift = keyIndex !== -1 ? keyIndex : 0;

            const decryptedIndex = (index + n - (shift % n)) % n;
            const decryptedChar = alphabet[decryptedIndex];

            return char === char.toUpperCase() ? decryptedChar.toUpperCase() : decryptedChar;
        }).join('');
    }
}

// Основний React-компонент програми
const CaesarCipherApp: React.FC = () => {
    const [text, setText] = useState<string>(''); // введений текст
    const [key, setKey] = useState<string>(''); // ключ шифру Цезаря
    const [result, setResult] = useState<string>(''); // результат шифрування/розшифрування
    const [language, setLanguage] = useState<'uk' | 'en'>('uk'); // обрана мова
    const [cipherType, setCipherType] = useState<'caesar' | 'trithemius'>('caesar'); // Тип шифру
    const [trithemiusKeyType, setTrithemiusKeyType] = useState<'linear2d' | 'quadratic3d' | 'password'>('linear2d'); // Тип ключа для шифру Тритеміуса
    const [showAbout, setShowAbout] = useState(false); // показ вікна "Про програму"
    const [fileName, setFileName] = useState<string>(''); // назва завантаженого файлу
    const [showExitConfirm, setShowExitConfirm] = useState(false); // показ вікна підтвердження виходу
    const fileInputRef = useRef<HTMLInputElement>(null); // посилання на input для завантаження файлу

    // Функція шифрування тексту після валідації ключа і тексту
    const handleEncrypt = () => {
        if (cipherType === 'caesar') {
            const keyValidation = KeyValidator.validate(key);
            if (!keyValidation.isValid) {
                alert(keyValidation.error);
                return;
            }

            const textValidation = TextValidator.validate(text, language);
            if (!textValidation.isValid) {
                alert(textValidation.error);
                return;
            }

            const keyNum = parseInt(key);
            const encrypted = CaesarCipher.encrypt(text, keyNum, language);
            setResult(encrypted);
        } else {
            // Тритеміус
            const textValidation = TextValidator.validate(text, language);
            if (!textValidation.isValid) {
                alert(textValidation.error);
                return;
            }

            if (trithemiusKeyType === 'linear2d') {
                const vectorValidation = KeyValidator.validate2DVector(key);
                if (!vectorValidation.isValid) {
                    alert(vectorValidation.error);
                    return;
                }
                const encrypted = TrithemiusCipher.encryptLinear2D(text, vectorValidation.vector!, language);
                setResult(encrypted);
            } else if (trithemiusKeyType === 'quadratic3d') {
                const vectorValidation = KeyValidator.validate3DVector(key);
                if (!vectorValidation.isValid) {
                    alert(vectorValidation.error);
                    return;
                }
                const encrypted = TrithemiusCipher.encryptQuadratic3D(text, vectorValidation.vector!, language);
                setResult(encrypted);
            } else if (trithemiusKeyType === 'password') {
                const passwordValidation = KeyValidator.validatePassword(key, language);
                if (!passwordValidation.isValid) {
                    alert(passwordValidation.error);
                    return;
                }
                const encrypted = TrithemiusCipher.encryptPassword(text, key, language);
                setResult(encrypted);
            }
        }
    };

    // Функція розшифрування тексту після валідації
    const handleDecrypt = () => {
        if (cipherType === 'caesar') {
            const keyValidation = KeyValidator.validate(key);
            if (!keyValidation.isValid) {
                alert(keyValidation.error);
                return;
            }

            const textValidation = TextValidator.validate(text, language);
            if (!textValidation.isValid) {
                alert(textValidation.error);
                return;
            }

            const keyNum = parseInt(key);
            const decrypted = CaesarCipher.decrypt(text, keyNum, language);
            setResult(decrypted);
        } else {
            // Тритеміус
            const textValidation = TextValidator.validate(text, language);
            if (!textValidation.isValid) {
                alert(textValidation.error);
                return;
            }

            if (trithemiusKeyType === 'linear2d') {
                const vectorValidation = KeyValidator.validate2DVector(key);
                if (!vectorValidation.isValid) {
                    alert(vectorValidation.error);
                    return;
                }
                const decrypted = TrithemiusCipher.decryptLinear2D(text, vectorValidation.vector!, language);
                setResult(decrypted);
            } else if (trithemiusKeyType === 'quadratic3d') {
                const vectorValidation = KeyValidator.validate3DVector(key);
                if (!vectorValidation.isValid) {
                    alert(vectorValidation.error);
                    return;
                }
                const decrypted = TrithemiusCipher.decryptQuadratic3D(text, vectorValidation.vector!, language);
                setResult(decrypted);
            } else if (trithemiusKeyType === 'password') {
                const passwordValidation = KeyValidator.validatePassword(key, language);
                if (!passwordValidation.isValid) {
                    alert(passwordValidation.error);
                    return;
                }
                const decrypted = TrithemiusCipher.decryptPassword(text, key, language);
                setResult(decrypted);
            }
        }
    };

    // Завантаження текстового файлу і встановлення його в textarea
    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file && file.type === 'text/plain') {
            const reader = new FileReader();
            reader.onload = (e) => {
                const content = e.target?.result as string;
                setText(content);
                setFileName(file.name);
            };
            reader.readAsText(file, 'utf-8');
        } else {
            alert('Будь ласка, оберіть текстовий файл (.txt)');
        }
    };

    // Збереження результату у текстовий файл
    const handleSaveFile = () => {
        if (!result) {
            alert('Немає результату для збереження');
            return;
        }

        const blob = new Blob([result], {type: 'text/plain;charset=utf-8'});
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName || 'encrypted_text.txt';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    // Друк результату у новому вікні
    const handlePrint = () => {
        if (!result) {
            alert('Немає результату для друку');
            return;
        }

        const printWindow = window.open('', '_blank');
        if (printWindow) {
            const cipherName = cipherType === 'caesar' ? 'Шифр Цезаря' : 'Шифр Тритеміуса';
            printWindow.document.write(`
        <html>
          <head>
            <title>Результат шифрування</title>
            <style>
              body { font-family: Arial, sans-serif; padding: 20px; }
              .header { margin-bottom: 20px; }
              .content { line-height: 1.6; }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>${cipherName}</h1>
              <p><strong>Мова:</strong> ${language === 'uk' ? 'Українська' : 'Англійська'}</p>
              <p><strong>Ключ:</strong> ${key}</p>
            </div>
            <div class="content">
              <h2>Результат:</h2>
              <p>${result}</p>
            </div>
          </body>
        </html>
      `);
            printWindow.document.close();
            printWindow.print();
        }
    };

    // Очистка усіх полів
    const clearAll = () => {
        setText('');
        setKey('');
        setResult('');
        setFileName('');
    };

    // Допоміжний метод для отримання опису поля
    const getKeyPlaceholder = () => {
        if (cipherType === 'caesar') {
            return 'Введіть числовий ключ';
        }

        switch (trithemiusKeyType) {
            case 'linear2d':
                return 'Введіть коефіцієнти a, b (наприклад: 2, 3)';
            case 'quadratic3d':
                return 'Введіть коефіцієнти a, b, c (наприклад: 1, 2, 3)';
            case 'password':
                return 'Введіть текстовий пароль';
            default:
                return '';
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <header className="bg-white shadow-md">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <Lock className="h-8 w-8 text-indigo-600"/>
                        <h1 className="text-2xl font-bold text-gray-800">
                            Криптосистема Цезаря та Тритеміуса
                        </h1>
                    </div>

                    <nav className="flex space-x-4">
                        <button
                            onClick={() => fileInputRef.current?.click()}
                            className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                        >
                            <Upload className="h-4 w-4"/>
                            <span>Відкрити файл</span>
                        </button>
                        <button
                            onClick={handleSaveFile}
                            className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                        >
                            <Save className="h-4 w-4"/>
                            <span>Зберегти</span>
                        </button>
                        <button
                            onClick={handlePrint}
                            className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
                        >
                            <Printer className="h-4 w-4"/>
                            <span>Друк</span>
                        </button>
                        <button
                            onClick={() => setShowAbout(true)}
                            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                        >
                            <Info className="h-4 w-4"/>
                            <span>Про програму</span>
                        </button>
                        <button
                            onClick={() => setShowExitConfirm(true)}
                            className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                        >
                            <LogOut className="h-4 w-4"/>
                            <span>Вихід</span>
                        </button>
                    </nav>
                </div>
            </header>

            <input
                ref={fileInputRef}
                type="file"
                accept=".txt"
                onChange={handleFileUpload}
                className="hidden"
            />

            <main className="container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto space-y-6">
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Тип шифру
                                </label>
                                <select
                                    value={cipherType}
                                    onChange={(e) => {
                                        setCipherType(e.target.value as 'caesar' | 'trithemius');
                                        setKey('');
                                    }}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                >
                                    <option value="caesar">Шифр Цезаря</option>
                                    <option value="trithemius">Шифр Тритеміуса</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Мова
                                </label>
                                <select
                                    value={language}
                                    onChange={(e) => setLanguage(e.target.value as 'uk' | 'en')}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                >
                                    <option value="uk">Українська</option>
                                    <option value="en">Англійська</option>
                                </select>
                            </div>

                            {cipherType === 'trithemius' && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Тип ключа Тритеміуса
                                    </label>
                                    <select
                                        value={trithemiusKeyType}
                                        onChange={(e) => {
                                            setTrithemiusKeyType(e.target.value as 'linear2d' | 'quadratic3d' | 'password');
                                            setKey('');
                                        }}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    >
                                        <option value="linear2d">Лінійний (2D вектор)</option>
                                        <option value="quadratic3d">Квадратичний (3D вектор)</option>
                                        <option value="password">Текстовий пароль</option>
                                    </select>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            {cipherType === 'caesar' ? 'Ключ шифрування' : `Ключ ${
                                trithemiusKeyType === 'linear2d' ? 'лінійного рівняння (a, b)' :
                                    trithemiusKeyType === 'quadratic3d' ? 'квадратичного рівняння (a, b, c)' :
                                        'текстовий пароль'
                            }`}
                        </label>
                        <input
                            type={cipherType === 'caesar' ? 'number' : 'text'}
                            value={key}
                            onChange={(e) => setKey(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder={getKeyPlaceholder()}
                            min={cipherType === 'caesar' ? "0" : undefined}
                        />
                        {cipherType === 'trithemius' && (
                            <div className="mt-2 text-xs text-gray-500">
                                {trithemiusKeyType === 'linear2d' && 'Формула: ключ[i] = a * i + b'}
                                {trithemiusKeyType === 'quadratic3d' && 'Формула: ключ[i] = a * i² + b * i + c'}
                                {trithemiusKeyType === 'password' && 'Використовується циклічно для кожного символу'}
                            </div>
                        )}
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Текст для обробки
                            {fileName && <span className="text-blue-600 ml-2">({fileName})</span>}
                        </label>
                        <textarea
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            rows={6}
                            placeholder="Введіть текст або завантажте файл"
                        />
                    </div>

                    <div className="flex flex-wrap gap-4 justify-center">
                        <button
                            onClick={handleEncrypt}
                            className="flex items-center space-x-2 px-6 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors font-medium"
                        >
                            <Lock className="h-5 w-5"/>
                            <span>Зашифрувати</span>
                        </button>

                        <button
                            onClick={handleDecrypt}
                            className="flex items-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors font-medium"
                        >
                            <Unlock className="h-5 w-5"/>
                            <span>Розшифрувати</span>
                        </button>

                        <button
                            onClick={clearAll}
                            className="flex items-center space-x-2 px-6 py-3 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors font-medium"
                        >
                            <FileText className="h-5 w-5"/>
                            <span>Очистити</span>
                        </button>
                    </div>

                    {result && (
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h3 className="text-lg font-medium text-gray-700 mb-3">Результат:</h3>
                            <div className="bg-gray-50 p-4 rounded-md">
                                <p className="whitespace-pre-wrap break-words">{result}</p>
                            </div>
                        </div>
                    )}
                </div>
            </main>

            {showAbout && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg max-w-lg w-full p-6">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-lg font-bold text-gray-800">Про програму</h3>
                            <button
                                onClick={() => setShowAbout(false)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <X className="h-5 w-5"/>
                            </button>
                        </div>

                        <div className="space-y-3 text-sm text-gray-600">
                            <p>
                                <strong>Криптосистема на основі шифрів Цезаря та Тритеміуса</strong>
                            </p>
                            <p>
                                Програма реалізує два класичні методи симетричного шифрування:
                            </p>

                            <div className="mt-4">
                                <p><strong>Шифр Цезаря:</strong></p>
                                <ul className="list-disc list-inside ml-2 space-y-1">
                                    <li>Простий зсув на фіксовану кількість позицій</li>
                                    <li>Числовий ключ (0 або більше)</li>
                                </ul>
                            </div>

                            <div className="mt-4">
                                <p><strong>Шифр Тритеміуса:</strong></p>
                                <ul className="list-disc list-inside ml-2 space-y-1">
                                    <li><strong>Лінійний (2D):</strong> зсув за формулою a*i + b</li>
                                    <li><strong>Квадратичний (3D):</strong> зсув за формулою a*i² + b*i + c</li>
                                    <li><strong>Текстовий ключ:</strong> циклічне використання букв пароля</li>
                                </ul>
                            </div>

                            <div className="mt-4">
                                <p><strong>Можливості:</strong></p>
                                <ul className="list-disc list-inside ml-2 space-y-1">
                                    <li>Шифрування та розшифрування тексту</li>
                                    <li>Підтримка української та англійської мов</li>
                                    <li>Робота з файлами (.txt)</li>
                                    <li>Валідація введених даних</li>
                                    <li>Збереження та друк результатів</li>
                                    <li>Різні типи ключів для методу Тритеміуса</li>
                                </ul>
                            </div>

                            <p className="pt-2">
                                <strong>Розробник:</strong> Студент групи ТВ-23 Бобела Денис
                            </p>
                            <p>
                                <strong>Версія:</strong> 2.0
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {showExitConfirm && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg max-w-sm w-full p-6">
                        <div className="flex items-center mb-4">
                            <div
                                className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                                <X className="h-6 w-6 text-red-600"/>
                            </div>
                        </div>

                        <div className="text-center">
                            <h3 className="text-lg font-medium text-gray-900 mb-2">
                                Підтвердження виходу
                            </h3>
                            <p className="text-sm text-gray-600 mb-6">
                                Ви впевнені, що хочете вийти з системи? Всі незбережені дані будуть втрачені.
                            </p>

                            <div className="flex space-x-3 justify-center">
                                <button
                                    onClick={() => setShowExitConfirm(false)}
                                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
                                >
                                    Скасувати
                                </button>
                                <button
                                    onClick={() => window.close()}
                                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                                >
                                    Вийти
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CaesarCipherApp;