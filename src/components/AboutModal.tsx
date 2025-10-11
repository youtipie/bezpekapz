import {X} from "lucide-react";
import React from "react";

export const AboutModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-lg w-full p-6">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-bold text-gray-800">Про програму</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <div className="space-y-3 text-sm text-gray-600">
                    <p><strong>Криптосистема на основі шифрів Цезаря та Тритеміуса</strong></p>
                    <p>Програма реалізує два класичні методи симетричного шифрування:</p>

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

                    <p className="pt-2"><strong>Розробник:</strong> Студент групи ТБ-23 Бобеля Денис</p>
                    <p><strong>Версія:</strong> 2.0</p>
                </div>
            </div>
        </div>
    );
};