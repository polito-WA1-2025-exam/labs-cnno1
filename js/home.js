
const dayjs = require('dayjs');
const Container = require('./model/container'); // Container 定义在 models/Container
const Store = require('./model/class');
const Bag = require('./model/class');
const User = require('./model/class');
const Reservation = require('./model/class');

const BagType = require('./model/class');
const BagSize = require('./model/class');
const BagState = require('./model/class');
// 创建容器实例
const store = Object.create(Container);
const bags = Object.create(Container);
const users = Object.create(Container);
const reservations = Object.create(Container);

// 填充数据
function populateData() {
  // 填充 store
  
  store.add(new Store('est2', 'Grocery Mart', '456 Oak St', '555-5678', 'Grocery'));
  store.add(new Store('est3', 'Sushi Haven', '789 Pine St', '555-9012', 'Japanese'));
  store.add(new Store('est4', 'Bakery Delight', '101 Maple Ave', '555-3456', 'Bakery'));
  store.add(new Store('est5', 'Veggie Cafe', '202 Birch Rd', '555-7890', 'Vegetarian'));
  

  // 填充 Bags
  bags.add(new Bag('bag1', BagType.SURPRISE, null, 5.99, BagSize.SMALL, 'est1', { start: '2025-03-08T10:00:00', end: '2025-03-08T11:00:00' }));
  bags.add(new Bag('bag2', BagType.REGULAR, [{ item: 'apple', quantity: 2 }, { item: 'banana', quantity: 1 }], 7.99, BagSize.MEDIUM, 'est2', { start: '2025-03-08T12:00:00', end: '2025-03-08T13:00:00' }));
  bags.add(new Bag('bag3', BagType.SURPRISE, null, 9.99, BagSize.LARGE, 'est3', { start: '2025-03-09T14:00:00', end: '2025-03-09T15:00:00' }));
  bags.add(new Bag('bag4', BagType.REGULAR, [{ item: 'croissant', quantity: 3 }, { item: 'muffin', quantity: 2 }], 6.49, BagSize.SMALL, 'est4', { start: '2025-03-08T16:00:00', end: '2025-03-08T17:00:00' }));
  bags.add(new Bag('bag5', BagType.SURPRISE, null, 8.99, BagSize.MEDIUM, 'est5', { start: '2025-03-09T10:00:00', end: '2025-03-09T11:00:00' }));

  // 填充 Users
  users.add(new User('user1', 'john_doe'));
  users.add(new User('user2', 'jane_smith'));
  users.add(new User('user3', 'alice_brown'));

  // 填充 Reservations
  reservations.add(new Reservation('res1', 'user1', 'bag2', 1, '2025-03-08'));
  reservations.add(new Reservation('res2', 'user2', 'bag3', 1, '2025-03-09'));
  reservations.add(new Reservation('res3', 'user3', 'bag4', 1, '2025-03-08'));
}


function displayData() {
  console.log('=== store ===');
  console.log(store.items[0]);
  console.log('==================test==============')
  store.sortBy('name');
  store.items.forEach(e => {
    console.log(`ID: ${e.id}, Name: ${e.userId}, Address: ${e.address}, Phone: ${e.phoneNumber}, Category: ${e.category}`);
  });

  console.log('\n=== Bags ===');
  bags.items.forEach(b => {
    console.log(`ID: ${b.id}, Type: ${b.type}, Size: ${b.size}, Price: ${b.price}, Store ID: ${b.StoreId}`);
    if (b.type === BagType.REGULAR) console.log(`Contents: ${JSON.stringify(b.contents)}`);
    console.log(`Pickup Time: ${b.pickupTimeRange.start} to ${b.pickupTimeRange.end}, Valid: ${b.isPickupTimeValid()}`);
  });

  console.log('\n=== Users ===');
  users.items.forEach(u => {
    console.log(`ID: ${u.id}, Username: ${u.username}`);
  });

  console.log('\n=== Reservations ===');
  reservations.items.forEach(r => {
    console.log(`ID: ${r.id}, User ID: ${r.userId}, Bag ID: ${r.bagId}, Quantity: ${r.quantity}, Pickup Date: ${r.pickupDate}`);
  });
}

populateData();
displayData();