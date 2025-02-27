"use client";


import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircleMore, Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Markdown from 'react-markdown';


type ChatProps = {
    token: string
}

export default function ChatComponent({ token }: ChatProps) {
    const [messages, setMessages] = useState<string[]>([]);
    const [isTyping, setIsTyping] = useState(false);
    const [isThinking, setIsThinking] = useState(false);
    const chatRef = useRef<HTMLDivElement>(null);


    const [show, setSHow] = useState<boolean>(false)
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const sendMessage = async () => {
        if (!input.trim()) return;
        setLoading(true);
        setMessages((prev) => [...prev, `User: ${input}`, `AI: Loading ...`]);
        setInput("");
        setIsTyping(true);
        setIsThinking(false);
        const body = { session_id: 'session_123', token, content: input }
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL!}/chat`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });
        const reader = response.body?.getReader()
        if (!reader) {
            console.log("No reader :::")
            return
        };
        let aiResponse = "AI: ";
        const decoder = new TextDecoder();
        while (true) {
            const { value, done } = await reader.read();
            if (done) break;
            aiResponse += decoder.decode(value, {stream: true});
            setMessages((prev) => [...prev.slice(0, -1), aiResponse]);
        }
        setLoading(false);

    };

    const toggleShow = () => (
        setSHow(!show)
    )



    useEffect(() => {
        if (chatRef.current) {
            chatRef.current.scrollTo({ top: chatRef.current.scrollHeight +  100, behavior: "smooth"})
        }
    }, [messages, isThinking, isTyping]);

    return (
        <div className="fixed bottom-5 right-5 z-50">
            <div className="flex flex-col justify-end gap-2 items-end">
                {
                    show ? <Card className="shadow-lg border border-gray-200 w-80">
                        <CardContent className="p-4 flex flex-col space-y-3 h-80 overflow-y-auto">
                            <ScrollArea ref={chatRef}>
                                <div className="flex flex-col gap-3">
                                {messages.map((msg, i) => (
                                    <div key={`message-${i}`} className={`flex ${msg.startsWith("User: ") ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`p-2 rounded-md max-w-60 overflow-x-auto text-xs ${msg.startsWith("User: ") ? "dark:bg-slate-800 dark:text-white bg-slate-100 self-end" : "dark:bg-slate-700 bg-slate-200 px-4 self-start "}`}>
                                            <Markdown >{msg.replace('User: ', '').replace('AI: ', '')}</Markdown>
                                        </div>
                                    </div>
                                ))}
                                </div>
                            </ScrollArea>
                        </CardContent>
                        <div className="flex items-center p-2 border-t gap-2">
                            <Input
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Type a message..."
                                className="flex-grow"
                                onKeyDown={(e) => {
                                    if (e.key === "enter") {
                                        sendMessage()
                                    }
                                }}
                            />
                            <Button disabled={loading} onClick={sendMessage} size="icon">
                                <Send size={16} />
                            </Button>
                        </div>
                    </Card> : null
                }
                <Button className="rounded-full" onClick={toggleShow} size="icon">
                    <MessageCircleMore size="md" />
                </Button>
            </div>
        </div>
    );
}
