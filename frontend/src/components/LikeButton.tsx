import { Heart } from 'lucide-react';
import { useState } from 'react';

import { useTranslation } from '@/components/i18n/Translator';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';

interface LikeButtonProps {
  className?: string;
}

const LikeButton = ({ className }: LikeButtonProps) => {
  const [liked, setLiked] = useState(false);
  const { t } = useTranslation();

  const toggleLike = () => {
    setLiked(!liked);
  };

  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={toggleLike}
            variant="ghost"
            size="icon"
            className={`text-muted-foreground ${className}`}
          >
            {liked ? (
              <Heart className="h-4 w-4 text-red-500" />
            ) : (
              <Heart className="h-4 w-4" />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>
            {liked
              ? t('chat.messages.actions.like.unlike')
              : t('chat.messages.actions.like.like')}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default LikeButton;
