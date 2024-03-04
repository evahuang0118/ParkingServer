function getDateTime() {
    var d = new Date();
    var curr_date = d.getDate();
    var curr_month = d.getMonth() + 1;
    var curr_year = d.getFullYear();
    var curr_hour = d.getHours();
    var curr_minutes = d.getMinutes();
    var curr_seconds = d.getSeconds();
    String(curr_month).length < 2 ? (curr_month = "0" + curr_month) : curr_month;
    String(curr_date).length < 2 ? (curr_date = "0" + curr_date) : curr_date;
    var yt = curr_year + "" + curr_month + "" + curr_date + "" + curr_hour + "" + curr_minutes + "" + curr_seconds;
    return yt;
}

function getendDateTime() {
    var d = new Date();
    var curr_date = d.getDate();
    var curr_month = d.getMonth() + 1;
    var curr_year = d.getFullYear();
    var curr_hour = d.getHours();
    var curr_minutes = d.getMinutes();
    var curr_seconds = d.getSeconds();
    String(curr_month).length < 2 ? (curr_month = "0" + curr_month) : curr_month;
    String(curr_date).length < 2 ? (curr_date = "0" + curr_date) : curr_date;
    var yt = curr_year + "-" + curr_month + "-" + curr_date + " " +"23:59:59";
    return yt;
}

function getbeginDateTime() {
    var d = new Date();
    var curr_date = d.getDate();
    var curr_month = d.getMonth() + 1;
    var curr_year = d.getFullYear();
    var curr_hour = d.getHours();
    var curr_minutes = d.getMinutes();
    var curr_seconds = d.getSeconds();
    String(curr_month).length < 2 ? (curr_month = "0" + curr_month) : curr_month;
    String(curr_date).length < 2 ? (curr_date = "0" + curr_date) : curr_date;
    var yt = curr_year + "-" + curr_month + "-" + curr_date + " " + "00:00:00";
    return yt;
}

$(document).ready(function () {
    $(".layui-btn-group button").each(function () {
        var obj = $(this).attr("onclick");
        if (obj == "null") {
            $(this).hide();
        }
    });
});