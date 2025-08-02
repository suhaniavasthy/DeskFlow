'use client';

import { suggestKnowledgeBaseArticles } from '@/ai/flows/suggest-knowledge-base-articles';
import { Skeleton } from '@/components/ui/skeleton';
import { Lightbulb, BookOpen } from 'lucide-react';
import { useEffect, useState, useTransition } from 'react';

type SuggestedArticlesProps = {
  subject: string;
  description: string;
};

export function SuggestedArticles({
  subject,
  description,
}: SuggestedArticlesProps) {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (subject.length > 4 && description.length > 19) {
      startTransition(async () => {
        try {
          const result = await suggestKnowledgeBaseArticles({
            subject,
            description,
          });
          setSuggestions(result.articles);
        } catch (error) {
          console.error('Failed to fetch suggestions:', error);
          setSuggestions([]);
        }
      });
    }
  }, [subject, description]);

  if (!subject && !description) {
    return (
      <div className="rounded-lg border-2 border-dashed p-6 text-center">
        <Lightbulb className="mx-auto mb-2 size-8 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">
          Start typing your issue, and we'll suggest helpful articles here.
        </p>
      </div>
    );
  }

  if (isPending) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="flex items-start gap-4 rounded-lg border p-4"
          >
            <Skeleton className="size-8 rounded-full" />
            <div className="w-full space-y-2">
              <Skeleton className="h-4 w-4/5" />
              <Skeleton className="h-4 w-2/5" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (suggestions.length === 0 && (subject || description)) {
    return (
      <div className="rounded-lg border-2 border-dashed p-6 text-center">
        <p className="text-sm text-muted-foreground">
          No suggestions found. Keep typing!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {suggestions.map((article, index) => (
        <a
          key={index}
          href="#"
          className="flex items-start gap-4 rounded-lg border p-4 transition-colors hover:bg-card/80"
        >
          <div className="rounded-full bg-accent/50 p-2">
            <BookOpen className="size-5 text-accent-foreground" />
          </div>
          <p className="font-medium">{article}</p>
        </a>
      ))}
    </div>
  );
}
