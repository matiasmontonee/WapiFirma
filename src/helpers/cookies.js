function setCookie(name,value,days) {
    let expires = "";
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}
function getCookie(name) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');
    for(const element of ca) {
        let c = element;
        while (c.startsWith(' ')) c = c.substring(1,c.length);
        if (c.startsWith(nameEQ)) return c.substring(nameEQ.length,c.length);
    }
    return null;
}
function eraseCookie(name) {   
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}


// // const cookie = require('cookie');

// // function setCookie(name, value, days) {
// //     const expires = new Date();
// //     expires.setDate(expires.getDate() + days);
// //     const cookieValue = cookie.serialize(name, value, {
// //         expires: expires,
// //         path: '/'
// //     });
// //     return cookieValue;
// // }

// // function getCookie(cookies, name) {
// //     const cookieValue = cookies[name];
// //     return cookieValue || null;
// // }

// // function eraseCookie(name) {
// //     return cookie.serialize(name, '', {
// //         expires: new Date(0),
// //         path: '/'
// //     });
// // }

// // module.exports = { setCookie, getCookie, eraseCookie };


module.exports = { setCookie, getCookie, eraseCookie };
