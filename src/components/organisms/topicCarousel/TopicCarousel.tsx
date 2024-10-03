import React, { useEffect, useState } from 'react';

interface Topic {
  id: number;
  name: string;
  link: string;
}

interface TopicCarouselProps {
  topics: Topic[];
}

const TopicCarousel: React.FC<TopicCarouselProps> = ({ topics }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % topics.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [topics.length]);

  return (
    <div className="flex h-[580px] w-[346px] flex-col items-center justify-center rounded-lg border border-line-default px-5">
      {topics.map((topic, index) => (
        <a 
          key={topic.id} 
          href={topic.link} 
          className={`subtitle-sm-medium flex h-[54px] w-full items-center border-b border-line-light transition-opacity duration-500 ${
            index === currentIndex ? 'text-primary-500 opacity-60' : 'opacity-100'
          }`} 
          target="_blank"
          rel="noopener noreferrer"
        >
          <div>
            {`${topic.id}. ${topic.name}`}
          </div>
        </a>
      ))}
    </div>
  );
};

export default TopicCarousel;