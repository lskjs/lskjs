import Serializer from 'slate-md-serializer';

const serializer = new Serializer();

export default value => serializer.deserialize(value);

