import React, { useEffect, useRef, useState } from 'react';
import iconPlus from '../../assets/images/icon-plus.svg';
import iconMinus from '../../assets/images/icon-minus.svg';
import { Dispatch, SetStateAction } from 'react';

import './FaqItem.css';
import debounce from 'debounce';

interface FaqItemProps {
  index: number;
  question: string;
  answer: string;
  isExpanded: boolean;
  setActiveFaq: Dispatch<SetStateAction<number | null>>;
}

const FaqItem = ({
  index,
  question,
  answer,
  isExpanded,
  setActiveFaq,
}: FaqItemProps) => {
  const answerRef = useRef<HTMLParagraphElement>(null);
  const [maxHeight, setMaxHeight] = useState<number>(0);

  useEffect(() => {
    if (!answerRef.current) return;

    setMaxHeight(answerRef.current?.scrollHeight || 0);

    const handleResize = debounce(() => {
      setMaxHeight(answerRef.current?.scrollHeight || 0);
    }, 200);

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [answerRef]);

  const handleFocus = () => {
    setActiveFaq(index);
  };

  return (
    <div
      className={`faq-item ${!isExpanded ? 'is-collapsed' : ''}`}
      onFocus={handleFocus}
    >
      <button className="faq-cta">
        <span className="question">{question}</span>
        <img
          className="cta-icon"
          src={isExpanded ? iconMinus : iconPlus}
          alt=""
        />
      </button>
      <div
        className="answer-container"
        style={{ '--content-height': `${maxHeight}px` } as React.CSSProperties}
      >
        <p ref={answerRef}>{answer}</p>
      </div>
    </div>
  );
};

export default FaqItem;
