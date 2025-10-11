import {X} from "lucide-react";
import React from "react";

export const ExitModal: React.FC<{ onClose: () => void; onConfirm: () => void }> = ({onClose, onConfirm}) => {
    return <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
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
                        onClick={() => onClose()}
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
                    >
                        Скасувати
                    </button>
                    <button
                        onClick={() => onConfirm()}
                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                    >
                        Вийти
                    </button>
                </div>
            </div>
        </div>
    </div>
}