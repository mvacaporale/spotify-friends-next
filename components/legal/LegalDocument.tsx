// Create a shared component for legal documents in src/components/LegalDocument.tsx

import React from 'react';
import styles from './LegalDocument.module.css';
import ReactMarkdown from 'react-markdown';


interface LegalDocumentProps {
  title: string;
  content: string;
}

export default function LegalDocument({ title, content }: LegalDocumentProps) {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6">{title}</h1>
        <div className={styles.markdownContent}>
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
