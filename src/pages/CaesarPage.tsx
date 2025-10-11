import React from "react";
import {CipherPage} from "../components/CipherPage.tsx";
import {CaesarCipher} from "../services/caesar.ts";
import {KeyValidator} from "../services/validators.ts";

export const CaesarPage: React.FC<{
    sharedState: {
        text: string;
        setText: (text: string) => void;
        fileName: string;
        result: string;
        setResult: (result: string) => void;
    }
}> = ({sharedState}) => {
    return (
        <CipherPage
            title="Шифр Цезаря"
            keyLabel="Ключ шифрування"
            keyPlaceholder="Введіть числовий ключ"
            keyType="number"
            onEncrypt={(text, key, language) => {
                const keyNum = parseInt(key);
                return CaesarCipher.encrypt(text, keyNum, language);
            }}
            onDecrypt={(text, key, language) => {
                const keyNum = parseInt(key);
                return CaesarCipher.decrypt(text, keyNum, language);
            }}
            validateKey={(key) => KeyValidator.validate(key)}
            sharedState={sharedState}
        />
    );
};