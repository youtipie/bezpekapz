import React, {useState} from "react";
import {useLocation, useNavigate} from "react-router";
import {ChevronDown, Info, Lock, LogOut, Printer, Save, Upload} from 'lucide-react';

export const Header: React.FC<{
    onSave: () => void;
    onPrint: () => void;
    onAbout: () => void;
    onExit: () => void;
    onFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
    fileInputRef: React.RefObject<HTMLInputElement | null>;
}> = ({onSave, onPrint, onAbout, onExit, onFileUpload, fileInputRef}) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const getCurrentCipherName = () => {
        switch (location.pathname) {
            case '/':
                return 'Шифр Цезаря';
            case '/trithemius-linear':
                return 'Тритеміус (Лінійний)';
            case '/trithemius-quadratic':
                return 'Тритеміус (Квадратичний)';
            case '/trithemius-password':
                return 'Тритеміус (Пароль)';
            default:
                return 'Шифр Цезаря';
        }
    };

    return (
        <header className="bg-white shadow-md">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <Lock className="h-8 w-8 text-indigo-600"/>
                        <h1 className="text-2xl font-bold text-gray-800">
                            Криптосистема
                        </h1>
                    </div>

                    <div className="flex items-center space-x-4">
                        {/* Dropdown для вибору шифру */}
                        <div className="relative">
                            <button
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                            >
                                <span>{getCurrentCipherName()}</span>
                                <ChevronDown className="h-4 w-4"/>
                            </button>

                            {isDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg z-50">
                                    <div className="py-1">
                                        <button
                                            onClick={() => {
                                                navigate('/');
                                                setIsDropdownOpen(false);
                                            }}
                                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        >
                                            Шифр Цезаря
                                        </button>
                                        <button
                                            onClick={() => {
                                                navigate('/trithemius-linear');
                                                setIsDropdownOpen(false);
                                            }}
                                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        >
                                            Тритеміус (Лінійний 2D)
                                        </button>
                                        <button
                                            onClick={() => {
                                                navigate('/trithemius-quadratic');
                                                setIsDropdownOpen(false);
                                            }}
                                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        >
                                            Тритеміус (Квадратичний 3D)
                                        </button>
                                        <button
                                            onClick={() => {
                                                navigate('/trithemius-password');
                                                setIsDropdownOpen(false);
                                            }}
                                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        >
                                            Тритеміус (Текстовий пароль)
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        <button
                            onClick={() => fileInputRef.current?.click()}
                            className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                        >
                            <Upload className="h-4 w-4"/>
                            <span>Відкрити</span>
                        </button>
                        <button
                            onClick={onSave}
                            className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                        >
                            <Save className="h-4 w-4"/>
                            <span>Зберегти</span>
                        </button>
                        <button
                            onClick={onPrint}
                            className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
                        >
                            <Printer className="h-4 w-4"/>
                            <span>Друк</span>
                        </button>
                        <button
                            onClick={onAbout}
                            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                        >
                            <Info className="h-4 w-4"/>
                            <span>Про програму</span>
                        </button>
                        <button
                            onClick={onExit}
                            className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                        >
                            <LogOut className="h-4 w-4"/>
                            <span>Вихід</span>
                        </button>
                    </div>
                </div>
            </div>

            <input
                ref={fileInputRef}
                type="file"
                accept=".txt"
                onChange={onFileUpload}
                className="hidden"
            />
        </header>
    );
};
