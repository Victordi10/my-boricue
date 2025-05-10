import { forwardRef } from "react";
import * as Icons from "lucide-react";

// Componente de input reutilizable
export const FormInput = forwardRef(({
    label,
    name,
    type = "text",
    placeholder,
    value,
    onChange,
    error,
    icon,
    children,
    ...props
}, ref) => {
    const IconComponent = icon ? Icons[icon] : null;

    return (
        <div className="mb-5">
            <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
                {label}
            </label>
            <div className="relative rounded-md shadow-sm">
                {IconComponent && (
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <IconComponent className="h-5 w-5 text-gray-400" />
                    </div>
                )}
                {type === "select" ? (
                    <select
                        name={name}
                        id={name}
                        ref={ref}
                        value={value}
                        onChange={onChange}
                        className={`block w-full ${IconComponent ? 'pl-10' : 'pl-3'} pr-3 py-3 border ${error ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-dos focus:border-transparent transition-all outline-none appearance-none`}
                        {...props}
                    >
                        {children}
                    </select>
                ) : (
                    <input
                        type={type}
                        name={name}
                        id={name}
                        ref={ref}
                        value={value}
                        onChange={onChange}
                        className={`block w-full ${IconComponent ? 'pl-10' : 'pl-3'} pr-3 py-3 border ${error ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-dos focus:border-transparent transition-all outline-none`}
                        placeholder={placeholder}
                        {...props}
                    />
                )}
                {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
            </div>
        </div>
    );
});

FormInput.displayName = "FormInput";

// Componente para secciones del formulario
export const FormSection = ({
    title,
    children,
    currentStep,
    stepNumber,
    onNext,
    onPrev,
    isLastStep,
    isSubmitting,
    validateStep
}) => {
    const isActive = currentStep === stepNumber;
    if (!isActive) return null;

    return (
        <div className="w-full">
            <h3 className="text-xl font-medium text-gray-800 mb-4">{title}</h3>

            {children}

            <div className="flex justify-between mt-8">
                {stepNumber > 1 ? (
                    <button
                        type="button"
                        onClick={onPrev}
                        className="flex items-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-dos transition-colors"
                    >
                        <Icons.ChevronLeft className="h-5 w-5 mr-1" />
                        Anterior
                    </button>
                ) : (
                    <div></div>
                )}

                {!isLastStep ? (
                    <button
                        type="button"
                        onClick={() => validateStep(stepNumber) && onNext()}
                        className="flex items-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-dos/90 hover:bg-dos focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-dos transition-colors"
                    >
                        Siguiente
                        <Icons.ChevronRight className="h-5 w-5 ml-1" />
                    </button>
                ) : (
                    <button
                        type="button"
                        onClick={() => validateStep(stepNumber) && document.dispatchEvent(new Event('submitForm'))}
                        disabled={isSubmitting}
                        className="w-48 flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-dos/90 hover:bg-dos focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-dos transition-colors duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? (
                            <span className="flex items-center">
                                <svg
                                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    ></path>
                                </svg>
                                Procesando...
                            </span>
                        ) : (
                            "Crear Cuenta"
                        )}
                    </button>
                )}
            </div>
        </div>
    );
};

// Componente para el indicador de progreso
export const ProgressIndicator = ({ currentStep, totalSteps }) => {
    return (
        <div className="bg-gray-50 px-8 py-4">
            <div className="flex items-center justify-center">
                {Array.from({ length: totalSteps }).map((_, index) => (
                    <div key={index} className="flex items-center">
                        <div
                            className={`flex items-center justify-center w-8 h-8 rounded-full transition-colors ${currentStep > index + 1
                                    ? 'bg-green-500 text-white'
                                    : currentStep === index + 1
                                        ? 'bg-dos text-white'
                                        : 'bg-gray-200 text-gray-600'
                                }`}
                        >
                            {currentStep > index + 1 ? (
                                <Icons.CheckCircle className="w-5 h-5" />
                            ) : (
                                index + 1
                            )}
                        </div>
                        {index < totalSteps - 1 && (
                            <div className={`w-10 h-1 ${currentStep > index + 1 ? 'bg-green-500' : 'bg-gray-200'}`} />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};
