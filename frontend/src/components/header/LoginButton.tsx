// src/components/LoginButton.tsx
import { cn } from '@/lib/utils';
import { LogIn } from 'lucide-react';
import { useState } from 'react';

// Importing the icon from lucide-react
import LoginModal from '@/components/LoginModal';
import { Button } from '@/components/ui/button';

// Importing Button component

const LoginButton: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <div>
      <Button
        onClick={() => setModalOpen(true)}
        variant="ghost"
        size="icon"
        className={cn('text-muted-foreground hover:text-muted-foreground')}
      >
        <LogIn className="!size-5 rotate-0 scale-100 transition-all" />
      </Button>

      <LoginModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
};

export default LoginButton;
