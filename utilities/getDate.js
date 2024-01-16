// value can be org , project , script , function etc 
function getUniqueName(value){
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();
    let hrs = today.getHours()
    let min = today.getMinutes()
    let seconds = today.getSeconds()

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    const formattedToday = dd + '/' + mm + '/' + yyyy + '-' + hrs + '-' + min + '-' + seconds + '-' + value;
    return formattedToday;
}

module.exports = getUniqueName;

