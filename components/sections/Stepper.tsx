interface StepperProps {
  currentStep: number;
}

const steps = [
  { id: 1, label: 'Adresse' },
  { id: 2, label: 'Livraison' },
  { id: 3, label: 'Paiement' },
];

export default function Stepper({ currentStep }: StepperProps) {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6 lg:space-x-8">
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-center w-full md:w-auto">
          <div className={`flex items-center space-x-2 md:space-x-3 ${step.id === currentStep ? 'text-primary' : 'text-outline'}`}>
            <span className={`w-9 h-9 md:w-10 md:h-10 rounded-full border-2 flex items-center justify-center font-bold font-headline-md text-sm md:text-base ${
              step.id === currentStep ? 'border-primary' : 'border-outline'
            }`}>
              {step.id}
            </span>
            <span className="font-label-md text-xs md:text-sm uppercase tracking-wider md:tracking-widest">
              {step.label}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div className="hidden md:block w-16 lg:w-20 h-px bg-outline-variant ml-6 lg:ml-8" />
          )}
        </div>
      ))}
    </div>
  );
}