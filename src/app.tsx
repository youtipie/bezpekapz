import {BrowserRouter, Route, Routes} from "react-router";
import {Header} from "./components/Header";
import {CaesarPage} from "./pages/CaesarPage";
import {TrithemiusLinearPage} from "./pages/TrithemiusLinearPage";
import {TrithemiusQuadraticPage} from "./pages/TrithemiusQuadraticPage";
import {TrithemiusPasswordPage} from "./pages/TrithemiusPasswordPage.tsx";
import {AboutModal} from "./components/AboutModal.tsx";
import {useRef, useState} from "react";
import {ExitModal} from "./components/ExitModal.tsx";

const App: React.FC = () => {
    // Спільний стан для всіх сторінок
    const [text, setText] = useState<string>('');
    const [fileName, setFileName] = useState<string>('');
    const [result, setResult] = useState<string>('');
    const [showAbout, setShowAbout] = useState(false);
    const [showExitConfirm, setShowExitConfirm] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const sharedState = {
        text,
        setText,
        fileName,
        result,
        setResult
    };

    // Завантаження текстового файлу
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
                      <h1>Результат шифрування</h1>
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

    return (
        <BrowserRouter>
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
                <Header
                    onSave={handleSaveFile}
                    onPrint={handlePrint}
                    onAbout={() => setShowAbout(true)}
                    onExit={() => setShowExitConfirm(true)}
                    onFileUpload={handleFileUpload}
                    fileInputRef={fileInputRef}
                />

                <Routes>
                    <Route path="/" element={<CaesarPage sharedState={sharedState}/>}/>
                    <Route path="/trithemius-linear" element={<TrithemiusLinearPage sharedState={sharedState}/>}/>
                    <Route path="/trithemius-quadratic" element={<TrithemiusQuadraticPage sharedState={sharedState}/>}/>
                    <Route path="/trithemius-password" element={<TrithemiusPasswordPage sharedState={sharedState}/>}/>
                </Routes>

                {showAbout && <AboutModal onClose={() => setShowAbout(false)}/>}
                {showExitConfirm && (
                    <ExitModal
                        onClose={() => setShowExitConfirm(false)}
                        onConfirm={() => window.close()}
                    />
                )}
            </div>
        </BrowserRouter>
    );
};

export default App;