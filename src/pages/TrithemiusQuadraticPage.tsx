import { CipherPage } from "../components/CipherPage";
import { KeyValidator } from "../services/validators";
import {TrithemiusCipher} from "../services/trithemius.ts";

export const TrithemiusQuadraticPage: React.FC<{ sharedState: {
        text: string;
        setText: (text: string) => void;
        fileName: string;
        result: string;
        setResult: (result: string) => void;
    } }> = ({ sharedState }) => {
    return (
        <CipherPage
            title="Шифр Тритеміуса (Квадратичний)"
            keyLabel="Ключ квадратичного рівняння (a, b, c)"
            keyPlaceholder="Введіть коефіцієнти a, b, c (наприклад: 1, 2, 3)"
            helpText="Формула: ключ[i] = a * i² + b * i + c"
            onEncrypt={(text, key, language) => {
                const vectorValidation = KeyValidator.validate3DVector(key);
                return TrithemiusCipher.encryptQuadratic3D(text, vectorValidation.vector!, language);
            }}
            onDecrypt={(text, key, language) => {
                const vectorValidation = KeyValidator.validate3DVector(key);
                return TrithemiusCipher.decryptQuadratic3D(text, vectorValidation.vector!, language);
            }}
            validateKey={(key) => KeyValidator.validate3DVector(key)}
            sharedState={sharedState}
        />
    );
};