export interface CachedResponse {
  id: string;
  prompt: string;
  response: string;
  tokensUsed: number;
  createdAt: Date;
  lastAccessed: Date;
  accessCount: number;
}

export class ResponseCache {
  private static cache: Map<string, CachedResponse> = new Map();
  private static readonly MAX_CACHE_SIZE = 100;
  private static readonly CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours

  static async get(prompt: string): Promise<CachedResponse | null> {
    const key = this.generateKey(prompt);
    const cached = this.cache.get(key);

    if (!cached) {
      return null;
    }

    // Check if cache is expired
    if (Date.now() - cached.createdAt.getTime() > this.CACHE_TTL) {
      this.cache.delete(key);
      return null;
    }

    // Update access stats
    cached.lastAccessed = new Date();
    cached.accessCount++;
    this.cache.set(key, cached);

    return cached;
  }

  static async set(prompt: string, response: string, tokensUsed: number): Promise<void> {
    const key = this.generateKey(prompt);
    const now = new Date();

    const cachedResponse: CachedResponse = {
      id: key,
      prompt,
      response,
      tokensUsed,
      createdAt: now,
      lastAccessed: now,
      accessCount: 1
    };

    // Check cache size limit
    if (this.cache.size >= this.MAX_CACHE_SIZE) {
      this.evictOldest();
    }

    this.cache.set(key, cachedResponse);
  }

  static async findSimilar(prompt: string, similarityThreshold: number = 0.8): Promise<CachedResponse | null> {
    const promptWords = prompt.toLowerCase().split(/\s+/);
    
    for (const [key, cached] of Array.from(this.cache.entries())) {
      const cachedWords = cached.prompt.toLowerCase().split(/\s+/);
      const similarity = this.calculateSimilarity(promptWords, cachedWords);
      
      if (similarity >= similarityThreshold) {
        // Update access stats
        cached.lastAccessed = new Date();
        cached.accessCount++;
        this.cache.set(key, cached);
        
        return cached;
      }
    }

    return null;
  }

  private static generateKey(prompt: string): string {
    // Create a consistent key from the prompt
    return prompt
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, '-')
      .substring(0, 50);
  }

  private static calculateSimilarity(words1: string[], words2: string[]): number {
    const set1 = new Set(words1);
    const set2 = new Set(words2);
    
    const intersection = new Set(Array.from(set1).filter(x => set2.has(x)));
    const union = new Set([...Array.from(set1), ...Array.from(set2)]);
    
    return intersection.size / union.size;
  }

  private static evictOldest(): void {
    let oldestKey: string | null = null;
    let oldestTime = Date.now();

    for (const [key, cached] of Array.from(this.cache.entries())) {
      if (cached.lastAccessed.getTime() < oldestTime) {
        oldestTime = cached.lastAccessed.getTime();
        oldestKey = key;
      }
    }

    if (oldestKey) {
      this.cache.delete(oldestKey);
    }
  }

  static getStats(): {
    size: number;
    totalTokens: number;
    averageTokens: number;
    mostAccessed: Array<{ prompt: string; accessCount: number }>;
  } {
    const responses = Array.from(this.cache.values());
    const totalTokens = responses.reduce((sum, r) => sum + r.tokensUsed, 0);
    const averageTokens = responses.length > 0 ? totalTokens / responses.length : 0;
    
    const mostAccessed = responses
      .sort((a, b) => b.accessCount - a.accessCount)
      .slice(0, 5)
      .map(r => ({ prompt: r.prompt.substring(0, 50) + '...', accessCount: r.accessCount }));

    return {
      size: this.cache.size,
      totalTokens,
      averageTokens,
      mostAccessed
    };
  }

  static clear(): void {
    this.cache.clear();
  }
} 