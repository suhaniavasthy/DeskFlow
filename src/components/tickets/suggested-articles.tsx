'use client'; // Ensures this component runs on the client side

// Import required modules and UI components
import { suggestKnowledgeBaseArticles } from '@/ai/flows/suggest-knowledge-base-articles'; // AI API function to suggest articles
import { Skeleton } from '@/components/ui/skeleton'; // Loading skeleton component
import { Lightbulb, BookOpen } from 'lucide-react'; // Icons
import { useEffect, useState, useTransition } from 'react'; // React hooks

// Define props for this component
type SuggestedArticlesProps = {
  subject: string;
  description: string;
};

// Main functional component that shows article suggestions
export function SuggestedArticles({
  subject,
  description,
}: SuggestedArticlesProps) {
  // Local state for storing article suggestions
  const [suggestions, setSuggestions] = useState<string[]>([]);

  // useTransition allows for non-blocking UI updates during async operations
  const [isPending, startTransition] = useTransition();

  // useEffect runs when subject or description changes
  useEffect(() => {
    // Check minimum input length before triggering API
    if (subject.length > 4 && description.length > 19) {
      // Run the async operation inside a non-blocking transition
      startTransition(async () => {
        try {
          const result = await suggestKnowledgeBaseArticles({
            subject,
            description,
          });
          // Update suggestions from API response
          setSuggestions(result.articles);
        } catch (error) {
          console.error('Failed to fetch suggestions:', error);
          setSuggestions([]); // Fallback to empty suggestions
        }
      });
    }
  }, [subject, description]); // Rerun whenever subject or description changes

  // Initial state message before user types anything
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

  // Show loading skeleton while waiting for API response
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

  // Fallback UI when no articles are found (but user has typed something)
  if (suggestions.length === 0 && (subject || description)) {
    return (
      <div className="rounded-lg border-2 border-dashed p-6 text-center">
        <p className="text-sm text-muted-foreground">
          No suggestions found. Keep typing!
        </p>
      </div>
    );
  }

  // Render the list of suggested articles
  return (
    <div className="space-y-4">
      {suggestions.map((article, index) => (
        <a
          key={index}
          href="#"
          className="flex items-start gap-4 rounded-lg border p-4 transition-colors hover:bg-card/80"
        >
          {/* Icon on the left */}
          <div className="rounded-full bg-accent/50 p-2">
            <BookOpen className="size-5 text-accent-foreground" />
          </div>
          {/* Article title */}
          <p className="font-medium">{article}</p>
        </a>
      ))}
    </div>
  );
}

