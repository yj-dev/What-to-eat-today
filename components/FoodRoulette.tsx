'use client';

import { useState, useEffect, useRef } from 'react';
import { foodCategories } from '@/data/foods';
import { FoodCategory, Food, CategoryInfo } from '@/types/food';
import { ChevronDown, RotateCcw, Edit3, Plus, X, Eye, EyeOff } from 'lucide-react';
import Confetti from './Confetti';

export default function FoodRoulette() {
  const [selectedCategory, setSelectedCategory] = useState<FoodCategory>('lunch');
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [selectedFood, setSelectedFood] = useState<Food | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [history, setHistory] = useState<Food[]>([]);
  const [confettiCenter, setConfettiCenter] = useState({ x: 0, y: 0 });
  const [customCategories, setCustomCategories] = useState<CategoryInfo[]>([]);
  const [hiddenFoods, setHiddenFoods] = useState<Set<string>>(new Set());
  const [isEditing, setIsEditing] = useState(false);
  const [editingFood, setEditingFood] = useState<string>('');
  const buttonRef = useRef<HTMLButtonElement>(null);

  // 合并默认分类和自定义分类，并过滤隐藏的食物
  const allCategories = customCategories.length > 0 ? customCategories : foodCategories;
  const currentCategory = allCategories.find(cat => cat.id === selectedCategory)!;
  const foods = currentCategory.foods.filter((food: Food) => !hiddenFoods.has(food.id));

  useEffect(() => {
    // 加载历史记录、自定义分类和隐藏食物
    const savedHistory = localStorage.getItem('food-history');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }

    const savedCategories = localStorage.getItem('custom-food-categories');
    if (savedCategories) {
      setCustomCategories(JSON.parse(savedCategories));
    }

    const savedHiddenFoods = localStorage.getItem('hidden-foods');
    if (savedHiddenFoods) {
      setHiddenFoods(new Set(JSON.parse(savedHiddenFoods) as string[]));
    }
  }, []);

  const saveToHistory = (food: Food) => {
    const newHistory = [food, ...history.slice(0, 9)]; // 保留最近10条
    setHistory(newHistory);
    localStorage.setItem('food-history', JSON.stringify(newHistory));
  };

  const saveCustomCategories = (categories: CategoryInfo[]) => {
    setCustomCategories(categories);
    localStorage.setItem('custom-food-categories', JSON.stringify(categories));
  };

  const saveHiddenFoods = (hiddenFoods: Set<string>) => {
    setHiddenFoods(hiddenFoods);
    localStorage.setItem('hidden-foods', JSON.stringify(Array.from(hiddenFoods)));
  };

  const addFood = () => {
    if (!editingFood.trim()) return;

    const newFood: Food = {
      id: `custom-${Date.now()}`,
      name: editingFood.trim(),
      category: selectedCategory,
      emoji: '🍽️'
    };

    const updatedCategories = allCategories.map((cat: CategoryInfo) => {
      if (cat.id === selectedCategory) {
        return {
          ...cat,
          foods: [...cat.foods, newFood]
        };
      }
      return cat;
    });

    saveCustomCategories(updatedCategories);
    setEditingFood('');
  };

  const removeFood = (foodId: string) => {
    // 如果是自定义食物，直接删除
    if (foodId.startsWith('custom-')) {
      const updatedCategories = allCategories.map((cat: CategoryInfo) => {
        if (cat.id === selectedCategory) {
          return {
            ...cat,
            foods: cat.foods.filter((food: Food) => food.id !== foodId)
          };
        }
        return cat;
      });
      saveCustomCategories(updatedCategories);
    } else {
      // 如果是默认食物，隐藏它
      const newHiddenFoods = new Set<string>(Array.from(hiddenFoods));
      newHiddenFoods.add(foodId);
      saveHiddenFoods(newHiddenFoods);
    }
  };

  const toggleFoodVisibility = (foodId: string) => {
    const newHiddenFoods = new Set<string>(hiddenFoods);
    if (newHiddenFoods.has(foodId)) {
      newHiddenFoods.delete(foodId);
    } else {
      newHiddenFoods.add(foodId);
    }
    saveHiddenFoods(newHiddenFoods);
  };

  const resetToDefault = () => {
    setCustomCategories([]);
    setHiddenFoods(new Set<string>());
    localStorage.removeItem('custom-food-categories');
    localStorage.removeItem('hidden-foods');
    setIsEditing(false);
  };

  const spinRoulette = () => {
    if (isSpinning || foods.length === 0) return;

    // 获取按钮中心位置用于撒花
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setConfettiCenter({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      });
    }

    setIsSpinning(true);
    setSelectedFood(null);
    setShowConfetti(false);

    // 随机选择食物
    const randomIndex = Math.floor(Math.random() * foods.length);
    const selectedFood = foods[randomIndex];

    // 计算转盘需要转到的角度
    // 指针在12点钟方向，需要让选中的食物转到指针位置
    const anglePerFood = 360 / foods.length;
    // 计算选中食物在转盘上的角度（从12点钟方向开始，顺时针）
    const foodAngle = randomIndex * anglePerFood + anglePerFood / 2;
    // 转盘需要逆时针旋转，让食物转到指针位置
    const targetAngle = 360 - foodAngle;
    
    // 增加随机偏移确保不会指向边界
    const randomOffset = (Math.random() - 0.5) * (anglePerFood * 0.3);
    // 基于当前旋转角度计算新的旋转角度，确保每次都是正确的
    const currentRotation = rotation % 360; // 获取当前角度（0-360度）
    const finalRotation = rotation + 360 * 3 + (targetAngle - currentRotation) + randomOffset; // 转3圈

    setRotation(finalRotation);

    // 2秒后显示结果和撒花
    setTimeout(() => {
      setIsSpinning(false);
      setSelectedFood(selectedFood);
      saveToHistory(selectedFood);
      // 立即开始撒花
      setShowConfetti(true);
    }, 2000);
  };

  const resetRoulette = () => {
    setRotation(0);
    setSelectedFood(null);
    setShowConfetti(false);
  };

  // 获取今天的日期
  const today = new Date();
  const dateString = today.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-purple-50 p-4">
      <div className="max-w-md mx-auto">
        {/* 标题 */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">今天吃什么？</h1>
          <p className="text-gray-600">让转盘帮你决定美食选择</p>
        </div>

        {/* 分类选择和编辑按钮 */}
        <div className="mb-8 flex gap-3">
          <div className="relative flex-1">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as FoodCategory)}
              className="w-full p-4 text-lg font-medium bg-white rounded-2xl shadow-lg border-0 appearance-none focus:outline-none focus:ring-4 focus:ring-orange-200 cursor-pointer"
              disabled={isSpinning}
            >
              {allCategories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.emoji} {category.name}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="p-4 bg-white rounded-2xl shadow-lg hover:bg-gray-50 transition-colors"
            disabled={isSpinning}
          >
            <Edit3 size={20} className="text-gray-600" />
          </button>
        </div>

        {/* 编辑模式 */}
        {isEditing && (
          <div className="mb-8 bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">编辑 {currentCategory.name} 食物</h3>
            
            {/* 添加新食物 */}
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={editingFood}
                onChange={(e) => setEditingFood(e.target.value)}
                placeholder="输入新的食物名称"
                className="flex-1 p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-200"
                onKeyPress={(e) => e.key === 'Enter' && addFood()}
              />
              <button
                onClick={addFood}
                className="p-3 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-colors"
              >
                <Plus size={20} />
              </button>
            </div>

            {/* 食物列表 */}
            <div className="space-y-2 mb-4">
              {currentCategory.foods.map(food => {
                const isHidden = hiddenFoods.has(food.id);
                const isCustom = food.id.startsWith('custom-');
                
                return (
                  <div key={food.id} className={`flex items-center justify-between p-2 rounded-lg ${isHidden ? 'bg-gray-100 opacity-50' : 'bg-gray-50'}`}>
                    <span className="flex items-center gap-2">
                      <span className="text-xl">{food.emoji}</span>
                      <span className={`text-sm ${isHidden ? 'text-gray-500' : 'text-gray-700'}`}>{food.name}</span>
                      {isHidden && <span className="text-xs text-gray-400">(已隐藏)</span>}
                    </span>
                    <div className="flex gap-1">
                      {!isCustom && (
                        <button
                          onClick={() => toggleFoodVisibility(food.id)}
                          className="p-1 text-blue-500 hover:bg-blue-50 rounded"
                          title={isHidden ? "显示食物" : "隐藏食物"}
                        >
                          {isHidden ? <Eye size={16} /> : <EyeOff size={16} />}
                        </button>
                      )}
                      <button
                        onClick={() => removeFood(food.id)}
                        className="p-1 text-red-500 hover:bg-red-50 rounded"
                        title={isCustom ? "删除自定义食物" : "隐藏默认食物"}
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* 重置按钮 */}
            <button
              onClick={resetToDefault}
              className="w-full p-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              <RotateCcw size={16} />
              恢复默认食物
            </button>
          </div>
        )}

        {/* 转盘容器 */}
        <div className="relative mb-8">
          <div className="relative w-80 h-80 mx-auto">
            {/* 转盘背景 */}
            <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-100 rounded-full shadow-2xl"></div>
            
            {/* 转盘 */}
            <div 
              className="absolute inset-2 rounded-full overflow-hidden transition-transform ease-out"
              style={{ 
                transform: `rotate(${rotation}deg)`,
                transitionDuration: isSpinning ? '2000ms' : '0ms',
                transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                background: `conic-gradient(${foods.map((_, index) => {
                  const startAngle = (index / foods.length) * 360;
                  const endAngle = ((index + 1) / foods.length) * 360;
                  // 使用更浅的颜色
                  const lightColor = index % 2 === 0 
                    ? `${currentCategory.color}40` // 25% 透明度
                    : `${currentCategory.color}60`; // 37.5% 透明度
                  return `${lightColor} ${startAngle}deg ${endAngle}deg`;
                }).join(', ')})`
              }}
            >
              {/* 食物标签 */}
              {foods.map((food, index) => {
                // 计算每个食物在转盘上的角度（从12点钟方向开始，顺时针）
                const anglePerFood = 360 / foods.length;
                const foodAngle = index * anglePerFood + anglePerFood / 2;
                const radius = 110;
                const x = Math.cos((foodAngle - 90) * Math.PI / 180) * radius;
                const y = Math.sin((foodAngle - 90) * Math.PI / 180) * radius;
                
                return (
                  <div
                    key={food.id}
                    className="absolute text-gray-700 font-semibold text-sm flex items-center justify-center"
                    style={{
                      left: '50%',
                      top: '50%',
                      transform: `translate(${x - 30}px, ${y - 10}px) rotate(${foodAngle}deg)`,
                      width: '60px',
                      height: '20px',
                    }}
                  >
                    <span className="text-center">{food.name}</span>
                  </div>
                );
              })}
            </div>

            {/* 细长倒三角指针 */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-3 z-10">
              <div className="relative">
                {/* 指针主体 - 细长的倒三角 */}
                <div 
                  className="bg-gradient-to-b from-red-500 to-red-600 shadow-xl"
                  style={{
                    width: '8px',
                    height: '60px',
                    clipPath: 'polygon(50% 100%, 0% 0%, 100% 0%)',
                    filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))'
                  }}
                ></div>
                {/* 指针尾部装饰 */}
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-red-500 rounded-full shadow-lg border-2 border-white"></div>
                {/* 指针高光 */}
                <div 
                  className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-red-400 opacity-60"
                  style={{
                    width: '4px',
                    height: '30px',
                    clipPath: 'polygon(50% 100%, 0% 0%, 100% 0%)'
                  }}
                ></div>
              </div>
            </div>

            {/* 中心按钮 */}
            <button
              ref={buttonRef}
              onClick={spinRoulette}
              disabled={isSpinning || foods.length === 0}
              className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 
                w-20 h-20 rounded-full font-bold text-white shadow-xl transition-all duration-200
                ${isSpinning || foods.length === 0
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 hover:scale-110 active:scale-95'
                }`}
            >
              {isSpinning ? '转动中...' : foods.length === 0 ? '无食物' : '开始'}
            </button>
          </div>
        </div>

        {/* 结果显示 */}
        {selectedFood && (
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-6 text-center animate-bounce">
            <div className="text-6xl mb-4">{selectedFood.emoji}</div>
            <div className="text-sm text-gray-500 mb-2">{dateString}</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">今天就吃</h2>
            <p className="text-3xl font-bold" style={{ color: currentCategory.color }}>
              {selectedFood.name}
            </p>
          </div>
        )}

        {/* 重置按钮 */}
        {selectedFood && (
          <button
            onClick={resetRoulette}
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-6 rounded-2xl transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <RotateCcw size={20} />
            重新转一次
          </button>
        )}

        {/* 历史记录 */}
        {history.length > 0 && (
          <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">最近的选择</h3>
            <div className="grid grid-cols-2 gap-3">
              {history.slice(0, 6).map((food, index) => (
                <div key={`${food.id}-${index}`} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                  <span className="text-2xl">{food.emoji}</span>
                  <span className="text-sm text-gray-700">{food.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 撒花动画 */}
      <Confetti 
        isActive={showConfetti} 
        onComplete={() => setShowConfetti(false)}
        centerX={confettiCenter.x}
        centerY={confettiCenter.y}
      />
    </div>
  );
}