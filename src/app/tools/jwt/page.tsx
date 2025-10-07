// "use client";
// import React, {useEffect, useState} from "react";
// import {
//     AlertCircle,
//     Calendar,
//     Check,
//     Clock,
//     Code,
//     Copy,
//     Download,
//     Eye,
//     EyeOff,
//     Key,
//     Lock,
//     RefreshCw,
//     Shield,
//     Unlock,
//     Zap
// } from "lucide-react";

// const JWTPage = () => {
//     const [jwtToken, setJwtToken] = useState('');
//     const [decodedHeader, setDecodedHeader] = useState('');
//     const [decodedPayload, setDecodedPayload] = useState('');
//     const [signature, setSignature] = useState('');
//     const [headerInput, setHeaderInput] = useState('{\n  "alg": "HS256",\n  "typ": "JWT"\n}');
//     const [payloadInput, setPayloadInput] = useState('{\n  "sub": "1234567890",\n  "name": "John Doe",\n  "iat": 1516239022,\n  "exp": 1735689600\n}');
//     const [secretKey, setSecretKey] = useState('your-256-bit-secret');
//     const [showSecret, setShowSecret] = useState(false);
//     const [activeTab, setActiveTab] = useState('decode');
//     const [copyStates, setCopyStates] = useState({});
//     const [errors, setErrors] = useState({});
//     const [isValidJWT, setIsValidJWT] = useState(false);
//     const [tokenExpiry, setTokenExpiry] = useState(null);
//     const [isTokenExpired, setIsTokenExpired] = useState(false);
//     const [signatureValid, setSignatureValid] = useState(null);

//     // Sample JWT for demo
//     const sampleJWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjE3MzU2ODk2MDB9.kP_DQyZdBcVfOGaB8Q3lE7-PRLJXrOxcOw7D5tlA7Ok';

//     // Base64 URL encode/decode functions
//     const base64UrlEncode = (str) => {
//         return btoa(str)
//             .replace(/\+/g, '-')
//             .replace(/\//g, '_')
//             .replace(/=/g, '');
//     };

//     const base64UrlDecode = (str) => {
//         let padding = str.length % 4;
//         if (padding) {
//             str += '='.repeat(4 - padding);
//         }
//         return atob(str.replace(/-/g, '+').replace(/_/g, '/'));
//     };

//     // HMAC SHA256 implementation
//     const hmacSHA256 = async (message, secret) => {
//         const encoder = new TextEncoder();
//         const key = await crypto.subtle.importKey(
//             'raw',
//             encoder.encode(secret),
//             {name: 'HMAC', hash: 'SHA-256'},
//             false,
//             ['sign']
//         );
//         const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(message));
//         return base64UrlEncode(String.fromCharCode(...new Uint8Array(signature)));
//     };

//     // Verify JWT signature
//     const verifySignature = async (token, secret) => {
//         try {
//             const parts = token.split('.');
//             if (parts.length !== 3) return false;

//             const message = `${parts[0]}.${parts[1]}`;
//             const expectedSignature = await hmacSHA256(message, secret);
//             return parts[2] === expectedSignature;
//         } catch (error) {
//             return false;
//         }
//     };

//     // Generate random secret
//     const generateRandomSecret = () => {
//         const array = new Uint8Array(32);
//         crypto.getRandomValues(array);
//         const secret = Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
//         setSecretKey(secret);
//     };

//     // Update payload with current timestamp
//     const updateTimestamps = () => {
//         try {
//             const payload = JSON.parse(payloadInput);
//             const now = Math.floor(Date.now() / 1000);
//             payload.iat = now;
//             payload.exp = now + 3600; // Expires in 1 hour
//             setPayloadInput(JSON.stringify(payload, null, 2));
//         } catch (error) {
//             // Handle silently
//         }
//     };

//     // Format timestamp for display
//     const formatTimestamp = (timestamp) => {
//         if (!timestamp) return 'N/A';
//         try {
//             const date = new Date(timestamp * 1000);
//             return date.toLocaleString();
//         } catch {
//             return 'Invalid';
//         }
//     };

//     // Check token expiry
//     const checkTokenExpiry = (payload) => {
//         try {
//             const payloadObj = JSON.parse(payload);
//             if (payloadObj.exp) {
//                 const now = Math.floor(Date.now() / 1000);
//                 setTokenExpiry(payloadObj.exp);
//                 setIsTokenExpired(now > payloadObj.exp);
//             } else {
//                 setTokenExpiry(null);
//                 setIsTokenExpired(false);
//             }
//         } catch {
//             setTokenExpiry(null);
//             setIsTokenExpired(false);
//         }
//     };

//     // Decode JWT
//     const decodeJWT = async (token) => {
//         try {
//             const parts = token.split('.');
//             if (parts.length !== 3) {
//                 setErrors({decode: 'Invalid JWT format. JWT should have 3 parts separated by dots.'});
//                 setIsValidJWT(false);
//                 setSignatureValid(null);
//                 return;
//             }

//             const header = JSON.parse(base64UrlDecode(parts[0]));
//             const payload = JSON.parse(base64UrlDecode(parts[1]));
//             const sig = parts[2];

//             const formattedHeader = JSON.stringify(header, null, 2);
//             const formattedPayload = JSON.stringify(payload, null, 2);

//             setDecodedHeader(formattedHeader);
//             setDecodedPayload(formattedPayload);
//             setSignature(sig);
//             setIsValidJWT(true);
//             setErrors({});

//             checkTokenExpiry(formattedPayload);

//             // Verify signature if we have a secret key
//             if (secretKey && secretKey !== 'your-256-bit-secret') {
//                 const isValid = await verifySignature(token, secretKey);
//                 setSignatureValid(isValid);
//             } else {
//                 setSignatureValid(null);
//             }
//         } catch (error) {
//             setErrors({decode: 'Invalid JWT token. Please check the format.'});
//             setIsValidJWT(false);
//             setSignatureValid(null);
//         }
//     };

//     // Encode JWT
//     const encodeJWT = async () => {
//         try {
//             const header = JSON.parse(headerInput);
//             const payload = JSON.parse(payloadInput);

//             const headerEncoded = base64UrlEncode(JSON.stringify(header));
//             const payloadEncoded = base64UrlEncode(JSON.stringify(payload));
//             const message = `${headerEncoded}.${payloadEncoded}`;

//             const sig = await hmacSHA256(message, secretKey);
//             const token = `${message}.${sig}`;

//             setJwtToken(token);
//             setErrors({});

//             // Auto-decode the generated token
//             await decodeJWT(token);
//         } catch (error) {
//             setErrors({encode: 'Invalid JSON format in header or payload.'});
//         }
//     };

//     // Export token to file
//     const exportToken = () => {
//         const data = {
//             token: jwtToken,
//             header: decodedHeader,
//             payload: decodedPayload,
//             signature: signature,
//             created: new Date().toISOString()
//         };

//         const blob = new Blob([JSON.stringify(data, null, 2)], {type: 'application/json'});
//         const url = URL.createObjectURL(blob);
//         const a = document.createElement('a');
//         a.href = url;
//         a.download = 'jwt-token.json';
//         a.click();
//         URL.revokeObjectURL(url);
//     };

//     // Copy to clipboard
//     const copyToClipboard = async (text, key) => {
//         try {
//             await navigator.clipboard.writeText(text);
//             setCopyStates({...copyStates, [key]: true});
//             setTimeout(() => setCopyStates({...copyStates, [key]: false}), 2000);
//         } catch (err) {
//             console.error('Failed to copy: ', err);
//         }
//     };

//     // Auto-decode when JWT token changes
//     useEffect(() => {
//         if (jwtToken && activeTab === 'decode') {
//             decodeJWT(jwtToken);
//         }
//     }, [jwtToken, activeTab, secretKey]);

//     // Load sample JWT on mount
//     useEffect(() => {
//         setJwtToken(sampleJWT);
//     }, []);

//     const TabButton = ({tab, label, icon: Icon}) => (
//         <button
//             onClick={() => setActiveTab(tab)}
//             className={`flex items-center gap-3 px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg ${
//                 activeTab === tab
//                     ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-xl transform scale-105'
//                     : 'bg-white text-gray-600 hover:bg-gray-50 border-2 border-gray-200 hover:border-gray-300'
//             }`}
//         >
//             <Icon size={20}/>
//             {label}
//         </button>
//     );

//     const CopyButton = ({text, copyKey, className = ''}) => (
//         <button
//             onClick={() => copyToClipboard(text, copyKey)}
//             className={`p-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800 transition-all duration-200 ${className}`}
//             title="Copy to clipboard"
//         >
//             {copyStates[copyKey] ? <Check size={16} className="text-green-600"/> : <Copy size={16}/>}
//         </button>
//     );

//     return (
//         //  <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 p-6">
//         <div className="min-h-screen command-center-bg from-slate-50 via-white text-white p-6"> 
//             <div className="max-w-7xl mx-auto">
//                 {/* Header */}
//                 <div className="text-center mb-12 mt-15">
//                     <div className="flex justify-center mb-6">
//                         <div className="p-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl shadow-lg">
//                             <Shield className="text-white" size={48}/>
//                         </div>
//                     </div>
//                     <h1 className="text-6xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
//                         JWT Encoder/Decoder
//                     </h1>
//                     <p className="text-gray-600 text-xl max-w-2xl mx-auto leading-relaxed">
//                         Securely encode and decode JSON Web Tokens with signature verification and advanced features
//                     </p>
//                 </div>

//                 {/* Tab Navigation */}
//                 <div className="flex justify-center gap-6 mb-12">
//                     <TabButton tab="decode" label="Decode JWT" icon={Unlock}/>
//                     <TabButton tab="encode" label="Encode JWT" icon={Lock}/>
//                 </div>

//                 {/* Main Content */}
//                 <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
//                     {/* Left Panel - Input */}
//                     <div className="space-y-6">
//                         <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-200 backdrop-blur-sm">
//                             <div className="flex items-center justify-between mb-6">
//                                 <h2 className="text-2xl font-bold flex items-center gap-3 text-gray-800">
//                                     <Code className="text-indigo-600" size={24}/>
//                                     {activeTab === 'decode' ? 'JWT Token Input' : 'JWT Components'}
//                                 </h2>
//                                 {activeTab === 'decode' && (
//                                     <button
//                                         onClick={() => setJwtToken(sampleJWT)}
//                                         className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
//                                     >
//                                         Load Sample
//                                     </button>
//                                 )}
//                             </div>

//                             {activeTab === 'decode' ? (
//                                 <div className="space-y-6">
//                                     <div>
//                                         <label className="block text-sm font-semibold text-gray-700 mb-3">
//                                             Paste your JWT token here:
//                                         </label>
//                                         <div className="relative">
//                       <textarea
//                           value={jwtToken}
//                           onChange={(e) => setJwtToken(e.target.value)}
//                           className="w-full h-36 p-4 bg-gray-50 border-2 border-gray-200 rounded-xl resize-none font-mono text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//                           placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
//                       />
//                                             <CopyButton
//                                                 text={jwtToken}
//                                                 copyKey="jwt-input"
//                                                 className="absolute top-3 right-3"
//                                             />
//                                         </div>
//                                         {errors.decode && (
//                                             <div
//                                                 className="flex items-center gap-3 text-red-600 text-sm mt-3 p-3 bg-red-50 rounded-lg border border-red-200">
//                                                 <AlertCircle size={16}/>
//                                                 {errors.decode}
//                                             </div>
//                                         )}
//                                     </div>

//                                     {/* Secret Key for Verification */}
//                                     <div>
//                                         <label
//                                             className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
//                                             <Key size={16} className="text-cyan-600"/>
//                                             Secret Key (for signature verification):
//                                         </label>
//                                         <div className="relative">
//                                             <input
//                                                 type={showSecret ? 'text' : 'password'}
//                                                 value={secretKey}
//                                                 onChange={(e) => setSecretKey(e.target.value)}
//                                                 className="w-full p-4 pr-20 bg-cyan-50 border-2 border-cyan-200 rounded-xl font-mono text-sm focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-all duration-200"
//                                                 placeholder="Enter secret key to verify signature"
//                                             />
//                                             <div className="absolute right-3 top-3 flex gap-2">
//                                                 <button
//                                                     onClick={() => setShowSecret(!showSecret)}
//                                                     className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
//                                                     title={showSecret ? 'Hide secret' : 'Show secret'}
//                                                 >
//                                                     {showSecret ? <EyeOff size={16}/> : <Eye size={16}/>}
//                                                 </button>
//                                             </div>
//                                         </div>
//                                     </div>

//                                     {isValidJWT && (
//                                         <div className="space-y-3">
//                                             <div
//                                                 className="flex items-center gap-3 text-green-700 text-sm p-3 bg-green-50 rounded-lg border border-green-200">
//                                                 <Check size={16}/>
//                                                 Valid JWT format detected
//                                             </div>

//                                             {/* Token Status */}
//                                             {tokenExpiry && (
//                                                 <div
//                                                     className={`flex items-center gap-3 text-sm p-3 rounded-lg border ${
//                                                         isTokenExpired
//                                                             ? 'text-red-700 bg-red-50 border-red-200'
//                                                             : 'text-green-700 bg-green-50 border-green-200'
//                                                     }`}>
//                                                     <Clock size={16}/>
//                                                     Token {isTokenExpired ? 'expired' : 'expires'} on {formatTimestamp(tokenExpiry)}
//                                                 </div>
//                                             )}

//                                             {/* Signature Verification */}
//                                             {signatureValid !== null && (
//                                                 <div
//                                                     className={`flex items-center gap-3 text-sm p-3 rounded-lg border ${
//                                                         signatureValid
//                                                             ? 'text-green-700 bg-green-50 border-green-200'
//                                                             : 'text-red-700 bg-red-50 border-red-200'
//                                                     }`}>
//                                                     <Shield size={16}/>
//                                                     Signature {signatureValid ? 'verified' : 'invalid'}
//                                                 </div>
//                                             )}
//                                         </div>
//                                     )}
//                                 </div>
//                             ) : (
//                                 <div className="space-y-6">
//                                     {/* Header */}
//                                     <div>
//                                         <label className="block text-sm font-semibold text-gray-700 mb-3">
//                                             Header:
//                                         </label>
//                                         <div className="relative">
//                       <textarea
//                           value={headerInput}
//                           onChange={(e) => setHeaderInput(e.target.value)}
//                           className="w-full h-28 p-4 bg-red-50 border-2 border-red-200 rounded-xl resize-none font-mono text-sm focus:ring-2 focus:ring-red-400 focus:border-red-400 transition-all duration-200"
//                       />
//                                             <CopyButton
//                                                 text={headerInput}
//                                                 copyKey="header-input"
//                                                 className="absolute top-3 right-3"
//                                             />
//                                         </div>
//                                     </div>

//                                     {/* Payload */}
//                                     <div>
//                                         <div className="flex items-center justify-between mb-3">
//                                             <label className="block text-sm font-semibold text-gray-700">
//                                                 Payload:
//                                             </label>
//                                             <button
//                                                 onClick={updateTimestamps}
//                                                 className="text-xs px-3 py-1 bg-purple-100 hover:bg-purple-200 text-purple-700 rounded-lg transition-colors flex items-center gap-1"
//                                                 title="Update iat and exp with current time"
//                                             >
//                                                 <Clock size={12}/>
//                                                 Update Timestamps
//                                             </button>
//                                         </div>
//                                         <div className="relative">
//                       <textarea
//                           value={payloadInput}
//                           onChange={(e) => setPayloadInput(e.target.value)}
//                           className="w-full h-36 p-4 bg-purple-50 border-2 border-purple-200 rounded-xl resize-none font-mono text-sm focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-all duration-200"
//                       />
//                                             <CopyButton
//                                                 text={payloadInput}
//                                                 copyKey="payload-input"
//                                                 className="absolute top-3 right-3"
//                                             />
//                                         </div>
//                                     </div>

//                                     {/* Secret Key */}
//                                     <div>
//                                         <div className="flex items-center justify-between mb-3">
//                                             <label
//                                                 className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
//                                                 <Key size={16} className="text-cyan-600"/>
//                                                 Secret Key:
//                                             </label>
//                                             <button
//                                                 onClick={generateRandomSecret}
//                                                 className="text-xs px-3 py-1 bg-cyan-100 hover:bg-cyan-200 text-cyan-700 rounded-lg transition-colors flex items-center gap-1"
//                                                 title="Generate random secret"
//                                             >
//                                                 <RefreshCw size={12}/>
//                                                 Generate
//                                             </button>
//                                         </div>
//                                         <div className="relative">
//                                             <input
//                                                 type={showSecret ? 'text' : 'password'}
//                                                 value={secretKey}
//                                                 onChange={(e) => setSecretKey(e.target.value)}
//                                                 className="w-full p-4 pr-20 bg-cyan-50 border-2 border-cyan-200 rounded-xl font-mono text-sm focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-all duration-200"
//                                             />
//                                             <div className="absolute right-3 top-3 flex gap-2">
//                                                 <button
//                                                     onClick={() => setShowSecret(!showSecret)}
//                                                     className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
//                                                     title={showSecret ? 'Hide secret' : 'Show secret'}
//                                                 >
//                                                     {showSecret ? <EyeOff size={16}/> : <Eye size={16}/>}
//                                                 </button>
//                                             </div>
//                                         </div>
//                                     </div>

//                                     <button
//                                         onClick={encodeJWT}
//                                         className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
//                                     >
//                                         <Zap size={20}/>
//                                         Generate JWT Token
//                                     </button>

//                                     {errors.encode && (
//                                         <div
//                                             className="flex items-center gap-3 text-red-600 text-sm p-3 bg-red-50 rounded-lg border border-red-200">
//                                             <AlertCircle size={16}/>
//                                             {errors.encode}
//                                         </div>
//                                     )}
//                                 </div>
//                             )}
//                         </div>
//                     </div>

//                     {/* Right Panel - Output */}
//                     <div className="space-y-6">
//                         {activeTab === 'decode' ? (
//                             <>
//                                 {/* Header Section */}
//                                 <div
//                                     className="bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl p-6 shadow-lg border-2 border-red-200">
//                                     <div className="flex items-center justify-between mb-4">
//                                         <h3 className="text-lg font-bold text-red-700 flex items-center gap-2">
//                                             <div className="w-3 h-3 bg-red-500 rounded-full"></div>
//                                             Header
//                                         </h3>
//                                         <CopyButton text={decodedHeader} copyKey="header"/>
//                                     </div>
//                                     <pre
//                                         className="bg-white p-4 rounded-xl overflow-auto text-sm font-mono max-h-40 border border-red-200">
//                     <code className="text-red-600">{decodedHeader || 'No valid JWT token provided'}</code>
//                   </pre>
//                                 </div>

//                                 {/* Payload Section */}
//                                 <div
//                                     className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-6 shadow-lg border-2 border-purple-200">
//                                     <div className="flex items-center justify-between mb-4">
//                                         <h3 className="text-lg font-bold text-purple-700 flex items-center gap-2">
//                                             <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
//                                             Payload
//                                         </h3>
//                                         <CopyButton text={decodedPayload} copyKey="payload"/>
//                                     </div>
//                                     <pre
//                                         className="bg-white p-4 rounded-xl overflow-auto text-sm font-mono max-h-40 border border-purple-200">
//                     <code className="text-purple-600">{decodedPayload || 'No valid JWT token provided'}</code>
//                   </pre>

//                                     {/* Payload Claims Info */}
//                                     {decodedPayload && (
//                                         <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
//                                             {(() => {
//                                                 try {
//                                                     const payload = JSON.parse(decodedPayload);
//                                                     return (
//                                                         <>
//                                                             {payload.iat && (
//                                                                 <div className="p-2 bg-purple-100 rounded-lg">
//                                                                     <div className="flex items-center gap-1">
//                                                                         <Calendar size={12}/>
//                                                                         <span
//                                                                             className="font-semibold text-purple-700">Issued:</span>
//                                                                     </div>
//                                                                     <span
//                                                                         className="text-purple-600">{formatTimestamp(payload.iat)}</span>
//                                                                 </div>
//                                                             )}
//                                                             {payload.exp && (
//                                                                 <div className="p-2 bg-purple-100 rounded-lg">
//                                                                     <div className="flex items-center gap-1">
//                                                                         <Clock size={12}/>
//                                                                         <span
//                                                                             className="font-semibold text-purple-700">Expires:</span>
//                                                                     </div>
//                                                                     <span
//                                                                         className="text-purple-600">{formatTimestamp(payload.exp)}</span>
//                                                                 </div>
//                                                             )}
//                                                         </>
//                                                     );
//                                                 } catch {
//                                                     return null;
//                                                 }
//                                             })()}
//                                         </div>
//                                     )}
//                                 </div>

//                                 {/* Signature Section */}
//                                 <div
//                                     className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl p-6 shadow-lg border-2 border-cyan-200">
//                                     <div className="flex items-center justify-between mb-4">
//                                         <h3 className="text-lg font-bold text-cyan-700 flex items-center gap-2">
//                                             <div className="w-3 h-3 bg-cyan-500 rounded-full"></div>
//                                             Signature
//                                         </h3>
//                                         <CopyButton text={signature} copyKey="signature"/>
//                                     </div>
//                                     <pre
//                                         className="bg-white p-4 rounded-xl overflow-auto text-sm font-mono border border-cyan-200">
//                     <code className="text-cyan-600 break-all">{signature || 'No valid JWT token provided'}</code>
//                   </pre>
//                                     <div className="mt-4 p-3 bg-cyan-100 rounded-lg">
//                                         <p className="text-cyan-700 text-sm flex items-center gap-2">
//                                             <Shield size={16}/>
//                                             Enter your secret key above to verify signature integrity.
//                                         </p>
//                                     </div>
//                                 </div>

//                                 {/* Export Button */}
//                                 {jwtToken && (
//                                     <button
//                                         onClick={exportToken}
//                                         className="w-full py-3 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2 shadow-lg"
//                                     >
//                                         <Download size={18}/>
//                                         Export Token Data
//                                     </button>
//                                 )}
//                             </>
//                         ) : (
//                             /* Generated JWT Output */
//                             <div
//                                 className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 shadow-lg border-2 border-green-200">
//                                 <div className="flex items-center justify-between mb-4">
//                                     <h3 className="text-lg font-bold text-green-700 flex items-center gap-2">
//                                         <Zap className="text-green-600" size={20}/>
//                                         Generated JWT Token
//                                     </h3>
//                                     <div className="flex gap-2">
//                                         <CopyButton text={jwtToken} copyKey="generated-jwt"/>
//                                         {jwtToken && (
//                                             <button
//                                                 onClick={exportToken}
//                                                 className="p-2 rounded-lg bg-green-100 hover:bg-green-200 text-green-600 hover:text-green-800 transition-all duration-200"
//                                                 title="Export token data"
//                                             >
//                                                 <Download size={16}/>
//                                             </button>
//                                         )}
//                                     </div>
//                                 </div>
//                                 <div className="bg-white p-4 rounded-xl border border-green-200">
//                                     <code className="text-green-600 break-all font-mono text-sm">
//                                         {jwtToken || 'Click "Generate JWT Token" to create a new token'}
//                                     </code>
//                                 </div>
//                                 {jwtToken && (
//                                     <div className="mt-4 p-4 bg-green-100 rounded-xl">
//                                         <p className="text-green-700 flex items-center gap-2 font-medium">
//                                             <Check size={18}/>
//                                             JWT token generated successfully! Ready for authentication.
//                                         </p>
//                                     </div>
//                                 )}
//                             </div>
//                         )}

//                         {/* Info Panel */}
//                         <div
//                             className="bg-gradient-to-br from-slate-50 to-gray-100 rounded-2xl p-6 shadow-lg border-2 border-gray-200">
//                             <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
//                                 <Shield className="text-indigo-600" size={24}/>
//                                 About JWT
//                             </h3>
//                             <div className="space-y-4 text-sm text-gray-600">
//                                 <p className="leading-relaxed">
//                                     <strong className="text-gray-800">JSON Web Token (JWT)</strong> is a compact,
//                                     URL-safe means of representing claims between two parties in a secure manner.
//                                 </p>
//                                 <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//                                     <div className="p-4 bg-red-50 rounded-xl border border-red-200">
//                                         <div className="flex items-center gap-2 mb-2">
//                                             <div className="w-3 h-3 bg-red-500 rounded-full"></div>
//                                             <strong className="text-red-700">Header</strong>
//                                         </div>
//                                         <p className="text-xs text-red-600">Contains metadata about the token type and
//                                             algorithm</p>
//                                     </div>
//                                     <div className="p-4 bg-purple-50 rounded-xl border border-purple-200">
//                                         <div className="flex items-center gap-2 mb-2">
//                                             <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
//                                             <strong className="text-purple-700">Payload</strong>
//                                         </div>
//                                         <p className="text-xs text-purple-600">Contains the claims and user data</p>
//                                     </div>
//                                     <div className="p-4 bg-cyan-50 rounded-xl border border-cyan-200">
//                                         <div className="flex items-center gap-2 mb-2">
//                                             <div className="w-3 h-3 bg-cyan-500 rounded-full"></div>
//                                             <strong className="text-cyan-700">Signature</strong>
//                                         </div>
//                                         <p className="text-xs text-cyan-600">Verifies token integrity and
//                                             authenticity</p>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };
// export default JWTPage;




// "use client";
// import React, {useEffect, useState} from "react";
// import {
//     AlertCircle,
//     Calendar,
//     Check,
//     Clock,
//     Code,
//     Copy,
//     Download,
//     Eye,
//     EyeOff,
//     Key,
//     Lock,
//     RefreshCw,
//     Shield,
//     Unlock,
//     Zap
// } from "lucide-react";

// const JWTPage = () => {
//     const [jwtToken, setJwtToken] = useState('');
//     const [decodedHeader, setDecodedHeader] = useState('');
//     const [decodedPayload, setDecodedPayload] = useState('');
//     const [signature, setSignature] = useState('');
//     const [headerInput, setHeaderInput] = useState('{\n  "alg": "HS256",\n  "typ": "JWT"\n}');
//     const [payloadInput, setPayloadInput] = useState('{\n  "sub": "1234567890",\n  "name": "John Doe",\n  "iat": 1516239022,\n  "exp": 1735689600\n}');
//     const [secretKey, setSecretKey] = useState('your-256-bit-secret');
//     const [showSecret, setShowSecret] = useState(false);
//     const [activeTab, setActiveTab] = useState('decode');
//     const [copyStates, setCopyStates] = useState({});
//     const [errors, setErrors] = useState({encode: undefined, decode: undefined});
//     const [isValidJWT, setIsValidJWT] = useState(false);
//     const [tokenExpiry, setTokenExpiry] = useState(null);
//     const [isTokenExpired, setIsTokenExpired] = useState(false);
//     const [signatureValid, setSignatureValid] = useState(null);

//     // Single unified color scheme combining monochrome and ocean elements
//     const colorScheme = {
//         name: "Monochrome Ocean",
//         card: "bg-gradient-to-br from-slate-800 to-slate-700",
//         cardBorder: "border-slate-600",
//         accent: "from-slate-500 to-blue-600",
//         accentHover: "from-slate-600 to-blue-700",
//         text: "text-slate-100",
//         textSecondary: "text-slate-300",
//         headerColors: {
//             bg: "bg-gradient-to-br from-slate-700 to-blue-600",
//             text: "text-slate-200",
//             dot: "bg-blue-400"
//         },
//         payloadColors: {
//             bg: "bg-gradient-to-br from-gray-700 to-cyan-600",
//             text: "text-gray-200",
//             dot: "bg-cyan-400"
//         },
//         signatureColors: {
//             bg: "bg-gradient-to-br from-zinc-700 to-teal-600",
//             text: "text-zinc-200",
//             dot: "bg-teal-400"
//         },
//         //secretSection: "bg-gradient-to-br from-slate-700 to-blue-600",
//         secretSection: "bg-gradient-to-br from-slate-800 to-slate-700",
//         generateButton: "from-teal-400 to-slate-500 hover:from-teal-600 hover:to-slate-700"
//     };

//     const currentScheme = colorScheme;

//     // Sample JWT for demo
//     const sampleJWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjE3MzU2ODk2MDB9.kP_DQyZdBcVfOGaB8Q3lE7-PRLJXrOxcOw7D5tlA7Ok';

//     // Base64 URL encode/decode functions
//     const base64UrlEncode = (str) => {
//         return btoa(str)
//             .replace(/\+/g, '-')
//             .replace(/\//g, '_')
//             .replace(/=/g, '');
//     };

//     const base64UrlDecode = (str) => {
//         let padding = str.length % 4;
//         if (padding) {
//             str += '='.repeat(4 - padding);
//         }
//         return atob(str.replace(/-/g, '+').replace(/_/g, '/'));
//     };

//     // HMAC SHA256 implementation
//     const hmacSHA256 = async (message, secret) => {
//         const encoder = new TextEncoder();
//         const key = await crypto.subtle.importKey(
//             'raw',
//             encoder.encode(secret),
//             {name: 'HMAC', hash: 'SHA-256'},
//             false,
//             ['sign']
//         );
//         const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(message));
//         return base64UrlEncode(String.fromCharCode(...new Uint8Array(signature)));
//     };

//     // Verify JWT signature
//     const verifySignature = async (token, secret) => {
//         try {
//             const parts = token.split('.');
//             if (parts.length !== 3) return false;

//             const message = `${parts[0]}.${parts[1]}`;
//             const expectedSignature = await hmacSHA256(message, secret);
//             return parts[2] === expectedSignature;
//         } catch (error) {
//             return false;
//         }
//     };

//     // Generate random secret
//     const generateRandomSecret = () => {
//         const array = new Uint8Array(32);
//         crypto.getRandomValues(array);
//         const secret = Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
//         setSecretKey(secret);
//     };

//     // Update payload with current timestamp
//     const updateTimestamps = () => {
//         try {
//             const payload = JSON.parse(payloadInput);
//             const now = Math.floor(Date.now() / 1000);
//             payload.iat = now;
//             payload.exp = now + 3600; // Expires in 1 hour
//             setPayloadInput(JSON.stringify(payload, null, 2));
//         } catch (error) {
//             // Handle silently
//         }
//     };

//     // Format timestamp for display
//     const formatTimestamp = (timestamp) => {
//         if (!timestamp) return 'N/A';
//         try {
//             const date = new Date(timestamp * 1000);
//             return date.toLocaleString();
//         } catch {
//             return 'Invalid';
//         }
//     };

//     // Check token expiry
//     const checkTokenExpiry = (payload) => {
//         try {
//             const payloadObj = JSON.parse(payload);
//             if (payloadObj.exp) {
//                 const now = Math.floor(Date.now() / 1000);
//                 setTokenExpiry(payloadObj.exp);
//                 setIsTokenExpired(now > payloadObj.exp);
//             } else {
//                 setTokenExpiry(null);
//                 setIsTokenExpired(false);
//             }
//         } catch {
//             setTokenExpiry(null);
//             setIsTokenExpired(false);
//         }
//     };

//     // Decode JWT
//     const decodeJWT = async (token) => {
//         try {
//             const parts = token.split('.');
//             if (parts.length !== 3) {
//                 setErrors({decode: 'Invalid JWT format. JWT should have 3 parts separated by dots.'});
//                 setIsValidJWT(false);
//                 setSignatureValid(null);
//                 return;
//             }

//             const header = JSON.parse(base64UrlDecode(parts[0]));
//             const payload = JSON.parse(base64UrlDecode(parts[1]));
//             const sig = parts[2];

//             const formattedHeader = JSON.stringify(header, null, 2);
//             const formattedPayload = JSON.stringify(payload, null, 2);

//             setDecodedHeader(formattedHeader);
//             setDecodedPayload(formattedPayload);
//             setSignature(sig);
//             setIsValidJWT(true);
//             setErrors({});

//             checkTokenExpiry(formattedPayload);

//             // Verify signature if we have a secret key
//             if (secretKey && secretKey !== 'your-256-bit-secret') {
//                 const isValid = await verifySignature(token, secretKey);
//                 setSignatureValid(isValid);
//             } else {
//                 setSignatureValid(null);
//             }
//         } catch (error) {
//             setErrors({decode: 'Invalid JWT token. Please check the format.'});
//             setIsValidJWT(false);
//             setSignatureValid(null);
//         }
//     };

//     // Encode JWT
//     const encodeJWT = async () => {
//         try {
//             const header = JSON.parse(headerInput);
//             const payload = JSON.parse(payloadInput);

//             const headerEncoded = base64UrlEncode(JSON.stringify(header));
//             const payloadEncoded = base64UrlEncode(JSON.stringify(payload));
//             const message = `${headerEncoded}.${payloadEncoded}`;

//             const sig = await hmacSHA256(message, secretKey);
//             const token = `${message}.${sig}`;

//             setJwtToken(token);
//             setErrors({});

//             // Auto-decode the generated token
//             await decodeJWT(token);
//         } catch (error) {
//             setErrors({encode: 'Invalid JSON format in header or payload.'});
//         }
//     };

//     // Export token to file
//     const exportToken = () => {
//         const data = {
//             token: jwtToken,
//             header: decodedHeader,
//             payload: decodedPayload,
//             signature: signature,
//             created: new Date().toISOString()
//         };

//         const blob = new Blob([JSON.stringify(data, null, 2)], {type: 'application/json'});
//         const url = URL.createObjectURL(blob);
//         const a = document.createElement('a');
//         a.href = url;
//         a.download = 'jwt-token.json';
//         a.click();
//         URL.revokeObjectURL(url);
//     };

//     // Copy to clipboard
//     const copyToClipboard = async (text, key) => {
//         try {
//             await navigator.clipboard.writeText(text);
//             setCopyStates({...copyStates, [key]: true});
//             setTimeout(() => setCopyStates({...copyStates, [key]: false}), 2000);
//         } catch (err) {
//             console.error('Failed to copy: ', err);
//         }
//     };

//     // Auto-decode when JWT token changes
//     useEffect(() => {
//         if (jwtToken && activeTab === 'decode') {
//             decodeJWT(jwtToken);
//         }
//     }, [jwtToken, activeTab, secretKey]);

//     // Load sample JWT on mount
//     useEffect(() => {
//         setJwtToken(sampleJWT);
//     }, []);

//     const TabButton = ({tab, label, icon: Icon}) => (
//         <button
//             onClick={() => setActiveTab(tab)}
//             className={`flex items-center gap-3 px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg ${
//                 activeTab === tab
//                     ? `bg-gradient-to-r ${currentScheme.accent} text-white shadow-xl transform scale-105`
//                     : `${currentScheme.card} ${currentScheme.text} hover:opacity-80 border-2 ${currentScheme.cardBorder} hover:border-opacity-60`
//             }`}
//         >
//             <Icon size={20}/>
//             {label}
//         </button>
//     );

//     const CopyButton = ({text, copyKey, className = ''}) => (
//         <button
//             onClick={() => copyToClipboard(text, copyKey)}
//             className={`p-2 rounded-lg ${currentScheme.card} hover:opacity-80 ${currentScheme.textSecondary} transition-all duration-200 ${className}`}
//             title="Copy to clipboard"
//         >
//             {copyStates[copyKey] ? <Check size={16} className="text-green-400"/> : <Copy size={16}/>}
//         </button>
//     );

//     return (
//         <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-900 text-white p-6"> 
//             <div className=" ">
//                 {/* Header */}
//                 <div className="text-center mb-12 mt-8">
//                     <div className="flex justify-center mb-6">
//                         <div className={`p-4 bg-gradient-to-r ${currentScheme.accent} rounded-2xl shadow-lg`}>
//                             <Shield className="text-white" size={48}/>
//                         </div>
//                     </div>
//                     <h1 className={`text-6xl font-bold bg-gradient-to-r ${currentScheme.accent} bg-clip-text text-transparent mb-6`}>
//                         JWT Encoder/Decoder
//                     </h1>
//                     <p className={`${currentScheme.textSecondary} text-xl max-w-2xl mx-auto leading-relaxed`}>
//                         Securely encode and decode JSON Web Tokens with signature verification and advanced features
//                     </p>
//                 </div>

//                 {/* Tab Navigation */}
//                 <div className="flex justify-center gap-6 mb-12">
//                     <TabButton tab="decode" label="Decode JWT" icon={Unlock}/>
//                     <TabButton tab="encode" label="Encode JWT" icon={Lock}/>
//                 </div>

//                 {/* Main Content */}
//                 <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
//                     {/* Left Panel */}
//                     <div className="space-y-6">
//                         {activeTab === 'decode' ? (
//                             <>
//                                 {/* JWT Token Input */}
//                                 <div className={`${currentScheme.card} rounded-2xl p-8 shadow-xl border ${currentScheme.cardBorder} backdrop-blur-sm`}>
//                                     <div className="flex items-center justify-between mb-6">
//                                         <h2 className={`text-2xl font-bold flex items-center gap-3 ${currentScheme.text}`}>
//                                             <Code className={`${currentScheme.textSecondary}`} size={24}/>
//                                             JWT Token Input
//                                         </h2>
//                                         <button
//                                             onClick={() => setJwtToken(sampleJWT)}
//                                             className={`px-6 py-3 bg-gradient-to-r ${currentScheme.accentHover} text-white rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5`}
//                                         >
//                                             Load Sample
//                                         </button>
//                                     </div>
                                    
//                                     <div>
//                                         <label className={`block text-sm font-semibold ${currentScheme.textSecondary} mb-3`}>
//                                             Paste your JWT token here:
//                                         </label>
//                                         <div className="relative">
//                                             <textarea
//                                                 value={jwtToken}
//                                                 onChange={(e) => setJwtToken(e.target.value)}
//                                                 className={`w-full h-64 p-4 bg-black bg-opacity-30 border-2 ${currentScheme.cardBorder} rounded-xl resize-none font-mono text-sm ${currentScheme.text} focus:ring-2 focus:ring-opacity-50 transition-all duration-200 placeholder-opacity-50`}
//                                                 placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
//                                             />
//                                             <CopyButton
//                                                 text={jwtToken}
//                                                 copyKey="jwt-input"
//                                                 className="absolute top-3 right-3"
//                                             />
//                                         </div>
//                                         {errors.decode && (
//                                             <div className="flex items-center gap-3 text-red-400 text-sm mt-3 p-3 bg-red-900 bg-opacity-30 rounded-lg border border-red-700">
//                                                 <AlertCircle size={16}/>
//                                                 {errors.decode}
//                                             </div>
//                                         )}
//                                     </div>

//                                     {isValidJWT && (
//                                         <div className="space-y-3 mt-6">
//                                             <div className="flex items-center gap-3 text-green-400 text-sm p-3  bg-opacity-30 rounded-lg border border-green-700">
//                                                 <Check size={16}/>
//                                                 Valid JWT format detected
//                                             </div>

//                                             {/* Token Status */}
//                                             {tokenExpiry && (
//                                                 <div className={`flex items-center gap-3 text-sm p-3 rounded-lg border ${
//                                                     isTokenExpired
//                                                         ? 'text-red-400  bg-opacity-30 border-red-700'
//                                                         : 'text-green-400  bg-opacity-30 border-green-700'
//                                                 }`}>
//                                                     <Clock size={16}/>
//                                                     Token {isTokenExpired ? 'expired' : 'expires'} on {formatTimestamp(tokenExpiry)}
//                                                 </div>
//                                             )}

//                                             {/* Signature Verification */}
//                                             {signatureValid !== null && (
//                                                 <div className={`flex items-center gap-3 text-sm p-3 rounded-lg border ${
//                                                     signatureValid
//                                                         ? 'text-green-400  bg-opacity-30 border-green-700'
//                                                         : 'text-red-400  bg-opacity-30 border-red-700'
//                                                 }`}> 
//                                                     <Shield size={16}/>
//                                                     Signature {signatureValid ? 'verified' : 'invalid'}
//                                                 </div>
//                                             )}
//                                         </div>
//                                     )}
//                                 </div>

//                                 {/* Secret Key Section */}
//                                 <div className={`${currentScheme.secretSection} rounded-2xl p-8 shadow-xl border ${currentScheme.cardBorder}`}>
//                                     <div className="flex items-center justify-between mb-6">
//                                         <h2 className={`text-2xl font-bold flex items-center gap-3 ${currentScheme.text}`}>
//                                             <Key className={`${currentScheme.textSecondary}`} size={24}/>
//                                             Secret Key
//                                         </h2>
//                                         <button
//                                             onClick={generateRandomSecret}
//                                             className={`text-sm px-4 py-2 bg-gradient-to-r ${currentScheme.accent} hover:${currentScheme.accentHover} text-white rounded-lg transition-colors flex items-center gap-2`}
//                                             title="Generate random secret"
//                                         >
//                                             <RefreshCw size={16}/>
//                                             Generate
//                                         </button>
//                                     </div>
                                    
//                                     <div>
//                                         <label className={`block text-sm font-semibold ${currentScheme.textSecondary} mb-3`}>
//                                             Secret Key (for signature verification):
//                                         </label>
//                                         <div className="relative">
//                                             <input
//                                                 type={showSecret ? 'text' : 'password'}
//                                                 value={secretKey}
//                                                 onChange={(e) => setSecretKey(e.target.value)}
//                                                 className={`w-full p-4 pr-16 bg-black bg-opacity-30 border-2 ${currentScheme.cardBorder} rounded-xl font-mono text-sm ${currentScheme.text} focus:ring-2 focus:ring-opacity-50 transition-all duration-200 placeholder-opacity-50`}
//                                                 placeholder="Enter secret key to verify signature"
//                                             />
//                                             <button
//                                                 onClick={() => setShowSecret(!showSecret)}
//                                                 className={`absolute right-3 top-3 p-2 rounded-lg ${currentScheme.card} hover:opacity-80 ${currentScheme.textSecondary} transition-colors`}
//                                                 title={showSecret ? 'Hide secret' : 'Show secret'}
//                                             >
//                                                 {showSecret ? <EyeOff size={16}/> : <Eye size={16}/>}
//                                             </button>
//                                         </div>
//                                         <p className={`${currentScheme.textSecondary} text-sm mt-3 flex items-center gap-2 border-1 rounded-xl p-4`}>
//                                             <AlertCircle size={14}/>
//                                             Secret key generation is mandatory for proper JWT signature verification
//                                         </p>
//                                     </div>
//                                 </div>
//                             </>
//                         ) : (
//                             /* JWT Components for Encode */
//                             <div className={`${currentScheme.card} rounded-2xl p-8 shadow-xl border ${currentScheme.cardBorder}`}>
//                                 <div className="flex items-center justify-between mb-6">
//                                     <h2 className={`text-2xl font-bold flex items-center gap-3 ${currentScheme.text}`}>
//                                         <Code className={`${currentScheme.textSecondary}`} size={24}/>
//                                         JWT Components
//                                     </h2>
//                                 </div>

//                                 <div className="space-y-6">
//                                     {/* Header */}
//                                     <div>
//                                         <label className={`block text-sm font-semibold ${currentScheme.textSecondary} mb-3`}>
//                                             Header:
//                                         </label>
//                                         <div className="relative">
//                                             <textarea
//                                                 value={headerInput}
//                                                 onChange={(e) => setHeaderInput(e.target.value)}
//                                                 className={`w-full h-28 p-4 ${currentScheme.headerColors.bg} border-2 ${currentScheme.cardBorder} rounded-xl resize-none font-mono text-sm ${currentScheme.headerColors.text} focus:ring-2 focus:ring-opacity-50 transition-all duration-200`}
//                                             />
//                                             <CopyButton
//                                                 text={headerInput}
//                                                 copyKey="header-input"
//                                                 className="absolute top-3 right-3"
//                                             />
//                                         </div>
//                                     </div>

//                                     {/* Payload */}
//                                     <div>
//                                         <div className="flex items-center justify-between mb-3">
//                                             <label className={`block text-sm font-semibold ${currentScheme.textSecondary}`}>
//                                                 Payload:
//                                             </label>
//                                             <button
//                                                 onClick={updateTimestamps}
//                                                 className={`text-xs px-3 py-1 bg-gradient-to-r ${currentScheme.accent} hover:${currentScheme.accentHover} text-white rounded-lg transition-colors flex items-center gap-1`}
//                                                 title="Update iat and exp with current time"
//                                             >
//                                                 <Clock size={12}/>
//                                                 Update Timestamps
//                                             </button>
//                                         </div>
//                                         <div className="relative">
//                                             <textarea
//                                                 value={payloadInput}
//                                                 onChange={(e) => setPayloadInput(e.target.value)}
//                                                 className={`w-full h-36 p-4 ${currentScheme.payloadColors.bg} border-2 ${currentScheme.cardBorder} rounded-xl resize-none font-mono text-sm ${currentScheme.payloadColors.text} focus:ring-2 focus:ring-opacity-50 transition-all duration-200`}
//                                             />
//                                             <CopyButton
//                                                 text={payloadInput}
//                                                 copyKey="payload-input"
//                                                 className="absolute top-3 right-3"
//                                             />
//                                         </div>
//                                     </div>

//                                     {/* Secret Key */}
//                                     <div>
//                                         <div className="flex items-center justify-between mb-3">
//                                             <label className={`block text-sm font-semibold ${currentScheme.textSecondary} flex items-center gap-2`}>
//                                                 <Key size={16} className={`${currentScheme.textSecondary}`}/>
//                                                 Secret Key:
//                                             </label>
//                                             <button
//                                                 onClick={generateRandomSecret}
//                                                 className={`text-xs px-3 py-1 bg-gradient-to-r ${currentScheme.accent} hover:${currentScheme.accentHover} text-white rounded-lg transition-colors flex items-center gap-1`}
//                                                 title="Generate random secret"
//                                             >
//                                                 <RefreshCw size={12}/>
//                                                 Generate
//                                             </button>
//                                         </div>
//                                         <div className="relative">
//                                             <input
//                                                 type={showSecret ? 'text' : 'password'}
//                                                 value={secretKey}
//                                                 onChange={(e) => setSecretKey(e.target.value)}
//                                                 className={`w-full p-4 pr-16 ${currentScheme.signatureColors.bg} border-2 ${currentScheme.cardBorder} rounded-xl font-mono text-sm ${currentScheme.signatureColors.text} focus:ring-2 focus:ring-opacity-50 transition-all duration-200`}
//                                             />
//                                             <button
//                                                 onClick={() => setShowSecret(!showSecret)}
//                                                 className={`absolute right-3 top-3 p-2 rounded-lg ${currentScheme.card} hover:opacity-80 ${currentScheme.textSecondary} transition-colors`}
//                                                 title={showSecret ? 'Hide secret' : 'Show secret'}
//                                             >
//                                                 {showSecret ? <EyeOff size={16}/> : <Eye size={16}/>}
//                                             </button>
//                                         </div>
//                                         <p className={`${currentScheme.textSecondary} text-sm mt-2 flex items-center gap-2`}>
//                                             <AlertCircle size={14}/>
//                                             Secret key generation is mandatory
//                                         </p>
//                                     </div>

//                                     <button
//                                         onClick={encodeJWT}
//                                         className={`w-full py-4 bg-gradient-to-r ${currentScheme.generateButton} text-white rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5`}
//                                     >
//                                         <Zap size={20}/>
//                                         Generate JWT Token
//                                     </button>

//                                     {errors.encode && (
//                                         <div className="flex items-center gap-3 text-red-400 text-sm p-3 bg-red-900 bg-opacity-30 rounded-lg border border-red-700">
//                                             <AlertCircle size={16}/>
//                                             {errors.encode}
//                                         </div>
//                                     )}
//                                 </div>
//                             </div>
//                         )}
//                     </div>

//                     {/* Right Panel */}
//                     <div className="space-y-6">
//                         {activeTab === 'decode' ? (
//                             <>
//                                 {/* Header Section */}
//                                 <div className={`${currentScheme.card} rounded-2xl p-6 shadow-lg border ${currentScheme.cardBorder}`}>
//                                     <div className="flex items-center justify-between mb-4">
//                                         <h3 className={`text-lg font-bold ${currentScheme.text} flex items-center gap-2`}>
//                                             <div className={`w-3 h-3 ${currentScheme.headerColors.dot} rounded-full`}></div>
//                                             Header
//                                         </h3>
//                                         <CopyButton text={decodedHeader} copyKey="header"/>
//                                     </div>
//                                     <pre className={`${currentScheme.headerColors.bg} p-4 rounded-xl overflow-auto text-sm font-mono max-h-40 border ${currentScheme.cardBorder}`}>
//                                         <code className={`${currentScheme.headerColors.text}`}>{decodedHeader || 'No valid JWT token provided'}</code>
//                                     </pre>
//                                 </div>

//                                 {/* Payload Section */}
//                                 <div className={`${currentScheme.card} rounded-2xl p-6 shadow-lg border ${currentScheme.cardBorder}`}>
//                                     <div className="flex items-center justify-between mb-4">
//                                         <h3 className={`text-lg font-bold ${currentScheme.text} flex items-center gap-2`}>
//                                             <div className={`w-3 h-3 ${currentScheme.payloadColors.dot} rounded-full`}></div>
//                                             Payload
//                                         </h3>
//                                         <CopyButton text={decodedPayload} copyKey="payload"/>
//                                     </div>
//                                     <pre className={`${currentScheme.payloadColors.bg} p-4 rounded-xl overflow-auto text-sm font-mono max-h-40 border ${currentScheme.cardBorder}`}>
//                                         <code className={`${currentScheme.payloadColors.text}`}>{decodedPayload || 'No valid JWT token provided'}</code>
//                                     </pre>

//                                     {/* Payload Claims Info */}
//                                     {decodedPayload && (
//                                         <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
//                                             {(() => {
//                                                 try {
//                                                     const payload = JSON.parse(decodedPayload);
//                                                     return (
//                                                         <>
//                                                             {payload.iat && (
//                                                                 <div className={`p-2 ${currentScheme.card} bg-opacity-50 rounded-lg border ${currentScheme.cardBorder}`}>
//                                                                     <div className="flex items-center gap-1">
//                                                                         <Calendar size={12}/>
//                                                                         <span className={`font-semibold ${currentScheme.text}`}>Issued:</span>
//                                                                     </div>
//                                                                     <span className={`${currentScheme.textSecondary}`}>{formatTimestamp(payload.iat)}</span>
//                                                                 </div>
//                                                             )}
//                                                             {payload.exp && (
//                                                                 <div className={`p-2 ${currentScheme.card} bg-opacity-50 rounded-lg border ${currentScheme.cardBorder}`}>
//                                                                     <div className="flex items-center gap-1">
//                                                                         <Clock size={12}/>
//                                                                         <span className={`font-semibold ${currentScheme.text}`}>Expires:</span>
//                                                                     </div>
//                                                                     <span className={`${currentScheme.textSecondary}`}>{formatTimestamp(payload.exp)}</span>
//                                                                 </div>
//                                                             )}
//                                                         </>
//                                                     );
//                                                 } catch {
//                                                     return null;
//                                                 }
//                                             })()}
//                                         </div>
//                                     )}
//                                 </div>

//                                 {/* Signature Section */}
//                                 <div className={`${currentScheme.card} rounded-2xl p-6 shadow-lg border ${currentScheme.cardBorder}`}>
//                                     <div className="flex items-center justify-between mb-4">
//                                         <h3 className={`text-lg font-bold ${currentScheme.text} flex items-center gap-2`}>
//                                             <div className={`w-3 h-3 ${currentScheme.signatureColors.dot} rounded-full`}></div>
//                                             Signature
//                                         </h3>
//                                         <CopyButton text={signature} copyKey="signature"/>
//                                     </div>
//                                     <pre className={`${currentScheme.signatureColors.bg} p-4 rounded-xl overflow-auto text-sm font-mono border ${currentScheme.cardBorder}`}>
//                                         <code className={`${currentScheme.signatureColors.text} break-all`}>{signature || 'No valid JWT token provided'}</code>
//                                     </pre>
//                                     <div className={`mt-4 p-3 ${currentScheme.card} bg-opacity-50 rounded-lg border ${currentScheme.cardBorder}`}>
//                                         <p className={`${currentScheme.textSecondary} text-sm flex items-center gap-2`}>
//                                             <Shield size={16}/>
//                                             Enter your secret key above to verify signature integrity.
//                                         </p>
//                                     </div>
//                                 </div>

//                                 {/* Export Button */}
//                                 {jwtToken && (
//                                     <button
//                                         onClick={exportToken}
//                                         className={`w-full py-3 bg-gradient-to-r ${currentScheme.card} hover:opacity-80 ${currentScheme.text} rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2 shadow-lg`}
//                                     >
//                                         <Download size={18}/>
//                                         Export Token Data
//                                     </button>
//                                 )}
//                             </>
//                         ) : (
//                             /* Generated JWT Output */
//                             // <div className={`bg-gradient-to-br ${currentScheme.generateButton.replace('hover:', '')} rounded-2xl p-6 shadow-lg border-2 ${currentScheme.cardBorder}`}>
//                             <div className={`bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl p-6 shadow-lg border-2 ${currentScheme.cardBorder}`}>
//                                 <div className="flex items-center justify-between mb-4">
//                                     <h3 className="text-lg font-bold text-white flex items-center gap-2">
//                                         <Zap className="text-white" size={20}/>
//                                         Generated JWT Token
//                                     </h3>
//                                     <div className="flex gap-2">
//                                         <CopyButton text={jwtToken} copyKey="generated-jwt"/>
//                                         {jwtToken && (
//                                             <button
//                                                 onClick={exportToken}
//                                                 className={`p-2 rounded-lg ${currentScheme.card} bg-opacity-20 hover:bg-opacity-30 text-white transition-all duration-200`}
//                                                 title="Export token data"
//                                             >
//                                                 <Download size={16}/>
//                                             </button>
//                                         )}
//                                     </div>
//                                 </div>
//                                 <div className="bg-black bg-opacity-30 p-6 rounded-xl border border-white border-opacity-20 min-h-96">
//                                     <code className="text-white break-all font-mono text-sm leading-relaxed">
//                                         {jwtToken || 'Click "Generate JWT Token" to create a new token'}
//                                     </code>
//                                 </div>
//                                 {jwtToken && (
//                                     <div className={`mt-4 p-4  bg-opacity-20 rounded-xl border border-green-700 bg-gradient-to-br from-slate-800 to-slate-700 border-opacity-20`}>
//                                         <p className="text-green-600 flex items-center gap-2 font-medium">
//                                             <Check size={18}/>
//                                             JWT token generated successfully! Ready for authentication.
//                                         </p>
//                                     </div>
//                                 )}
//                             </div>
//                         )}
//                     </div>
//                 </div>

//                 {/* Compact About JWT Section */}
//                 <div className={`${currentScheme.card} rounded-2xl p-6 shadow-xl border ${currentScheme.cardBorder}`}>
//                     <h3 className={`text-2xl font-bold mb-4 ${currentScheme.text} flex items-center gap-3`}>
//                         <Shield className={`${currentScheme.textSecondary}`} size={28}/>
//                         About JWT 
//                     </h3>
//                     <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//                         <div className="lg:col-span-2">
//                             <p className={`${currentScheme.textSecondary} leading-relaxed mb-4`}>
//                                 <strong className={`${currentScheme.text}`}>JSON Web Token (JWT)</strong> is a compact, URL-safe means of representing claims between two parties securely. It's an open standard (RFC 7519) for transmitting information as a JSON object.
//                             </p>
//                             <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
//                                 <div className={`p-3 ${currentScheme.headerColors.bg} rounded-lg border ${currentScheme.cardBorder}`}>
//                                     <div className="flex items-center gap-2 mb-2">
//                                         <div className={`w-3 h-3 ${currentScheme.headerColors.dot} rounded-full`}></div>
//                                         <strong className={`${currentScheme.text}`}>Header</strong>
//                                     </div>
//                                     <p className={`text-xs ${currentScheme.textSecondary}`}>Token type and signing algorithm</p>
//                                 </div>
//                                 <div className={`p-3 ${currentScheme.payloadColors.bg} rounded-lg border ${currentScheme.cardBorder}`}>
//                                     <div className="flex items-center gap-2 mb-2">
//                                         <div className={`w-3 h-3 ${currentScheme.payloadColors.dot} rounded-full`}></div>
//                                         <strong className={`${currentScheme.text}`}>Payload</strong>
//                                     </div>
//                                     <p className={`text-xs ${currentScheme.textSecondary}`}>Claims and user data</p>
//                                 </div>
//                                 <div className={`p-3 ${currentScheme.signatureColors.bg} rounded-lg border ${currentScheme.cardBorder}`}>
//                                     <div className="flex items-center gap-2 mb-2">
//                                         <div className={`w-3 h-3 ${currentScheme.signatureColors.dot} rounded-full`}></div>
//                                         <strong className={`${currentScheme.text}`}>Signature</strong>
//                                     </div>
//                                     <p className={`text-xs ${currentScheme.textSecondary}`}>Verifies integrity and authenticity</p>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className={`${currentScheme.card} bg-opacity-30 rounded-lg p-4 border ${currentScheme.cardBorder}`}>
//                             <h4 className={`text-lg font-semibold ${currentScheme.text} mb-3 flex items-center gap-2`}>
//                                 <AlertCircle size={18}/>
//                                 Security Tips:
//                             </h4>
//                             <ul className={`space-y-1 text-sm ${currentScheme.textSecondary}`}>
//                                 <li>• Use strong secret keys</li>
//                                 <li>• Set expiration times</li>
//                                 <li>• Validate on every request</li>
//                                 {/* <li>• Use HTTPS in production</li> */}
//                                 <li>• Never store sensitive data in payload</li>
//                             </ul>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default JWTPage;


// "use client";
// import React, {useEffect, useState} from "react";
// import {
//     AlertCircle,
//     Calendar,
//     Check,
//     Clock,
//     Code,
//     Copy,
//     Download,
//     Eye,
//     EyeOff,
//     Key,
//     Lock,
//     RefreshCw,
//     Shield,
//     Unlock,
//     Zap
// } from "lucide-react";

// const JWTPage = () => {
//     const [colorScheme, setColorScheme] = useState('monochrome');
//     const [jwtToken, setJwtToken] = useState('');
//     const [decodedHeader, setDecodedHeader] = useState('');
//     const [decodedPayload, setDecodedPayload] = useState('');
//     const [signature, setSignature] = useState('');
//     const [headerInput, setHeaderInput] = useState('{\n  "alg": "HS256",\n  "typ": "JWT"\n}');
//     const [payloadInput, setPayloadInput] = useState('{\n  "sub": "1234567890",\n  "name": "John Doe",\n  "iat": 1516239022,\n  "exp": 1735689600\n}');
//     const [secretKey, setSecretKey] = useState('your-256-bit-secret');
//     const [showSecret, setShowSecret] = useState(false);
//     const [activeTab, setActiveTab] = useState('decode');
//     const [copyStates, setCopyStates] = useState({});
//     const [errors, setErrors] = useState({});
//     const [isValidJWT, setIsValidJWT] = useState(false);
//     const [tokenExpiry, setTokenExpiry] = useState(null);
//     const [isTokenExpired, setIsTokenExpired] = useState(false);
//     const [signatureValid, setSignatureValid] = useState(null);

//     // Color schemes - refined to two unique options
//     const colorSchemes = {
//         monochrome: {
//             name: "Monochrome Elite",
//             card: "bg-gradient-to-br from-slate-800 to-slate-700",
//             cardBorder: "border-slate-600",
//             accent: "from-slate-500 to-gray-600",
//             accentHover: "from-slate-600 to-gray-700",
//             text: "text-slate-100",
//             textSecondary: "text-slate-300",
//             headerColors: {
//                 bg: "bg-gradient-to-br from-slate-700 to-gray-600",
//                 text: "text-slate-200",
//                 dot: "bg-slate-400"
//             },
//             payloadColors: {
//                 bg: "bg-gradient-to-br from-gray-700 to-zinc-600",
//                 text: "text-gray-200",
//                 dot: "bg-gray-400"
//             },
//             signatureColors: {
//                 bg: "bg-gradient-to-br from-zinc-700 to-stone-600",
//                 text: "text-zinc-200",
//                 dot: "bg-zinc-400"
//             },
//             secretSection: "bg-gradient-to-br from-slate-800 to-gray-700",
//             generateButton: "from-neutral-600 to-slate-700 hover:from-neutral-700 hover:to-slate-800"
//         },
//         ocean: {
//             name: "Ocean Depth",
//             card: "bg-gradient-to-br from-slate-800 to-slate-700",
//             cardBorder: "border-slate-600",
//             accent: "from-blue-500 to-cyan-600",
//             accentHover: "from-blue-600 to-cyan-700",
//             text: "text-slate-100",
//             textSecondary: "text-slate-300",
//             headerColors: {
//                 bg: "bg-gradient-to-br from-blue-800 to-blue-600",
//                 text: "text-blue-100",
//                 dot: "bg-blue-300"
//             },
//             payloadColors: {
//                 bg: "bg-gradient-to-br from-cyan-800 to-teal-600",
//                 text: "text-cyan-100",
//                 dot: "bg-cyan-300"
//             },
//             signatureColors: {
//                 bg: "bg-gradient-to-br from-teal-800 to-emerald-600",
//                 text: "text-teal-100",
//                 dot: "bg-teal-300"
//             },
//             secretSection: "bg-gradient-to-br from-blue-900 to-cyan-800",
//             generateButton: "from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700"
//         }
//     };

//     const currentScheme = colorSchemes[colorScheme];

//     // Sample JWT for demo
//     const sampleJWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjE3MzU2ODk2MDB9.kP_DQyZdBcVfOGaB8Q3lE7-PRLJXrOxcOw7D5tlA7Ok';

//     // Base64 URL encode/decode functions
//     const base64UrlEncode = (str) => {
//         return btoa(str)
//             .replace(/\+/g, '-')
//             .replace(/\//g, '_')
//             .replace(/=/g, '');
//     };

//     const base64UrlDecode = (str) => {
//         let padding = str.length % 4;
//         if (padding) {
//             str += '='.repeat(4 - padding);
//         }
//         return atob(str.replace(/-/g, '+').replace(/_/g, '/'));
//     };

//     // HMAC SHA256 implementation
//     const hmacSHA256 = async (message, secret) => {
//         const encoder = new TextEncoder();
//         const key = await crypto.subtle.importKey(
//             'raw',
//             encoder.encode(secret),
//             {name: 'HMAC', hash: 'SHA-256'},
//             false,
//             ['sign']
//         );
//         const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(message));
//         return base64UrlEncode(String.fromCharCode(...new Uint8Array(signature)));
//     };

//     // Verify JWT signature
//     const verifySignature = async (token, secret) => {
//         try {
//             const parts = token.split('.');
//             if (parts.length !== 3) return false;

//             const message = `${parts[0]}.${parts[1]}`;
//             const expectedSignature = await hmacSHA256(message, secret);
//             return parts[2] === expectedSignature;
//         } catch (error) {
//             return false;
//         }
//     };

//     // Generate random secret
//     const generateRandomSecret = () => {
//         const array = new Uint8Array(32);
//         crypto.getRandomValues(array);
//         const secret = Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
//         setSecretKey(secret);
//     };

//     // Update payload with current timestamp
//     const updateTimestamps = () => {
//         try {
//             const payload = JSON.parse(payloadInput);
//             const now = Math.floor(Date.now() / 1000);
//             payload.iat = now;
//             payload.exp = now + 3600; // Expires in 1 hour
//             setPayloadInput(JSON.stringify(payload, null, 2));
//         } catch (error) {
//             // Handle silently
//         }
//     };

//     // Format timestamp for display
//     const formatTimestamp = (timestamp) => {
//         if (!timestamp) return 'N/A';
//         try {
//             const date = new Date(timestamp * 1000);
//             return date.toLocaleString();
//         } catch {
//             return 'Invalid';
//         }
//     };

//     // Check token expiry
//     const checkTokenExpiry = (payload) => {
//         try {
//             const payloadObj = JSON.parse(payload);
//             if (payloadObj.exp) {
//                 const now = Math.floor(Date.now() / 1000);
//                 setTokenExpiry(payloadObj.exp);
//                 setIsTokenExpired(now > payloadObj.exp);
//             } else {
//                 setTokenExpiry(null);
//                 setIsTokenExpired(false);
//             }
//         } catch {
//             setTokenExpiry(null);
//             setIsTokenExpired(false);
//         }
//     };

//     // Decode JWT
//     const decodeJWT = async (token) => {
//         try {
//             const parts = token.split('.');
//             if (parts.length !== 3) {
//                 setErrors({decode: 'Invalid JWT format. JWT should have 3 parts separated by dots.'});
//                 setIsValidJWT(false);
//                 setSignatureValid(null);
//                 return;
//             }

//             const header = JSON.parse(base64UrlDecode(parts[0]));
//             const payload = JSON.parse(base64UrlDecode(parts[1]));
//             const sig = parts[2];

//             const formattedHeader = JSON.stringify(header, null, 2);
//             const formattedPayload = JSON.stringify(payload, null, 2);

//             setDecodedHeader(formattedHeader);
//             setDecodedPayload(formattedPayload);
//             setSignature(sig);
//             setIsValidJWT(true);
//             setErrors({});

//             checkTokenExpiry(formattedPayload);

//             // Verify signature if we have a secret key
//             if (secretKey && secretKey !== 'your-256-bit-secret') {
//                 const isValid = await verifySignature(token, secretKey);
//                 setSignatureValid(isValid);
//             } else {
//                 setSignatureValid(null);
//             }
//         } catch (error) {
//             setErrors({decode: 'Invalid JWT token. Please check the format.'});
//             setIsValidJWT(false);
//             setSignatureValid(null);
//         }
//     };

//     // Encode JWT
//     const encodeJWT = async () => {
//         try {
//             const header = JSON.parse(headerInput);
//             const payload = JSON.parse(payloadInput);

//             const headerEncoded = base64UrlEncode(JSON.stringify(header));
//             const payloadEncoded = base64UrlEncode(JSON.stringify(payload));
//             const message = `${headerEncoded}.${payloadEncoded}`;

//             const sig = await hmacSHA256(message, secretKey);
//             const token = `${message}.${sig}`;

//             setJwtToken(token);
//             setErrors({});

//             // Auto-decode the generated token
//             await decodeJWT(token);
//         } catch (error) {
//             setErrors({encode: 'Invalid JSON format in header or payload.'});
//         }
//     };

//     // Export token to file
//     const exportToken = () => {
//         const data = {
//             token: jwtToken,
//             header: decodedHeader,
//             payload: decodedPayload,
//             signature: signature,
//             created: new Date().toISOString()
//         };

//         const blob = new Blob([JSON.stringify(data, null, 2)], {type: 'application/json'});
//         const url = URL.createObjectURL(blob);
//         const a = document.createElement('a');
//         a.href = url;
//         a.download = 'jwt-token.json';
//         a.click();
//         URL.revokeObjectURL(url);
//     };

//     // Copy to clipboard
//     const copyToClipboard = async (text, key) => {
//         try {
//             await navigator.clipboard.writeText(text);
//             setCopyStates({...copyStates, [key]: true});
//             setTimeout(() => setCopyStates({...copyStates, [key]: false}), 2000);
//         } catch (err) {
//             console.error('Failed to copy: ', err);
//         }
//     };

//     // Auto-decode when JWT token changes
//     useEffect(() => {
//         if (jwtToken && activeTab === 'decode') {
//             decodeJWT(jwtToken);
//         }
//     }, [jwtToken, activeTab, secretKey]);

//     // Load sample JWT on mount
//     useEffect(() => {
//         setJwtToken(sampleJWT);
//     }, []);

//     const TabButton = ({tab, label, icon: Icon}) => (
//         <button
//             onClick={() => setActiveTab(tab)}
//             className={`flex items-center gap-3 px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg ${
//                 activeTab === tab
//                     ? `bg-gradient-to-r ${currentScheme.accent} text-white shadow-xl transform scale-105`
//                     : `${currentScheme.card} ${currentScheme.text} hover:opacity-80 border-2 ${currentScheme.cardBorder} hover:border-opacity-60`
//             }`}
//         >
//             <Icon size={20}/>
//             {label}
//         </button>
//     );

//     const CopyButton = ({text, copyKey, className = ''}) => (
//         <button
//             onClick={() => copyToClipboard(text, copyKey)}
//             className={`p-2 rounded-lg ${currentScheme.card} hover:opacity-80 ${currentScheme.textSecondary} transition-all duration-200 ${className}`}
//             title="Copy to clipboard"
//         >
//             {copyStates[copyKey] ? <Check size={16} className="text-green-400"/> : <Copy size={16}/>}
//         </button>
//     );

//     return (
//         <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-900 text-white p-6"> 
//             <div className="max-w-7xl mx-auto">
//                 {/* Color Scheme Selector */}
//                 <div className="fixed top-4 right-4 z-50">
//                     <select
//                         value={colorScheme}
//                         onChange={(e) => setColorScheme(e.target.value)}
//                         className="px-4 py-2 bg-black bg-opacity-50 text-white rounded-lg border border-white border-opacity-20 backdrop-blur-sm"
//                     >
//                         {Object.entries(colorSchemes).map(([key, scheme]) => (
//                             <option key={key} value={key} className="bg-gray-900">
//                                 {scheme.name}
//                             </option>
//                         ))}
//                     </select>
//                 </div>

//                 {/* Header */}
//                 <div className="text-center mb-12 mt-8">
//                     <div className="flex justify-center mb-6">
//                         <div className={`p-4 bg-gradient-to-r ${currentScheme.accent} rounded-2xl shadow-lg`}>
//                             <Shield className="text-white" size={48}/>
//                         </div>
//                     </div>
//                     <h1 className={`text-6xl font-bold bg-gradient-to-r ${currentScheme.accent} bg-clip-text text-transparent mb-6`}>
//                         JWT Encoder/Decoder
//                     </h1>
//                     <p className={`${currentScheme.textSecondary} text-xl max-w-2xl mx-auto leading-relaxed`}>
//                         Securely encode and decode JSON Web Tokens with signature verification and advanced features
//                     </p>
//                 </div>

//                 {/* Tab Navigation */}
//                 <div className="flex justify-center gap-6 mb-12">
//                     <TabButton tab="decode" label="Decode JWT" icon={Unlock}/>
//                     <TabButton tab="encode" label="Encode JWT" icon={Lock}/>
//                 </div>

//                 {/* Main Content */}
//                 <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
//                     {/* Left Panel */}
//                     <div className="space-y-6">
//                         {activeTab === 'decode' ? (
//                             <>
//                                 {/* JWT Token Input */}
//                                 <div className={`${currentScheme.card} rounded-2xl p-8 shadow-xl border ${currentScheme.cardBorder} backdrop-blur-sm`}>
//                                     <div className="flex items-center justify-between mb-6">
//                                         <h2 className={`text-2xl font-bold flex items-center gap-3 ${currentScheme.text}`}>
//                                             <Code className={`${currentScheme.textSecondary}`} size={24}/>
//                                             JWT Token Input
//                                         </h2>
//                                         <button
//                                             onClick={() => setJwtToken(sampleJWT)}
//                                             className={`px-6 py-3 bg-gradient-to-r ${currentScheme.accentHover} text-white rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5`}
//                                         >
//                                             Load Sample
//                                         </button>
//                                     </div>
                                    
//                                     <div>
//                                         <label className={`block text-sm font-semibold ${currentScheme.textSecondary} mb-3`}>
//                                             Paste your JWT token here:
//                                         </label>
//                                         <div className="relative">
//                                             <textarea
//                                                 value={jwtToken}
//                                                 onChange={(e) => setJwtToken(e.target.value)}
//                                                 className={`w-full h-64 p-4 bg-black bg-opacity-30 border-2 ${currentScheme.cardBorder} rounded-xl resize-none font-mono text-sm ${currentScheme.text} focus:ring-2 focus:ring-opacity-50 transition-all duration-200 placeholder-opacity-50`}
//                                                 placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
//                                             />
//                                             <CopyButton
//                                                 text={jwtToken}
//                                                 copyKey="jwt-input"
//                                                 className="absolute top-3 right-3"
//                                             />
//                                         </div>
//                                         {errors.decode && (
//                                             <div className="flex items-center gap-3 text-red-400 text-sm mt-3 p-3 bg-red-900 bg-opacity-30 rounded-lg border border-red-700">
//                                                 <AlertCircle size={16}/>
//                                                 {errors.decode}
//                                             </div>
//                                         )}
//                                     </div>

//                                     {isValidJWT && (
//                                         <div className="space-y-3 mt-6">
//                                             <div className="flex items-center gap-3 text-green-400 text-sm p-3 bg-green-900 bg-opacity-30 rounded-lg border border-green-700">
//                                                 <Check size={16}/>
//                                                 Valid JWT format detected
//                                             </div>

//                                             {/* Token Status */}
//                                             {tokenExpiry && (
//                                                 <div className={`flex items-center gap-3 text-sm p-3 rounded-lg border ${
//                                                     isTokenExpired
//                                                         ? 'text-red-400 bg-red-900 bg-opacity-30 border-red-700'
//                                                         : 'text-green-400 bg-green-900 bg-opacity-30 border-green-700'
//                                                 }`}>
//                                                     <Clock size={16}/>
//                                                     Token {isTokenExpired ? 'expired' : 'expires'} on {formatTimestamp(tokenExpiry)}
//                                                 </div>
//                                             )}

//                                             {/* Signature Verification */}
//                                             {signatureValid !== null && (
//                                                 <div className={`flex items-center gap-3 text-sm p-3 rounded-lg border ${
//                                                     signatureValid
//                                                         ? 'text-green-400 bg-green-900 bg-opacity-30 border-green-700'
//                                                         : 'text-red-400 bg-red-900 bg-opacity-30 border-red-700'
//                                                 }`}>
//                                                     <Shield size={16}/>
//                                                     Signature {signatureValid ? 'verified' : 'invalid'}
//                                                 </div>
//                                             )}
//                                         </div>
//                                     )}
//                                 </div>

//                                 {/* Secret Key Section */}
//                                 <div className={`${currentScheme.secretSection} rounded-2xl p-8 shadow-xl border ${currentScheme.cardBorder}`}>
//                                     <div className="flex items-center justify-between mb-6">
//                                         <h2 className={`text-2xl font-bold flex items-center gap-3 ${currentScheme.text}`}>
//                                             <Key className={`${currentScheme.textSecondary}`} size={24}/>
//                                             Secret Key
//                                         </h2>
//                                         <button
//                                             onClick={generateRandomSecret}
//                                             className={`text-sm px-4 py-2 bg-gradient-to-r ${currentScheme.accent} hover:${currentScheme.accentHover} text-white rounded-lg transition-colors flex items-center gap-2`}
//                                             title="Generate random secret"
//                                         >
//                                             <RefreshCw size={16}/>
//                                             Generate
//                                         </button>
//                                     </div>
                                    
//                                     <div>
//                                         <label className={`block text-sm font-semibold ${currentScheme.textSecondary} mb-3`}>
//                                             Secret Key (for signature verification):
//                                         </label>
//                                         <div className="relative">
//                                             <input
//                                                 type={showSecret ? 'text' : 'password'}
//                                                 value={secretKey}
//                                                 onChange={(e) => setSecretKey(e.target.value)}
//                                                 className={`w-full p-4 pr-16 bg-black bg-opacity-30 border-2 ${currentScheme.cardBorder} rounded-xl font-mono text-sm ${currentScheme.text} focus:ring-2 focus:ring-opacity-50 transition-all duration-200 placeholder-opacity-50`}
//                                                 placeholder="Enter secret key to verify signature"
//                                             />
//                                             <button
//                                                 onClick={() => setShowSecret(!showSecret)}
//                                                 className={`absolute right-3 top-3 p-2 rounded-lg ${currentScheme.card} hover:opacity-80 ${currentScheme.textSecondary} transition-colors`}
//                                                 title={showSecret ? 'Hide secret' : 'Show secret'}
//                                             >
//                                                 {showSecret ? <EyeOff size={16}/> : <Eye size={16}/>}
//                                             </button>
//                                         </div>
//                                         <p className={`${currentScheme.textSecondary} text-sm mt-3 flex items-center gap-2`}>
//                                             <AlertCircle size={14}/>
//                                             Secret key generation is mandatory for proper JWT signature verification
//                                         </p>
//                                     </div>
//                                 </div>
//                             </>
//                         ) : (
//                             /* JWT Components for Encode */
//                             <div className={`${currentScheme.card} rounded-2xl p-8 shadow-xl border ${currentScheme.cardBorder}`}>
//                                 <div className="flex items-center justify-between mb-6">
//                                     <h2 className={`text-2xl font-bold flex items-center gap-3 ${currentScheme.text}`}>
//                                         <Code className={`${currentScheme.textSecondary}`} size={24}/>
//                                         JWT Components
//                                     </h2>
//                                 </div>

//                                 <div className="space-y-6">
//                                     {/* Header */}
//                                     <div>
//                                         <label className={`block text-sm font-semibold ${currentScheme.textSecondary} mb-3`}>
//                                             Header:
//                                         </label>
//                                         <div className="relative">
//                                             <textarea
//                                                 value={headerInput}
//                                                 onChange={(e) => setHeaderInput(e.target.value)}
//                                                 className={`w-full h-28 p-4 ${currentScheme.headerColors.bg} border-2 ${currentScheme.cardBorder} rounded-xl resize-none font-mono text-sm ${currentScheme.headerColors.text} focus:ring-2 focus:ring-opacity-50 transition-all duration-200`}
//                                             />
//                                             <CopyButton
//                                                 text={headerInput}
//                                                 copyKey="header-input"
//                                                 className="absolute top-3 right-3"
//                                             />
//                                         </div>
//                                     </div>

//                                     {/* Payload */}
//                                     <div>
//                                         <div className="flex items-center justify-between mb-3">
//                                             <label className={`block text-sm font-semibold ${currentScheme.textSecondary}`}>
//                                                 Payload:
//                                             </label>
//                                             <button
//                                                 onClick={updateTimestamps}
//                                                 className={`text-xs px-3 py-1 bg-gradient-to-r ${currentScheme.accent} hover:${currentScheme.accentHover} text-white rounded-lg transition-colors flex items-center gap-1`}
//                                                 title="Update iat and exp with current time"
//                                             >
//                                                 <Clock size={12}/>
//                                                 Update Timestamps
//                                             </button>
//                                         </div>
//                                         <div className="relative">
//                                             <textarea
//                                                 value={payloadInput}
//                                                 onChange={(e) => setPayloadInput(e.target.value)}
//                                                 className={`w-full h-36 p-4 ${currentScheme.payloadColors.bg} border-2 ${currentScheme.cardBorder} rounded-xl resize-none font-mono text-sm ${currentScheme.payloadColors.text} focus:ring-2 focus:ring-opacity-50 transition-all duration-200`}
//                                             />
//                                             <CopyButton
//                                                 text={payloadInput}
//                                                 copyKey="payload-input"
//                                                 className="absolute top-3 right-3"
//                                             />
//                                         </div>
//                                     </div>

//                                     {/* Secret Key */}
//                                     <div>
//                                         <div className="flex items-center justify-between mb-3">
//                                             <label className={`block text-sm font-semibold ${currentScheme.textSecondary} flex items-center gap-2`}>
//                                                 <Key size={16} className={`${currentScheme.textSecondary}`}/>
//                                                 Secret Key:
//                                             </label>
//                                             <button
//                                                 onClick={generateRandomSecret}
//                                                 className={`text-xs px-3 py-1 bg-gradient-to-r ${currentScheme.accent} hover:${currentScheme.accentHover} text-white rounded-lg transition-colors flex items-center gap-1`}
//                                                 title="Generate random secret"
//                                             >
//                                                 <RefreshCw size={12}/>
//                                                 Generate
//                                             </button>
//                                         </div>
//                                         <div className="relative">
//                                             <input
//                                                 type={showSecret ? 'text' : 'password'}
//                                                 value={secretKey}
//                                                 onChange={(e) => setSecretKey(e.target.value)}
//                                                 className={`w-full p-4 pr-16 ${currentScheme.signatureColors.bg} border-2 ${currentScheme.cardBorder} rounded-xl font-mono text-sm ${currentScheme.signatureColors.text} focus:ring-2 focus:ring-opacity-50 transition-all duration-200`}
//                                             />
//                                             <button
//                                                 onClick={() => setShowSecret(!showSecret)}
//                                                 className={`absolute right-3 top-3 p-2 rounded-lg ${currentScheme.card} hover:opacity-80 ${currentScheme.textSecondary} transition-colors`}
//                                                 title={showSecret ? 'Hide secret' : 'Show secret'}
//                                             >
//                                                 {showSecret ? <EyeOff size={16}/> : <Eye size={16}/>}
//                                             </button>
//                                         </div>
//                                         <p className={`${currentScheme.textSecondary} text-sm mt-2 flex items-center gap-2`}>
//                                             <AlertCircle size={14}/>
//                                             Secret key generation is mandatory
//                                         </p>
//                                     </div>

//                                     <button
//                                         onClick={encodeJWT}
//                                         className={`w-full py-4 bg-gradient-to-r ${currentScheme.generateButton} text-white rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5`}
//                                     >
//                                         <Zap size={20}/>
//                                         Generate JWT Token
//                                     </button>

//                                     {errors.encode && (
//                                         <div className="flex items-center gap-3 text-red-400 text-sm p-3 bg-red-900 bg-opacity-30 rounded-lg border border-red-700">
//                                             <AlertCircle size={16}/>
//                                             {errors.encode}
//                                         </div>
//                                     )}
//                                 </div>
//                             </div>
//                         )}
//                     </div>

//                     {/* Right Panel */}
//                     <div className="space-y-6">
//                         {activeTab === 'decode' ? (
//                             <>
//                                 {/* Header Section */}
//                                 <div className={`${currentScheme.card} rounded-2xl p-6 shadow-lg border ${currentScheme.cardBorder}`}>
//                                     <div className="flex items-center justify-between mb-4">
//                                         <h3 className={`text-lg font-bold ${currentScheme.text} flex items-center gap-2`}>
//                                             <div className={`w-3 h-3 ${currentScheme.headerColors.dot} rounded-full`}></div>
//                                             Header
//                                         </h3>
//                                         <CopyButton text={decodedHeader} copyKey="header"/>
//                                     </div>
//                                     <pre className={`${currentScheme.headerColors.bg} p-4 rounded-xl overflow-auto text-sm font-mono max-h-40 border ${currentScheme.cardBorder}`}>
//                                         <code className={`${currentScheme.headerColors.text}`}>{decodedHeader || 'No valid JWT token provided'}</code>
//                                     </pre>
//                                 </div>

//                                 {/* Payload Section */}
//                                 <div className={`${currentScheme.card} rounded-2xl p-6 shadow-lg border ${currentScheme.cardBorder}`}>
//                                     <div className="flex items-center justify-between mb-4">
//                                         <h3 className={`text-lg font-bold ${currentScheme.text} flex items-center gap-2`}>
//                                             <div className={`w-3 h-3 ${currentScheme.payloadColors.dot} rounded-full`}></div>
//                                             Payload
//                                         </h3>
//                                         <CopyButton text={decodedPayload} copyKey="payload"/>
//                                     </div>
//                                     <pre className={`${currentScheme.payloadColors.bg} p-4 rounded-xl overflow-auto text-sm font-mono max-h-40 border ${currentScheme.cardBorder}`}>
//                                         <code className={`${currentScheme.payloadColors.text}`}>{decodedPayload || 'No valid JWT token provided'}</code>
//                                     </pre>

//                                     {/* Payload Claims Info */}
//                                     {decodedPayload && (
//                                         <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
//                                             {(() => {
//                                                 try {
//                                                     const payload = JSON.parse(decodedPayload);
//                                                     return (
//                                                         <>
//                                                             {payload.iat && (
//                                                                 <div className={`p-2 ${currentScheme.card} bg-opacity-50 rounded-lg border ${currentScheme.cardBorder}`}>
//                                                                     <div className="flex items-center gap-1">
//                                                                         <Calendar size={12}/>
//                                                                         <span className={`font-semibold ${currentScheme.text}`}>Issued:</span>
//                                                                     </div>
//                                                                     <span className={`${currentScheme.textSecondary}`}>{formatTimestamp(payload.iat)}</span>
//                                                                 </div>
//                                                             )}
//                                                             {payload.exp && (
//                                                                 <div className={`p-2 ${currentScheme.card} bg-opacity-50 rounded-lg border ${currentScheme.cardBorder}`}>
//                                                                     <div className="flex items-center gap-1">
//                                                                         <Clock size={12}/>
//                                                                         <span className={`font-semibold ${currentScheme.text}`}>Expires:</span>
//                                                                     </div>
//                                                                     <span className={`${currentScheme.textSecondary}`}>{formatTimestamp(payload.exp)}</span>
//                                                                 </div>
//                                                             )}
//                                                         </>
//                                                     );
//                                                 } catch {
//                                                     return null;
//                                                 }
//                                             })()}
//                                         </div>
//                                     )}
//                                 </div>

//                                 {/* Signature Section */}
//                                 <div className={`${currentScheme.card} rounded-2xl p-6 shadow-lg border ${currentScheme.cardBorder}`}>
//                                     <div className="flex items-center justify-between mb-4">
//                                         <h3 className={`text-lg font-bold ${currentScheme.text} flex items-center gap-2`}>
//                                             <div className={`w-3 h-3 ${currentScheme.signatureColors.dot} rounded-full`}></div>
//                                             Signature
//                                         </h3>
//                                         <CopyButton text={signature} copyKey="signature"/>
//                                     </div>
//                                     <pre className={`${currentScheme.signatureColors.bg} p-4 rounded-xl overflow-auto text-sm font-mono border ${currentScheme.cardBorder}`}>
//                                         <code className={`${currentScheme.signatureColors.text} break-all`}>{signature || 'No valid JWT token provided'}</code>
//                                     </pre>
//                                     <div className={`mt-4 p-3 ${currentScheme.card} bg-opacity-50 rounded-lg border ${currentScheme.cardBorder}`}>
//                                         <p className={`${currentScheme.textSecondary} text-sm flex items-center gap-2`}>
//                                             <Shield size={16}/>
//                                             Enter your secret key above to verify signature integrity.
//                                         </p>
//                                     </div>
//                                 </div>

//                                 {/* Export Button */}
//                                 {jwtToken && (
//                                     <button
//                                         onClick={exportToken}
//                                         className={`w-full py-3 bg-gradient-to-r ${currentScheme.card} hover:opacity-80 ${currentScheme.text} rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2 shadow-lg`}
//                                     >
//                                         <Download size={18}/>
//                                         Export Token Data
//                                     </button>
//                                 )}
//                             </>
//                         ) : (
//                             /* Generated JWT Output */
//                             <div className={`bg-gradient-to-br ${currentScheme.generateButton.replace('hover:', '')} rounded-2xl p-6 shadow-lg border-2 ${currentScheme.cardBorder}`}>
//                                 <div className="flex items-center justify-between mb-4">
//                                     <h3 className="text-lg font-bold text-white flex items-center gap-2">
//                                         <Zap className="text-white" size={20}/>
//                                         Generated JWT Token
//                                     </h3>
//                                     <div className="flex gap-2">
//                                         <CopyButton text={jwtToken} copyKey="generated-jwt"/>
//                                         {jwtToken && (
//                                             <button
//                                                 onClick={exportToken}
//                                                 className="p-2 rounded-lg bg-white bg-opacity-20 hover:bg-opacity-30 text-white transition-all duration-200"
//                                                 title="Export token data"
//                                             >
//                                                 <Download size={16}/>
//                                             </button>
//                                         )}
//                                     </div>
//                                 </div>
//                                 <div className="bg-black bg-opacity-30 p-6 rounded-xl border border-white border-opacity-20 min-h-96">
//                                     <code className="text-white break-all font-mono text-sm leading-relaxed">
//                                         {jwtToken || 'Click "Generate JWT Token" to create a new token'}
//                                     </code>
//                                 </div>
//                                 {jwtToken && (
//                                     <div className="mt-4 p-4 bg-white bg-opacity-20 rounded-xl border border-white border-opacity-20">
//                                         <p className="text-white flex items-center gap-2 font-medium">
//                                             <Check size={18}/>
//                                             JWT token generated successfully! Ready for authentication.
//                                         </p>
//                                     </div>
//                                 )}
//                             </div>
//                         )}
//                     </div>
//                 </div>

                
//             </div>
//             {/* Compact About JWT Section */}
//                 <div className={`${currentScheme.card} rounded-2xl p-6 shadow-xl border ${currentScheme.cardBorder}`}>
//                     <h3 className={`text-2xl font-bold mb-4 ${currentScheme.text} flex items-center gap-3`}>
//                         <Shield className={`${currentScheme.textSecondary}`} size={28}/>
//                         About JWT (JSON Web Token)
//                     </h3>
//                     <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//                         <div className="lg:col-span-2">
//                             <p className={`${currentScheme.textSecondary} leading-relaxed mb-4`}>
//                                 <strong className={`${currentScheme.text}`}>JSON Web Token (JWT)</strong> is a compact, URL-safe means of representing claims between two parties securely. It's an open standard (RFC 7519) for transmitting information as a JSON object.
//                             </p>
//                             <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
//                                 <div className={`p-3 ${currentScheme.headerColors.bg} rounded-lg border ${currentScheme.cardBorder}`}>
//                                     <div className="flex items-center gap-2 mb-2">
//                                         <div className={`w-3 h-3 ${currentScheme.headerColors.dot} rounded-full`}></div>
//                                         <strong className={`${currentScheme.text}`}>Header</strong>
//                                     </div>
//                                     <p className={`text-xs ${currentScheme.textSecondary}`}>Token type and signing algorithm</p>
//                                 </div>
//                                 <div className={`p-3 ${currentScheme.payloadColors.bg} rounded-lg border ${currentScheme.cardBorder}`}>
//                                     <div className="flex items-center gap-2 mb-2">
//                                         <div className={`w-3 h-3 ${currentScheme.payloadColors.dot} rounded-full`}></div>
//                                         <strong className={`${currentScheme.text}`}>Payload</strong>
//                                     </div>
//                                     <p className={`text-xs ${currentScheme.textSecondary}`}>Claims and user data</p>
//                                 </div>
//                                 <div className={`p-3 ${currentScheme.signatureColors.bg} rounded-lg border ${currentScheme.cardBorder}`}>
//                                     <div className="flex items-center gap-2 mb-2">
//                                         <div className={`w-3 h-3 ${currentScheme.signatureColors.dot} rounded-full`}></div>
//                                         <strong className={`${currentScheme.text}`}>Signature</strong>
//                                     </div>
//                                     <p className={`text-xs ${currentScheme.textSecondary}`}>Verifies integrity and authenticity</p>
//                                 </div>
//                             </div>
//                         </div>
                        
//                     </div>
//                 </div>
                
//         </div>
//     );
// };

// export default JWTPage;


     

// "use client";
// import React, {useEffect, useState} from "react";
// import {
//     AlertCircle,
//     Calendar,
//     Check,
//     Clock,
//     Code,
//     Copy,
//     Download,
//     Eye,
//     EyeOff,
//     Key,
//     Lock,
//     RefreshCw,
//     Shield,
//     Unlock,
//     Zap,
//     Sun,
//     Moon
// } from "lucide-react";

// const JWTPage = () => {
//     const [isDarkMode, setIsDarkMode] = useState(true);
//     const [jwtToken, setJwtToken] = useState('');
//     const [decodedHeader, setDecodedHeader] = useState('');
//     const [decodedPayload, setDecodedPayload] = useState('');
//     const [signature, setSignature] = useState('');
//     const [headerInput, setHeaderInput] = useState('{\n  "alg": "HS256",\n  "typ": "JWT"\n}');
//     const [payloadInput, setPayloadInput] = useState('{\n  "sub": "1234567890",\n  "name": "John Doe",\n  "iat": 1516239022,\n  "exp": 1735689600\n}');
//     const [secretKey, setSecretKey] = useState('your-256-bit-secret');
//     const [showSecret, setShowSecret] = useState(false);
//     const [activeTab, setActiveTab] = useState('decode');
//     const [copyStates, setCopyStates] = useState({});
//     const [errors, setErrors] = useState({});
//     const [isValidJWT, setIsValidJWT] = useState(false);
//     const [tokenExpiry, setTokenExpiry] = useState(null);
//     const [isTokenExpired, setIsTokenExpired] = useState(false);
//     const [signatureValid, setSignatureValid] = useState(null);

//     // Clean theme system
//     const theme = isDarkMode ? {
//         // Dark theme
//         background: "from-gray-900 via-gray-800 to-indigo-900",
//         card: "bg-slate-800 border-slate-600",
//         text: "text-white",
//         textSecondary: "text-gray-300",
//         input: "bg-slate-900 border-slate-600 text-white placeholder-gray-400",
//         accent: "bg-blue-600 hover:bg-blue-700",
//         headerBg: "bg-slate-700",
//         payloadBg: "bg-gray-700", 
//         signatureBg: "bg-zinc-700",
//         headerText: "text-slate-200",
//         payloadText: "text-gray-200",
//         signatureText: "text-zinc-200"
//     } : {
//         // Light theme
//         background: "from-gray-50 to-gray-100",
//         card: "bg-white border-gray-200 shadow-sm",
//         text: "text-gray-900",
//         textSecondary: "text-gray-600",
//         input: "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500",
//         accent: "bg-blue-600 hover:bg-blue-700",
//         headerBg: "bg-blue-50",
//         payloadBg: "bg-green-50",
//         signatureBg: "bg-purple-50", 
//         headerText: "text-blue-900",
//         payloadText: "text-green-900",
//         signatureText: "text-purple-900"
//     };

//     // Sample JWT for demo
//     const sampleJWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjE3MzU2ODk2MDB9.kP_DQyZdBcVfOGaB8Q3lE7-PRLJXrOxcOw7D5tlA7Ok';

//     // Base64 URL encode/decode functions
//     const base64UrlEncode = (str) => {
//         return btoa(str)
//             .replace(/\+/g, '-')
//             .replace(/\//g, '_')
//             .replace(/=/g, '');
//     };

//     const base64UrlDecode = (str) => {
//         let padding = str.length % 4;
//         if (padding) {
//             str += '='.repeat(4 - padding);
//         }
//         return atob(str.replace(/-/g, '+').replace(/_/g, '/'));
//     };

//     // HMAC SHA256 implementation
//     const hmacSHA256 = async (message, secret) => {
//         const encoder = new TextEncoder();
//         const key = await crypto.subtle.importKey(
//             'raw',
//             encoder.encode(secret),
//             {name: 'HMAC', hash: 'SHA-256'},
//             false,
//             ['sign']
//         );
//         const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(message));
//         return base64UrlEncode(String.fromCharCode(...new Uint8Array(signature)));
//     };

//     // Verify JWT signature
//     const verifySignature = async (token, secret) => {
//         try {
//             const parts = token.split('.');
//             if (parts.length !== 3) return false;

//             const message = `${parts[0]}.${parts[1]}`;
//             const expectedSignature = await hmacSHA256(message, secret);
//             return parts[2] === expectedSignature;
//         } catch (error) {
//             return false;
//         }
//     };

//     // Generate random secret
//     const generateRandomSecret = () => {
//         const array = new Uint8Array(32);
//         crypto.getRandomValues(array);
//         const secret = Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
//         setSecretKey(secret);
//     };

//     // Update payload with current timestamp
//     const updateTimestamps = () => {
//         try {
//             const payload = JSON.parse(payloadInput);
//             const now = Math.floor(Date.now() / 1000);
//             payload.iat = now;
//             payload.exp = now + 3600; // Expires in 1 hour
//             setPayloadInput(JSON.stringify(payload, null, 2));
//         } catch (error) {
//             // Handle silently
//         }
//     };

//     // Format timestamp for display
//     const formatTimestamp = (timestamp) => {
//         if (!timestamp) return 'N/A';
//         try {
//             const date = new Date(timestamp * 1000);
//             return date.toLocaleString();
//         } catch {
//             return 'Invalid';
//         }
//     };

//     // Check token expiry
//     const checkTokenExpiry = (payload) => {
//         try {
//             const payloadObj = JSON.parse(payload);
//             if (payloadObj.exp) {
//                 const now = Math.floor(Date.now() / 1000);
//                 setTokenExpiry(payloadObj.exp);
//                 setIsTokenExpired(now > payloadObj.exp);
//             } else {
//                 setTokenExpiry(null);
//                 setIsTokenExpired(false);
//             }
//         } catch {
//             setTokenExpiry(null);
//             setIsTokenExpired(false);
//         }
//     };

//     // Decode JWT
//     const decodeJWT = async (token) => {
//         try {
//             const parts = token.split('.');
//             if (parts.length !== 3) {
//                 setErrors({decode: 'Invalid JWT format. JWT should have 3 parts separated by dots.'});
//                 setIsValidJWT(false);
//                 setSignatureValid(null);
//                 return;
//             }

//             const header = JSON.parse(base64UrlDecode(parts[0]));
//             const payload = JSON.parse(base64UrlDecode(parts[1]));
//             const sig = parts[2];

//             const formattedHeader = JSON.stringify(header, null, 2);
//             const formattedPayload = JSON.stringify(payload, null, 2);

//             setDecodedHeader(formattedHeader);
//             setDecodedPayload(formattedPayload);
//             setSignature(sig);
//             setIsValidJWT(true);
//             setErrors({});

//             checkTokenExpiry(formattedPayload);

//             // Verify signature if we have a secret key
//             if (secretKey && secretKey !== 'your-256-bit-secret') {
//                 const isValid = await verifySignature(token, secretKey);
//                 setSignatureValid(isValid);
//             } else {
//                 setSignatureValid(null);
//             }
//         } catch (error) {
//             setErrors({decode: 'Invalid JWT token. Please check the format.'});
//             setIsValidJWT(false);
//             setSignatureValid(null);
//         }
//     };

//     // Encode JWT
//     const encodeJWT = async () => {
//         try {
//             const header = JSON.parse(headerInput);
//             const payload = JSON.parse(payloadInput);

//             const headerEncoded = base64UrlEncode(JSON.stringify(header));
//             const payloadEncoded = base64UrlEncode(JSON.stringify(payload));
//             const message = `${headerEncoded}.${payloadEncoded}`;

//             const sig = await hmacSHA256(message, secretKey);
//             const token = `${message}.${sig}`;

//             setJwtToken(token);
//             setErrors({});

//             // Auto-decode the generated token
//             await decodeJWT(token);
//         } catch (error) {
//             setErrors({encode: 'Invalid JSON format in header or payload.'});
//         }
//     };

//     // Export token to file
//     const exportToken = () => {
//         const data = {
//             token: jwtToken,
//             header: decodedHeader,
//             payload: decodedPayload,
//             signature: signature,
//             created: new Date().toISOString()
//         };

//         const blob = new Blob([JSON.stringify(data, null, 2)], {type: 'application/json'});
//         const url = URL.createObjectURL(blob);
//         const a = document.createElement('a');
//         a.href = url;
//         a.download = 'jwt-token.json';
//         a.click();
//         URL.revokeObjectURL(url);
//     };

//     // Copy to clipboard
//     const copyToClipboard = async (text, key) => {
//         try {
//             await navigator.clipboard.writeText(text);
//             setCopyStates({...copyStates, [key]: true});
//             setTimeout(() => setCopyStates({...copyStates, [key]: false}), 2000);
//         } catch (err) {
//             console.error('Failed to copy: ', err);
//         }
//     };

//     // Auto-decode when JWT token changes
//     useEffect(() => {
//         if (jwtToken && activeTab === 'decode') {
//             decodeJWT(jwtToken);
//         }
//     }, [jwtToken, activeTab, secretKey]);

//     // Load sample JWT on mount
//     useEffect(() => {
//         setJwtToken(sampleJWT);
//     }, []);

//     const TabButton = ({tab, label, icon: Icon}) => (
//         <button
//             onClick={() => setActiveTab(tab)}
//             className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
//                 activeTab === tab
//                     ? `${theme.accent} text-white`
//                     : `${theme.card} ${theme.text}`
//             }`}
//         >
//             <Icon size={18}/>
//             {label}
//         </button>
//     );

//     const CopyButton = ({text, copyKey}) => (
//         <button
//             onClick={() => copyToClipboard(text, copyKey)}
//             className={`p-2 rounded ${theme.card} ${theme.textSecondary} hover:opacity-70 transition-opacity`}
//             title="Copy to clipboard"
//         >
//             {copyStates[copyKey] ? <Check size={16} className="text-green-500"/> : <Copy size={16}/>}
//         </button>
//     );

//     return (
//         <div className={`min-h-screen bg-gradient-to-br ${theme.background} ${theme.text} p-6`}> 
//             <div className="max-w-6xl mx-auto">
//                 {/* Theme Toggle */}
//                 <div className="fixed top-4 right-4 z-50">
//                     <button
//                         onClick={() => setIsDarkMode(!isDarkMode)}
//                         className={`p-3 rounded-lg ${theme.card} ${theme.text} transition-colors flex items-center gap-2`}
//                     >
//                         {isDarkMode ? <Sun size={18}/> : <Moon size={18}/>}
//                         {isDarkMode ? 'Light' : 'Dark'}
//                     </button>
//                 </div>

//                 {/* Header */}
//                 <div className="text-center mb-10">
//                     <div className="flex justify-center mb-4">
//                         <div className={`p-3 ${theme.accent} rounded-xl`}>
//                             <Shield className="text-white" size={32}/>
//                         </div>
//                     </div>
//                     <h1 className="text-4xl font-bold mb-3">JWT Encoder/Decoder</h1>
//                     <p className={`${theme.textSecondary} text-lg max-w-2xl mx-auto`}>
//                         Securely encode and decode JSON Web Tokens with signature verification
//                     </p>
//                 </div>

//                 {/* Tab Navigation */}
//                 <div className="flex justify-center gap-4 mb-8">
//                     <TabButton tab="decode" label="Decode JWT" icon={Unlock}/>
//                     <TabButton tab="encode" label="Encode JWT" icon={Lock}/>
//                 </div>

//                 {/* Main Content */}
//                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
//                     {/* Left Panel */}
//                     <div className="space-y-6">
//                         {activeTab === 'decode' ? (
//                             <>
//                                 {/* JWT Token Input */}
//                                 <div className={`${theme.card} rounded-xl p-6`}>
//                                     <div className="flex items-center justify-between mb-4">
//                                         <h2 className={`text-xl font-semibold flex items-center gap-2 ${theme.text}`}>
//                                             <Code size={20}/>
//                                             JWT Token Input
//                                         </h2>
//                                         <button
//                                             onClick={() => setJwtToken(sampleJWT)}
//                                             className={`px-4 py-2 ${theme.accent} text-white rounded-lg font-medium transition-colors`}
//                                         >
//                                             Load Sample
//                                         </button>
//                                     </div>
                                    
//                                     <div>
//                                         <label className={`block text-sm font-medium ${theme.textSecondary} mb-2`}>
//                                             Paste your JWT token here:
//                                         </label>
//                                         <div className="relative">
//                                             <textarea
//                                                 value={jwtToken}
//                                                 onChange={(e) => setJwtToken(e.target.value)}
//                                                 className={`w-full h-48 p-3 ${theme.input} rounded-lg resize-none font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
//                                                 placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
//                                             />
//                                             <div className="absolute top-2 right-2">
//                                                 <CopyButton text={jwtToken} copyKey="jwt-input"/>
//                                             </div>
//                                         </div>
//                                         {errors.decode && (
//                                             <div className="flex items-center gap-2 text-red-500 text-sm mt-2 p-2 bg-red-50 rounded">
//                                                 <AlertCircle size={14}/>
//                                                 {errors.decode}
//                                             </div>
//                                         )}
//                                     </div>

//                                     {isValidJWT && (
//                                         <div className="space-y-2 mt-4">
//                                             <div className="flex items-center gap-2 text-green-600 text-sm p-2 bg-green-50 rounded">
//                                                 <Check size={14}/>
//                                                 Valid JWT format detected
//                                             </div>

//                                             {tokenExpiry && (
//                                                 <div className={`flex items-center gap-2 text-sm p-2 rounded ${
//                                                     isTokenExpired
//                                                         ? 'text-red-600 bg-red-50'
//                                                         : 'text-green-600 bg-green-50'
//                                                 }`}>
//                                                     <Clock size={14}/>
//                                                     Token {isTokenExpired ? 'expired' : 'expires'} on {formatTimestamp(tokenExpiry)}
//                                                 </div>
//                                             )}

//                                             {signatureValid !== null && (
//                                                 <div className={`flex items-center gap-2 text-sm p-2 rounded ${
//                                                     signatureValid
//                                                         ? 'text-green-600 bg-green-50'
//                                                         : 'text-red-600 bg-red-50'
//                                                 }`}>
//                                                     <Shield size={14}/>
//                                                     Signature {signatureValid ? 'verified' : 'invalid'}
//                                                 </div>
//                                             )}
//                                         </div>
//                                     )}
//                                 </div>

//                                 {/* Secret Key Section */}
//                                 <div className={`${theme.card} rounded-xl p-6`}>
//                                     <div className="flex items-center justify-between mb-4">
//                                         <h2 className={`text-xl font-semibold flex items-center gap-2 ${theme.text}`}>
//                                             <Key size={20}/>
//                                             Secret Key
//                                         </h2>
//                                         <button
//                                             onClick={generateRandomSecret}
//                                             className={`text-sm px-3 py-1 ${theme.accent} text-white rounded transition-colors flex items-center gap-1`}
//                                             title="Generate random secret"
//                                         >
//                                             <RefreshCw size={14}/>
//                                             Generate
//                                         </button>
//                                     </div>
                                    
//                                     <div>
//                                         <label className={`block text-sm font-medium ${theme.textSecondary} mb-2`}>
//                                             Secret Key (for signature verification):
//                                         </label>
//                                         <div className="relative">
//                                             <input
//                                                 type={showSecret ? 'text' : 'password'}
//                                                 value={secretKey}
//                                                 onChange={(e) => setSecretKey(e.target.value)}
//                                                 className={`w-full p-3 pr-12 ${theme.input} rounded-lg font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
//                                                 placeholder="Enter secret key to verify signature"
//                                             />
//                                             <button
//                                                 onClick={() => setShowSecret(!showSecret)}
//                                                 className={`absolute right-3 top-3 ${theme.textSecondary} hover:opacity-70 transition-opacity`}
//                                                 title={showSecret ? 'Hide secret' : 'Show secret'}
//                                             >
//                                                 {showSecret ? <EyeOff size={16}/> : <Eye size={16}/>}
//                                             </button>
//                                         </div>
//                                         <p className={`${theme.textSecondary} text-xs mt-2 flex items-center gap-1`}>
//                                             <AlertCircle size={12}/>
//                                             Secret key is required for signature verification
//                                         </p>
//                                     </div>
//                                 </div>
//                             </>
//                         ) : (
//                             /* JWT Components for Encode */
//                             <div className={`${theme.card} rounded-xl p-6`}>
//                                 <div className="flex items-center justify-between mb-4">
//                                     <h2 className={`text-xl font-semibold flex items-center gap-2 ${theme.text}`}>
//                                         <Code size={20}/>
//                                         JWT Components
//                                     </h2>
//                                 </div>

//                                 <div className="space-y-4">
//                                     {/* Header */}
//                                     <div>
//                                         <label className={`block text-sm font-medium ${theme.textSecondary} mb-2`}>
//                                             Header:
//                                         </label>
//                                         <div className="relative">
//                                             <textarea
//                                                 value={headerInput}
//                                                 onChange={(e) => setHeaderInput(e.target.value)}
//                                                 className={`w-full h-24 p-3 ${theme.input} rounded-lg resize-none font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
//                                             />
//                                             <div className="absolute top-2 right-2">
//                                                 <CopyButton text={headerInput} copyKey="header-input"/>
//                                             </div>
//                                         </div>
//                                     </div>

//                                     {/* Payload */}
//                                     <div>
//                                         <div className="flex items-center justify-between mb-2">
//                                             <label className={`block text-sm font-medium ${theme.textSecondary}`}>
//                                                 Payload:
//                                             </label>
//                                             <button
//                                                 onClick={updateTimestamps}
//                                                 className={`text-xs px-2 py-1 ${theme.accent} text-white rounded transition-colors flex items-center gap-1`}
//                                                 title="Update timestamps"
//                                             >
//                                                 <Clock size={12}/>
//                                                 Update
//                                             </button>
//                                         </div>
//                                         <div className="relative">
//                                             <textarea
//                                                 value={payloadInput}
//                                                 onChange={(e) => setPayloadInput(e.target.value)}
//                                                 className={`w-full h-32 p-3 ${theme.input} rounded-lg resize-none font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
//                                             />
//                                             <div className="absolute top-2 right-2">
//                                                 <CopyButton text={payloadInput} copyKey="payload-input"/>
//                                             </div>
//                                         </div>
//                                     </div>

//                                     {/* Secret Key */}
//                                     <div>
//                                         <div className="flex items-center justify-between mb-2">
//                                             <label className={`block text-sm font-medium ${theme.textSecondary} flex items-center gap-1`}>
//                                                 <Key size={14}/>
//                                                 Secret Key:
//                                             </label>
//                                             <button
//                                                 onClick={generateRandomSecret}
//                                                 className={`text-xs px-2 py-1 ${theme.accent} text-white rounded transition-colors flex items-center gap-1`}
//                                                 title="Generate random secret"
//                                             >
//                                                 <RefreshCw size={12}/>
//                                                 Generate
//                                             </button>
//                                         </div>
//                                         <div className="relative">
//                                             <input
//                                                 type={showSecret ? 'text' : 'password'}
//                                                 value={secretKey}
//                                                 onChange={(e) => setSecretKey(e.target.value)}
//                                                 className={`w-full p-3 pr-12 ${theme.input} rounded-lg font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
//                                             />
//                                             <button
//                                                 onClick={() => setShowSecret(!showSecret)}
//                                                 className={`absolute right-3 top-3 ${theme.textSecondary} hover:opacity-70 transition-opacity`}
//                                                 title={showSecret ? 'Hide secret' : 'Show secret'}
//                                             >
//                                                 {showSecret ? <EyeOff size={16}/> : <Eye size={16}/>}
//                                             </button>
//                                         </div>
//                                     </div>

//                                     <button
//                                         onClick={encodeJWT}
//                                         className={`w-full py-3 ${theme.accent} text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2`}
//                                     >
//                                         <Zap size={18}/>
//                                         Generate JWT Token
//                                     </button>

//                                     {errors.encode && (
//                                         <div className="flex items-center gap-2 text-red-500 text-sm p-2 bg-red-50 rounded">
//                                             <AlertCircle size={14}/>
//                                             {errors.encode}
//                                         </div>
//                                     )}
//                                 </div>
//                             </div>
//                         )}
//                     </div>

//                     {/* Right Panel */}
//                     <div className="space-y-6">
//                         {activeTab === 'decode' ? (
//                             <>
//                                 {/* Header Section */}
//                                 <div className={`${theme.card} rounded-xl p-4`}>
//                                     <div className="flex items-center justify-between mb-3">
//                                         <h3 className={`font-medium ${theme.text} flex items-center gap-2`}>
//                                             <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
//                                             Header
//                                         </h3>
//                                         <CopyButton text={decodedHeader} copyKey="header"/>
//                                     </div>
//                                     <pre className={`${theme.headerBg} p-3 rounded-lg overflow-auto text-sm font-mono max-h-32`}>
//                                         <code className={`${theme.headerText}`}>{decodedHeader || 'No valid JWT token provided'}</code>
//                                     </pre>
//                                 </div>

//                                 {/* Payload Section */}
//                                 <div className={`${theme.card} rounded-xl p-4`}>
//                                     <div className="flex items-center justify-between mb-3">
//                                         <h3 className={`font-medium ${theme.text} flex items-center gap-2`}>
//                                             <div className="w-2 h-2 bg-green-500 rounded-full"></div>
//                                             Payload
//                                         </h3>
//                                         <CopyButton text={decodedPayload} copyKey="payload"/>
//                                     </div>
//                                     <pre className={`${theme.payloadBg} p-3 rounded-lg overflow-auto text-sm font-mono max-h-32`}>
//                                         <code className={`${theme.payloadText}`}>{decodedPayload || 'No valid JWT token provided'}</code>
//                                     </pre>

//                                     {/* Payload Claims Info */}
//                                     {decodedPayload && (
//                                         <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
//                                             {(() => {
//                                                 try {
//                                                     const payload = JSON.parse(decodedPayload);
//                                                     return (
//                                                         <>
//                                                             {payload.iat && (
//                                                                 <div className={`p-2 ${theme.card} rounded border-l-2 border-blue-500`}>
//                                                                     <div className="flex items-center gap-1">
//                                                                         <Calendar size={10}/>
//                                                                         <span className={`font-medium ${theme.text}`}>Issued:</span>
//                                                                     </div>
//                                                                     <span className={`${theme.textSecondary}`}>{formatTimestamp(payload.iat)}</span>
//                                                                 </div>
//                                                             )}
//                                                             {payload.exp && (
//                                                                 <div className={`p-2 ${theme.card} rounded border-l-2 border-green-500`}>
//                                                                     <div className="flex items-center gap-1">
//                                                                         <Clock size={10}/>
//                                                                         <span className={`font-medium ${theme.text}`}>Expires:</span>
//                                                                     </div>
//                                                                     <span className={`${theme.textSecondary}`}>{formatTimestamp(payload.exp)}</span>
//                                                                 </div>
//                                                             )}
//                                                         </>
//                                                     );
//                                                 } catch {
//                                                     return null;
//                                                 }
//                                             })()}
//                                         </div>
//                                     )}
//                                 </div>

//                                 {/* Signature Section */}
//                                 <div className={`${theme.card} rounded-xl p-4`}>
//                                     <div className="flex items-center justify-between mb-3">
//                                         <h3 className={`font-medium ${theme.text} flex items-center gap-2`}>
//                                             <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
//                                             Signature
//                                         </h3>
//                                         <CopyButton text={signature} copyKey="signature"/>
//                                     </div>
//                                     <pre className={`${theme.signatureBg} p-3 rounded-lg overflow-auto text-sm font-mono`}>
//                                         <code className={`${theme.signatureText} break-all`}>{signature || 'No valid JWT token provided'}</code>
//                                     </pre>
//                                     <div className={`mt-3 p-2 ${theme.card} border-l-2 border-yellow-500 rounded`}>
//                                         <p className={`${theme.textSecondary} text-xs flex items-center gap-1`}>
//                                             <Shield size={12}/>
//                                             Enter your secret key above to verify signature integrity.
//                                         </p>
//                                     </div>
//                                 </div>

//                                 {/* Export Button */}
//                                 {jwtToken && (
//                                     <button
//                                         onClick={exportToken}
//                                         className={`w-full py-2 ${theme.card} ${theme.text} rounded-lg font-medium transition-colors flex items-center justify-center gap-2`}
//                                     >
//                                         <Download size={16}/>
//                                         Export Token Data
//                                     </button>
//                                 )}
//                             </>
//                         ) : (
//                             /* Generated JWT Output */
//                             <div className={`${theme.card} rounded-xl p-6`}>
//                                 <div className="flex items-center justify-between mb-4">
//                                     <h3 className={`font-medium ${theme.text} flex items-center gap-2`}>
//                                         <Zap size={18}/>
//                                         Generated JWT Token
//                                     </h3>
//                                     <div className="flex gap-2">
//                                         <CopyButton text={jwtToken} copyKey="generated-jwt"/>
//                                         {jwtToken && (
//                                             <button
//                                                 onClick={exportToken}
//                                                 className={`p-2 rounded ${theme.card} ${theme.textSecondary} hover:opacity-70 transition-opacity`}
//                                                 title="Export token data"
//                                             >
//                                                 <Download size={16}/>
//                                             </button>
//                                         )}
//                                     </div>
//                                 </div>
//                                 <div className={`${theme.input} p-4 rounded-lg min-h-80 border-2 border-dashed ${isDarkMode ? 'border-gray-600' : 'border-gray-300'}`}>
//                                     <code className={`${theme.text} break-all font-mono text-sm leading-relaxed`}>
//                                         {jwtToken || 'Click "Generate JWT Token" to create a new token'}
//                                     </code>
//                                 </div>
//                                 {jwtToken && (
//                                     <div className="mt-3 p-3 bg-green-50 rounded-lg">
//                                         <p className="text-green-700 flex items-center gap-2 font-medium text-sm">
//                                             <Check size={16}/>
//                                             JWT token generated successfully!
//                                         </p>
//                                     </div>
//                                 )}
//                             </div>
//                         )}
//                     </div>
//                 </div>

//                 {/* About JWT Section */}
//                 <div className={`${theme.card} rounded-xl p-6`}>
//                     <h3 className={`text-xl font-semibold mb-4 ${theme.text} flex items-center gap-2`}>
//                         <Shield size={20}/>
//                         About JWT (JSON Web Token)
//                     </h3>
//                     <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//                         <div className="lg:col-span-2">
//                             <p className={`${theme.textSecondary} leading-relaxed mb-4`}>
//                                 <strong className={`${theme.text}`}>JSON Web Token (JWT)</strong> is a compact, URL-safe means of representing claims between two parties securely. It's an open standard (RFC 7519) for transmitting information as a JSON object.
//                             </p>
//                             <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
//                                 <div className={`p-3 ${theme.headerBg} rounded-lg border-l-4 border-blue-500`}>
//                                     <div className="flex items-center gap-2 mb-2">
//                                         <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
//                                         <strong className={`${theme.text} text-sm`}>Header</strong>
//                                     </div>
//                                     <p className={`text-xs ${theme.textSecondary}`}>Token type and signing algorithm</p>
//                                 </div>
//                                 <div className={`p-3 ${theme.payloadBg} rounded-lg border-l-4 border-green-500`}>
//                                     <div className="flex items-center gap-2 mb-2">
//                                         <div className="w-2 h-2 bg-green-500 rounded-full"></div>
//                                         <strong className={`${theme.text} text-sm`}>Payload</strong>
//                                     </div>
//                                     <p className={`text-xs ${theme.textSecondary}`}>Claims and user data</p>
//                                 </div>
//                                 <div className={`p-3 ${theme.signatureBg} rounded-lg border-l-4 border-purple-500`}>
//                                     <div className="flex items-center gap-2 mb-2">
//                                         <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
//                                         <strong className={`${theme.text} text-sm`}>Signature</strong>
//                                     </div>
//                                     <p className={`text-xs ${theme.textSecondary}`}>Verifies integrity and authenticity</p>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className={`${theme.card} ${isDarkMode ? 'bg-opacity-50' : 'bg-gray-50'} rounded-lg p-4`}>
//                             <h4 className={`font-medium ${theme.text} mb-3 flex items-center gap-2`}>
//                                 <AlertCircle size={16}/>
//                                 Security Tips:
//                             </h4>
//                             <ul className={`space-y-1 text-sm ${theme.textSecondary}`}>
//                                 <li>• Use strong secret keys</li>
//                                 <li>• Set expiration times</li>
//                                 <li>• Validate on every request</li>
//                                 <li>• Use HTTPS in production</li>
//                                 <li>• Never store sensitive data in payload</li>
//                             </ul>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default JWTPage;













// "use client";
// import React, {useEffect, useState} from "react";
// import {
//     AlertCircle,
//     Calendar,
//     Check,
//     Clock,
//     Code,
//     Copy,
//     Download,
//     Eye,
//     EyeOff,
//     Key,
//     Lock,
//     RefreshCw,
//     Shield,
//     Unlock,
//     Zap,
//     Sun,
//     Moon
// } from "lucide-react";

// const JWTPage = () => {
//     const [isDarkMode, setIsDarkMode] = useState(true);
//     const [jwtToken, setJwtToken] = useState('');
//     const [decodedHeader, setDecodedHeader] = useState('');
//     const [decodedPayload, setDecodedPayload] = useState('');
//     const [signature, setSignature] = useState('');
//     const [headerInput, setHeaderInput] = useState('{\n  "alg": "HS256",\n  "typ": "JWT"\n}');
//     const [payloadInput, setPayloadInput] = useState('{\n  "sub": "1234567890",\n  "name": "John Doe",\n  "iat": 1516239022,\n  "exp": 1735689600\n}');
//     const [secretKey, setSecretKey] = useState('your-256-bit-secret');
//     const [showSecret, setShowSecret] = useState(false);
//     const [activeTab, setActiveTab] = useState('decode');
//     const [copyStates, setCopyStates] = useState({});
//     const [errors, setErrors] = useState({});
//     const [isValidJWT, setIsValidJWT] = useState(false);
//     const [tokenExpiry, setTokenExpiry] = useState(null);
//     const [isTokenExpired, setIsTokenExpired] = useState(false);
//     const [signatureValid, setSignatureValid] = useState(null);

//     // Clean theme system
//     const theme = isDarkMode ? {
//         // Dark theme
//         background: "from-gray-900 via-gray-800 to-indigo-900",
//         card: "bg-slate-800 border-slate-600",
//         text: "text-white",
//         textSecondary: "text-gray-300",
//         input: "bg-slate-900 border-slate-600 text-white placeholder-gray-400",
//         accent: "bg-slate-600 hover:bg-slate-700",
//         headerBg: "bg-slate-700",
//         payloadBg: "bg-gray-700", 
//         signatureBg: "bg-zinc-700",
//         headerText: "text-slate-200",
//         payloadText: "text-gray-200",
//         signatureText: "text-zinc-200"
//     } : {
//         // Light theme
//         background: "from-gray-50 to-gray-100",
//         card: "bg-white border-gray-200 shadow-sm",
//         text: "text-gray-900",
//         textSecondary: "text-gray-600",
//         input: "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500",
//         accent: "bg-blue-600 hover:bg-blue-700",
//         headerBg: "bg-blue-50",
//         payloadBg: "bg-green-50",
//         signatureBg: "bg-purple-50", 
//         headerText: "text-blue-900",
//         payloadText: "text-green-900",
//         signatureText: "text-purple-900"
//     };

//     // Sample JWT for demo
//     const sampleJWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjE3MzU2ODk2MDB9.kP_DQyZdBcVfOGaB8Q3lE7-PRLJXrOxcOw7D5tlA7Ok';

//     // Base64 URL encode/decode functions
//     const base64UrlEncode = (str) => {
//         return btoa(str)
//             .replace(/\+/g, '-')
//             .replace(/\//g, '_')
//             .replace(/=/g, '');
//     };

//     const base64UrlDecode = (str) => {
//         let padding = str.length % 4;
//         if (padding) {
//             str += '='.repeat(4 - padding);
//         }
//         return atob(str.replace(/-/g, '+').replace(/_/g, '/'));
//     };

//     // HMAC SHA256 implementation
//     const hmacSHA256 = async (message, secret) => {
//         const encoder = new TextEncoder();
//         const key = await crypto.subtle.importKey(
//             'raw',
//             encoder.encode(secret),
//             {name: 'HMAC', hash: 'SHA-256'},
//             false,
//             ['sign']
//         );
//         const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(message));
//         return base64UrlEncode(String.fromCharCode(...new Uint8Array(signature)));
//     };

//     // Verify JWT signature
//     const verifySignature = async (token, secret) => {
//         try {
//             const parts = token.split('.');
//             if (parts.length !== 3) return false;

//             const message = `${parts[0]}.${parts[1]}`;
//             const expectedSignature = await hmacSHA256(message, secret);
//             return parts[2] === expectedSignature;
//         } catch (error) {
//             return false;
//         }
//     };

//     // Generate random secret
//     const generateRandomSecret = () => {
//         const array = new Uint8Array(32);
//         crypto.getRandomValues(array);
//         const secret = Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
//         setSecretKey(secret);
//     };

//     // Update payload with current timestamp
//     const updateTimestamps = () => {
//         try {
//             const payload = JSON.parse(payloadInput);
//             const now = Math.floor(Date.now() / 1000);
//             payload.iat = now;
//             payload.exp = now + 3600; // Expires in 1 hour
//             setPayloadInput(JSON.stringify(payload, null, 2));
//         } catch (error) {
//             // Handle silently
//         }
//     };

//     // Format timestamp for display
//     const formatTimestamp = (timestamp) => {
//         if (!timestamp) return 'N/A';
//         try {
//             const date = new Date(timestamp * 1000);
//             return date.toLocaleString();
//         } catch {
//             return 'Invalid';
//         }
//     };

//     // Check token expiry
//     const checkTokenExpiry = (payload) => {
//         try {
//             const payloadObj = JSON.parse(payload);
//             if (payloadObj.exp) {
//                 const now = Math.floor(Date.now() / 1000);
//                 setTokenExpiry(payloadObj.exp);
//                 setIsTokenExpired(now > payloadObj.exp);
//             } else {
//                 setTokenExpiry(null);
//                 setIsTokenExpired(false);
//             }
//         } catch {
//             setTokenExpiry(null);
//             setIsTokenExpired(false);
//         }
//     };

//     // Decode JWT
//     const decodeJWT = async (token) => {
//         try {
//             const parts = token.split('.');
//             if (parts.length !== 3) {
//                 setErrors({decode: 'Invalid JWT format. JWT should have 3 parts separated by dots.'});
//                 setIsValidJWT(false);
//                 setSignatureValid(null);
//                 return;
//             }

//             const header = JSON.parse(base64UrlDecode(parts[0]));
//             const payload = JSON.parse(base64UrlDecode(parts[1]));
//             const sig = parts[2];

//             const formattedHeader = JSON.stringify(header, null, 2);
//             const formattedPayload = JSON.stringify(payload, null, 2);

//             setDecodedHeader(formattedHeader);
//             setDecodedPayload(formattedPayload);
//             setSignature(sig);
//             setIsValidJWT(true);
//             setErrors({});

//             checkTokenExpiry(formattedPayload);

//             // Verify signature if we have a secret key
//             if (secretKey && secretKey !== 'your-256-bit-secret') {
//                 const isValid = await verifySignature(token, secretKey);
//                 setSignatureValid(isValid);
//             } else {
//                 setSignatureValid(null);
//             }
//         } catch (error) {
//             setErrors({decode: 'Invalid JWT token. Please check the format.'});
//             setIsValidJWT(false);
//             setSignatureValid(null);
//         }
//     };

//     // Encode JWT
//     const encodeJWT = async () => {
//         try {
//             const header = JSON.parse(headerInput);
//             const payload = JSON.parse(payloadInput);

//             const headerEncoded = base64UrlEncode(JSON.stringify(header));
//             const payloadEncoded = base64UrlEncode(JSON.stringify(payload));
//             const message = `${headerEncoded}.${payloadEncoded}`;

//             const sig = await hmacSHA256(message, secretKey);
//             const token = `${message}.${sig}`;

//             setJwtToken(token);
//             setErrors({});

//             // Auto-decode the generated token
//             await decodeJWT(token);
//         } catch (error) {
//             setErrors({encode: 'Invalid JSON format in header or payload.'});
//         }
//     };

//     // Export token to file
//     const exportToken = () => {
//         const data = {
//             token: jwtToken,
//             header: decodedHeader,
//             payload: decodedPayload,
//             signature: signature,
//             created: new Date().toISOString()
//         };

//         const blob = new Blob([JSON.stringify(data, null, 2)], {type: 'application/json'});
//         const url = URL.createObjectURL(blob);
//         const a = document.createElement('a');
//         a.href = url;
//         a.download = 'jwt-token.json';
//         a.click();
//         URL.revokeObjectURL(url);
//     };

//     // Copy to clipboard
//     const copyToClipboard = async (text, key) => {
//         try {
//             await navigator.clipboard.writeText(text);
//             setCopyStates({...copyStates, [key]: true});
//             setTimeout(() => setCopyStates({...copyStates, [key]: false}), 2000);
//         } catch (err) {
//             console.error('Failed to copy: ', err);
//         }
//     };

//     // Auto-decode when JWT token changes
//     useEffect(() => {
//         if (jwtToken && activeTab === 'decode') {
//             decodeJWT(jwtToken);
//         }
//     }, [jwtToken, activeTab, secretKey]);

//     // Load sample JWT on mount
//     useEffect(() => {
//         setJwtToken(sampleJWT);
//     }, []);

//     const TabButton = ({tab, label, icon: Icon}) => (
//         <button
//             onClick={() => setActiveTab(tab)}
//             className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
//                 activeTab === tab
//                     ? `${theme.accent} text-white`
//                     : `${theme.card} ${theme.text}`
//             }`}
//         >
//             <Icon size={18}/>
//             {label}
//         </button>
//     );

//     const CopyButton = ({text, copyKey}) => (
//         <button
//             onClick={() => copyToClipboard(text, copyKey)}
//             className={`p-2 rounded ${theme.card} ${theme.textSecondary} hover:opacity-70 transition-opacity`}
//             title="Copy to clipboard"
//         >
//             {copyStates[copyKey] ? <Check size={16} className="text-green-500"/> : <Copy size={16}/>}
//         </button>
//     );

//     return (
//         <div className={`min-h-screen bg-gradient-to-br ${theme.background} ${theme.text} p-6`}> 
//             <div className="max-w-6xl mx-auto">
//                 {/* Theme Toggle */}
//                 <div className="fixed top-4 right-4 z-50">
//                     <button
//                         onClick={() => setIsDarkMode(!isDarkMode)}
//                         className={`p-3 rounded-lg ${theme.card} ${theme.text} transition-colors flex items-center gap-2`}
//                     >
//                         {isDarkMode ? <Sun size={18}/> : <Moon size={18}/>}
//                         {isDarkMode ? 'Light' : 'Dark'}
//                     </button>
//                 </div>

//                 {/* Header */}
//                 <div className="text-center mb-10">
//                     <div className="flex justify-center mb-4">
//                         <div className={`p-3 ${theme.accent} rounded-xl`}>
//                             <Shield className="text-white" size={32}/>
//                         </div>
//                     </div>
//                     <h1 className="text-4xl font-bold mb-3">JWT Encoder/Decoder</h1>
//                     <p className={`${theme.textSecondary} text-lg max-w-2xl mx-auto`}>
//                         Securely encode and decode JSON Web Tokens with signature verification
//                     </p>
//                 </div>

//                 {/* Tab Navigation */}
//                 <div className="flex justify-center gap-4 mb-8">
//                     <TabButton tab="decode" label="Decode JWT" icon={Unlock}/>
//                     <TabButton tab="encode" label="Encode JWT" icon={Lock}/>
//                 </div>

//                 {/* Main Content */}
//                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
//                     {/* Left Panel */}
//                     <div className="space-y-6">
//                         {activeTab === 'decode' ? (
//                             <>
//                                 {/* JWT Token Input */}
//                                 <div className={`${theme.card} rounded-xl p-6`}>
//                                     <div className="flex items-center justify-between mb-4">
//                                         <h2 className={`text-xl font-semibold flex items-center gap-2 ${theme.text}`}>
//                                             <Code size={20}/>
//                                             JWT Token Input
//                                         </h2>
//                                         <button
//                                             onClick={() => setJwtToken(sampleJWT)}
//                                             className={`px-4 py-2 ${theme.accent} text-white rounded-lg font-medium transition-colors`}
//                                         >
//                                             Load Sample
//                                         </button>
//                                     </div>
                                    
//                                     <div>
//                                         <label className={`block text-sm font-medium ${theme.textSecondary} mb-2`}>
//                                             Paste your JWT token here:
//                                         </label>
//                                         <div className="relative">
//                                             <textarea
//                                                 value={jwtToken}
//                                                 onChange={(e) => setJwtToken(e.target.value)}
//                                                 className={`w-full h-48 p-3 ${theme.input} rounded-lg resize-none font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
//                                                 placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
//                                             />
//                                             <div className="absolute top-2 right-2">
//                                                 <CopyButton text={jwtToken} copyKey="jwt-input"/>
//                                             </div>
//                                         </div>
//                                         {errors.decode && (
//                                             <div className="flex items-center gap-2 text-red-500 text-sm mt-2 p-2 bg-red-50 rounded">
//                                                 <AlertCircle size={14}/>
//                                                 {errors.decode}
//                                             </div>
//                                         )}
//                                     </div>

//                                     {isValidJWT && (
//                                         <div className="space-y-2 mt-4">
//                                             <div className="flex items-center gap-2 text-green-600 text-sm p-2 bg-green-50 rounded">
//                                                 <Check size={14}/>
//                                                 Valid JWT format detected
//                                             </div>

//                                             {tokenExpiry && (
//                                                 <div className={`flex items-center gap-2 text-sm p-2 rounded ${
//                                                     isTokenExpired
//                                                         ? 'text-red-600 bg-red-50'
//                                                         : 'text-green-600 bg-green-50'
//                                                 }`}>
//                                                     <Clock size={14}/>
//                                                     Token {isTokenExpired ? 'expired' : 'expires'} on {formatTimestamp(tokenExpiry)}
//                                                 </div>
//                                             )}

//                                             {signatureValid !== null && (
//                                                 <div className={`flex items-center gap-2 text-sm p-2 rounded ${
//                                                     signatureValid
//                                                         ? 'text-green-600 bg-green-50'
//                                                         : 'text-red-600 bg-red-50'
//                                                 }`}>
//                                                     <Shield size={14}/>
//                                                     Signature {signatureValid ? 'verified' : 'invalid'}
//                                                 </div>
//                                             )}
//                                         </div>
//                                     )}
//                                 </div>

//                                 {/* Secret Key Section */}
//                                 <div className={`${theme.card} rounded-xl p-6`}>
//                                     <div className="flex items-center justify-between mb-4">
//                                         <h2 className={`text-xl font-semibold flex items-center gap-2 ${theme.text}`}>
//                                             <Key size={20}/>
//                                             Secret Key
//                                         </h2>
//                                         <button
//                                             onClick={generateRandomSecret}
//                                             className={`text-sm px-3 py-1 ${theme.accent} text-white rounded transition-colors flex items-center gap-1`}
//                                             title="Generate random secret"
//                                         >
//                                             <RefreshCw size={14}/>
//                                             Generate
//                                         </button>
//                                     </div>
                                    
//                                     <div>
//                                         <label className={`block text-sm font-medium ${theme.textSecondary} mb-2`}>
//                                             Secret Key (for signature verification):
//                                         </label>
//                                         <div className="relative">
//                                             <input
//                                                 type={showSecret ? 'text' : 'password'}
//                                                 value={secretKey}
//                                                 onChange={(e) => setSecretKey(e.target.value)}
//                                                 className={`w-full p-3 pr-12 ${theme.input} rounded-lg font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
//                                                 placeholder="Enter secret key to verify signature"
//                                             />
//                                             <button
//                                                 onClick={() => setShowSecret(!showSecret)}
//                                                 className={`absolute right-3 top-3 ${theme.textSecondary} hover:opacity-70 transition-opacity`}
//                                                 title={showSecret ? 'Hide secret' : 'Show secret'}
//                                             >
//                                                 {showSecret ? <EyeOff size={16}/> : <Eye size={16}/>}
//                                             </button>
//                                         </div>
//                                         <p className={`${theme.textSecondary} text-xs mt-2 flex items-center gap-1`}>
//                                             <AlertCircle size={12}/>
//                                             Secret key is required for signature verification
//                                         </p>
//                                     </div>
//                                 </div>
//                             </>
//                         ) : (
//                             /* JWT Components for Encode */
//                             <div className={`${theme.card} rounded-xl p-6`}>
//                                 <div className="flex items-center justify-between mb-4">
//                                     <h2 className={`text-xl font-semibold flex items-center gap-2 ${theme.text}`}>
//                                         <Code size={20}/>
//                                         JWT Components
//                                     </h2>
//                                 </div>

//                                 <div className="space-y-4">
//                                     {/* Header */}
//                                     <div>
//                                         <label className={`block text-sm font-medium ${theme.textSecondary} mb-2`}>
//                                             Header:
//                                         </label>
//                                         <div className="relative">
//                                             <textarea
//                                                 value={headerInput}
//                                                 onChange={(e) => setHeaderInput(e.target.value)}
//                                                 className={`w-full h-24 p-3 ${theme.input} rounded-lg resize-none font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
//                                             />
//                                             <div className="absolute top-2 right-2">
//                                                 <CopyButton text={headerInput} copyKey="header-input"/>
//                                             </div>
//                                         </div>
//                                     </div>

//                                     {/* Payload */}
//                                     <div>
//                                         <div className="flex items-center justify-between mb-2">
//                                             <label className={`block text-sm font-medium ${theme.textSecondary}`}>
//                                                 Payload:
//                                             </label>
//                                             <button
//                                                 onClick={updateTimestamps}
//                                                 className={`text-xs px-2 py-1 ${theme.accent} text-white rounded transition-colors flex items-center gap-1`}
//                                                 title="Update timestamps"
//                                             >
//                                                 <Clock size={12}/>
//                                                 Update
//                                             </button>
//                                         </div>
//                                         <div className="relative">
//                                             <textarea
//                                                 value={payloadInput}
//                                                 onChange={(e) => setPayloadInput(e.target.value)}
//                                                 className={`w-full h-32 p-3 ${theme.input} rounded-lg resize-none font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
//                                             />
//                                             <div className="absolute top-2 right-2">
//                                                 <CopyButton text={payloadInput} copyKey="payload-input"/>
//                                             </div>
//                                         </div>
//                                     </div>

//                                     {/* Secret Key */}
//                                     <div>
//                                         <div className="flex items-center justify-between mb-2">
//                                             <label className={`block text-sm font-medium ${theme.textSecondary} flex items-center gap-1`}>
//                                                 <Key size={14}/>
//                                                 Secret Key:
//                                             </label>
//                                             <button
//                                                 onClick={generateRandomSecret}
//                                                 className={`text-xs px-2 py-1 ${theme.accent} text-white rounded transition-colors flex items-center gap-1`}
//                                                 title="Generate random secret"
//                                             >
//                                                 <RefreshCw size={12}/>
//                                                 Generate
//                                             </button>
//                                         </div>
//                                         <div className="relative">
//                                             <input
//                                                 type={showSecret ? 'text' : 'password'}
//                                                 value={secretKey}
//                                                 onChange={(e) => setSecretKey(e.target.value)}
//                                                 className={`w-full p-3 pr-12 ${theme.input} rounded-lg font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
//                                             />
//                                             <button
//                                                 onClick={() => setShowSecret(!showSecret)}
//                                                 className={`absolute right-3 top-3 ${theme.textSecondary} hover:opacity-70 transition-opacity`}
//                                                 title={showSecret ? 'Hide secret' : 'Show secret'}
//                                             >
//                                                 {showSecret ? <EyeOff size={16}/> : <Eye size={16}/>}
//                                             </button>
//                                         </div>
//                                     </div>

//                                     <button
//                                         onClick={encodeJWT}
//                                         className={`w-full py-3 ${theme.accent} text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2`}
//                                     >
//                                         <Zap size={18}/>
//                                         Generate JWT Token
//                                     </button>

//                                     {errors.encode && (
//                                         <div className="flex items-center gap-2 text-red-500 text-sm p-2 bg-red-50 rounded">
//                                             <AlertCircle size={14}/>
//                                             {errors.encode}
//                                         </div>
//                                     )}
//                                 </div>
//                             </div>
//                         )}
//                     </div>

//                     {/* Right Panel */}
//                     <div className="space-y-6">
//                         {activeTab === 'decode' ? (
//                             <>
//                                 {/* Header Section */}
//                                 <div className={`${theme.card} rounded-xl p-4`}>
//                                     <div className="flex items-center justify-between mb-3">
//                                         <h3 className={`font-medium ${theme.text} flex items-center gap-2`}>
//                                             <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
//                                             Header
//                                         </h3>
//                                         <CopyButton text={decodedHeader} copyKey="header"/>
//                                     </div>
//                                     <pre className={`${theme.headerBg} p-3 rounded-lg overflow-auto text-sm font-mono max-h-32`}>
//                                         <code className={`${theme.headerText}`}>{decodedHeader || 'No valid JWT token provided'}</code>
//                                     </pre>
//                                 </div>

//                                 {/* Payload Section */}
//                                 <div className={`${theme.card} rounded-xl p-4`}>
//                                     <div className="flex items-center justify-between mb-3">
//                                         <h3 className={`font-medium ${theme.text} flex items-center gap-2`}>
//                                             <div className="w-2 h-2 bg-green-500 rounded-full"></div>
//                                             Payload
//                                         </h3>
//                                         <CopyButton text={decodedPayload} copyKey="payload"/>
//                                     </div>
//                                     <pre className={`${theme.payloadBg} p-3 rounded-lg overflow-auto text-sm font-mono max-h-32`}>
//                                         <code className={`${theme.payloadText}`}>{decodedPayload || 'No valid JWT token provided'}</code>
//                                     </pre>

//                                     {/* Payload Claims Info */}
//                                     {decodedPayload && (
//                                         <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
//                                             {(() => {
//                                                 try {
//                                                     const payload = JSON.parse(decodedPayload);
//                                                     return (
//                                                         <>
//                                                             {payload.iat && (
//                                                                 <div className={`p-2 ${theme.card} rounded border-l-2 border-blue-500`}>
//                                                                     <div className="flex items-center gap-1">
//                                                                         <Calendar size={10}/>
//                                                                         <span className={`font-medium ${theme.text}`}>Issued:</span>
//                                                                     </div>
//                                                                     <span className={`${theme.textSecondary}`}>{formatTimestamp(payload.iat)}</span>
//                                                                 </div>
//                                                             )}
//                                                             {payload.exp && (
//                                                                 <div className={`p-2 ${theme.card} rounded border-l-2 border-green-500`}>
//                                                                     <div className="flex items-center gap-1">
//                                                                         <Clock size={10}/>
//                                                                         <span className={`font-medium ${theme.text}`}>Expires:</span>
//                                                                     </div>
//                                                                     <span className={`${theme.textSecondary}`}>{formatTimestamp(payload.exp)}</span>
//                                                                 </div>
//                                                             )}
//                                                         </>
//                                                     );
//                                                 } catch {
//                                                     return null;
//                                                 }
//                                             })()}
//                                         </div>
//                                     )}
//                                 </div>

//                                 {/* Signature Section */}
//                                 <div className={`${theme.card} rounded-xl p-4`}>
//                                     <div className="flex items-center justify-between mb-3">
//                                         <h3 className={`font-medium ${theme.text} flex items-center gap-2`}>
//                                             <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
//                                             Signature
//                                         </h3>
//                                         <CopyButton text={signature} copyKey="signature"/>
//                                     </div>
//                                     <pre className={`${theme.signatureBg} p-3 rounded-lg overflow-auto text-sm font-mono`}>
//                                         <code className={`${theme.signatureText} break-all`}>{signature || 'No valid JWT token provided'}</code>
//                                     </pre>
//                                     <div className={`mt-3 p-2 ${theme.card} border-l-2 border-yellow-500 rounded`}>
//                                         <p className={`${theme.textSecondary} text-xs flex items-center gap-1`}>
//                                             <Shield size={12}/>
//                                             Enter your secret key above to verify signature integrity.
//                                         </p>
//                                     </div>
//                                 </div>

//                                 {/* Export Button */}
//                                 {jwtToken && (
//                                     <button
//                                         onClick={exportToken}
//                                         className={`w-full py-2 ${theme.card} ${theme.text} rounded-lg font-medium transition-colors flex items-center justify-center gap-2`}
//                                     >
//                                         <Download size={16}/>
//                                         Export Token Data
//                                     </button>
//                                 )}
//                             </>
//                         ) : (
//                             /* Generated JWT Output */
//                             <div className={`${theme.card} rounded-xl p-6`}>
//                                 <div className="flex items-center justify-between mb-4">
//                                     <h3 className={`font-medium ${theme.text} flex items-center gap-2`}>
//                                         <Zap size={18}/>
//                                         Generated JWT Token
//                                     </h3>
//                                     <div className="flex gap-2">
//                                         <CopyButton text={jwtToken} copyKey="generated-jwt"/>
//                                         {jwtToken && (
//                                             <button
//                                                 onClick={exportToken}
//                                                 className={`p-2 rounded ${theme.card} ${theme.textSecondary} hover:opacity-70 transition-opacity`}
//                                                 title="Export token data"
//                                             >
//                                                 <Download size={16}/>
//                                             </button>
//                                         )}
//                                     </div>
//                                 </div>
//                                 <div className={`${theme.input} p-4 rounded-lg min-h-80 border-2 border-dashed ${isDarkMode ? 'border-gray-600' : 'border-gray-300'}`}>
//                                     <code className={`${theme.text} break-all font-mono text-sm leading-relaxed`}>
//                                         {jwtToken || 'Click "Generate JWT Token" to create a new token'}
//                                     </code>
//                                 </div>
//                                 {jwtToken && (
//                                     <div className="mt-3 p-3 bg-green-50 rounded-lg">
//                                         <p className="text-green-700 flex items-center gap-2 font-medium text-sm">
//                                             <Check size={16}/>
//                                             JWT token generated successfully!
//                                         </p>
//                                     </div>
//                                 )}
//                             </div>
//                         )}
//                     </div>
//                 </div>

//                 {/* About JWT Section */}
//                 <div className={`${theme.card} rounded-xl p-6`}>
//                     <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//                         <div className="lg:col-span-2">
//                             <h3 className={`text-xl font-semibold mb-4 ${theme.text} flex items-center gap-2`}>
//                                 <Shield size={20}/>
//                                 About JWT (JSON Web Token)
//                             </h3>
//                             <p className={`${theme.textSecondary} leading-relaxed mb-4`}>
//                                 <strong className={`${theme.text}`}>JSON Web Token (JWT)</strong> is a compact, URL-safe means of representing claims between two parties securely. It's an open standard (RFC 7519) for transmitting information as a JSON object.
//                             </p>
//                             <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
//                                 <div className={`p-3 ${theme.headerBg} rounded-lg border-l-4 border-blue-500`}>
//                                     <div className="flex items-center gap-2 mb-2">
//                                         <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
//                                         <strong className={`${theme.text} text-sm`}>Header</strong>
//                                     </div>
//                                     <p className={`text-xs ${theme.textSecondary}`}>Token type and signing algorithm</p>
//                                 </div>
//                                 <div className={`p-3 ${theme.payloadBg} rounded-lg border-l-4 border-green-500`}>
//                                     <div className="flex items-center gap-2 mb-2">
//                                         <div className="w-2 h-2 bg-green-500 rounded-full"></div>
//                                         <strong className={`${theme.text} text-sm`}>Payload</strong>
//                                     </div>
//                                     <p className={`text-xs ${theme.textSecondary}`}>Claims and user data</p>
//                                 </div>
//                                 <div className={`p-3 ${theme.signatureBg} rounded-lg border-l-4 border-purple-500`}>
//                                     <div className="flex items-center gap-2 mb-2">
//                                         <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
//                                         <strong className={`${theme.text} text-sm`}>Signature</strong>
//                                     </div>
//                                     <p className={`text-xs ${theme.textSecondary}`}>Verifies integrity and authenticity</p>
//                                 </div>
//                             </div>
//                         </div>
//                         <div>
//                             {/* Empty right column */}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default JWTPage;




// "use client";
// import React, {useEffect, useState} from "react";
// import { useTheme } from 'next-themes';
// import {
//     AlertCircle,
//     Calendar,
//     Check,
//     Clock,
//     Code,
//     Copy,
//     Download,
//     Eye,
//     EyeOff,
//     Key,
//     Lock,
//     RefreshCw,
//     Shield,
//     Unlock,
//     Zap
// } from "lucide-react";

// const JWTPage = () => {
//     const { theme } = useTheme();
//     const isDark = theme === 'dark';
    
//     const [jwtToken, setJwtToken] = useState('');
//     const [decodedHeader, setDecodedHeader] = useState('');
//     const [decodedPayload, setDecodedPayload] = useState('');
//     const [signature, setSignature] = useState('');
//     const [headerInput, setHeaderInput] = useState('{\n  "alg": "HS256",\n  "typ": "JWT"\n}');
//     const [payloadInput, setPayloadInput] = useState('{\n  "sub": "1234567890",\n  "name": "John Doe",\n  "iat": 1516239022,\n  "exp": 1735689600\n}');
//     const [secretKey, setSecretKey] = useState('your-256-bit-secret');
//     const [showSecret, setShowSecret] = useState(false);
//     const [activeTab, setActiveTab] = useState('decode');
//     const [copyStates, setCopyStates] = useState({});
//     const [errors, setErrors] = useState({encode: undefined, decode: undefined});
//     const [isValidJWT, setIsValidJWT] = useState(false);
//     const [tokenExpiry, setTokenExpiry] = useState(null);
//     const [isTokenExpired, setIsTokenExpired] = useState(false);
//     const [signatureValid, setSignatureValid] = useState(null);

//     const sampleJWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjE3MzU2ODk2MDB9.kP_DQyZdBcVfOGaB8Q3lE7-PRLJXrOxcOw7D5tlA7Ok';

//     // Base64 URL encode/decode functions
//     const base64UrlEncode = (str) => {
//         return btoa(str)
//             .replace(/\+/g, '-')
//             .replace(/\//g, '_')
//             .replace(/=/g, '');
//     };

//     const base64UrlDecode = (str) => {
//         const padding = str.length % 4;
//         if (padding) {
//             str += '='.repeat(4 - padding);
//         }
//         return atob(str.replace(/-/g, '+').replace(/_/g, '/'));
//     };

//     // HMAC SHA256 implementation
//     const hmacSHA256 = async (message, secret) => {
//         const encoder = new TextEncoder();
//         const key = await crypto.subtle.importKey(
//             'raw',
//             encoder.encode(secret),
//             {name: 'HMAC', hash: 'SHA-256'},
//             false,
//             ['sign']
//         );
//         const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(message));
//         return base64UrlEncode(String.fromCharCode(...new Uint8Array(signature)));
//     };

//     // Verify JWT signature
//     const verifySignature = async (token, secret) => {
//         try {
//             const parts = token.split('.');
//             if (parts.length !== 3) return false;

//             const message = `${parts[0]}.${parts[1]}`;
//             const expectedSignature = await hmacSHA256(message, secret);
//             return parts[2] === expectedSignature;
//         } catch {
//             return false;
//         }
//     };

//     // Generate random secret
//     const generateRandomSecret = () => {
//         const array = new Uint8Array(32);
//         crypto.getRandomValues(array);
//         const secret = Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
//         setSecretKey(secret);
//     };

//     // Update payload with current timestamp
//     const updateTimestamps = () => {
//         try {
//             const payload = JSON.parse(payloadInput);
//             const now = Math.floor(Date.now() / 1000);
//             payload.iat = now;
//             payload.exp = now + 3600;
//             setPayloadInput(JSON.stringify(payload, null, 2));
//         } catch {
//             // Handle silently
//         }
//     };

//     // Format timestamp for display
//     const formatTimestamp = (timestamp) => {
//         if (!timestamp) return 'N/A';
//         try {
//             const date = new Date(timestamp * 1000);
//             return date.toLocaleString();
//         } catch {
//             return 'Invalid';
//         }
//     };

//     // Check token expiry
//     const checkTokenExpiry = (payload) => {
//         try {
//             const payloadObj = JSON.parse(payload);
//             if (payloadObj.exp) {
//                 const now = Math.floor(Date.now() / 1000);
//                 setTokenExpiry(payloadObj.exp);
//                 setIsTokenExpired(now > payloadObj.exp);
//             } else {
//                 setTokenExpiry(null);
//                 setIsTokenExpired(false);
//             }
//         } catch {
//             setTokenExpiry(null);
//             setIsTokenExpired(false);
//         }
//     };

//     // Decode JWT
//     const decodeJWT = async (token) => {
//         try {
//             const parts = token.split('.');
//             if (parts.length !== 3) {
//                 setErrors({...errors, decode: 'Invalid JWT format. JWT should have 3 parts separated by dots.'});
//                 setIsValidJWT(false);
//                 setSignatureValid(null);
//                 return;
//             }

//             const header = JSON.parse(base64UrlDecode(parts[0]));
//             const payload = JSON.parse(base64UrlDecode(parts[1]));
//             const sig = parts[2];

//             const formattedHeader = JSON.stringify(header, null, 2);
//             const formattedPayload = JSON.stringify(payload, null, 2);

//             setDecodedHeader(formattedHeader);
//             setDecodedPayload(formattedPayload);
//             setSignature(sig);
//             setIsValidJWT(true);
//             setErrors({encode: undefined, decode: undefined});

//             checkTokenExpiry(formattedPayload);

//             if (secretKey && secretKey !== 'your-256-bit-secret') {
//                 const isValid = await verifySignature(token, secretKey);
//                 setSignatureValid(isValid);
//             } else {
//                 setSignatureValid(null);
//             }
//         } catch {
//             setErrors({...errors, decode: 'Invalid JWT token. Please check the format.'});
//             setIsValidJWT(false);
//             setSignatureValid(null);
//         }
//     };

//     // Encode JWT
//     const encodeJWT = async () => {
//         try {
//             const header = JSON.parse(headerInput);
//             const payload = JSON.parse(payloadInput);

//             const headerEncoded = base64UrlEncode(JSON.stringify(header));
//             const payloadEncoded = base64UrlEncode(JSON.stringify(payload));
//             const message = `${headerEncoded}.${payloadEncoded}`;

//             const sig = await hmacSHA256(message, secretKey);
//             const token = `${message}.${sig}`;

//             setJwtToken(token);
//             setErrors({encode: undefined, decode: undefined});

//             await decodeJWT(token);
//         } catch{
//             setErrors({...errors, encode: 'Invalid JSON format in header or payload.'});
//         }
//     };

//     // Export token to file
//     const exportToken = () => {
//         const data = {
//             token: jwtToken,
//             header: decodedHeader,
//             payload: decodedPayload,
//             signature: signature,
//             created: new Date().toISOString()
//         };

//         const blob = new Blob([JSON.stringify(data, null, 2)], {type: 'application/json'});
//         const url = URL.createObjectURL(blob);
//         const a = document.createElement('a');
//         a.href = url;
//         a.download = 'jwt-token.json';
//         a.click();
//         URL.revokeObjectURL(url);
//     };

//     // Copy to clipboard
//     const copyToClipboard = async (text, key) => {
//         try {
//             await navigator.clipboard.writeText(text);
//             setCopyStates({...copyStates, [key]: true});
//             setTimeout(() => setCopyStates({...copyStates, [key]: false}), 2000);
//         } catch (err) {
//             console.error('Failed to copy: ', err);
//         }
//     };

//     useEffect(() => {
//         if (jwtToken && activeTab === 'decode') {
//             decodeJWT(jwtToken);
//         }
//     }, [jwtToken, activeTab, secretKey]);

//     useEffect(() => {
//         setJwtToken(sampleJWT);
//     }, []);

//     // Theme-aware color schemes
//     const colorScheme = isDark ? {
//         // Dark Mode (Professional Slate)
//         page: "bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-900",
//         card: "bg-gradient-to-br from-slate-800 to-slate-700",
//         cardBorder: "border-slate-600",
//         accent: "from-indigo-500 to-purple-600",
//         accentHover: "from-indigo-600 to-purple-700",
//         text: "text-slate-100",
//         textSecondary: "text-slate-300",
//         headerColors: {
//             bg: "bg-gradient-to-br from-slate-700 to-blue-600",
//             text: "text-slate-200",
//             dot: "bg-blue-400"
//         },
//         payloadColors: {
//             bg: "bg-gradient-to-br from-gray-700 to-cyan-600",
//             text: "text-gray-200",
//             dot: "bg-cyan-400"
//         },
//         signatureColors: {
//             bg: "bg-gradient-to-br from-zinc-700 to-teal-600",
//             text: "text-zinc-200",
//             dot: "bg-teal-400"
//         },
//         secretSection: "bg-gradient-to-br from-slate-800 to-slate-700",
//         generateButton: "from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700",
//         inputBg: "bg-black bg-opacity-30"
//     } : {
//         // Light Mode (Ocean Beach)
//         page: "bg-gradient-to-br from-cyan-50 via-teal-50 to-amber-50",
//         card: "bg-white",
//         cardBorder: "border-teal-200",
//         accent: "from-teal-500 to-cyan-500",
//         accentHover: "from-teal-600 to-cyan-600",
//         text: "text-slate-900",
//         textSecondary: "text-slate-600",
//         headerColors: {
//             bg: "bg-gradient-to-br from-blue-100 to-blue-200",
//             text: "text-blue-900",
//             dot: "bg-blue-500"
//         },
//         payloadColors: {
//             bg: "bg-gradient-to-br from-cyan-100 to-cyan-200",
//             text: "text-cyan-900",
//             dot: "bg-cyan-500"
//         },
//         signatureColors: {
//             bg: "bg-gradient-to-br from-teal-100 to-teal-200",
//             text: "text-teal-900",
//             dot: "bg-teal-500"
//         },
//         secretSection: "bg-gradient-to-br from-slate-50 to-slate-100",
//         generateButton: "from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600",
//         inputBg: "bg-slate-50"
//     };

//     const TabButton = ({tab, label, icon: Icon}) => (
//         <button
//             onClick={() => setActiveTab(tab)}
//             className={`flex items-center gap-3 px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg ${
//                 activeTab === tab
//                     ? `bg-gradient-to-r ${colorScheme.accent} text-white shadow-xl transform scale-105`
//                     : `${colorScheme.card} ${colorScheme.text} hover:opacity-80 border-2 ${colorScheme.cardBorder}`
//             }`}
//         >
//             <Icon size={20}/>
//             {label}
//         </button>
//     );

//     const CopyButton = ({text, copyKey, className = ''}) => (
//         <button
//             onClick={() => copyToClipboard(text, copyKey)}
//             className={`p-2 rounded-lg ${colorScheme.card} hover:opacity-80 ${colorScheme.textSecondary} transition-all duration-200 ${className}`}
//             title="Copy to clipboard"
//         >
//             {copyStates[copyKey] ? <Check size={16} className="text-green-600"/> : <Copy size={16}/>}
//         </button>
//     );
    
//     return (
//         <div className={`min-h-screen ${colorScheme.page} ${isDark ? 'text-white' : 'text-slate-900'} p-6`}>
//             <div className="">
//                 {/* Header */}
//                 <div className="text-center mb-12 mt-15">
//                     <div className="flex justify-center mb-6">
//                         <div className={`p-4 bg-gradient-to-r ${colorScheme.accent} rounded-2xl shadow-lg`}>
//                             <Shield className="text-white" size={48}/>
//                         </div>
//                     </div>
//                     <h1 className={`text-6xl font-bold bg-gradient-to-r ${colorScheme.accent} bg-clip-text text-transparent mb-6`}>
//                         JWT Encoder/Decoder
//                     </h1>
//                     <p className={`${colorScheme.textSecondary} text-xl max-w-2xl mx-auto leading-relaxed`}>
//                         Securely encode and decode JSON Web Tokens with signature verification and advanced features
//                     </p>
//                 </div>

//                 {/* Tab Navigation */}
//                 <div className="flex justify-center gap-6 mb-12">
//                     <TabButton tab="decode" label="Decode JWT" icon={Unlock}/>
//                     <TabButton tab="encode" label="Encode JWT" icon={Lock}/>
//                 </div>

//                 {/* Main Content */}
//                 <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
//                     {/* Left Panel */}
//                     <div className="space-y-6">
//                         {activeTab === 'decode' ? (
//                             <>
//                                 {/* JWT Token Input */}
//                                 <div className={`${colorScheme.card} rounded-2xl p-8 shadow-xl border ${colorScheme.cardBorder}`}>
//                                     <div className="flex items-center justify-between mb-6">
//                                         <h2 className={`text-2xl font-bold flex items-center gap-3 ${colorScheme.text}`}>
//                                             <Code className={`${colorScheme.textSecondary}`} size={24}/>
//                                             JWT Token Input
//                                         </h2>
//                                         <button
//                                             onClick={() => setJwtToken(sampleJWT)}
//                                             className={`px-6 py-3 bg-gradient-to-r ${colorScheme.accentHover} text-white rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5`}
//                                         >
//                                             Load Sample
//                                         </button>
//                                     </div>
//                                     <div>
//                                         <label className={`block text-sm font-semibold ${colorScheme.textSecondary} mb-3`}>
//                                             Paste your JWT token here:
//                                         </label>
//                                         <div className="relative">
//                                             <textarea
//                                                 value={jwtToken}
//                                                 onChange={(e) => setJwtToken(e.target.value)}
//                                                 className={`w-full h-64 p-4 ${colorScheme.inputBg} border-2 ${colorScheme.cardBorder} rounded-xl resize-none font-mono text-sm ${colorScheme.text} focus:ring-2 focus:ring-opacity-50 transition-all duration-200`}
//                                                 placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
//                                             />
//                                             <CopyButton
//                                                 text={jwtToken}
//                                                 copyKey="jwt-input"
//                                                 className="absolute top-3 right-3"
//                                             />
//                                         </div>
//                                         {errors.decode && (
//                                             <div className={`flex items-center gap-3 text-sm mt-3 p-3 ${isDark ? 'text-red-400 bg-red-900 bg-opacity-30 border-red-700' : 'text-red-700 bg-red-50 border-red-200'} rounded-lg border`}>
//                                                 <AlertCircle size={16}/>
//                                                 {errors.decode}
//                                             </div>
//                                         )}
//                                     </div>

//                                     {isValidJWT && (
//                                         <div className="space-y-3 mt-6">
//                                             <div className={`flex items-center gap-3 text-sm p-3 rounded-lg border ${isDark ? 'text-green-400 bg-green-900 bg-opacity-30 border-green-700' : 'text-green-700 bg-green-50 border-green-200'}`}>
//                                                 <Check size={16}/>
//                                                 Valid JWT format detected
//                                             </div>

//                                             {tokenExpiry && (
//                                                 <div className={`flex items-center gap-3 text-sm p-3 rounded-lg border ${
//                                                     isTokenExpired
//                                                         ? isDark ? 'text-red-400 bg-red-900 bg-opacity-30 border-red-700' : 'text-red-700 bg-red-50 border-red-200'
//                                                         : isDark ? 'text-green-400 bg-green-900 bg-opacity-30 border-green-700' : 'text-green-700 bg-green-50 border-green-200'
//                                                 }`}>
//                                                     <Clock size={16}/>
//                                                     Token {isTokenExpired ? 'expired' : 'expires'} on {formatTimestamp(tokenExpiry)}
//                                                 </div>
//                                             )}

//                                             {signatureValid !== null && (
//                                                 <div className={`flex items-center gap-3 text-sm p-3 rounded-lg border ${
//                                                     signatureValid
//                                                         ? isDark ? 'text-green-400 bg-green-900 bg-opacity-30 border-green-700' : 'text-green-700 bg-green-50 border-green-200'
//                                                         : isDark ? 'text-red-400 bg-red-900 bg-opacity-30 border-red-700' : 'text-red-700 bg-red-50 border-red-200'
//                                                 }`}>
//                                                     <Shield size={16}/>
//                                                     Signature {signatureValid ? 'verified' : 'invalid'}
//                                                 </div>
//                                             )}
//                                         </div>
//                                     )}
//                                 </div>

//                                 {/* Secret Key Section */}
//                                 <div className={`${colorScheme.secretSection} rounded-2xl p-8 shadow-xl border ${colorScheme.cardBorder}`}>
//                                     <div className="flex items-center justify-between mb-6">
//                                         <h2 className={`text-2xl font-bold flex items-center gap-3 ${colorScheme.text}`}>
//                                             <Key className={`${colorScheme.textSecondary}`} size={24}/>
//                                             Secret Key
//                                         </h2>
//                                         <button
//                                             onClick={generateRandomSecret}
//                                             className={`text-sm px-4 py-2 bg-gradient-to-r ${colorScheme.accent} hover:${colorScheme.accentHover} text-white rounded-lg transition-colors flex items-center gap-2`}
//                                         >
//                                             <RefreshCw size={16}/>
//                                             Generate
//                                         </button>
//                                     </div>
                                    
//                                     <div>
//                                         <label className={`block text-sm font-semibold ${colorScheme.textSecondary} mb-3`}>
//                                             Secret Key (for signature verification):
//                                         </label>
//                                         <div className="relative">
//                                             <input
//                                                 type={showSecret ? 'text' : 'password'}
//                                                 value={secretKey}
//                                                 onChange={(e) => setSecretKey(e.target.value)}
//                                                 className={`w-full p-4 pr-16 ${colorScheme.inputBg} border-2 ${colorScheme.cardBorder} rounded-xl font-mono text-sm ${colorScheme.text} focus:ring-2 focus:ring-opacity-50 transition-all duration-200`}
//                                                 placeholder="Enter secret key"
//                                             />
//                                             <button
//                                                 onClick={() => setShowSecret(!showSecret)}
//                                                 className={`absolute right-3 top-3 p-2 rounded-lg ${colorScheme.card} hover:opacity-80 ${colorScheme.textSecondary} transition-colors`}
//                                             >
//                                                 {showSecret ? <EyeOff size={16}/> : <Eye size={16}/>}
//                                             </button>
//                                         </div>
//                                         <p className={`${colorScheme.textSecondary} text-sm mt-3 flex items-center gap-2 p-4 rounded-xl border ${colorScheme.cardBorder}`}>
//                                             <AlertCircle size={14}/>
//                                             Secret key generation is mandatory for proper JWT signature verification
//                                         </p>
//                                     </div>
//                                 </div>
//                             </>
//                         ) : (
//                             /* Encode Tab - JWT Components */
//                             <div className={`${colorScheme.card} rounded-2xl p-8 shadow-xl border ${colorScheme.cardBorder}`}>
//                                 <div className="flex items-center justify-between mb-6">
//                                     <h2 className={`text-2xl font-bold flex items-center gap-3 ${colorScheme.text}`}>
//                                         <Code className={`${colorScheme.textSecondary}`} size={24}/>
//                                         JWT Components
//                                     </h2>
//                                 </div>

//                                 <div className="space-y-6">
//                                     {/* Header */}
//                                     <div>
//                                         <label className={`block text-sm font-semibold ${colorScheme.textSecondary} mb-3`}>
//                                             Header:
//                                         </label>
//                                         <div className="relative">
//                                             <textarea
//                                                 value={headerInput}
//                                                 onChange={(e) => setHeaderInput(e.target.value)}
//                                                 className={`w-full h-28 p-4 ${colorScheme.headerColors.bg} border-2 ${colorScheme.cardBorder} rounded-xl resize-none font-mono text-sm ${colorScheme.headerColors.text} focus:ring-2 focus:ring-opacity-50 transition-all duration-200`}
//                                             />
//                                             <CopyButton
//                                                 text={headerInput}
//                                                 copyKey="header-input"
//                                                 className="absolute top-3 right-3"
//                                             />
//                                         </div>
//                                     </div>

//                                     {/* Payload */}
//                                     <div>
//                                         <div className="flex items-center justify-between mb-3">
//                                             <label className={`block text-sm font-semibold ${colorScheme.textSecondary}`}>
//                                                 Payload:
//                                             </label>
//                                             <button
//                                                 onClick={updateTimestamps}
//                                                 className={`text-xs px-3 py-1 bg-gradient-to-r ${colorScheme.accent} hover:${colorScheme.accentHover} text-white rounded-lg transition-colors flex items-center gap-1`}
//                                             >
//                                                 <Clock size={12}/>
//                                                 Update Timestamps
//                                             </button>
//                                         </div>
//                                         <div className="relative">
//                                             <textarea
//                                                 value={payloadInput}
//                                                 onChange={(e) => setPayloadInput(e.target.value)}
//                                                 className={`w-full h-36 p-4 ${colorScheme.payloadColors.bg} border-2 ${colorScheme.cardBorder} rounded-xl resize-none font-mono text-sm ${colorScheme.payloadColors.text} focus:ring-2 focus:ring-opacity-50 transition-all duration-200`}
//                                             />
//                                             <CopyButton
//                                                 text={payloadInput}
//                                                 copyKey="payload-input"
//                                                 className="absolute top-3 right-3"
//                                             />
//                                         </div>
//                                     </div>

//                                     {/* Secret Key */}
//                                     <div>
//                                         <div className="flex items-center justify-between mb-3">
//                                             <label className={`block text-sm font-semibold ${colorScheme.textSecondary} flex items-center gap-2`}>
//                                                 <Key size={16}/>
//                                                 Secret Key:
//                                             </label>
//                                             <button
//                                                 onClick={generateRandomSecret}
//                                                 className={`text-xs px-3 py-1 bg-gradient-to-r ${colorScheme.accent} hover:${colorScheme.accentHover} text-white rounded-lg transition-colors flex items-center gap-1`}
//                                             >
//                                                 <RefreshCw size={12}/>
//                                                 Generate
//                                             </button>
//                                         </div>
//                                         <div className="relative">
//                                             <input
//                                                 type={showSecret ? 'text' : 'password'}
//                                                 value={secretKey}
//                                                 onChange={(e) => setSecretKey(e.target.value)}
//                                                 className={`w-full p-4 pr-16 ${colorScheme.signatureColors.bg} border-2 ${colorScheme.cardBorder} rounded-xl font-mono text-sm ${colorScheme.signatureColors.text} focus:ring-2 focus:ring-opacity-50 transition-all duration-200`}
//                                             />
//                                             <button
//                                                 onClick={() => setShowSecret(!showSecret)}
//                                                 className={`absolute right-3 top-3 p-2 rounded-lg ${colorScheme.card} hover:opacity-80 ${colorScheme.textSecondary} transition-colors`}
//                                             >
//                                                 {showSecret ? <EyeOff size={16}/> : <Eye size={16}/>}
//                                             </button>
//                                         </div>
//                                         <p className={`${colorScheme.textSecondary} text-sm mt-2 flex items-center gap-2`}>
//                                             <AlertCircle size={14}/>
//                                             Secret key generation is mandatory
//                                         </p>
//                                     </div>

//                                     <button
//                                         onClick={encodeJWT}
//                                         className={`w-full py-4 bg-gradient-to-r ${colorScheme.generateButton} text-white rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5`}
//                                     >
//                                         <Zap size={20}/>
//                                         Generate JWT Token
//                                     </button>

//                                     {errors.encode && (
//                                         <div className={`flex items-center gap-3 text-sm p-3 rounded-lg border ${isDark ? 'text-red-400 bg-red-900 bg-opacity-30 border-red-700' : 'text-red-700 bg-red-50 border-red-200'}`}>
//                                             <AlertCircle size={16}/>
//                                             {errors.encode}
//                                         </div>
//                                     )}
//                                 </div>
//                             </div>
//                         )}
//                     </div>

//                     {/* Right Panel */}
//                     <div className="space-y-6">
//                         {activeTab === 'decode' ? (
//                             <>
//                                 {/* Header Section */}
//                                 <div className={`${colorScheme.card} rounded-2xl p-6 shadow-lg border ${colorScheme.cardBorder}`}>
//                                     <div className="flex items-center justify-between mb-4">
//                                         <h3 className={`text-lg font-bold ${colorScheme.text} flex items-center gap-2`}>
//                                             <div className={`w-3 h-3 ${colorScheme.headerColors.dot} rounded-full`}></div>
//                                             Header
//                                         </h3>
//                                         <CopyButton text={decodedHeader} copyKey="header"/>
//                                     </div>
//                                     <pre className={`${colorScheme.headerColors.bg} p-4 rounded-xl overflow-auto text-sm font-mono max-h-40 border ${colorScheme.cardBorder}`}>
//                                         <code className={`${colorScheme.headerColors.text}`}>{decodedHeader || 'No valid JWT token provided'}</code>
//                                     </pre>
//                                 </div>

//                                 {/* Payload Section */}
//                                 <div className={`${colorScheme.card} rounded-2xl p-6 shadow-lg border ${colorScheme.cardBorder}`}>
//                                     <div className="flex items-center justify-between mb-4">
//                                         <h3 className={`text-lg font-bold ${colorScheme.text} flex items-center gap-2`}>
//                                             <div className={`w-3 h-3 ${colorScheme.payloadColors.dot} rounded-full`}></div>
//                                             Payload
//                                         </h3>
//                                         <CopyButton text={decodedPayload} copyKey="payload"/>
//                                     </div>
//                                     <pre className={`${colorScheme.payloadColors.bg} p-4 rounded-xl overflow-auto text-sm font-mono max-h-40 border ${colorScheme.cardBorder}`}>
//                                         <code className={`${colorScheme.payloadColors.text}`}>{decodedPayload || 'No valid JWT token provided'}</code>
//                                     </pre>

//                                     {/* Payload Claims Info */}
//                                     {decodedPayload && (
//                                         <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
//                                             {(() => {
//                                                 try {
//                                                     const payload = JSON.parse(decodedPayload);
//                                                     return (
//                                                         <>
//                                                             {payload.iat && (
//                                                                 <div className={`p-2 ${colorScheme.card} bg-opacity-50 rounded-lg border ${colorScheme.cardBorder}`}>
//                                                                     <div className="flex items-center gap-1">
//                                                                         <Calendar size={12}/>
//                                                                         <span className={`font-semibold ${colorScheme.text}`}>Issued:</span>
//                                                                     </div>
//                                                                     <span className={`${colorScheme.textSecondary}`}>{formatTimestamp(payload.iat)}</span>
//                                                                 </div>
//                                                             )}
//                                                             {payload.exp && (
//                                                                 <div className={`p-2 ${colorScheme.card} bg-opacity-50 rounded-lg border ${colorScheme.cardBorder}`}>
//                                                                     <div className="flex items-center gap-1">
//                                                                         <Clock size={12}/>
//                                                                         <span className={`font-semibold ${colorScheme.text}`}>Expires:</span>
//                                                                     </div>
//                                                                     <span className={`${colorScheme.textSecondary}`}>{formatTimestamp(payload.exp)}</span>
//                                                                 </div>
//                                                             )}
//                                                         </>
//                                                     );
//                                                 } catch {
//                                                     return null;
//                                                 }
//                                             })()}
//                                         </div>
//                                     )}
//                                 </div>

//                                 {/* Signature Section */}
//                                 <div className={`${colorScheme.card} rounded-2xl p-6 shadow-lg border ${colorScheme.cardBorder}`}>
//                                     <div className="flex items-center justify-between mb-4">
//                                         <h3 className={`text-lg font-bold ${colorScheme.text} flex items-center gap-2`}>
//                                             <div className={`w-3 h-3 ${colorScheme.signatureColors.dot} rounded-full`}></div>
//                                             Signature
//                                         </h3>
//                                         <CopyButton text={signature} copyKey="signature"/>
//                                     </div>
//                                     <pre className={`${colorScheme.signatureColors.bg} p-4 rounded-xl overflow-auto text-sm font-mono border ${colorScheme.cardBorder}`}>
//                                         <code className={`${colorScheme.signatureColors.text} break-all`}>{signature || 'No valid JWT token provided'}</code>
//                                     </pre>
//                                     <div className={`mt-4 p-3 ${colorScheme.card} bg-opacity-50 rounded-lg border ${colorScheme.cardBorder}`}>
//                                         <p className={`${colorScheme.textSecondary} text-sm flex items-center gap-2`}>
//                                             <Shield size={16}/>
//                                             Enter your secret key above to verify signature integrity.
//                                         </p>
//                                     </div>
//                                 </div>

//                                 {/* Export Button */}
//                                 {jwtToken && (
//                                     <button
//                                         onClick={exportToken}
//                                         className={`w-full py-3 bg-gradient-to-r ${colorScheme.card} hover:opacity-80 ${colorScheme.text} rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2 shadow-lg border ${colorScheme.cardBorder}`}
//                                     >
//                                         <Download size={18}/>
//                                         Export Token Data
//                                     </button>
//                                 )}
//                             </>
//                         ) : (
//                             /* Generated JWT Output */
//                             <div className={`${isDark ? 'bg-gradient-to-br from-slate-800 to-slate-700' : 'bg-gradient-to-br from-teal-50 to-cyan-50'} rounded-2xl p-6 shadow-lg border-2 ${colorScheme.cardBorder}`}>
//                                 <div className="flex items-center justify-between mb-4">
//                                     <h3 className={`text-lg font-bold ${colorScheme.text} flex items-center gap-2`}>
//                                         <Zap className={`${colorScheme.textSecondary}`} size={20}/>
//                                         Generated JWT Token
//                                     </h3>
//                                     <div className="flex gap-2">
//                                         <CopyButton text={jwtToken} copyKey="generated-jwt"/>
//                                         {jwtToken && (
//                                             <button
//                                                 onClick={exportToken}
//                                                 className={`p-2 rounded-lg ${colorScheme.card} ${isDark ? 'bg-opacity-20 hover:bg-opacity-30' : 'bg-opacity-50 hover:bg-opacity-70'} ${colorScheme.text} transition-all duration-200`}
//                                                 title="Export token data"
//                                             >
//                                                 <Download size={16}/>
//                                             </button>
//                                         )}
//                                     </div>
//                                 </div>
//                                 <div className={`${isDark ? 'bg-black bg-opacity-30 border-white border-opacity-20' : 'bg-white border-teal-200'} p-6 rounded-xl border min-h-96`}>
//                                     <code className={`${colorScheme.text} break-all font-mono text-sm leading-relaxed`}>
//                                         {jwtToken || 'Click "Generate JWT Token" to create a new token'}
//                                     </code>
//                                 </div>
//                                 {jwtToken && (
//                                     <div className={`mt-4 p-4 rounded-xl border ${isDark ? 'bg-green-900 bg-opacity-20 border-green-700 border-opacity-20' : 'bg-green-50 border-green-200'}`}>
//                                         <p className={`${isDark ? 'text-green-400' : 'text-green-700'} flex items-center gap-2 font-medium`}>
//                                             <Check size={18}/>
//                                             JWT token generated successfully! Ready for authentication.
//                                         </p>
//                                     </div>
//                                 )}
//                             </div>
//                         )}
//                     </div>
//                 </div>

//                 {/* About JWT */}
//                 <div className={`${colorScheme.card} rounded-2xl p-6 shadow-xl border ${colorScheme.cardBorder}`}>
//                     <h3 className={`text-2xl font-bold mb-4 ${colorScheme.text} flex items-center gap-3`}>
//                         <Shield className={`${colorScheme.textSecondary}`} size={28}/>
//                         About JWT 
//                     </h3>
//                     <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//                         <div className="lg:col-span-2">
//                             <p className={`${colorScheme.textSecondary} leading-relaxed mb-4`}>
//                                 <strong className={`${colorScheme.text}`}>JSON Web Token (JWT)</strong> is a compact, URL-safe means of representing claims between two parties securely. It&apos;s an open standard (RFC 7519) for transmitting information as a JSON object.
//                             </p>
//                             <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
//                                 <div className={`p-3 ${colorScheme.headerColors.bg} rounded-lg border ${colorScheme.cardBorder}`}>
//                                     <div className="flex items-center gap-2 mb-2">
//                                         <div className={`w-3 h-3 ${colorScheme.headerColors.dot} rounded-full`}></div>
//                                         <strong className={`${colorScheme.text}`}>Header</strong>
//                                     </div>
//                                     <p className={`text-xs ${colorScheme.textSecondary}`}>Token type and signing algorithm</p>
//                                 </div>
//                                 <div className={`p-3 ${colorScheme.payloadColors.bg} rounded-lg border ${colorScheme.cardBorder}`}>
//                                     <div className="flex items-center gap-2 mb-2">
//                                         <div className={`w-3 h-3 ${colorScheme.payloadColors.dot} rounded-full`}></div>
//                                         <strong className={`${colorScheme.text}`}>Payload</strong>
//                                     </div>
//                                     <p className={`text-xs ${colorScheme.textSecondary}`}>Claims and user data</p>
//                                 </div>
//                                 <div className={`p-3 ${colorScheme.signatureColors.bg} rounded-lg border ${colorScheme.cardBorder}`}>
//                                     <div className="flex items-center gap-2 mb-2">
//                                         <div className={`w-3 h-3 ${colorScheme.signatureColors.dot} rounded-full`}></div>
//                                         <strong className={`${colorScheme.text}`}>Signature</strong>
//                                     </div>
//                                     <p className={`text-xs ${colorScheme.textSecondary}`}>Verifies integrity and authenticity</p>
//                                 </div>
//                             </div>
//                         </div>

//                         <div className={`${colorScheme.card} bg-opacity-30 rounded-lg p-4 border ${colorScheme.cardBorder}`}>
//                             <h4 className={`text-lg font-semibold ${colorScheme.text} mb-3 flex items-center gap-2`}>
//                                 <AlertCircle size={18}/>
//                                 Security Tips:
//                             </h4>
//                             <ul className={`space-y-1 text-sm ${colorScheme.textSecondary}`}>
//                                 <li>• Use strong secret keys</li>
//                                 <li>• Set expiration times</li>
//                                 <li>• Validate on every request</li>
//                                 <li>• Never store sensitive data in payload</li>
//                             </ul>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };
// export default JWTPage;








"use client";
import React, {useEffect, useState} from "react";
import { useTheme } from 'next-themes';
import {
    AlertCircle,
    Calendar,
    Check,
    Clock,
    Code,
    Copy,
    Download,
    Eye,
    EyeOff,
    Key,
    Lock,
    RefreshCw,
    Shield,
    Unlock,
    Zap
} from "lucide-react";

const JWTPage = () => {
    const { theme: currentTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    
    // Prevent hydration mismatch
    useEffect(() => {
        setMounted(true);
    }, []);
    
    const isDark = mounted ? (resolvedTheme === 'dark' || currentTheme === 'dark') : false;
    
    const [jwtToken, setJwtToken] = useState('');
    const [decodedHeader, setDecodedHeader] = useState('');
    const [decodedPayload, setDecodedPayload] = useState('');
    const [signature, setSignature] = useState('');
    const [headerInput, setHeaderInput] = useState('{\n  "alg": "HS256",\n  "typ": "JWT"\n}');
    const [payloadInput, setPayloadInput] = useState('{\n  "sub": "1234567890",\n  "name": "John Doe",\n  "iat": 1516239022,\n  "exp": 1735689600\n}');
    const [secretKey, setSecretKey] = useState('your-256-bit-secret');
    const [showSecret, setShowSecret] = useState(false);
    const [activeTab, setActiveTab] = useState('decode');
    const [copyStates, setCopyStates] = useState({});
    const [errors, setErrors] = useState({});
    const [isValidJWT, setIsValidJWT] = useState(false);
    const [tokenExpiry, setTokenExpiry] = useState(null);
    const [isTokenExpired, setIsTokenExpired] = useState(false);
    const [signatureValid, setSignatureValid] = useState(null);

    const sampleJWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjE3MzU2ODk2MDB9.kP_DQyZdBcVfOGaB8Q3lE7-PRLJXrOxcOw7D5tlA7Ok';

    // Theme configuration matching your design
    const theme = isDark ? {
        // Dark Mode (Professional Slate)
        background: "from-gray-900 via-gray-800 to-indigo-900",
        card: "bg-slate-800 border-slate-600",
        text: "text-white",
        textSecondary: "text-gray-300",
        input: "bg-slate-900 border-slate-600 text-white placeholder-gray-400",
        // accent: "bg-gradient-to-r from-[#6366f1] to-[#10b981] hover:from-[#4f46e5] hover:to-[#059669]",
        accent: "bg-teal-600 hover:bg-teal-700",
        headerBg: "bg-slate-700",
        payloadBg: "bg-gray-700",
        signatureBg: "bg-zinc-700",
        headerText: "text-slate-200",
        payloadText: "text-gray-200",
        signatureText: "text-zinc-200"
    } : {
        // Light Mode (Ocean Beach)
        background: "from-cyan-50 via-teal-50 to-amber-50",
        card: "bg-white border-teal-200 shadow-sm",
        text: "text-gray-900",
        textSecondary: "text-gray-600",
        input: "bg-gray-50 border-teal-300 text-gray-900 placeholder-gray-500",
        accent: "bg-teal-600 hover:bg-teal-700",
        headerBg: "bg-blue-50",
        payloadBg: "bg-green-50",
        signatureBg: "bg-purple-50",
        headerText: "text-blue-900",
        payloadText: "text-green-900",
        signatureText: "text-purple-900"
    };

    // Base64 URL encode/decode
    const base64UrlEncode = (str) => {
        return btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
    };

    const base64UrlDecode = (str) => {
        let padding = str.length % 4;
        if (padding) str += '='.repeat(4 - padding);
        return atob(str.replace(/-/g, '+').replace(/_/g, '/'));
    };

    // HMAC SHA256
    const hmacSHA256 = async (message, secret) => {
        const encoder = new TextEncoder();
        const key = await crypto.subtle.importKey(
            'raw', encoder.encode(secret),
            {name: 'HMAC', hash: 'SHA-256'}, false, ['sign']
        );
        const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(message));
        return base64UrlEncode(String.fromCharCode(...new Uint8Array(signature)));
    };

    // Verify signature
    const verifySignature = async (token, secret) => {
        try {
            const parts = token.split('.');
            if (parts.length !== 3) return false;
            const message = `${parts[0]}.${parts[1]}`;
            const expectedSignature = await hmacSHA256(message, secret);
            return parts[2] === expectedSignature;
        } catch { return false; }
    };

    const generateRandomSecret = () => {
        const array = new Uint8Array(32);
        crypto.getRandomValues(array);
        setSecretKey(Array.from(array, b => b.toString(16).padStart(2, '0')).join(''));
    };

    const updateTimestamps = () => {
        try {
            const payload = JSON.parse(payloadInput);
            const now = Math.floor(Date.now() / 1000);
            payload.iat = now;
            payload.exp = now + 3600;
            setPayloadInput(JSON.stringify(payload, null, 2));
        } catch {}
    };

    const formatTimestamp = (timestamp) => {
        if (!timestamp) return 'N/A';
        try { return new Date(timestamp * 1000).toLocaleString(); }
        catch { return 'Invalid'; }
    };

    const checkTokenExpiry = (payload) => {
        try {
            const payloadObj = JSON.parse(payload);
            if (payloadObj.exp) {
                const now = Math.floor(Date.now() / 1000);
                setTokenExpiry(payloadObj.exp);
                setIsTokenExpired(now > payloadObj.exp);
            } else {
                setTokenExpiry(null);
                setIsTokenExpired(false);
            }
        } catch {
            setTokenExpiry(null);
            setIsTokenExpired(false);
        }
    };

    const decodeJWT = async (token) => {
        try {
            const parts = token.split('.');
            if (parts.length !== 3) {
                setErrors({decode: 'Invalid JWT format. JWT should have 3 parts separated by dots.'});
                setIsValidJWT(false);
                setSignatureValid(null);
                return;
            }

            const header = JSON.parse(base64UrlDecode(parts[0]));
            const payload = JSON.parse(base64UrlDecode(parts[1]));
            const sig = parts[2];

            setDecodedHeader(JSON.stringify(header, null, 2));
            setDecodedPayload(JSON.stringify(payload, null, 2));
            setSignature(sig);
            setIsValidJWT(true);
            setErrors({});

            checkTokenExpiry(JSON.stringify(payload, null, 2));

            if (secretKey && secretKey !== 'your-256-bit-secret') {
                const isValid = await verifySignature(token, secretKey);
                setSignatureValid(isValid);
            } else {
                setSignatureValid(null);
            }
        } catch {
            setErrors({decode: 'Invalid JWT token. Please check the format.'});
            setIsValidJWT(false);
            setSignatureValid(null);
        }
    };

    const encodeJWT = async () => {
        try {
            const header = JSON.parse(headerInput);
            const payload = JSON.parse(payloadInput);

            const headerEncoded = base64UrlEncode(JSON.stringify(header));
            const payloadEncoded = base64UrlEncode(JSON.stringify(payload));
            const message = `${headerEncoded}.${payloadEncoded}`;

            const sig = await hmacSHA256(message, secretKey);
            const token = `${message}.${sig}`;

            setJwtToken(token);
            setErrors({});
            await decodeJWT(token);
        } catch {
            setErrors({encode: 'Invalid JSON format in header or payload.'});
        }
    };

    const exportToken = () => {
        const data = {
            token: jwtToken,
            header: decodedHeader,
            payload: decodedPayload,
            signature: signature,
            created: new Date().toISOString()
        };
        const blob = new Blob([JSON.stringify(data, null, 2)], {type: 'application/json'});
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'jwt-token.json';
        a.click();
        URL.revokeObjectURL(url);
    };

    const copyToClipboard = async (text, key) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopyStates({...copyStates, [key]: true});
            setTimeout(() => setCopyStates({...copyStates, [key]: false}), 2000);
        } catch (err) {
            console.error('Failed to copy: ', err);
        }
    };

    useEffect(() => {
        if (jwtToken && activeTab === 'decode') {
            decodeJWT(jwtToken);
        }
    }, [jwtToken, activeTab, secretKey]);

    useEffect(() => {
        setJwtToken(sampleJWT);
    }, []);

    const TabButton = ({tab, label, icon: Icon}) => (
        <button
            onClick={() => setActiveTab(tab)}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                activeTab === tab ? `${theme.accent} text-white` : `${theme.card} ${theme.text}`
            }`}
        >
            <Icon size={18}/>
            {label}
        </button>
    );

    const CopyButton = ({text, copyKey}) => (
        <button
            onClick={() => copyToClipboard(text, copyKey)}
            className={`p-2 rounded ${theme.card} ${theme.textSecondary} hover:opacity-70 transition-opacity`}
            title="Copy to clipboard"
        >
            {copyStates[copyKey] ? <Check size={16} className="text-green-500"/> : <Copy size={16}/>}
        </button>
    );

    if (!mounted) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-900 flex items-center justify-center">
                <div className="text-white text-xl">Loading...</div>
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
                            <Shield className="text-white" size={32}/>
                        </div>
                    </div>
                    <h1 className="text-4xl font-bold mb-3">JWT Encoder/Decoder</h1>
                    <p className={`${theme.textSecondary} text-lg max-w-2xl mx-auto`}>
                        Securely encode and decode JSON Web Tokens with signature verification
                    </p>
                </div>

                {/* Tab Navigation */}
                <div className="flex justify-center gap-4 mb-8">
                    <TabButton tab="decode" label="Decode JWT" icon={Unlock}/>
                    <TabButton tab="encode" label="Encode JWT" icon={Lock}/>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    {/* Left Panel */}
                    <div className="space-y-6">
                        {activeTab === 'decode' ? (
                            <>
                                {/* JWT Token Input */}
                                <div className={`${theme.card} rounded-xl p-6`}>
                                    <div className="flex items-center justify-between mb-4">
                                        <h2 className={`text-xl font-semibold flex items-center gap-2 ${theme.text}`}>
                                            <Code size={20}/>
                                            JWT Token Input
                                        </h2>
                                        <button
                                            onClick={() => setJwtToken(sampleJWT)}
                                            className={`px-4 py-2 ${theme.accent} text-white rounded-lg font-medium transition-colors`}
                                        >
                                            Load Sample
                                        </button>
                                    </div>
                                    
                                    <div>
                                        <label className={`block text-sm font-medium ${theme.textSecondary} mb-2`}>
                                            Paste your JWT token here:
                                        </label>
                                        <div className="relative">
                                            <textarea
                                                value={jwtToken}
                                                onChange={(e) => setJwtToken(e.target.value)}
                                                className={`w-full h-48 p-3 ${theme.input} rounded-lg resize-none font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
                                                placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                                            />
                                            <div className="absolute top-2 right-2">
                                                <CopyButton text={jwtToken} copyKey="jwt-input"/>
                                            </div>
                                        </div>
                                        {errors.decode && (
                                            <div className="flex items-center gap-2 text-red-500 text-sm mt-2 p-2 bg-red-50 rounded">
                                                <AlertCircle size={14}/>
                                                {errors.decode}
                                            </div>
                                        )}
                                    </div>

                                    {isValidJWT && (
                                        <div className="space-y-2 mt-4">
                                            <div className="flex items-center gap-2 text-green-600 text-sm p-2 bg-green-50 rounded">
                                                <Check size={14}/>
                                                Valid JWT format detected
                                            </div>

                                            {tokenExpiry && (
                                                <div className={`flex items-center gap-2 text-sm p-2 rounded ${
                                                    isTokenExpired ? 'text-red-600 bg-red-50' : 'text-green-600 bg-green-50'
                                                }`}>
                                                    <Clock size={14}/>
                                                    Token {isTokenExpired ? 'expired' : 'expires'} on {formatTimestamp(tokenExpiry)}
                                                </div>
                                            )}

                                            {signatureValid !== null && (
                                                <div className={`flex items-center gap-2 text-sm p-2 rounded ${
                                                    signatureValid ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'
                                                }`}>
                                                    <Shield size={14}/>
                                                    Signature {signatureValid ? 'verified' : 'invalid'}
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>

                                {/* Secret Key Section */}
                                <div className={`${theme.card} rounded-xl p-6`}>
                                    <div className="flex items-center justify-between mb-4">
                                        <h2 className={`text-xl font-semibold flex items-center gap-2 ${theme.text}`}>
                                            <Key size={20}/>
                                            Secret Key
                                        </h2>
                                        <button
                                            onClick={generateRandomSecret}
                                            className={`text-sm px-3 py-1 ${theme.accent} text-white rounded transition-colors flex items-center gap-1`}
                                        >
                                            <RefreshCw size={14}/>
                                            Generate
                                        </button>
                                    </div>
                                    
                                    <div>
                                        <label className={`block text-sm font-medium ${theme.textSecondary} mb-2`}>
                                            Secret Key (for signature verification):
                                        </label>
                                        <div className="relative">
                                            <input
                                                type={showSecret ? 'text' : 'password'}
                                                value={secretKey}
                                                onChange={(e) => setSecretKey(e.target.value)}
                                                className={`w-full p-3 pr-12 ${theme.input} rounded-lg font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
                                                placeholder="Enter secret key"
                                            />
                                            <button
                                                onClick={() => setShowSecret(!showSecret)}
                                                className={`absolute right-3 top-3 ${theme.textSecondary} hover:opacity-70 transition-opacity`}
                                            >
                                                {showSecret ? <EyeOff size={16}/> : <Eye size={16}/>}
                                            </button>
                                        </div>
                                        <p className={`${theme.textSecondary} text-xs mt-2 flex items-center gap-1`}>
                                            <AlertCircle size={12}/>
                                            Secret key is required for signature verification
                                        </p>
                                    </div>
                                </div>
                                {/* About JWT */}
                                <div className={`${theme.card} rounded-xl p-6 mt-10 max-w-2xl `}>
                                    <h3 className={`text-xl font-semibold mb-4 ${theme.text} flex items-left justify-left gap-2`}>
                                        <Shield size={20}/>
                                        About JWT (JSON Web Token)
                                    </h3>
                                    <div className="flex flex-col items-right">
                                        <p className={`${theme.textSecondary} leading-relaxed mb-4 text-left max-w-2xl`}>
                                            <strong className={`${theme.text}`}>JSON Web Token (JWT)</strong> is a compact, URL-safe means of representing claims between two parties securely. It's an open standard (RFC 7519) for transmitting information as a JSON object.
                                        </p>
                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-3xl">
                                            <div className={`p-3 ${theme.headerBg} rounded-lg border-l-4 border-blue-500`}>
                                                <div className="flex items-center gap-2 mb-2">
                                                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                                    <strong className={`${theme.text} text-sm`}>Header</strong>
                                                </div>
                                                <p className={`text-xs ${theme.textSecondary}`}>Token type and signing algorithm</p>
                                            </div>
                                            <div className={`p-3 ${theme.payloadBg} rounded-lg border-l-4 border-green-500`}>
                                                <div className="flex items-center gap-2 mb-2">
                                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                                    <strong className={`${theme.text} text-sm`}>Payload</strong>
                                                </div>
                                                <p className={`text-xs ${theme.textSecondary}`}>Claims and user data</p>
                                            </div>
                                            <div className={`p-3 ${theme.signatureBg} rounded-lg border-l-4 border-purple-500`}>
                                                <div className="flex items-center gap-2 mb-2">
                                                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                                                    <strong className={`${theme.text} text-sm`}>Signature</strong>
                                                </div>
                                                <p className={`text-xs ${theme.textSecondary}`}>Verifies integrity and authenticity</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : (
                            /* Encode Tab */
                            <div className={`${theme.card} rounded-xl p-6`}>
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className={`text-xl font-semibold flex items-center gap-2 ${theme.text}`}>
                                        <Code size={20}/>
                                        JWT Components
                                    </h2>
                                </div>

                                <div className="space-y-4">
                                    {/* Header */}
                                    <div>
                                        <label className={`block text-sm font-medium ${theme.textSecondary} mb-2`}>Header:</label>
                                        <div className="relative">
                                            <textarea
                                                value={headerInput}
                                                onChange={(e) => setHeaderInput(e.target.value)}
                                                className={`w-full h-24 p-3 ${theme.input} rounded-lg resize-none font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
                                            />
                                            <div className="absolute top-2 right-2">
                                                <CopyButton text={headerInput} copyKey="header-input"/>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Payload */}
                                    <div>
                                        <div className="flex items-center justify-between mb-2">
                                            <label className={`block text-sm font-medium ${theme.textSecondary}`}>Payload:</label>
                                            <button
                                                onClick={updateTimestamps}
                                                className={`text-xs px-2 py-1 ${theme.accent} text-white rounded transition-colors flex items-center gap-1`}
                                            >
                                                <Clock size={12}/>
                                                Update
                                            </button>
                                        </div>
                                        <div className="relative">
                                            <textarea
                                                value={payloadInput}
                                                onChange={(e) => setPayloadInput(e.target.value)}
                                                className={`w-full h-32 p-3 ${theme.input} rounded-lg resize-none font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
                                            />
                                            <div className="absolute top-2 right-2">
                                                <CopyButton text={payloadInput} copyKey="payload-input"/>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Secret Key */}
                                    <div>
                                        <div className="flex items-center justify-between mb-2">
                                            <label className={`block text-sm font-medium ${theme.textSecondary} flex items-center gap-1`}>
                                                <Key size={14}/>
                                                Secret Key:
                                            </label>
                                            <button
                                                onClick={generateRandomSecret}
                                                className={`text-xs px-2 py-1 ${theme.accent} text-white rounded transition-colors flex items-center gap-1`}
                                            >
                                                <RefreshCw size={12}/>
                                                Generate
                                            </button>
                                        </div>
                                        <div className="relative">
                                            <input
                                                type={showSecret ? 'text' : 'password'}
                                                value={secretKey}
                                                onChange={(e) => setSecretKey(e.target.value)}
                                                className={`w-full p-3 pr-12 ${theme.input} rounded-lg font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
                                            />
                                            <button
                                                onClick={() => setShowSecret(!showSecret)}
                                                className={`absolute right-3 top-3 ${theme.textSecondary} hover:opacity-70 transition-opacity`}
                                            >
                                                {showSecret ? <EyeOff size={16}/> : <Eye size={16}/>}
                                            </button>
                                        </div>
                                    </div>

                                    <button
                                        onClick={encodeJWT}
                                        className={`w-full py-3 ${theme.accent} text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2`}
                                    >
                                        <Zap size={18}/>
                                        Generate JWT Token
                                    </button>

                                    {errors.encode && (
                                        <div className="flex items-center gap-2 text-red-500 text-sm p-2 bg-red-50 rounded">
                                            <AlertCircle size={14}/>
                                            {errors.encode}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Panel */}
                    <div className="space-y-6">
                        {activeTab === 'decode' ? (
                            <>
                                {/* Header */}
                                <div className={`${theme.card} rounded-xl p-4`}>
                                    <div className="flex items-center justify-between mb-3">
                                        <h3 className={`font-medium ${theme.text} flex items-center gap-2`}>
                                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                            Header
                                        </h3>
                                        <CopyButton text={decodedHeader} copyKey="header"/>
                                    </div>
                                    <pre className={`${theme.headerBg} p-3 rounded-lg overflow-auto text-sm font-mono max-h-32`}>
                                        <code className={`${theme.headerText}`}>{decodedHeader || 'No valid JWT token provided'}</code>
                                    </pre>
                                </div>

                                {/* Payload */}
                                <div className={`${theme.card} rounded-xl p-4`}>
                                    <div className="flex items-center justify-between mb-3">
                                        <h3 className={`font-medium ${theme.text} flex items-center gap-2`}>
                                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                            Payload
                                        </h3>
                                        <CopyButton text={decodedPayload} copyKey="payload"/>
                                    </div>
                                    <pre className={`${theme.payloadBg} p-3 rounded-lg overflow-auto text-sm font-mono max-h-32`}>
                                        <code className={`${theme.payloadText}`}>{decodedPayload || 'No valid JWT token provided'}</code>
                                    </pre>

                                    {decodedPayload && (
                                        <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                                            {(() => {
                                                try {
                                                    const payload = JSON.parse(decodedPayload);
                                                    return (
                                                        <>
                                                            {payload.iat && (
                                                                <div className={`p-2 ${theme.card} rounded border-l-2 border-blue-500`}>
                                                                    <div className="flex items-center gap-1">
                                                                        <Calendar size={10}/>
                                                                        <span className={`font-medium ${theme.text}`}>Issued:</span>
                                                                    </div>
                                                                    <span className={`${theme.textSecondary}`}>{formatTimestamp(payload.iat)}</span>
                                                                </div>
                                                            )}
                                                            {payload.exp && (
                                                                <div className={`p-2 ${theme.card} rounded border-l-2 border-green-500`}>
                                                                    <div className="flex items-center gap-1">
                                                                        <Clock size={10}/>
                                                                        <span className={`font-medium ${theme.text}`}>Expires:</span>
                                                                    </div>
                                                                    <span className={`${theme.textSecondary}`}>{formatTimestamp(payload.exp)}</span>
                                                                </div>
                                                            )}
                                                        </>
                                                    );
                                                } catch { return null; }
                                            })()}
                                        </div>
                                    )}
                                </div>

                                {/* Signature */}
                                <div className={`${theme.card} rounded-xl p-4`}>
                                    <div className="flex items-center justify-between mb-3">
                                        <h3 className={`font-medium ${theme.text} flex items-center gap-2`}>
                                            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                                            Signature
                                        </h3>
                                        <CopyButton text={signature} copyKey="signature"/>
                                    </div>
                                    <pre className={`${theme.signatureBg} p-3 rounded-lg overflow-auto text-sm font-mono`}>
                                        <code className={`${theme.signatureText} break-all`}>{signature || 'No valid JWT token provided'}</code>
                                    </pre>
                                    <div className={`mt-3 p-2 ${theme.card} border-l-2 border-yellow-500 rounded`}>
                                        <p className={`${theme.textSecondary} text-xs flex items-center gap-1`}>
                                            <Shield size={12}/>
                                            Enter your secret key above to verify signature integrity.
                                        </p>
                                    </div>
                                </div>

                                {jwtToken && (
                                    <button
                                        onClick={exportToken}
                                        className={`w-full py-2 ${theme.card} ${theme.text} rounded-lg font-medium transition-colors flex items-center justify-center gap-2`}
                                    >
                                        <Download size={16}/>
                                        Export Token Data
                                    </button>
                                )}
                            </>
                        ) : (
                             /* Generated Token */
                        <>
                            <div className={`${theme.card} rounded-xl p-6`}>
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className={`font-medium ${theme.text} flex items-center gap-2`}>
                                        <Zap size={18}/>
                                        Generated JWT Token
                                    </h3>
                                    <div className="flex gap-2">
                                        <CopyButton text={jwtToken} copyKey="generated-jwt"/>
                                        {jwtToken && (
                                            <button
                                                onClick={exportToken}
                                                className={`p-2 rounded ${theme.card} ${theme.textSecondary} hover:opacity-70 transition-opacity`}
                                            >
                                                <Download size={16}/>
                                            </button>
                                        )}
                                    </div>
                                </div>
                                <div className={`${theme.input} p-4 rounded-lg min-h-80 border-2 border-dashed ${isDark ? 'border-gray-600' : 'border-gray-300'}`}>
                                    <code className={`${theme.text} break-all font-mono text-sm leading-relaxed`}>
                                        {jwtToken || 'Click "Generate JWT Token" to create a new token'}
                                    </code>
                                </div>
                                {jwtToken && (
                                    <div className="mt-3 p-3 bg-green-50 rounded-lg">
                                        <p className="text-green-700 flex items-center gap-2 font-medium text-sm">
                                            <Check size={16}/>
                                            JWT token generated successfully!
                                        </p>
                                    </div>
                                )}
                            </div>
                                {/* About JWT */}
                            <div className={`${theme.card} rounded-xl p-6 mt-10 max-w-2xl `}>
                                <h3 className={`text-xl font-semibold mb-4 ${theme.text} flex items-left justify-left gap-2`}>
                                    <Shield size={20}/>
                                    About JWT (JSON Web Token)
                                </h3>
                                <div className="flex flex-col items-right">
                                    <p className={`${theme.textSecondary} leading-relaxed mb-4 text-left max-w-2xl`}>
                                        <strong className={`${theme.text}`}>JSON Web Token (JWT)</strong> is a compact, URL-safe means of representing claims between two parties securely. It's an open standard (RFC 7519) for transmitting information as a JSON object.
                                    </p>
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-3xl">
                                        <div className={`p-3 ${theme.headerBg} rounded-lg border-l-4 border-blue-500`}>
                                            <div className="flex items-center gap-2 mb-2">
                                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                                <strong className={`${theme.text} text-sm`}>Header</strong>
                                            </div>
                                            <p className={`text-xs ${theme.textSecondary}`}>Token type and signing algorithm</p>
                                        </div>
                                        <div className={`p-3 ${theme.payloadBg} rounded-lg border-l-4 border-green-500`}>
                                            <div className="flex items-center gap-2 mb-2">
                                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                                <strong className={`${theme.text} text-sm`}>Payload</strong>
                                            </div>
                                            <p className={`text-xs ${theme.textSecondary}`}>Claims and user data</p>
                                        </div>
                                        <div className={`p-3 ${theme.signatureBg} rounded-lg border-l-4 border-purple-500`}>
                                            <div className="flex items-center gap-2 mb-2">
                                                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                                                <strong className={`${theme.text} text-sm`}>Signature</strong>
                                            </div>
                                            <p className={`text-xs ${theme.textSecondary}`}>Verifies integrity and authenticity</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                        )}
                    </div>
                </div>

                
            </div>
        </div>
    );
};

export default JWTPage;