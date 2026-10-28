export interface GalleryMemory {
  id: string;
  title: string;
  date: string;
  caption: string;
  imageUrl?: string;
  illustrationType?: 'rose' | 'heart' | 'letter' | 'stargaze' | 'coffee' | 'sunset';
}

export interface GiftCardConfig {
  recipientName: string;
  senderName: string;
  personalizedTitle: string;
  cardOpeningHeading: string;
  cardOpeningSubtitle: string;
  mainGreeting: string;
  mainMessageParagraphs: string[];
  highlightQuote: string;
  signOffPre: string;
  signOffName: string;
  specialDate: string;
  personalMemory: string;
  hiddenNoteTitle: string;
  hiddenNoteMessage: string;
  finalSurpriseMessage: string;
  customCoverImage?: string;
  galleryMemories: GalleryMemory[];
}

