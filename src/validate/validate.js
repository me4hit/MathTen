import validator from 'validator';



export const isExist = (string) => {
    if (!string) return false;
    return true;

}



export const checkLogin = (email, password) => {
    if (!isExist(email) || !isExist(password)) {
        return { check: false, message: "Vui lòng nhập email và mật khẩu để tiếp tục" }
    } return { check: true, message: "" }
}


export const checkRegister = (username, email, password, cofirmpassword) => {

    if (!isExist(email) || !isExist(password) || !isExist(cofirmpassword) || !isExist(username)) {
        return { check: false, message: "Vui lòng nhập đầy đủ thông tin!" }
    }

    if(!validator.isEmail(email)){
        return { check: false, message: "Email sai định dạng!" }

    }


    if (password.length < 6) {
        return { check: false, message: "Mật khẩu phải từ 6 kí tự trở lên!" }

    }

    if (password != cofirmpassword) {
        return { check: false, message: "Nhập lại mật khẩu không chính xác!" }

    }
    return { check: true, message: "" }
}