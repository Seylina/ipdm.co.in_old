import React from 'react';

interface TrademarkProps {
  text?: string;
  className?: string;
}

export const Trademark: React.FC<TrademarkProps> = ({ text, className = "" }) => {
  if (!text) return <span className="tm-gradient">™</span>;
  
  if (text.includes('™')) {
    const parts = text.split('™');
    return (
      <span className={className}>
        {parts.map((part, index) => (
          <React.Fragment key={index}>
            {part}
            {index < parts.length - 1 && <span className="tm-gradient">™</span>}
          </React.Fragment>
        ))}
      </span>
    );
  }
  
  return <span className={className}>{text}</span>;
};
