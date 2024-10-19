import path from 'path';
import fs from 'node:fs';

// 导入 JSON 文件
import torotNames from './assets/name.json';
import upTexts from './assets/upText.json';
import reversedTexts from './assets/reversedText.json';
import tarotImgs from './assets/picUrl.json';

// 读取图片文件并将其存储为 Buffer
const tarotImages = Object.fromEntries(
  Object.entries(tarotImgs).map(([key, value]) => [
    key,
    fs.readFileSync(path.join(__dirname, value))  // 直接读取文件
  ])
);

export interface ITarot {
  /** 图片 Buffer */
  picBuffer: Buffer;
  /** 正位描述文案 */
  upText: string;
  /** 逆位描述文案 */
  reversedText: string;
  /** 卡牌名称 */
  name: string;
}

/** 拼装塔罗牌数据 */
const tarotData = async (): Promise<ITarot[]> => {
  const keys = Object.keys(torotNames);

  return keys.map((item) => {
    const picBuffer = tarotImages[item];  // 使用已读取的 Buffer

    return {
      picBuffer,
      upText: upTexts[item],
      reversedText: reversedTexts[item],
      name: torotNames[item],
    };
  });
};

export default tarotData;
