'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, ArrowLeft, Loader2, User, Bot } from 'lucide-react';

interface Message {
  role: 'ai' | 'user';
  content: string;
  timestamp: Date;
}

interface DialoguePhase {
  phase: number;
  question: string;
  evaluationCriteria: string[];
}

const DIALOGUE_PHASES: DialoguePhase[] = [
  {
    phase: 1,
    question: `Welcome to WONDER.

Before we begin, I should be honest with you: This isn't a test of what you know about philosophy. There are no right answers here.

I'm curious about how you think.

When you're ready, tell me: What's something you once believed strongly, but no longer believe? It doesn't have to be philosophical—it could be about anything. I'm curious what changed your mind.`,
    evaluationCriteria: ['intellectual_humility', 'self_awareness', 'specificity'],
  },
  {
    phase: 2,
    question: `That's interesting. {ADAPTIVE_RESPONSE}

Let me ask you something that might feel strange: Do you think it's possible to be certain about anything? Not just confident—truly, unshakably certain?

If yes, what are you certain about?
If no, how do you make decisions without certainty?`,
    evaluationCriteria: ['nuance', 'honesty', 'reasoning_shown'],
  },
  {
    phase: 3,
    question: `{ADAPTIVE_RESPONSE}

Here's something more personal: Is there a question you're afraid to ask yourself? Something you've been avoiding thinking about?

You don't have to share what it is. But I'm curious: Do you think there are questions we shouldn't ask?`,
    evaluationCriteria: ['vulnerability', 'thoughtfulness', 'balance'],
  },
  {
    phase: 4,
    question: `{ADAPTIVE_RESPONSE}

We're almost done. One last question:

What surprised you about this conversation? Or—if nothing surprised you—what did you notice about yourself?`,
    evaluationCriteria: ['self_reflection', 'engagement', 'openness'],
  },
];

interface Props {
  email: string;
  onComplete: (result: { status: 'admitted' | 'declined' | 'retry_allowed'; score?: number }) => void;
  onBack: () => void;
}

export default function SocraticDialogue({ email, onComplete, onBack }: Props) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentPhase, setCurrentPhase] = useState(0);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Start dialogue with first AI message
  useEffect(() => {
    const timer = setTimeout(() => {
      setMessages([{
        role: 'ai',
        content: DIALOGUE_PHASES[0].question,
        timestamp: new Date(),
      }]);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Auto-resize textarea
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = `${Math.min(e.target.scrollHeight, 200)}px`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isThinking) return;

    const userMessage = input.trim();
    setInput('');
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
    }

    // Add user message
    setMessages(prev => [...prev, {
      role: 'user',
      content: userMessage,
      timestamp: new Date(),
    }]);

    setIsThinking(true);

    // Check if this is the last phase
    if (currentPhase === DIALOGUE_PHASES.length - 1) {
      // Final evaluation
      setIsEvaluating(true);

      try {
        const response = await fetch('/api/gate/evaluate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email,
            challengeType: 'dialogue',
            messages: [...messages, { role: 'user', content: userMessage, timestamp: new Date() }],
          }),
        });

        const result = await response.json();

        // Add final AI message
        setMessages(prev => [...prev, {
          role: 'ai',
          content: result.status === 'admitted'
            ? `Thank you for thinking with me.

WONDER isn't a place for people who have all the answers. It's for people who find the questions worth living with.

Based on our conversation, I think you belong here.

Welcome to WONDER.`
            : result.status === 'retry_allowed'
            ? `Thank you for this conversation.

I noticed something interesting in how you engaged, but I'd like to understand you better.

WONDER values genuine inquiry. Before I let you in, I'm curious:

What do YOU think? Should you be here?`
            : `Thank you for this conversation.

WONDER might not be the right place right now. Sometimes the timing isn't right.

The door will be here when you're ready.`,
          timestamp: new Date(),
        }]);

        setTimeout(() => {
          onComplete({ status: result.status, score: result.score });
        }, 3000);
      } catch {
        // Handle error gracefully
        setMessages(prev => [...prev, {
          role: 'ai',
          content: 'I apologize—something went wrong on our end. Please try again in a moment.',
          timestamp: new Date(),
        }]);
      }

      setIsThinking(false);
      setIsEvaluating(false);
      return;
    }

    // Generate next AI response
    try {
      const response = await fetch('/api/gate/dialogue', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          currentPhase,
          userResponse: userMessage,
          history: messages,
        }),
      });

      const data = await response.json();

      // Move to next phase
      const nextPhase = currentPhase + 1;
      setCurrentPhase(nextPhase);

      // Add AI response (either adaptive or next phase question)
      setMessages(prev => [...prev, {
        role: 'ai',
        content: data.aiResponse || DIALOGUE_PHASES[nextPhase].question,
        timestamp: new Date(),
      }]);
    } catch {
      // Fallback to static question
      const nextPhase = currentPhase + 1;
      setCurrentPhase(nextPhase);
      setMessages(prev => [...prev, {
        role: 'ai',
        content: DIALOGUE_PHASES[nextPhase].question.replace('{ADAPTIVE_RESPONSE}', 'I appreciate your thoughtfulness.'),
        timestamp: new Date(),
      }]);
    }

    setIsThinking(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col h-[calc(100vh-12rem)]"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Back</span>
        </button>
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <span>Phase {currentPhase + 1} of {DIALOGUE_PHASES.length}</span>
          <div className="flex gap-1">
            {DIALOGUE_PHASES.map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition-colors ${
                  i <= currentPhase ? 'bg-teal-500' : 'bg-slate-200'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto bg-white rounded-2xl border border-slate-200 p-4 space-y-4">
        <AnimatePresence mode="popLayout">
          {messages.map((message, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                message.role === 'ai' ? 'bg-teal-100' : 'bg-slate-100'
              }`}>
                {message.role === 'ai' ? (
                  <Bot className="w-4 h-4 text-teal-600" />
                ) : (
                  <User className="w-4 h-4 text-slate-600" />
                )}
              </div>
              <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                message.role === 'ai'
                  ? 'bg-slate-50 text-slate-800'
                  : 'bg-teal-500 text-white'
              }`}>
                <p className="whitespace-pre-wrap text-sm leading-relaxed">
                  {message.content}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Thinking indicator */}
        {isThinking && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex gap-3"
          >
            <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center">
              <Bot className="w-4 h-4 text-teal-600" />
            </div>
            <div className="bg-slate-50 rounded-2xl px-4 py-3">
              <div className="flex items-center gap-2 text-slate-500 text-sm">
                <Loader2 className="w-4 h-4 animate-spin" />
                {isEvaluating ? 'Reflecting on our conversation...' : 'Thinking...'}
              </div>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="relative">
          <textarea
            ref={inputRef}
            value={input}
            onChange={handleInputChange}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
            placeholder="Share your thoughts..."
            rows={1}
            className="w-full px-4 py-3 pr-12 rounded-xl border border-slate-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all resize-none"
            disabled={isThinking || isEvaluating}
          />
          <button
            type="submit"
            disabled={!input.trim() || isThinking}
            className="absolute right-2 bottom-2 p-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        <p className="text-xs text-slate-500 mt-2">
          Press Enter to send, Shift+Enter for new line
        </p>
      </form>
    </motion.div>
  );
}
