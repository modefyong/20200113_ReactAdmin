/**
 * 格式化时间
 */
export function formateDate(time) {
    if (!time) return ''
    let date = new Date(time)
    var years = date.getFullYear();
    var months = date.getMonth() + 1;
    var days = date.getDate();

    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    return years + "-" + (months <= 9 ? ("0" + months) : months) + "-" + (days <= 9 ? ("0" + days) : days) + " " + (hours <= 9 ? ("0" + hours) : hours) + ":" + (minutes <= 9 ? ("0" + minutes) : minutes) + ":" + (seconds <= 9 ? ("0" + seconds) : seconds);
}