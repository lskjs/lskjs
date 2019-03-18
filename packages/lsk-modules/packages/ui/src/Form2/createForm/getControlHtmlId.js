const getControlHtmlId = control => (typeof control === 'string' ? `lskform_${control}` : control.htmlId || `lskform_${control.name}`);

export default getControlHtmlId;
