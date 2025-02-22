export type Question = {
  id: string;
  text: string;
  media?: Media;
  options: Option[];
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
  timeBonus?: number;
  helpersUsed?: ('skip' | 'fiftyFifty' | 'friend')[];
  startTime?: number;
}; 