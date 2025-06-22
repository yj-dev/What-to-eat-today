import { CategoryInfo, Food } from '@/types/food';

export const foodCategories: CategoryInfo[] = [
  {
    id: 'breakfast',
    name: '早餐',
    emoji: '🌅',
    color: '#FF6B35',
    foods: [
      { id: 'b1', name: '小笼包', category: 'breakfast', emoji: '🥟' },
      { id: 'b2', name: '豆浆油条', category: 'breakfast', emoji: '🥛' },
      { id: 'b3', name: '煎蛋吐司', category: 'breakfast', emoji: '🍳' },
      { id: 'b4', name: '粥配咸菜', category: 'breakfast', emoji: '🥣' },
      { id: 'b5', name: '胡辣汤', category: 'breakfast', emoji: '🍲' },
      { id: 'b6', name: '煎饼果子', category: 'breakfast', emoji: '🌯' },
      { id: 'b7', name: '包子馒头', category: 'breakfast', emoji: '🥟' },
      { id: 'b8', name: '牛奶燕麦', category: 'breakfast', emoji: '🥛' },
      { id: 'b9', name: '蒸蛋糕', category: 'breakfast', emoji: '🧁' },
      { id: 'b10', name: '热干面', category: 'breakfast', emoji: '🍜' },
    ]
  },
  {
    id: 'lunch',
    name: '中餐',
    emoji: '☀️',
    color: '#FFD23F',
    foods: [
      { id: 'l1', name: '宫保鸡丁', category: 'lunch', emoji: '🍗' },
      { id: 'l2', name: '红烧肉', category: 'lunch', emoji: '🍖' },
      { id: 'l3', name: '麻婆豆腐', category: 'lunch', emoji: '🌶️' },
      { id: 'l4', name: '西红柿鸡蛋', category: 'lunch', emoji: '🍅' },
      { id: 'l5', name: '糖醋里脊', category: 'lunch', emoji: '🍖' },
      { id: 'l6', name: '青椒肉丝', category: 'lunch', emoji: '🫑' },
      { id: 'l7', name: '酸菜鱼', category: 'lunch', emoji: '🐟' },
      { id: 'l8', name: '回锅肉', category: 'lunch', emoji: '🥓' },
      { id: 'l9', name: '土豆丝', category: 'lunch', emoji: '🥔' },
      { id: 'l10', name: '蒸蛋羹', category: 'lunch', emoji: '🥚' },
      { id: 'l11', name: '牛肉面', category: 'lunch', emoji: '🍜' },
      { id: 'l12', name: '炸酱面', category: 'lunch', emoji: '🍝' },
    ]
  },
  {
    id: 'dinner',
    name: '晚餐',
    emoji: '🌙',
    color: '#6C5CE7',
    foods: [
      { id: 'd1', name: '火锅', category: 'dinner', emoji: '🍲' },
      { id: 'd2', name: '烤鱼', category: 'dinner', emoji: '🐟' },
      { id: 'd3', name: '小龙虾', category: 'dinner', emoji: '🦞' },
      { id: 'd4', name: 'BBQ烧烤', category: 'dinner', emoji: '🍖' },
      { id: 'd5', name: '石锅拌饭', category: 'dinner', emoji: '🍚' },
      { id: 'd6', name: '日式料理', category: 'dinner', emoji: '🍱' },
      { id: 'd7', name: '意大利面', category: 'dinner', emoji: '🍝' },
      { id: 'd8', name: '披萨', category: 'dinner', emoji: '🍕' },
      { id: 'd9', name: '汉堡薯条', category: 'dinner', emoji: '🍔' },
      { id: 'd10', name: '炸鸡啤酒', category: 'dinner', emoji: '🍗' },
      { id: 'd11', name: '海鲜大咖', category: 'dinner', emoji: '🦀' },
      { id: 'd12', name: '麻辣香锅', category: 'dinner', emoji: '🥘' },
    ]
  }
];