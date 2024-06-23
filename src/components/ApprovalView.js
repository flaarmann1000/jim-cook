import React, { useState } from 'react';
import { Button } from './ui/Button';
import RotatingEmoji from './RotatingEmoji';
import '../styles/styles.css'; 

const ApprovalView = ({ extractedContent, approveAndSendToOpenAI, setCurrentView, convertLoading }) => {
  const [isTextExpanded, setIsTextExpanded] = useState(false);
  const [isMetaExpanded, setIsMetaExpanded] = useState(false);

  if (!extractedContent) return null;

  const { textContent, metaTags } = extractedContent;

  const toggleText = () => setIsTextExpanded(!isTextExpanded);
  const toggleMeta = () => setIsMetaExpanded(!isMetaExpanded);

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="font-bold text-xl mb-4">Review Extracted Content</h2>
      <div className="mb-4">
        <h3 className="text font-bold mb-2 cursor-pointer" onClick={toggleText}>
          {isTextExpanded ? 'Hide Extracted Text' : '→ Extracted Text'}
        </h3>
        {isTextExpanded && (
          <pre className="whitespace-pre-wrap bg-gray-100 p-2 rounded">{textContent}</pre>
        )}
      </div>
      <div className="mb-4">
        <h3 className="text font-bold mb-2 cursor-pointer" onClick={toggleMeta}>
          {isMetaExpanded ? 'Hide Meta Tags' : '→ Meta Tags'}
        </h3>
        {isMetaExpanded && (
          <pre className="whitespace-pre-wrap bg-gray-100 p-2 rounded">{JSON.stringify(metaTags, null, 2)}</pre>
        )}
      </div>
      <div className="mt-4 flex justify-between">
        <Button variant="outline" onClick={() => setCurrentView('gallery')}>Back to Gallery</Button>
        <Button
          onClick={approveAndSendToOpenAI}
          className="flex items-center"
          variant="secondary"
          disabled={convertLoading}
        >
          {convertLoading ? 'Converting...' : 'Convert to Recipe'}
        </Button>
      </div>
      {convertLoading && <div className="text-center mt-4"><RotatingEmoji emoji="🌶️" /></div>}
    </div>
  );
};

export default ApprovalView;
