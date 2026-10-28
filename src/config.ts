import { GiftCardConfig } from './types';

export const DEFAULT_CONFIG: GiftCardConfig = {
  recipientName: 'Harishma',
  senderName: 'Your favourite person. 💗🌹',
  personalizedTitle: 'A Little Surprise for My Panda Kutty 🐼',
  cardOpeningHeading: 'A Little Surprise for My Panda Kutty 🐼',
  cardOpeningSubtitle: 'Some feelings are too beautiful to fit into ordinary words. So, I made this little rose-pink world just for you, Harishma.',
  mainGreeting: 'My Chella Kutty, My Panda Kutty, My Bujji Thango ❤️🐼',
  mainMessageParagraphs: [
    'Hey, my sweetest Panda Kutty,',
    'Do you know how special you are to me, Harishma? Sometimes, I feel like ordinary words are too small to explain how much happiness your presence brings into my life.',
    'My Chella Kutty, your smile is one of those little things that can make an ordinary day feel beautiful. Just thinking about you brings a different kind of happiness to my heart.',
    'My Panda Kutty, if I could give you one gift, it would be the chance to see yourself through my eyes. Then you would understand how precious, adorable, and special you are to me.',
    'My Bujji Thango, I may not always find the perfect words, but I hope you always remember that you deserve kindness, happiness, beautiful memories, and countless reasons to smile.',
    'You don’t have to be perfect to be precious. You don’t have to do anything extraordinary to be special. Just being your lovely self is enough to make you someone I care about so much.',
    'So, I created this little rose-pink world just for you, with a tiny letter carrying a big feeling.',
    'Whenever you open this page, imagine a warm hug, a little smile, and someone lovingly calling you: Panda Kutty… Chella Kutty… Bujji Thango… ❤️'
  ],
  highlightQuote: 'You are my sweetest little Panda, and I hope this gift makes your day a little brighter. 🐼🌹',
  signOffPre: 'With lots of love,',
  signOffName: 'Your favourite person. 💗🌹',
  specialDate: 'Always & Forever for Harishma',
  personalMemory: 'Every sweet moment and warm smile with my Chella Kutty that stays in my heart forever.',
  hiddenNoteTitle: 'One More Little Note, Bujji Thango 💌',
  hiddenNoteMessage: 'Out of all the little surprises life could bring, I’m so glad I have you in my world, Harishma. Keep smiling, keep being your sweetest self, and never forget how deeply you are cared for. 🐼❤️',
  finalSurpriseMessage: 'No matter how ordinary today may be, I hope this little gift makes my Chella Kutty smile. You mean so much to me, Harishma. 🌷✨'
};

const STORAGE_KEY = 'romantic_gift_card_harishma_v2';

export function loadConfig(): GiftCardConfig {
  try {
    const params = new URLSearchParams(window.location.search);
    const encoded = params.get('cardData');
    if (encoded) {
      const decodedStr = decodeURIComponent(escape(atob(encoded)));
      const parsed = JSON.parse(decodedStr);
      return { ...DEFAULT_CONFIG, ...parsed };
    }

    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return { ...DEFAULT_CONFIG, ...JSON.parse(saved) };
    }
  } catch (e) {
    console.warn('Could not parse saved or shared config, falling back to default:', e);
  }
  return DEFAULT_CONFIG;
}

export function saveConfig(config: GiftCardConfig): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  } catch (e) {
    console.error('Failed to save config to localStorage', e);
  }
}

export function resetConfig(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.error('Failed to reset config', e);
  }
}

export function generateShareUrl(config: GiftCardConfig): string {
  try {
    const jsonStr = JSON.stringify(config);
    const encoded = btoa(unescape(encodeURIComponent(jsonStr)));
    const url = new URL(window.location.href);
    url.searchParams.set('cardData', encoded);
    return url.toString();
  } catch (e) {
    console.error('Failed to generate share URL', e);
    return window.location.href;
  }
}
