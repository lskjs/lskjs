/* global test expect */
import { runAction } from '../src/runAction';
// import { sum } from '../src/sum';

// runAction(rules, ctx);

const action = {
  criteria: {
    userId: 1227280,
    chatId: -368345831,
  },
  action: {
    type: 'return',
    value: 123,
  },
};

// нам пишет хер - ignore
// нам пишет игорь но не в этом чате - ignore
// нам пишет хер в этом чате - ignore
// нам пишет хер в этом чате - 123

test('Action 1', () => {
  const ctx = {
    // user: 
    // взять из базы
  }
  const res = await runAction([action], ctx);
  expect(res).toBe(123);
});

const action2 = {
  action: {
    type: 'reply',
    text: 'Some Text',
  },
};


test('Action 2', () => {
  let replyText;
  const ctx = {
    // user: 
    // взять из базы
    reply: (text) => {
      replyText = text;
    }
  }

  // ctx.reply('Some Text')
  const res = await runAction([action2], ctx);


  expect(res).toBe(replyText);
});
