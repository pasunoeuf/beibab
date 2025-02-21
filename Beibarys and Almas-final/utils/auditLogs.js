const fs = require("fs");
const path = require("path");

const logPath = path.join(__dirname, "../logs/audit.log");


if (!fs.existsSync(path.dirname(logPath))) {
    fs.mkdirSync(path.dirname(logPath), { recursive: true });
}

exports.logAction = (user, action, details) => {
    if (!user || !user.username || !user.role) {
        console.error("Ошибка логирования: отсутствуют данные пользователя");
        return;
    }

    const logEntry = `${new Date().toISOString()} | ${user.username} (${user.role}) | ${action} | ${JSON.stringify(details)}\n`;

    try {
        fs.appendFileSync(logPath, logEntry, "utf8");
    } catch (error) {
        console.error("Ошибка записи в лог:", error);
    }
};