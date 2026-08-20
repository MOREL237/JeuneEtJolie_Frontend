'use client';

import { LookCard } from './LookCard';

const looks = [
  {
    id: '1',
    number: '1',
    title: 'L\'Elegance Pure',
    image: 'https://lh3.googleusercontent.com/aida/ADBb0ugslgsjqU5R0ZV2Ageie9XcwZw-flEl096qDxABlCT0EOgailmOC7cOWL3zKXbcyqsYzw7IzLw3YQ_6xzWWu3SqTCC_HO-azDeGxfYe3cWRmkf9FR4-Fqba96-bDHsA1NhZyAdbKCkTD9wMuMVuj9fKOpvBtwlcP648nmaXRMfeHXbx2HNcJDvCIYKrKK5Prtda5f6UGcpjuoIqoFGx3ZSGAmFdBTybweOSfCbq-W-eX3FTqYrgeTgxBb8',
  },
  {
    id: '2',
    number: '2',
    title: 'La Femme d\'Affaires',
    image: 'https://lh3.googleusercontent.com/aida/ADBb0ugslgsjqU5R0ZV2Ageie9XcwZw-flEl096qDxABlCT0EOgailmOC7cOWL3zKXbcyqsYzw7IzLw3YQ_6xzWWu3SqTCC_HO-azDeGxfYe3cWRmkf9FR4-Fqba96-bDHsA1NhZyAdbKCkTD9wMuMVuj9fKOpvBtwlcP648nmaXRMfeHXbx2HNcJDvCIYKrKK5Prtda5f6UGcpjuoIqoFGx3ZSGAmFdBTybweOSfCbq-W-eX3FTqYrgeTgxBb8',
  },
  {
    id: '3',
    number: '3',
    title: 'Soirée Royale',
    image: 'https://lh3.googleusercontent.com/aida/ADBb0ugslgsjqU5R0ZV2Ageie9XcwZw-flEl096qDxABlCT0EOgailmOC7cOWL3zKXbcyqsYzw7IzLw3YQ_6xzWWu3SqTCC_HO-azDeGxfYe3cWRmkf9FR4-Fqba96-bDHsA1NhZyAdbKCkTD9wMuMVuj9fKOpvBtwlcP648nmaXRMfeHXbx2HNcJDvCIYKrKK5Prtda5f6UGcpjuoIqoFGx3ZSGAmFdBTybweOSfCbq-W-eX3FTqYrgeTgxBb8',
  },
];

export const LooksSection = () => {
  return (
    <section className="bg-surface-container-low/30 py-12 md:py-16 lg:py-20">
      <div className="max-w-[1440px] mx-auto px-5 md:px-8 lg:px-20">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-headline-lg text-2xl md:text-3xl text-on-surface mb-4">
            Ces accessoires vous iront à merveille avec...
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {looks.map((look) => (
            <LookCard key={look.id} {...look} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LooksSection;