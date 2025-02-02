import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { Earth } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

interface Props {
  className?: string;
}

export function LanguageSwitcherButton({ className }: Props) {
  const { languageInUse, setLanguageInUse, translationLoaded } = useLanguage();

  const handleLanguageSwitch = (language: string) => {
    if (language !== languageInUse) {
      setLanguageInUse(language);
    }
  };

  if (!translationLoaded) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          id="language-toggle"
          variant="ghost"
          size="icon"
          className={cn(
            'text-muted-foreground hover:text-muted-foreground',
            className
          )}
        >
          <Earth className="!size-5 rotate-0 scale-100 transition-all" />
          <span className="sr-only">Choose language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleLanguageSwitch('en-US')}>
          English
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleLanguageSwitch('sr-RS')}>
          Serbian
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
