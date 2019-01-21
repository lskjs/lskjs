export default async function () {
  this.i18 = await this.getI18();
  this.t = (...args2) => this.i18.t(...args2);
}
