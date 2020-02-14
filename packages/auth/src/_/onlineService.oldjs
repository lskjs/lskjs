const onlineService = {
  visitedAt: {},
  timeout: __DEV__ ? 3 * 1000 : 5 * 60 * 1000,
  touchOnline(id) {
    this.setOnline(id, new Date());
  },
  setOnline(id, value) {
    if (!value) {
      if (this.visitedAt[id]) {
        this.save(id, this.visitedAt[id]);
      }
      delete this.visitedAt[id];
    } else {
      if (!this.visitedAt[id]) {
        this.save(id, value);
      }
      this.visitedAt[id] = value;
    }
  },
  isOnline(id) {
    // console.log('isOnline', id, this.visitedAt[id]);
    if (!this.visitedAt[id]) return false;
    if ((Date.now() - this.visitedAt[id]) > this.timeout) {
      this.setOnline(id, null);
      return false;
    }
    return true;
  },
  count() {
    return Object.keys(this.visitedAt).filter(key => this.isOnline(key)).length;
  },
  save(id, visitedAt) {
    console.log('mock User.visitedAt set', id, visitedAt);
  }
};
export default onlineService;
