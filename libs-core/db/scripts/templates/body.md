основная фишка - UniversalSchema

# Example of exntend

```
import BotsTelegramMessageModel from '@lskjs/bots/models/BotsTelegramMessageModel'

export default (...args) => {
  const Schema = BotsTelegramMessageModel(...args);
  Schema.extend({
    status: {
      type: String,
    }
  });
  return Schema;
};


export default (...args) => {
  const Schema = BotsTelegramMessageModel(...args);
  Schema.schema = {
    ...Schema.schema,
    status: {
      type: String,
    }
  }
  return Schema;
};

```