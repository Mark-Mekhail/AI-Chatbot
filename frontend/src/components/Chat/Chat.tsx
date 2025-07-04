import { useRef, useEffect } from 'react';
import { useChat } from '../../hooks/useChat';
import { ChatInput } from './ChatInput';
import { Message } from './Message';
import styles from './Chat.module.css';

export function Chat() {
  const initialMessage = {
    role: 'assistant' as const,
    content: "Hello! Ask me anything.",
    timestamp: new Date(),
  };

  const { messages, isLoading, isStreaming, sendMessage, cancelStream } = useChat([initialMessage]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isStreaming) {
      const scrollInterval = setInterval(scrollToBottom, 300);
      return () => clearInterval(scrollInterval);
    }
  }, [isStreaming]);

  return (
    <div className={styles['chat-container']}>
      <div className={styles['messages-container']}>
        {messages.map((message, index) => (
          <Message key={index} message={message} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      <ChatInput
        onSendMessage={sendMessage}
        isLoading={isLoading}
        onCancelStream={cancelStream}
        isStreaming={isStreaming}
      />
    </div>
  );
}
