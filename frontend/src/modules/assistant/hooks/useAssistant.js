import { useState } from 'react';
import { assistantApi } from '../api';

export function useAssistant() {
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      sender: 'assistant',
      text: 'Greetings! I am the Greenfield International School Assistant. How may I assist you with our admissions, academic pathways, campus facilities, or daily schedules today?',
      timestamp: 'Just now',
    },
  ]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async (userPrompt) => {
    const userMsg = {
      id: String(Date.now()),
      sender: 'user',
      text: userPrompt,
      timestamp: 'Just now',
    };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      const response = await assistantApi.query(userPrompt);
      const assistantMsg = {
        id: String(Date.now() + 1),
        sender: 'assistant',
        text: response.answer || 'Thank you for inquiring. Our admissions desk will follow up shortly.',
        timestamp: 'Just now',
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch {
      const fallbackMsg = {
        id: String(Date.now() + 1),
        sender: 'assistant',
        text: 'Admissions for AY 2026-27 are open. You may submit an online inquiry or call +91 40 8920 4400.',
        timestamp: 'Just now',
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setLoading(false);
    }
  };

  return {
    messages,
    loading,
    sendMessage,
    setMessages,
  };
}
