import {CipherPage} from "../components/CipherPage.tsx";
import {KeyValidator} from "../services/validators.ts";
import {TrithemiusCipher} from "../services/trithemius.ts";
import React from "react";

export const TrithemiusLinearPage: React.FC<{ sharedState: {
        text: string;
        setText: (text: string) => void;
        fileName: string;
        result: string;
        setResult: (result: string) => void;
    } }> = ({ sharedState }) => {
    return (
        <CipherPage
            title="Шифр Тритеміуса (Лінійний)"
            keyLabel="Ключ лінійного рівняння (a, b)"
            keyPlaceholder="Введіть коефіцієнти a, b (наприклад: 2, 3)"
            helpText="Формула: ключ[i] = a * i + b"
            onEncrypt={(text, key, language) => {
                const vectorValidation = KeyValidator.validate2DVector(key);
                return TrithemiusCipher.encryptLinear2D(text, vectorValidation.vector!, language);
            }}
            onDecrypt={(text, key, language) => {
                const vectorValidation = KeyValidator.validate2DVector(key);
                return TrithemiusCipher.decryptLinear2D(text, vectorValidation.vector!, language);
            }}
            validateKey={(key) => KeyValidator.validate2DVector(key)}
            sharedState={sharedState}
        />
    );
};
