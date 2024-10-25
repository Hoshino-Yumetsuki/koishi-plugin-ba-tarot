import { Context, Schema, h } from "koishi";
import { getTarotData } from "./data";
import { isUpright } from "./utils";

export const name = "ba-tarot";

export interface Config { }

export const Config: Schema<Config> = Schema.object({});

export function apply(ctx: Context) {
  let shuffledDeck: number[] = [];

  ctx.command("塔罗牌").action(async ({ session }) => {
    if (!session) return '无法获取会话信息';

    const data = await getTarotData();

    // 如果牌组为空,重新洗牌
    if (shuffledDeck.length === 0) {
      shuffledDeck = [...Array(22).keys()];
      // 使用 Fisher-Yates 洗牌算法
      for (let i = shuffledDeck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledDeck[i], shuffledDeck[j]] = [shuffledDeck[j], shuffledDeck[i]];
      }
    }

    // 从洗好的牌组中抽取一张牌
    const cardIndex = shuffledDeck.pop()!;
    const card = data[cardIndex];
    const upright = isUpright();

    await session.send(`看看
      ${h("at", { id: session.userId })}
      抽到了什么：
      ${h.image(card.picBuffer, 'image/webp')}
      ${card.name}（${upright ? "正位" : "逆位"}）：
      ${h("br")}${upright ? card.upText : card.reversedText}`);
  });
}
