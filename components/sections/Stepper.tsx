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
    <div className="flex items-center justify-center mb-16 space-x-8">
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-center">
          <div className={`flex items-center space-x-3 ${step.id === currentStep ? 'text-primary' : 'text-outline'}`}>
            <span className={`w-10 h-10 rounded-full border-2 flex items-center justify-center font-bold font-headline-md text-base ${
              step.id === currentStep ? 'border-primary' : 'border-outline'
            }`}>
              {step.id}
            </span>
            <span className="font-label-md text-label-md uppercase tracking-widest">
              {step.label}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div className="w-20 h-px bg-outline-variant ml-8" />
          )}
        </div>
      ))}
    </div>
  );
}