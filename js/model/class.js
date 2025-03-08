const dayjs = require('dayjs');

// Store 类
class Store {
  constructor(id, name, address, phoneNumber, category) {
    this.id = id;
    this.name = name;
    this.address = address;
    this.phoneNumber = phoneNumber;
    this.category = category;
  }
}

// Bag 类
const BagType = {
    SURPRISE: 'surprise',
    REGULAR: 'regular',
  };
  
const BagSize = {
    SMALL: 'small',
    MEDIUM: 'medium',
    LARGE: 'large',
  };
  
const BagState = {
    AVAILABLE: 'available',
    RESERVED: 'reserved',
  };
class Bag {
  constructor(id, type, contents, price, size, establishmentId, pickupTimeRange) {
    this.id = id;
    this.type = type; // BagType.SURPRISE 或 BagType.REGULAR
    this.contents = contents || []; // 仅对 regular bag 有效
    this.price = price;
    this.size = size; // BagSize.SMALL/MEDIUM/LARGE
    this.establishmentId = establishmentId;
    this.pickupTimeRange = pickupTimeRange; // {start: "YYYY-MM-DDTHH:mm:ss", end: "YYYY-MM-DDTHH:mm:ss"}
    this.state = BagState.AVAILABLE;
    this.quantityAvailable = 10; // 初始可用数量
    this.quantityReserved = 0; // 初始已预订数量
  }

  // 检查是否在未来时间范围内
  isPickupTimeValid() {
    const now = dayjs();
    const start = dayjs(this.pickupTimeRange.start);
    return start.isAfter(now);
  }
}


// User 类
class User {
  constructor(id, username) {
    this.id = id;
    this.username = username;
    this.allergies = '';
    this.specialRequests = '';
    this.cart = new ShoppingCart(id);
  }
}
// ShoppingCart 类
class ShoppingCart {
  constructor(userId) {
    this.id = `cart-${userId}`;
    this.userId = userId;
    this.items = []; // [{bagId, quantity}]
  }

  // 添加袋子到购物车
  addBag(bag, quantity) {
    if (!bag.isPickupTimeValid()) {
      throw new Error('Cannot add bag with past pickup time');
    }
    if (bag.state !== BagState.AVAILABLE || bag.quantityAvailable < quantity) {
      throw new Error('Bag is not available or insufficient quantity');
    }
    const existingItem = this.items.find(item => item.bagId === bag.id);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.items.push({ bagId: bag.id, quantity, removedItems: [] });
    }
  }

  // 从购物车移除袋子
  removeBag(bagId) {
    this.items = this.items.filter(item => item.bagId !== bagId);
  }

  // 从 regular bag 中移除食物项
  removeFoodItem(bagId, foodItem) {
    const item = this.items.find(item => item.bagId === bagId);
    if (!item) throw new Error('Bag not found in cart');
    const bag = bags.find(b => b.id === bagId);
    if (bag.type !== BagType.REGULAR) throw new Error('Can only remove items from regular bags');
    if (item.removedItems.length >= 2) throw new Error('Cannot remove more than 2 items');
    item.removedItems.push(foodItem);
  }
}

// Reservation 类
class Reservation {
  constructor(id, userId, bagId, quantity, pickupDate) {
    this.id = id;
    this.userId = userId;
    this.bagId = bagId;
    this.quantity = quantity;
    this.pickupDate = pickupDate;
  }
}
//module.exports = Reservation;
module.exports = {Store, Bag, User, ShoppingCart, Reservation ,BagType, BagSize, BagState };

