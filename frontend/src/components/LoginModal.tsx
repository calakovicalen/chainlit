import { Eye, EyeOff, X } from 'lucide-react';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

import { useTheme } from '@/components/ThemeProvider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Translator from 'components/i18n/Translator';

interface IFormInput {
  email: string;
  password: string;
}

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const { variant } = useTheme();
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, touchedFields }
  } = useForm<IFormInput>({
    defaultValues: {
      email: '',
      password: ''
    }
  });

  if (!isOpen) return null;

  const handleBackgroundClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (event.target === event.currentTarget) {
      onClose();
      reset(); // Reset inputs on background click
    }
  };

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    if (isSignup) {
      // Mock signup state
      if (data.email === 'existing@example.com') {
        toast.error(t('auth.login.errors.credentialsSignin'));
      } else {
        toast.success(t('auth.signup.success.signup'));
        reset(); // Reset inputs after successful signup
        onClose();
      }
    } else {
      // Mock login state
      if (data.email === 'test@example.com' && data.password === '1234') {
        toast.success(t('auth.login.success.login'));
        reset(); // Reset inputs after successful login
        onClose();
      } else {
        toast.error(t('auth.login.errors.credentialsSignin'));
      }
    }
  };

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 ${
        variant === 'dark' ? 'dark' : 'light'
      }`}
      onClick={handleBackgroundClick}
    >
      <div
        className={`bg-background p-16 rounded-lg shadow-xl relative w-[40vw]`}
      >
        <Button
          variant="ghost"
          size="icon"
          className="text-muted-foreground hover:text-muted-foreground top-5 right-5 absolute"
          onClick={() => {
            onClose();
            reset();
          }}
        >
          <X className="h-5 w-5" />
          <span className="sr-only">Close</span>
        </Button>
        <h1 className="text-2xl font-bold text-center mb-6">
          {isSignup ? t('auth.signup.title') : t('auth.login.title')}
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <div className="grid gap-2">
            <Label htmlFor="email">
              <Translator path="auth.login.form.email.label" />
            </Label>
            <Input
              id="email"
              autoFocus
              placeholder="me@example.com"
              {...register('email', {
                required: t('auth.login.form.email.required'),
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: t('auth.login.form.email.invalid')
                }
              })}
              className={
                touchedFields.email && errors.email ? 'border-destructive' : ''
              }
            />
            {touchedFields.email && errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="password">
              <Translator path="auth.login.form.password.label" />
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                {...register('password', {
                  required: t('auth.login.form.password.required'),
                  minLength: {
                    value: 6,
                    message: t('auth.login.form.password.minLength')
                  }
                })}
                className={
                  touchedFields.password && errors.password
                    ? 'border-destructive'
                    : ''
                }
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
            {touchedFields.password && errors.password && (
              <p className="text-sm text-destructive">
                {errors.password.message}
              </p>
            )}
          </div>

          <Button type="submit" className="w-full">
            {isSignup
              ? t('auth.signup.form.actions.submit')
              : t('auth.login.form.actions.signin')}
          </Button>
        </form>

        <p className="text-sm text-center mt-4">
          {isSignup ? (
            <>
              <button
                onClick={() => setIsSignup(false)}
                className="text-muted-foreground hover:text-muted-foreground underline"
              >
                {t('auth.login.title')}
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setIsSignup(true)}
                className="text-muted-foreground hover:text-muted-foreground underline "
              >
                {t('auth.signup.title')}
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default LoginModal;
