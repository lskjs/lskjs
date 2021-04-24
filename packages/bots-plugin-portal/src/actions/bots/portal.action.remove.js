export default async function remove({ ctx }) {
  return ctx.deleteMessage();
}
