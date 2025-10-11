import React, {useState} from "react";
import {TextValidator} from "../services/validators.ts";
import {FileText, Lock} from "lucide-react";

export const CipherPage: React.FC<{
    title: string;
    keyLabel: string;
    keyPlaceholder: string;
    keyType?: 'number' | 'text';
    helpText?: string;
    onEncrypt: (text: string, key: string, language: 'uk' | 'en') => string;
    onDecrypt: (text: string, key: string, language: 'uk' | 'en') => string;
    validateKey: (key: string, language: 'uk' | 'en') => { isValid: boolean; error?: string; vector?: unknown };
    sharedState: {
        text: string;
        setText: (text: string) => void;
        fileName: string;
        result: string;
        setResult: (result: string) => void;
    };
}> = ({
          title,
          keyLabel,
          keyPlaceholder,
          keyType = 'text',
          helpText,
          onEncrypt,
          onDecrypt,
          validateKey,
          sharedState
      }) => {
    const [key, setKey] = useState<string>('');
    const [language, setLanguage] = useState<'uk' | 'en'>('uk');

    const {text, setText, fileName, result, setResult} = sharedState;

    // Функція шифрування
    const handleEncrypt = () => {
        const textValidation = TextValidator.validate(text, language);
        if (!textValidation.isValid) {
            alert(textValidation.error);
            return;
        }

        const keyValidation = validateKey(key, language);
        if (!keyValidation.isValid) {
            alert(keyValidation.error);
            return;
        }

        const encrypted = onEncrypt(text, key, language);
        setResult(encrypted);
    };

    // Функція розшифрування
    const handleDecrypt = () => {
        const textValidation = TextValidator.validate(text, language);
        if (!textValidation.isValid) {
            alert(textValidation.error);
            return;
        }

        const keyValidation = validateKey(key, language);
        if (!keyValidation.isValid) {
            alert(keyValidation.error);
            return;
        }

        const decrypted = onDecrypt(text, key, language);
        setResult(decrypted);
    };

    // Очистка всіх полів
    const clearAll = () => {
        setKey('');
        setResult('')
        setText('')
    };

    return (
        <main className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto space-y-6">
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">{title}</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        {keyLabel}
                    </label>
                    <input
                        type={keyType}
                        value={key}
                        onChange={(e) => setKey(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder={keyPlaceholder}
                        min={keyType === 'number' ? "0" : undefined}
                    />
                    {helpText && (
                        <div className="mt-2 text-xs text-gray-500">
                            {helpText}
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
                        <Lock className="h-5 w-5"/>
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
    );
};