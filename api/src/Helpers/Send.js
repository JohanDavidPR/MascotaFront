
const send = (res, {msg, status, data, error, codeStatus}) => {
    res.status(codeStatus || 200).json({
        msg: msg || "",
        err: error || "",
        status: status || "success",
        data: data || {}
    });
}

module.exports = {send}