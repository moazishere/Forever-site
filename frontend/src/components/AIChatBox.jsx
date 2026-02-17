import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Sparkles, Loader2 } from 'lucide-react';
import axios from 'axios'; 
import { backendUrl } from '../context/ShopContext'

const AIChatBox = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const scrollRef = useRef(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMsg = { role: 'user', content: input };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setLoading(true);

        try {
            
            const response = await axios.post(backendUrl + '/api/ai/chat', { 
                userQuery: input 
            });

            const aiData = response.data;
            
            const aiMsg = { 
                role: 'ai', 
                content: aiData.analysis,
                recommendations: aiData.recommendations 
            };
            
            setMessages(prev => [...prev, aiMsg]);
        } catch (error) {
            setMessages(prev => [...prev, { role: 'ai', content: "An error happend when trying to connect with the AI" }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
            {isOpen && (
                <div className="mb-4 w-80 md:w-96 h-[500px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5">
                    {/* Header */}
                    <div className="bg-black p-4 text-white flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <Sparkles size={18} className="text-pink-500" />
                            <span className="font-medium">FOREVER AI Assistant</span>
                        </div>
                        <button onClick={() => setIsOpen(false)}><X size={20} /></button>
                    </div>

                    {/* Chat Messages */}
                    <div ref={scrollRef} className="flex-1 p-4 overflow-y-auto bg-gray-50 flex flex-col gap-4">
                        {messages.length === 0 && (
                            <p className="text-center text-gray-400 text-sm mt-10">Ask me about any outfit idea that comes to mind!</p>
                        )}
                        {messages.map((msg, index) => (
                            <div key={index} className={`max-w-[85%] p-3 rounded-lg text-sm ${msg.role === 'user' ? 'bg-black text-white self-end rounded-tr-none' : 'bg-white border text-gray-800 self-start rounded-tl-none'}`}>
                                {msg.content}
                                
                                {/* عرض المنتجات المقترحة إذا وجدت */}
                                {msg.recommendations && (
                                    <div className="mt-3 flex flex-col gap-2">
                                        {msg.recommendations.map((item, i) => (
                                            <div key={i} className="bg-pink-50 p-2 rounded border border-pink-100">
                                                <p className="font-bold text-pink-700">{item.productName}</p>
                                                <p className="text-[11px] text-gray-600 leading-tight">{item.reason}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                        {loading && <Loader2 className="animate-spin text-pink-500 self-start" size={20} />}
                    </div>

                    {/* Input Area */}
                    <div className="p-3 border-t flex gap-2">
                        <input
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Example: Men T-shirt"
                            className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm outline-none focus:ring-1 focus:ring-black"
                        />
                        <button onClick={handleSend} className="bg-black text-white p-2 rounded-full"><Send size={18} /></button>
                    </div>
                </div>
            )}

            {/* Floating Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="bg-black text-white p-4 rounded-full shadow-xl hover:scale-110 transition-transform active:scale-95"
            >
                {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
            </button>
        </div>
    );
};

export default AIChatBox;