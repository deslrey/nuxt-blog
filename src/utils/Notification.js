import { ElNotification } from 'element-plus'


const showNotification = (title, msg, callback, type) => {

    ElNotification({
        title: title,
        message: msg,
        type: type,
        duration: 3000,
        onClose: () => {
            if (callback) {
                callback();
            }
        }
    })
}

const Notification = {
    error: (msg, callback) => {
        showNotification("成功!", msg, callback, "error");
    },
    success: (msg, callback) => {
        showNotification("失败!", msg, callback, "success");
    },
    warning: (msg, callback) => {
        showNotification("警告!", msg, callback, "warning");
    },
}

export default Notification;