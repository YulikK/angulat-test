/**
 * Short positive fortune messages for workers
 * Each worker acts as a fortune teller with brief predictions
 */

export const FORTUNE_MESSAGES = [
  // 💰 Career & Money
  'Salary increase incoming! 💰',
  'Code works first try! ✨',
  'Bug found easily! 🔍',
  'All PRs approved! 🎉',
  'Dream job calls! 📞',

  // 💕 Love & Life
  'Someone likes your commits! 💝',
  'Coding soulmate today! 😍',
  'Partner gets IT jokes! 🤭',
  'Romance in code! 💕',

  // 🍀 Luck & Fortune
  'Stars aligned today! ⭐',
  'Luck follows you! 🍀',
  'Random success! 🎲',
  'Numbers favor you! ✨',
  'No rm -rf today! 🙏',

  // 🧠 Learning & Wisdom
  'Algorithm clicks! 🤓',
  'Stack Overflow helps! 📚',
  'Mentor appears! 👨‍🏫',
  'Docs make sense! 📖',

  // 🎮 Fun & Rest
  'Game updates! 🎮',
  'Coffee tastes great! ☕',
  'Perfect meme found! 😂',
  'Netflix suggests gold! 📺',

  // 🔮 Tech Predictions
  'Localhost stable! 🖥️',
  'CSS cooperates! 🎨',
  'Dependencies update! 📦',
  'IE finally gone! 🎊',
  'Regex clear! 🔤',

  // 🚀 Big Dreams
  'Project goes viral! 🚀',
  'Code changes world! 🌍',
  'Open source fame! 👑',
  'Algorithm famous! 📚',

  // 😄 Pure Positivity
  'Great coding day! 🌈',
  'Keyboard lasts! 🎹',
  'Servers stable! 🖲️',
  'No compiler errors! 🎯',
  'Elegant code! 💃',

  // 🤪 Funny Ones
  'JS behaves logically! 😱',
  'Versions make sense! 🤯',
  'Docs fully read! 📝',
  'Variables named well! 🏷️',
  'PHP works as expected! ✨',
];

/**
 * Get random fortune prediction
 */
export function getRandomFortune(): string {
  const randomIndex = Math.floor(Math.random() * FORTUNE_MESSAGES.length);
  return FORTUNE_MESSAGES[randomIndex] || 'Stars silent... try again! 🔮';
}
