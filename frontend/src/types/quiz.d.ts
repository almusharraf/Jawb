export type Question = {
  id: string;
  text: string;
  media?: Media;
  options: Option[];
};

export type Media = {
  type: 'image' | 'video';
  url: string;
}; 