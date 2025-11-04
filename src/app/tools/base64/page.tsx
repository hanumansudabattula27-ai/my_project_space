"use client";
import React, { useEffect, useState } from "react";
import { useTheme } from 'next-themes';
import {
    AlertCircle,
    Check,
    Copy,
    Download,
    Eye,
    EyeOff,
    File,
    FileUp,
    HardDrive,
    Image as ImageIcon,
    Lock,
    Maximize2,
    RefreshCw,
    Trash2,
    Upload,
    Zap
} from "lucide-react";

const Base64Page = () => {
    const { theme: currentTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // Prevent hydration mismatch
    useEffect(() => {
        setMounted(true);
    }, []);

    const isDark = mounted ? (resolvedTheme === 'dark' || currentTheme === 'dark') : false;

    // Theme configuration matching JWT app
    const theme = isDark ? {
        background: "from-gray-900 via-gray-800 to-indigo-900",
        card: "bg-slate-800 border-slate-600",
        text: "text-white",
        textSecondary: "text-gray-300",
        input: "bg-slate-900 border-slate-600 text-white placeholder-gray-400",
        accent: "bg-teal-600 hover:bg-teal-700",
        successBg: "bg-green-900/30 border-green-600",
        errorBg: "bg-red-900/30 border-red-600",
        infoBg: "bg-blue-900/30 border-blue-600",
        dropZone: "border-teal-500 bg-slate-900/50",
    } : {
        background: "from-cyan-50 via-teal-50 to-amber-50",
        card: "bg-white border-teal-200 shadow-sm",
        text: "text-gray-900",
        textSecondary: "text-gray-600",
        input: "bg-gray-50 border-teal-300 text-gray-900 placeholder-gray-500",
        accent: "bg-teal-600 hover:bg-teal-700",
        successBg: "bg-green-50 border-green-300",
        errorBg: "bg-red-50 border-red-300",
        infoBg: "bg-blue-50 border-blue-300",
        dropZone: "border-teal-300 bg-teal-50/50",
    };

    // STATE - ENCODE TAB
    const [textInput, setTextInput] = useState('Hello, Base64 Encoder!');
    const [fileInput, setFileInput] = useState(null);
    const [base64Output, setBase64Output] = useState('');
    const [encodeUrlSafe, setEncodeUrlSafe] = useState(false);
    const [fileInfo, setFileInfo] = useState(null);

    // STATE - DECODE TAB
    const [base64Input, setBase64Input] = useState('SGVsbG8sIEJhc2U2NCBFbmNvZGVyIQ==');
    const [decodedOutput, setDecodedOutput] = useState('');
    const [decodeUrlSafe, setDecodeUrlSafe] = useState(false);
    const [isValidBase64, setIsValidBase64] = useState(false);
    const [decodedFileInfo, setDecodedFileInfo] = useState(null);

    // STATE - GENERAL
    const [activeTab, setActiveTab] = useState('encode');
    const [copyStates, setCopyStates] = useState({});
    const [errors, setErrors] = useState({});
    const [dragActive, setDragActive] = useState(false);

    const sampleText = 'The quick brown fox jumps over the lazy dog';
    const sampleBase64 = 'VGhlIHF1aWNrIGJyb3duIGZveCBqdW1wcyBvdmVyIHRoZSBsYXp5IGRvZw==';

    // ==================== UTILITY FUNCTIONS ====================

    // Standardize Base64 (normalize URL-safe to standard and vice versa)
    const normalizeBase64 = (str, isUrlSafe) => {
        if (isUrlSafe) {
            // URL-safe: replace - and _ back to + and /
            return str.replace(/-/g, '+').replace(/_/g, '/');
        }
        return str;
    };

    const convertToUrlSafe = (str) => {
        // Convert standard Base64 to URL-safe
        return str.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
    };

    // Validate Base64
    const isValidBase64String = (str) => {
        try {
            if (!str || typeof str !== 'string') return false;
            const normalized = normalizeBase64(str, true); // Try to normalize as URL-safe first
            return /^[A-Za-z0-9+/]*={0,2}$/.test(normalized) || /^[A-Za-z0-9_-]*$/.test(str);
        } catch {
            return false;
        }
    };

    // Encode text to Base64
    const encodeTextToBase64 = (text, urlSafe = false) => {
        try {
            setErrors({});
            const encoded = btoa(unescape(encodeURIComponent(text)));
            const result = urlSafe ? convertToUrlSafe(encoded) : encoded;
            setBase64Output(result);
            return result;
        } catch (err) {
            setErrors({ encode: 'Error encoding text. Please check your input.' });
            setBase64Output('');
            return '';
        }
    };

    // Encode file to Base64
    const encodeFileToBase64 = (file, urlSafe = false) => {
        try {
            setErrors({});
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const content = e.target.result;
                    const arr = new Uint8Array(content);
                    let binary = '';
                    arr.forEach(byte => {
                        binary += String.fromCharCode(byte);
                    });
                    const encoded = btoa(binary);
                    const result = urlSafe ? convertToUrlSafe(encoded) : encoded;
                    
                    setBase64Output(result);
                    setFileInfo({
                        name: file.name,
                        size: file.size,
                        mimeType: file.type,
                        base64Size: result.length,
                        overhead: ((result.length / file.size) * 100 - 100).toFixed(2)
                    });
                    setTextInput('');
                } catch (err) {
                    setErrors({ encode: 'Error encoding file. File may be too large.' });
                }
            };
            reader.onerror = () => {
                setErrors({ encode: 'Error reading file.' });
            };
            reader.readAsArrayBuffer(file);
        } catch (err) {
            setErrors({ encode: 'Error processing file.' });
        }
    };

    // Decode Base64 to text
    const decodeBase64ToText = (base64Str, urlSafe = false) => {
        try {
            setErrors({});
            if (!base64Str.trim()) {
                setDecodedOutput('');
                setIsValidBase64(false);
                return;
            }

            if (!isValidBase64String(base64Str)) {
                setErrors({ decode: 'Invalid Base64 format. Base64 should contain only A-Z, a-z, 0-9, +, /, and = characters.' });
                setDecodedOutput('');
                setIsValidBase64(false);
                return;
            }

            const normalized = normalizeBase64(base64Str, urlSafe);
            const decoded = decodeURIComponent(escape(atob(normalized)));
            
            setDecodedOutput(decoded);
            setIsValidBase64(true);
            setDecodedFileInfo(null);
        } catch (err) {
            setErrors({ decode: 'Error decoding Base64. The input may not be valid Base64.' });
            setDecodedOutput('');
            setIsValidBase64(false);
        }
    };

    // Decode Base64 to file (for binary data)
    const decodeBase64ToFile = (base64Str, urlSafe = false) => {
        try {
            setErrors({});
            if (!base64Str.trim()) {
                return;
            }

            if (!isValidBase64String(base64Str)) {
                setErrors({ decode: 'Invalid Base64 format.' });
                return;
            }

            const normalized = normalizeBase64(base64Str, urlSafe);
            const binaryString = atob(normalized);
            const bytes = new Uint8Array(binaryString.length);
            
            for (let i = 0; i < binaryString.length; i++) {
                bytes[i] = binaryString.charCodeAt(i);
            }

            const blob = new Blob([bytes]);
            const fileSize = blob.size;
            const overhead = ((base64Str.length / fileSize) * 100 - 100).toFixed(2);

            setDecodedFileInfo({
                size: fileSize,
                base64Size: base64Str.length,
                overhead: overhead,
                base64Content: base64Str
            });

            setIsValidBase64(true);
        } catch (err) {
            setErrors({ decode: 'Error decoding Base64 to file.' });
        }
    };

    // Copy to clipboard
    const copyToClipboard = async (text, key) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopyStates({ ...copyStates, [key]: true });
            setTimeout(() => setCopyStates({ ...copyStates, [key]: false }), 2000);
        } catch (err) {
            setErrors({ clipboard: 'Failed to copy to clipboard.' });
        }
    };

    // Export as JSON
    const exportAsJSON = () => {
        const data = activeTab === 'encode' ? {
            type: 'Base64 Encoding',
            original: fileInput ? {
                name: fileInput.name,
                size: fileInfo?.size,
                mimeType: fileInfo?.mimeType,
            } : textInput,
            encoded: base64Output,
            urlSafe: encodeUrlSafe,
            fileInfo: fileInfo,
            timestamp: new Date().toISOString()
        } : {
            type: 'Base64 Decoding',
            encoded: base64Input,
            decoded: decodedOutput,
            urlSafe: decodeUrlSafe,
            isValid: isValidBase64,
            timestamp: new Date().toISOString()
        };

        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `base64-${activeTab}-${Date.now()}.json`;
        a.click();
        URL.revokeObjectURL(url);
    };

    // Download as file
    const downloadAsFile = (content, filename = 'output.txt') => {
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
        URL.revokeObjectURL(url);
    };

    // Download decoded binary
    const downloadDecodedBinary = () => {
        if (decodedFileInfo) {
            const normalized = normalizeBase64(base64Input, decodeUrlSafe);
            const binaryString = atob(normalized);
            const bytes = new Uint8Array(binaryString.length);
            for (let i = 0; i < binaryString.length; i++) {
                bytes[i] = binaryString.charCodeAt(i);
            }
            const blob = new Blob([bytes]);
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'decoded-file.bin';
            a.click();
            URL.revokeObjectURL(url);
        }
    };

    // ==================== HANDLE FILE UPLOAD ====================

    const handleFileDrop = (e, isEncode) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        const files = e.dataTransfer.files;
        if (files && files.length > 0) {
            const file = files[0];
            
            // Check file size (100MB limit)
            if (file.size > 100 * 1024 * 1024) {
                setErrors({ [isEncode ? 'encode' : 'decode']: 'File size exceeds 100MB limit.' });
                return;
            }

            if (isEncode) {
                setFileInput(file);
                setTextInput('');
                encodeFileToBase64(file, encodeUrlSafe);
            }
        }
    };

    const handleFileSelect = (e, isEncode) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 100 * 1024 * 1024) {
                setErrors({ [isEncode ? 'encode' : 'decode']: 'File size exceeds 100MB limit.' });
                return;
            }

            if (isEncode) {
                setFileInput(file);
                setTextInput('');
                encodeFileToBase64(file, encodeUrlSafe);
            }
        }
    };

    // ==================== EFFECTS ====================

    // Auto-encode when text input changes
    useEffect(() => {
        if (activeTab === 'encode' && textInput && !fileInput) {
            encodeTextToBase64(textInput, encodeUrlSafe);
        }
    }, [textInput, encodeUrlSafe, activeTab]);

    // Auto-decode when base64 input changes
    useEffect(() => {
        if (activeTab === 'decode' && base64Input) {
            decodeBase64ToText(base64Input, decodeUrlSafe);
            decodeBase64ToFile(base64Input, decodeUrlSafe);
        }
    }, [base64Input, decodeUrlSafe, activeTab]);

    // Load sample on mount
    useEffect(() => {
        if (mounted) {
            encodeTextToBase64(textInput, encodeUrlSafe);
            decodeBase64ToText(base64Input, decodeUrlSafe);
        }
    }, [mounted]);

    // ==================== COMPONENTS ====================

    const TabButton = ({ tab, label, icon: Icon }) => (
        <button
            onClick={() => setActiveTab(tab)}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                activeTab === tab ? `${theme.accent} text-white` : `${theme.card} ${theme.text}`
            }`}
        >
            <Icon size={18} />
            {label}
        </button>
    );

    const CopyButton = ({ text, copyKey }) => (
        <button
            onClick={() => copyToClipboard(text, copyKey)}
            className={`p-2 rounded ${theme.card} ${theme.textSecondary} hover:opacity-70 transition-opacity`}
            title="Copy to clipboard"
        >
            {copyStates[copyKey] ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
        </button>
    );

    const DropZone = ({ onDrop, onDragActive, isDragActive, isEncode }) => (
        <div
            onDrop={(e) => {
                handleFileDrop(e, isEncode);
                onDrop && onDrop(false);
            }}
            onDragEnter={() => onDragActive(true)}
            onDragLeave={() => onDragActive(false)}
            onDragOver={(e) => e.preventDefault()}
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer ${
                isDragActive ? `${theme.dropZone} border-teal-500` : `${theme.card}`
            }`}
        >
            <div className="flex flex-col items-center gap-3">
                <Upload size={32} className={isDragActive ? 'text-teal-500' : theme.textSecondary} />
                <div>
                    <p className={`${theme.text} font-medium`}>Drag file here or click to select</p>
                    <p className={`${theme.textSecondary} text-sm`}>Max size: 100MB</p>
                </div>
                <input
                    type="file"
                    onChange={(e) => handleFileSelect(e, isEncode)}
                    className="hidden"
                    id={`file-input-${isEncode ? 'encode' : 'decode'}`}
                />
                <label
                    htmlFor={`file-input-${isEncode ? 'encode' : 'decode'}`}
                    className={`px-4 py-2 ${theme.accent} text-white rounded-lg text-sm font-medium cursor-pointer`}
                >
                    Select File
                </label>
            </div>
        </div>
    );

    const StatBox = ({ label, value, icon: Icon }) => (
        <div className={`${theme.card} rounded-lg p-3 border`}>
            <div className="flex items-center gap-2 mb-1">
                <Icon size={14} className={theme.textSecondary} />
                <span className={`text-xs font-medium ${theme.textSecondary}`}>{label}</span>
            </div>
            <p className={`${theme.text} font-mono text-sm`}>{value}</p>
        </div>
    );

    if (!mounted) {
        return (
            <div className={`min-h-screen bg-gradient-to-br ${theme.background} flex items-center justify-center`}>
                <div className={`${theme.text} text-xl`}>Loading...</div>
            </div>
        );
    }

    return (
        <div className={`min-h-screen bg-gradient-to-br ${theme.background} ${theme.text} p-6 pt-20`}>
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-10 mt-8">
                    <div className="flex justify-center mb-4">
                        <div className={`p-3 ${theme.accent} rounded-xl`}>
                            <Lock className="text-white" size={32} />
                        </div>
                    </div>
                    <h1 className="text-4xl font-bold mb-3">Base64 Encoder/Decoder</h1>
                    <p className={`${theme.textSecondary} text-lg max-w-2xl mx-auto`}>
                        Encode text and files to Base64 and decode them back with URL-safe support
                    </p>
                </div>

                {/* Tab Navigation */}
                <div className="flex justify-center gap-4 mb-8 flex-wrap">
                    <TabButton tab="encode" label="Encode" icon={FileUp} />
                    <TabButton tab="decode" label="Decode" icon={Download} />
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    {/* LEFT PANEL */}
                    <div className="space-y-6">
                        {activeTab === 'encode' ? (
                            <>
                                {/* Text Input */}
                                <div className={`${theme.card} rounded-xl p-6 border`}>
                                    <div className="flex items-center justify-between mb-4">
                                        <h2 className={`text-xl font-semibold flex items-center gap-2 ${theme.text}`}>
                                            <Zap size={20} />
                                            Text Input
                                        </h2>
                                        <button
                                            onClick={() => {
                                                setTextInput(sampleText);
                                                setFileInput(null);
                                            }}
                                            className={`px-4 py-2 ${theme.accent} text-white rounded-lg font-medium transition-colors text-sm`}
                                        >
                                            Load Sample
                                        </button>
                                    </div>

                                    <label className={`block text-sm font-medium ${theme.textSecondary} mb-2`}>
                                        Enter text to encode:
                                    </label>
                                    <div className="relative">
                                        <textarea
                                            value={textInput}
                                            onChange={(e) => {
                                                setTextInput(e.target.value);
                                                setFileInput(null);
                                            }}
                                            disabled={fileInput !== null}
                                            className={`w-full h-40 p-3 ${theme.input} rounded-lg resize-none font-mono text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors disabled:opacity-50`}
                                            placeholder="Enter text here..."
                                        />
                                        <div className="absolute top-2 right-2">
                                            <CopyButton text={textInput} copyKey="text-input" />
                                        </div>
                                    </div>

                                    <div className="mt-4 grid grid-cols-2 gap-3">
                                        <StatBox label="Characters" value={textInput.length} icon={Maximize2} />
                                        <StatBox label="Bytes" value={new Blob([textInput]).size} icon={HardDrive} />
                                    </div>

                                    {errors.encode && (
                                        <div className={`flex items-center gap-2 text-red-600 text-sm mt-4 p-3 ${theme.errorBg} border rounded`}>
                                            <AlertCircle size={16} />
                                            {errors.encode}
                                        </div>
                                    )}
                                </div>

                                {/* File Upload */}
                                <div className={`${theme.card} rounded-xl p-6 border`}>
                                    <h2 className={`text-xl font-semibold flex items-center gap-2 ${theme.text} mb-4`}>
                                        <File size={20} />
                                        Or Upload File
                                    </h2>
                                    <DropZone 
                                        onDragActive={(active) => setDragActive(active)}
                                        isDragActive={dragActive}
                                        isEncode={true}
                                    />

                                    {fileInput && (
                                        <div className={`mt-4 p-3 ${theme.successBg} border rounded-lg`}>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <File size={16} />
                                                    <div>
                                                        <p className={`${theme.text} font-medium text-sm`}>{fileInput.name}</p>
                                                        <p className={`${theme.textSecondary} text-xs`}>
                                                            {(fileInput.size / 1024).toFixed(2)} KB
                                                        </p>
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={() => {
                                                        setFileInput(null);
                                                        setBase64Output('');
                                                        setFileInfo(null);
                                                    }}
                                                    className={`p-2 ${theme.accent} text-white rounded transition-colors`}
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Encoding Options */}
                                <div className={`${theme.card} rounded-xl p-6 border`}>
                                    <h2 className={`text-xl font-semibold flex items-center gap-2 ${theme.text} mb-4`}>
                                        <RefreshCw size={20} />
                                        Options
                                    </h2>

                                    <div className="space-y-3">
                                        <label className="flex items-center gap-3 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={encodeUrlSafe}
                                                onChange={(e) => setEncodeUrlSafe(e.target.checked)}
                                                className="w-4 h-4 rounded"
                                            />
                                            <span className={theme.text}>URL-Safe Base64</span>
                                            <span className={`text-xs ${theme.textSecondary}`}>(uses - and _ instead of + and /)</span>
                                        </label>
                                    </div>

                                    <p className={`${theme.textSecondary} text-xs mt-4 flex items-center gap-2`}>
                                        <AlertCircle size={12} />
                                        URL-safe encoding removes padding and uses URL-friendly characters
                                    </p>
                                </div>
                            </>
                        ) : (
                            <>
                                {/* Base64 Input for Decode */}
                                <div className={`${theme.card} rounded-xl p-6 border`}>
                                    <div className="flex items-center justify-between mb-4">
                                        <h2 className={`text-xl font-semibold flex items-center gap-2 ${theme.text}`}>
                                            <Lock size={20} />
                                            Base64 Input
                                        </h2>
                                        <button
                                            onClick={() => setBase64Input(sampleBase64)}
                                            className={`px-4 py-2 ${theme.accent} text-white rounded-lg font-medium transition-colors text-sm`}
                                        >
                                            Load Sample
                                        </button>
                                    </div>

                                    <label className={`block text-sm font-medium ${theme.textSecondary} mb-2`}>
                                        Paste Base64 to decode:
                                    </label>
                                    <div className="relative">
                                        <textarea
                                            value={base64Input}
                                            onChange={(e) => setBase64Input(e.target.value)}
                                            className={`w-full h-40 p-3 ${theme.input} rounded-lg resize-none font-mono text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors`}
                                            placeholder="Paste Base64 here..."
                                        />
                                        <div className="absolute top-2 right-2">
                                            <CopyButton text={base64Input} copyKey="base64-input" />
                                        </div>
                                    </div>

                                    {isValidBase64 && (
                                        <div className="flex items-center gap-2 text-green-600 text-sm mt-4 p-3 bg-green-50 rounded border border-green-200">
                                            <Check size={16} />
                                            Valid Base64 detected
                                        </div>
                                    )}

                                    {errors.decode && (
                                        <div className={`flex items-center gap-2 text-red-600 text-sm mt-4 p-3 ${theme.errorBg} border rounded`}>
                                            <AlertCircle size={16} />
                                            {errors.decode}
                                        </div>
                                    )}
                                </div>

                                {/* Decoding Options */}
                                <div className={`${theme.card} rounded-xl p-6 border`}>
                                    <h2 className={`text-xl font-semibold flex items-center gap-2 ${theme.text} mb-4`}>
                                        <RefreshCw size={20} />
                                        Options
                                    </h2>

                                    <div className="space-y-3">
                                        <label className="flex items-center gap-3 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={decodeUrlSafe}
                                                onChange={(e) => setDecodeUrlSafe(e.target.checked)}
                                                className="w-4 h-4 rounded"
                                            />
                                            <span className={theme.text}>URL-Safe Base64</span>
                                            <span className={`text-xs ${theme.textSecondary}`}>(input uses - and _ instead of + and /)</span>
                                        </label>
                                    </div>

                                    <p className={`${theme.textSecondary} text-xs mt-4 flex items-center gap-2`}>
                                        <AlertCircle size={12} />
                                        Enable this if the Base64 was encoded with URL-safe option
                                    </p>
                                </div>
                            </>
                        )}
                    </div>

                    {/* RIGHT PANEL */}
                    <div className="space-y-6">
                        {activeTab === 'encode' ? (
                            <>
                                {/* Base64 Output */}
                                <div className={`${theme.card} rounded-xl p-6 border`}>
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className={`font-semibold ${theme.text} flex items-center gap-2`}>
                                            <Zap size={18} />
                                            Base64 Output
                                        </h3>
                                        <div className="flex gap-2">
                                            <CopyButton text={base64Output} copyKey="base64-output" />
                                            {base64Output && (
                                                <button
                                                    onClick={() => downloadAsFile(base64Output, 'encoded.txt')}
                                                    className={`p-2 rounded ${theme.card} ${theme.textSecondary} hover:opacity-70 transition-opacity`}
                                                    title="Download"
                                                >
                                                    <Download size={16} />
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                    <div className={`${theme.input} p-4 rounded-lg border-2 border-dashed ${isDark ? 'border-gray-600' : 'border-gray-300'} min-h-80 max-h-96 overflow-auto`}>
                                        <code className={`${theme.text} break-all font-mono text-sm leading-relaxed`}>
                                            {base64Output || 'Base64 output will appear here'}
                                        </code>
                                    </div>

                                    {base64Output && (
                                        <div className="mt-4 grid grid-cols-2 gap-3">
                                            <StatBox label="Base64 Length" value={base64Output.length} icon={Maximize2} />
                                            <StatBox label="Overhead" value={`+${(((base64Output.length / (fileInput ? fileInput.size : new Blob([textInput]).size)) - 1) * 100).toFixed(0)}%`} icon={HardDrive} />
                                        </div>
                                    )}

                                    {fileInfo && (
                                        <div className={`mt-4 p-4 ${theme.infoBg} border rounded-lg`}>
                                            <h4 className={`${theme.text} font-medium text-sm mb-2`}>File Information</h4>
                                            <div className="space-y-1 text-xs">
                                                <p><span className={theme.textSecondary}>Name:</span> {fileInfo.name}</p>
                                                <p><span className={theme.textSecondary}>Original Size:</span> {(fileInfo.size / 1024).toFixed(2)} KB</p>
                                                <p><span className={theme.textSecondary}>MIME Type:</span> {fileInfo.mimeType || 'Unknown'}</p>
                                                <p><span className={theme.textSecondary}>Base64 Size:</span> {(fileInfo.base64Size / 1024).toFixed(2)} KB</p>
                                                <p><span className={theme.textSecondary}>Overhead:</span> +{fileInfo.overhead}%</p>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Export & Actions */}
                                {base64Output && (
                                    <button
                                        onClick={exportAsJSON}
                                        className={`w-full py-3 ${theme.accent} text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2`}
                                    >
                                        <Download size={18} />
                                        Export as JSON
                                    </button>
                                )}

                                {/* About Base64 */}
                                <div className={`${theme.card} rounded-xl p-6 border`}>
                                    <h3 className={`text-lg font-semibold mb-3 ${theme.text} flex items-center gap-2`}>
                                        <AlertCircle size={18} />
                                        About Base64
                                    </h3>
                                    <p className={`${theme.textSecondary} text-sm leading-relaxed mb-3`}>
                                        Base64 encoding converts binary data into ASCII text format for safe transmission over text-based protocols. It's commonly used for email attachments, data URLs, API authentication, and more.
                                    </p>
                                    <ul className={`${theme.textSecondary} text-sm space-y-1`}>
                                        <li>• Every 3 bytes becomes 4 Base64 characters</li>
                                        <li>• Adds approximately 33% overhead</li>
                                        <li>• Uses A-Z, a-z, 0-9, +, /, and = (standard)</li>
                                        <li>• URL-safe variant uses - and _ instead</li>
                                    </ul>
                                </div>
                            </>
                        ) : (
                            <>
                                {/* Decoded Output */}
                                <div className={`${theme.card} rounded-xl p-6 border`}>
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className={`font-semibold ${theme.text} flex items-center gap-2`}>
                                            <Download size={18} />
                                            Decoded Output
                                        </h3>
                                        <div className="flex gap-2">
                                            <CopyButton text={decodedOutput} copyKey="decoded-output" />
                                            {decodedOutput && (
                                                <button
                                                    onClick={() => downloadAsFile(decodedOutput, 'decoded.txt')}
                                                    className={`p-2 rounded ${theme.card} ${theme.textSecondary} hover:opacity-70 transition-opacity`}
                                                    title="Download"
                                                >
                                                    <Download size={16} />
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                    <div className={`${theme.input} p-4 rounded-lg border-2 border-dashed ${isDark ? 'border-gray-600' : 'border-gray-300'} min-h-80 max-h-96 overflow-auto`}>
                                        <code className={`${theme.text} break-all font-mono text-sm leading-relaxed`}>
                                            {decodedOutput || 'Decoded output will appear here'}
                                        </code>
                                    </div>

                                    {decodedOutput && (
                                        <div className="mt-4 grid grid-cols-2 gap-3">
                                            <StatBox label="Characters" value={decodedOutput.length} icon={Maximize2} />
                                            <StatBox label="Bytes" value={new Blob([decodedOutput]).size} icon={HardDrive} />
                                        </div>
                                    )}

                                    {decodedFileInfo && (
                                        <div className={`mt-4 p-4 ${theme.infoBg} border rounded-lg`}>
                                            <h4 className={`${theme.text} font-medium text-sm mb-2`}>Binary File Info</h4>
                                            <div className="space-y-1 text-xs">
                                                <p><span className={theme.textSecondary}>Decoded Size:</span> {(decodedFileInfo.size / 1024).toFixed(2)} KB</p>
                                                <p><span className={theme.textSecondary}>Base64 Size:</span> {(decodedFileInfo.base64Size / 1024).toFixed(2)} KB</p>
                                                <p><span className={theme.textSecondary}>Overhead:</span> +{decodedFileInfo.overhead}%</p>
                                            </div>
                                            <button
                                                onClick={downloadDecodedBinary}
                                                className={`w-full mt-3 py-2 ${theme.accent} text-white rounded text-sm font-medium transition-colors flex items-center justify-center gap-2`}
                                            >
                                                <Download size={14} />
                                                Download Binary
                                            </button>
                                        </div>
                                    )}
                                </div>

                                {/* Export & Actions */}
                                {decodedOutput && (
                                    <button
                                        onClick={exportAsJSON}
                                        className={`w-full py-3 ${theme.accent} text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2`}
                                    >
                                        <Download size={18} />
                                        Export as JSON
                                    </button>
                                )}

                                {/* About Base64 */}
                                <div className={`${theme.card} rounded-xl p-6 border`}>
                                    <h3 className={`text-lg font-semibold mb-3 ${theme.text} flex items-center gap-2`}>
                                        <AlertCircle size={18} />
                                        About Base64
                                    </h3>
                                    <p className={`${theme.textSecondary} text-sm leading-relaxed mb-3`}>
                                        Base64 is an encoding scheme that represents binary data in an ASCII string format. Decoding reverses this process to recover the original data exactly as it was.
                                    </p>
                                    <ul className={`${theme.textSecondary} text-sm space-y-1`}>
                                        <li>• Decoder validates Base64 format automatically</li>
                                        <li>• Every 4 Base64 characters become 3 bytes</li>
                                        <li>• Supports both standard and URL-safe variants</li>
                                        <li>• Works with text and binary files</li>
                                    </ul>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Base64Page;