import React from 'react';

interface InputProps {
  type?: 'text' | 'email' | 'password' | 'number';
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  label?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  showForgotPassword?: boolean;
  id?: string;
  name?: string;
  autoComplete?: string;
}

export const Input: React.FC<InputProps> = ({
  type = 'text',
  placeholder,
  value,
  onChange,
  label,
  error,
  required = false,
  disabled = false,
  className = '',
  showForgotPassword = false,
  id,
  name,
  autoComplete,
}) => {
  const baseClasses = 'w-full h-11 px-3 border border-solid border-gray-400 rounded-lg transition-colors duration-200 focus:outline-none focus:border-2';
  const stateClasses = error 
    ? 'border-red-300 focus:border-red-500 focus:border-2' 
    : 'border-gray-400 focus:border-blue-600 focus:border-2';
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed bg-gray-50' : 'bg-white';
  
  const classes = `${baseClasses} ${stateClasses} ${disabledClasses} ${className}`;
  
  // Generate id from label if not provided
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);
  
  // Generate autocomplete value based on type and name if not provided
  const getAutoComplete = () => {
    if (autoComplete) return autoComplete;
    
    if (type === 'email') return 'email';
    if (type === 'password') return 'current-password';
    if (name?.toLowerCase().includes('username')) return 'username';
    if (name?.toLowerCase().includes('email')) return 'email';
    if (name?.toLowerCase().includes('password')) return 'current-password';
    
    return 'off';
  };
  
  return (
    <div className="space-y-2">
      {label && (
        <div className="flex justify-between items-center">
          <label htmlFor={inputId} className="block text-sm font-bold text-gray-900 leading-none tracking-normal">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
          {showForgotPassword && (
            <a
              href="#"
              className="text-sm font-normal text-blue-600 leading-none tracking-normal text-right"
            >
              Forgot password?
            </a>
          )}
        </div>
      )}
      <input
        id={inputId}
        name={name || inputId}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        disabled={disabled}
        className={classes}
        autoComplete={getAutoComplete()}
      />
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}; 