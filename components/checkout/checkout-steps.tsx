import { Check } from "lucide-react"

interface CheckoutStepsProps {
  currentStep: number
}

const steps = [
  { id: 1, name: "Ingressos", description: "Selecione seus ingressos" },
  { id: 2, name: "Dados", description: "Informações do comprador" },
  { id: 3, name: "Participantes", description: "Dados dos participantes" },
  { id: 4, name: "Pagamento", description: "Finalizar compra" },
]

export function CheckoutSteps({ currentStep }: CheckoutStepsProps) {
  return (
    <div className="flex items-center justify-between">
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-center">
          <div className="flex items-center">
            <div
              className={`
              flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors
              ${
                currentStep > step.id
                  ? "bg-primary border-primary text-primary-foreground"
                  : currentStep === step.id
                    ? "border-primary text-primary bg-background"
                    : "border-border text-muted-foreground bg-background"
              }
            `}
            >
              {currentStep > step.id ? (
                <Check className="w-5 h-5" />
              ) : (
                <span className="text-sm font-medium">{step.id}</span>
              )}
            </div>
            <div className="ml-3">
              <p
                className={`text-sm font-medium ${
                  currentStep >= step.id ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {step.name}
              </p>
              <p className="text-xs text-muted-foreground">{step.description}</p>
            </div>
          </div>

          {index < steps.length - 1 && (
            <div
              className={`
              w-16 h-px mx-4 transition-colors
              ${currentStep > step.id ? "bg-primary" : "bg-border"}
            `}
            />
          )}
        </div>
      ))}
    </div>
  )
}
