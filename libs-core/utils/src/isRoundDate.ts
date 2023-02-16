const isRoundDate = (dateStr) => new Date(dateStr).toISOString().substr(11) === '00:00:00.000Z';

export default isRoundDate;
