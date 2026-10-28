import { GiftCardConfig } from './types';

export const DEFAULT_CONFIG: GiftCardConfig = {
  recipientName: 'My Favorite Person',
  senderName: 'Someone who thinks you’re wonderful',
  personalizedTitle: 'A Rose Just for You',
  cardOpeningHeading: 'A Little Something, Just for You…',
  cardOpeningSubtitle: 'Some feelings are too beautiful to fit into ordinary words. So, I made this little world just for you.',
  mainGreeting: 'To My Favorite Person ❤️',
  mainMessageParagraphs: [
    'My favorite part of an ordinary day is the thought of you.',
    'You have this beautiful way of making little moments feel special and simple things feel magical. Sometimes, I wish you could see yourself through my eyes, just for a moment, so you could understand how wonderfully unique you are.',
    'If I could give you one thing in this world, it would be the ability to see yourself the way I see you. You would realize how much happiness your presence can bring and how easily your smile can brighten a day.',
    'I don’t need a perfect story or a thousand grand gestures. I just love the thought of sharing little moments, silly conversations, unexpected smiles, and beautiful memories with you.',
    'So, here’s a tiny gift carrying a feeling that words can never completely explain.'
  ],
  highlightQuote: 'You are someone truly special to me. And if this little card makes you smile, then it has already done its job. 🌹',
  signOffPre: 'With love,',
  signOffName: 'Someone who thinks you’re wonderful. ❤️',
  specialDate: 'Every single day with you',
  personalMemory: 'That gentle laughter of yours that always stays in my mind long after we part.',
  hiddenNoteTitle: 'There’s one more thing…',
  hiddenNoteMessage: 'Out of all the little surprises life could bring, I’m glad you’re someone I get to know. Keep smiling, keep being yourself, and never forget that someone out there thinks you’re amazing.',
  finalSurpriseMessage: 'No matter how ordinary today may be, I hope this little gift makes it a little more beautiful. 🌷',
  galleryMemories: [
    {
      id: 'mem-1',
      title: 'A Beautiful Smile',
      date: 'A cherished afternoon',
      caption: 'The way your whole face lights up whenever you laugh.',
      illustrationType: 'rose'
    },
    {
      id: 'mem-2',
      title: 'Conversations Under the Stars',
      date: 'Late quiet hours',
      caption: 'Talking about everything and nothing until time completely lost its meaning.',
      illustrationType: 'stargaze'
    },
    {
      id: 'mem-3',
      title: 'Warmth in the Small Moments',
      date: 'Just an ordinary day',
      caption: 'Quiet coffee, gentle thoughts, and the peace of knowing you exist in my life.',
      illustrationType: 'coffee'
    },
    {
      id: 'mem-4',
      title: 'Unspoken Feelings',
      date: 'Every sunset',
      caption: 'Some connections don’t need loud declarations; they are felt in the calm.',
      illustrationType: 'heart'
    }
  ]
};

const STORAGE_KEY = 'romantic_gift_card_custom_config_v1';

export function loadConfig(): GiftCardConfig {
  try {
    // Check if encoded in URL query or hash
    const params = new URLSearchParams(window.location.search);
    const encoded = params.get('cardData');
    if (encoded) {
      const decodedStr = decodeURIComponent(escape(atob(encoded)));
      const parsed = JSON.parse(decodedStr);
      return { ...DEFAULT_CONFIG, ...parsed };
    }

    // Otherwise check localStorage
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

