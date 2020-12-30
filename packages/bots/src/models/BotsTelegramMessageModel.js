import MongooseSchema from '@lskjs/db/MongooseSchema';

// https://raw.githubusercontent.com/KnorpelSenf/typegram/master/types.d.ts
export default () => {
  const schema = new MongooseSchema(
    {
      telegramUserId: {
        type: MongooseSchema.Types.ObjectId,
        ref: 'BotsTelegramUser',
      },
      botId: {
        type: 'String',
      },
      type: {
        type: 'String',
      },

      /** INTERFACE ServiceMessage */
      /** Unique message identifier inside this chat */
      message_id: {
        type: Number,
      },
      /** Sender, empty for messages sent to channels */
      from: {
        type: Object,
      },
      /** Date the message was sent in Unix time */
      date: {
        type: Number,
      },
      /** Conversation the message belongs to */
      chat: {
        type: Object,
      },
      /** ------------------------------ */

      /** INTERFACE CommonMessage extends ServiceMessage */
      /** For forwarded messages, sender of the original message */
      forward_from: {
        type: Object,
      },
      /** For messages forwarded from channels, information about the original channel */
      forward_from_chat: {
        type: Object,
      },
      /** For messages forwarded from channels, identifier of the original message in the channel */
      forward_from_message_id: {
        type: Number,
      },
      /** For messages forwarded from channels, signature of the post author if present */
      forward_signature: {
        type: String,
      },
      /** Sender's name for messages forwarded from users who disallow adding a link to their account in forwarded messages */
      forward_sender_name: {
        type: String,
      },
      /** For forwarded messages, date the original message was sent in Unix time */
      forward_date: {
        type: Number,
      },
      /** For replies, the original message. Note that the Message object in this field will not contain further reply_to_message fields even if it itself is a reply. */
      reply_to_message: {
        type: Object,
      },
      /** Bot through which the message was sent */
      via_bot: {
        type: Object,
      },
      /** Date the message was last edited in Unix time */
      edit_date: {
        type: Number,
      },
      /** Signature of the post author for messages in channels */
      author_signature: {
        type: String,
      },
      /** Inline keyboard attached to the message. login_url buttons are represented as ordinary url buttons. */
      reply_markup: {
        type: Object,
      },
      /** ------------------------------ */

      /** INTERFACE TextMessage extends CommonMessage */
      /** For text messages, the actual UTF-8 text of the message, 0-4096 characters */
      text: {
        type: String,
      },
      /** For text messages, special entities like usernames, URLs, bot commands, etc. that appear in the text */
      entities: {
        type: Object,
      },
      /** ------------------------------ */

      /** INTERFACE CaptionableMessage extends CommonMessage */
      /** Caption for the animation, audio, document, photo, video or voice, 0-1024 characters */
      caption: {
        type: String,
      },
      /** For messages with a caption, special entities like usernames, URLs, bot commands, etc. that appear in the caption */
      caption_entities: {
        type: Object, // Array,
      },
      /** ------------------------------ */

      /** INTERFACE MediaMessage extends CaptionableMessage */
      /** The unique identifier of a media message group this message belongs to */
      media_group_id: {
        type: String,
      },
      /** ------------------------------ */

      /** INTERFACE AudioMessage extends CaptionableMessage */
      /** Message is an audio file, information about the file */
      audio: {
        type: Object,
      },
      /** ------------------------------ */

      /** INTERFACE DocumentMessage extends CaptionableMessage */
      /** Message is a general file, information about the file */
      document: {
        type: Object,
      },
      /** ------------------------------ */

      /** INTERFACE AnimationMessage extends DocumentMessage */
      /** Message is an animation, information about the animation. For backward compatibility, when this field is set, the document field will also be set */
      animation: {
        type: Object,
      },
      /** ------------------------------ */

      /** INTERFACE PhotoMessage extends MediaMessage */
      /** Message is a photo, available sizes of the photo */
      photo: {
        type: Object, // || Array, default: undefined
      },
      /** } */

      /** INTERFACE StickerMessage extends CommonMessage */
      /** Message is a sticker, information about the sticker */
      sticker: {
        type: Object,
      },
      /** ------------------------------ */

      /** INTERFACE VideoMessage extends MediaMessage */
      /** Message is a video, information about the video */
      video: {
        type: Object,
      },
      /** ------------------------------ */

      /** INTERFACE VideoNoteMessage extends CommonMessage */
      /** Message is a video note, information about the video message */
      video_note: {
        type: Object,
      },
      /** ------------------------------ */

      /** INTERFACE VoiceMessage extends CaptionableMessage */
      /** Message is a voice message, information about the file */
      voice: {
        type: Object,
      },
      /** ------------------------------ */

      /** INTERFACE ContactMessage extends CommonMessage */
      /** Message is a shared contact, information about the contact */
      contact: {
        type: Object,
      },
      /** ------------------------------ */

      /** INTERFACE DiceMessage extends CommonMessage */
      /** Message is a dice with random value from 1 to 6 */
      dice: {
        type: Object,
      },
      /** ------------------------------ */

      /** INTERFACE GameMessage extends CommonMessage */
      /** Message is a game, information about the game. More about games » */
      game: {
        type: Object,
      },
      /** ------------------------------ */

      /** INTERFACE PollMessage extends CommonMessage */
      /** Message is a native poll, information about the poll */
      poll: {
        type: Object,
      },
      /** ------------------------------ */

      /** INTERFACE LocationMessage extends CommonMessage */
      /** Message is a shared location, information about the location */
      location: {
        type: Object,
      },
      /** ------------------------------ */

      /** INTERFACE VenueMessage extends LocationMessage */
      /** Message is a venue, information about the venue. For backward compatibility, when this field is set, the location field will also be set */
      venue: {
        type: Object,
      },
      /** ------------------------------ */

      /** INTERFACE NewChatMembersMessage extends ServiceMessage */
      /** New members that were added to the group or supergroup and information about them (the bot itself may be one of these members) */
      new_chat_members: {
        type: Object, // Array,
      },
      /** ------------------------------ */

      /** INTERFACE LeftChatMemberMessage extends ServiceMessage */
      /** A member was removed from the group, information about them (this member may be the bot itself) */
      left_chat_member: {
        type: Object,
      },
      /** ------------------------------ */

      /** INTERFACE NewChatTitleMessage extends ServiceMessage */
      /** A chat title was changed to this value */
      new_chat_title: {
        type: String,
      },
      /** ------------------------------ */

      /** INTERFACE NewChatPhotoMessage extends ServiceMessage */
      /** A chat photo was change to this value */
      new_chat_photo: {
        type: Object, // Array,
      },
      /** ------------------------------ */

      /** INTERFACE DeleteChatPhotoMessage extends ServiceMessage */
      /** Service message: the chat photo was deleted */
      delete_chat_photo: {
        type: Boolean,
      },
      /** ------------------------------ */

      /** INTERFACE GroupChatCreatedMessage extends ServiceMessage */
      /** Service message: the group has been created */
      group_chat_created: {
        type: Boolean,
      },
      /** ------------------------------ */

      /** INTERFACE SupergroupChatCreated extends ServiceMessage */
      /** Service message: the supergroup has been created. This field can't be received in a message coming through updates, because bot can't be a member of a supergroup when it is created. It can only be found in reply_to_message if someone replies to a very first message in a directly created supergroup. */
      supergroup_chat_created: {
        type: Boolean,
      },
      /** ------------------------------ */

      /** INTERFACE ChannelChatCreatedMessage extends ServiceMessage */
      /** Service message: the channel has been created. This field can't be received in a message coming through updates, because bot can't be a member of a channel when it is created. It can only be found in reply_to_message if someone replies to a very first message in a channel. */
      channel_chat_created: {
        type: Boolean,
      },
      /** ------------------------------ */

      /** INTERFACE MigrateToChatIdMessage extends ServiceMessage */
      /** The group has been migrated to a supergroup with the specified identifier. This number may be greater than 32 bits and some programming languages may have difficulty/silent defects in interpreting it. But it is smaller than 52 bits, so a signed 64 bit integer or double-precision float type are safe for storing this identifier. */
      migrate_to_chat_id: {
        type: Number,
      },
      /** ------------------------------ */

      /** INTERFACE MigrateFromChatIdMessage extends ServiceMessage */
      /** The supergroup has been migrated from a group with the specified identifier. This number may be greater than 32 bits and some programming languages may have difficulty/silent defects in interpreting it. But it is smaller than 52 bits, so a signed 64 bit integer or double-precision float type are safe for storing this identifier. */
      migrate_from_chat_id: {
        type: Number,
      },
      /** ------------------------------ */

      /** INTERFACE PinnedMessageMessage extends ServiceMessage */
      /** Specified message was pinned. Note that the Message object in this field will not contain further reply_to_message fields even if it is itself a reply. */
      // pinned_message: Omit<Message, "reply_to_message">;
      /** ------------------------------ */

      /** INTERFACE InvoiceMessage extends ServiceMessage */
      /** Message is an invoice for a payment, information about the invoice. More about payments » */
      invoice: {
        type: Object,
      },
      /** ------------------------------ */

      /** INTERFACE SuccessfulPaymentMessage extends ServiceMessage */
      /** Message is a service message about a successful payment, information about the payment. More about payments » */
      successful_payment: {
        type: Object,
      },
      /** ------------------------------ */

      /** INTERFACE ConnectedWebsiteMessage extends ServiceMessage */
      /** The domain name of the website on which the user has logged in. More about Telegram Login » */
      connected_website: {
        type: String,
      },
      /** ------------------------------ */

      /** INTERFACE PassportDataMessage extends ServiceMessage */
      /** Telegram Passport data */
      passport_data: {
        type: Object,
      },

      // Объект, в котрый можно складировать мета-информацию
      meta: {
        type: Object,
      },
    },
    {
      model: 'BotsTelegramMessage',
      collection: 'bots_telegram_message',
    },
  );

  return schema;
};
