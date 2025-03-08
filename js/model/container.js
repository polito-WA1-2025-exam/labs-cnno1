class Container {
    constructor() {
      this.items = []; 
    }
  
    // 添加新对象
    add(item) {
      this.items.push(item);
    }
  
    // 检索对象
    find(criteria) {
      return this.items.filter(criteria);
    }
  
    // 按属性排序
    sortBy(property) {
      this.items.sort((a, b) => {
        if (a[property] < b[property]) return -1;
        if (a[property] > b[property]) return 1;
        return 0;
      });
    }
  
    // 批量更新
    updateAll(updater) {
      this.items = this.items.map(updater);
    }
  
    // 检查约束
    checkConstraint(constraint) {
      return this.items.every(constraint);
    }
  
    // 删除对象
    remove(criteria) {
      this.items = this.items.filter(item => !criteria(item));
    }
  }
module.exports = Container;
  