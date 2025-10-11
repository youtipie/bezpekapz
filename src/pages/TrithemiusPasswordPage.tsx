import React from "react";
import {CipherPage} from "../components/CipherPage.tsx";
import {TrithemiusCipher} from "../services/trithemius.ts";
import {KeyValidator} from "../services/validators.ts";

export const TrithemiusPasswordPage: React.FC<{ sharedState: {
        text: string;
        setText: (text: string) => void;
        fileName: string;
        result: string;
        setResult: (result: string) => void;
    } }> = ({ sharedState }) => {
    return (
        <CipherPage
            title="Шифр Тритеміуса (Текстовий пароль)"
            keyLabel="Текстовий пароль"
            keyPlaceholder="Введіть текстовий пароль"
            helpText="Використовується циклічно для кожного символу"
            onEncrypt={(text, key, language) => {
                return TrithemiusCipher.encryptPassword(text, key, language);
            }}
            onDecrypt={(text, key, language) => {
                return TrithemiusCipher.decryptPassword(text, key, language);
            }}
            validateKey={(key, language) => KeyValidator.validatePassword(key, language)}
            sharedState={sharedState}
        />
    );
};
