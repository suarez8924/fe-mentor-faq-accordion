import faqItemsData from '../../data';
import FaqItem from '../faq-item/FaqItem';
import './FaqCard.css';
import starIcon from '../../assets/images/icon-star.svg';
import { useEffect, useRef, useState } from 'react';

export const FaqCard = () => {
  const [currentFaqIndex, setCurrentFaqIndex] = useState<number | null>(null);
  const cardRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
        setCurrentFaqIndex(null);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [cardRef]);

  return (
    <section ref={cardRef} className="faq-card">
      <header className="header">
        <img src={starIcon} alt="" />
        <h1 className="title">FAQs</h1>
      </header>
      <ul className="faq-list">
        {faqItemsData.map(({ id, question, answer }, index) => (
          <li key={id} className="faq-list-item">
            <FaqItem
              index={index}
              question={question}
              answer={answer}
              setActiveFaq={setCurrentFaqIndex}
              isExpanded={currentFaqIndex === index}
            />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default FaqCard;
