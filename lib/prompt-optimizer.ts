export interface OptimizedPrompt {
  prompt: string;
  estimatedTokens: number;
  cacheKey?: string;
}

export class PromptOptimizer {
  private static readonly COMMON_PATTERNS = {
    react: 'React component with hooks',
    typescript: 'TypeScript with proper types',
    responsive: 'responsive design',
    modern: 'modern UI/UX',
    clean: 'clean code structure'
  };

  private static readonly SHORT_PATTERNS = {
    'todo list': 'todo: add, complete, delete, filter',
    'calculator': 'calc: +, -, *, /, clear, error handling',
    'weather app': 'weather: current, forecast, icons, responsive',
    'note taking': 'notes: create, edit, save, delete, auto-save',
    'quiz app': 'quiz: multiple choice, scoring, timer, progress',
    'ecommerce': 'ecom: product card, image, price, add to cart',
    'social feed': 'social: posts, likes, comments, infinite scroll',
    'dashboard': 'dashboard: charts, metrics, tables, responsive'
  };

  static optimizePrompt(userInput: string): OptimizedPrompt {
    let optimized = userInput.toLowerCase();
    let estimatedTokens = this.estimateTokens(userInput);

    // Replace common patterns with shorter versions
    for (const [pattern, replacement] of Object.entries(this.SHORT_PATTERNS)) {
      if (optimized.includes(pattern)) {
        optimized = optimized.replace(pattern, replacement);
        estimatedTokens = Math.max(estimatedTokens - 20, 50); // Reduce tokens
      }
    }

    // Add essential context if missing
    if (!optimized.includes('react') && !optimized.includes('component')) {
      optimized += ' | React component';
      estimatedTokens += 10;
    }

    if (!optimized.includes('responsive') && !optimized.includes('mobile')) {
      optimized += ' | responsive';
      estimatedTokens += 8;
    }

    // Generate cache key for similar requests
    const cacheKey = this.generateCacheKey(optimized);

    return {
      prompt: optimized,
      estimatedTokens,
      cacheKey
    };
  }

  static estimateTokens(text: string): number {
    // Rough estimation: 1 token ≈ 4 characters
    return Math.ceil(text.length / 4);
  }

  static generateCacheKey(prompt: string): string {
    // Create a hash-like key for caching similar prompts
    return prompt
      .replace(/[^a-z0-9]/g, '')
      .substring(0, 20)
      .toLowerCase();
  }

  static isSimilarPrompt(prompt1: string, prompt2: string): boolean {
    const key1 = this.generateCacheKey(prompt1);
    const key2 = this.generateCacheKey(prompt2);
    return key1 === key2;
  }
}

// Token usage tracking
export class TokenTracker {
  private static usage: Map<string, number> = new Map();

  static trackUsage(prompt: string, tokensUsed: number): void {
    const key = PromptOptimizer.generateCacheKey(prompt);
    const current = this.usage.get(key) || 0;
    this.usage.set(key, current + tokensUsed);
  }

  static getUsageStats(): { total: number; average: number; count: number } {
    const values = Array.from(this.usage.values());
    const total = values.reduce((sum, val) => sum + val, 0);
    const count = values.length;
    const average = count > 0 ? total / count : 0;

    return { total, average, count };
  }

  static getMostExpensivePrompts(limit: number = 5): Array<{ key: string; tokens: number }> {
    return Array.from(this.usage.entries())
      .sort(([, a], [, b]) => b - a)
      .slice(0, limit)
      .map(([key, tokens]) => ({ key, tokens }));
  }
} 