
// to convert upperCase
export function toTitleCase(str){
    return str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
} 
// to convert lowerCase
export function toLowerCase(str){
  return str.replace(/\w\S*/g, (txt) => txt.charAt(0).toLowerCase() + txt.substr(1).toLowerCase());
}

export function formattedDate(date) {
	const splitDate = date.split('T');
	const updateDate = splitDate[0].split('-');
	const formattedDate = updateDate[2] + '-' + updateDate[1] + '-' + updateDate[0];
	return formattedDate;
}
export function formattedTime(time) {
	const splitDate = time.split('T');
	const transactionTime = splitDate[1];
	const updateTime = transactionTime.split(':');
	const formattedTime = updateTime[0]+':'+updateTime[1];
	return formattedTime;
}

export function trimNewLines(text) {
  if (!text) return;
  return text.replace(/(\r\n|\n|\r)/gm, '');
}


