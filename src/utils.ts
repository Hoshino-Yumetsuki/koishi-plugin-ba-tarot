import crypto from 'crypto';

/** 获取正逆位 */
export const isUpright = (): boolean => crypto.randomInt(0, 2) === 0;

/** 随机抽牌 */
export const drawCard = (): number => crypto.randomInt(0, 22);

/** 洗牌函数 */
export function shuffleArray<T>(array: T[]): T[] {
  // 使用 Fisher-Yates 洗牌算法
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
