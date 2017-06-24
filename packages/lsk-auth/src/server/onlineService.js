const onlineService = {
  visitedAt: {},
  timeout: 10 * 60 * 1000,
  touchOnline(id) {
    this.setOnline(id, new Date());
  },
  setOnline(id, value) {
    if (!value) {
      delete this.visitedAt[id];
    }
    this.visitedAt[id] = value;
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
};

export default onlineService;
