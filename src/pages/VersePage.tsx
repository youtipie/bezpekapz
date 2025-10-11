import React from "react";
import { CipherPage } from "../components/CipherPage.tsx";
import { KeyValidator } from "../services/validators.ts";
import { VerseCipher } from "../services/verse.ts";

export const VersePage: React.FC<{
    sharedState: {
        text: string;
        setText: (text: string) => void;
        fileName: string;
        result: string;
        setResult: (result: string) => void;
    }
}> = ({ sharedState }) => {
    return (
        <CipherPage
            title="Віршований шифр"
            keyLabel="Ключ-вірш"
            keyPlaceholder="Вставте сюди вірш, який буде використовуватися як ключ..."
            keyComponent="textarea" // Використовуємо textarea для ключа
            onEncrypt={(text, key) => {
                try {
                    // Ігноруємо мову, оскільки вона не потрібна для цього шифру
                    return VerseCipher.encrypt(text, key);
                } catch (e: any) {
                    alert(e.message);
                    return '';
                }
            }}
            onDecrypt={(text, key) => {
                try {
                    // Ігноруємо мову
                    return VerseCipher.decrypt(text, key);
                } catch (e: any)
                {
                    alert(e.message);
                    return '';
                }
            }}
            validateKey={(key) => KeyValidator.validateVerseKey(key)}
            sharedState={sharedState}
        />
    );
};
