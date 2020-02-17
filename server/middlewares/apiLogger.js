const morgan = require('morgan');
const chalk = require('chalk');
const moment = require('moment');

const apiLogger = morgan(function (tokens, req, res) {
    const status = tokens.status(req, res);
    // If status > 400, then that means it has error (4xx -> Client Error, 5xx -> Server Error).
    const isError = eval(status) > 400;
    // Use this to add color and bold to texts in logs.
    const getStyle = function (text, color, bold = false) {
        if (isError) {
            return chalk.red.bold(text); // Whole line should be red and bold to make it notifiable.
        }
        let _chalk = chalk;
        _chalk = color ? _chalk[color] : _chalk; // example: chalk.yellow
        _chalk = bold ? _chalk.bold : _chalk; // example: chalk.yellow.bold
        return _chalk(text); // example: chalk.yellow.bold(text) or chalk.yellow(text)
    };

    const dateString = moment(new Date).format("YYYY-MM-DD HH:MM:ss");
    const httpMethod = tokens.method(req, res); // example: GET, POST, DELETE etc.
    const urlString = tokens.url(req, res); // example: /api/image/
    const responseTime = tokens['response-time'](req, res) + ' ms';

    const logElements = [
        getStyle(`[${dateString}] ${httpMethod}`, 'green'),
        getStyle(`(${status})`, 'green'),
        getStyle(urlString, 'white', true),
        getStyle(responseTime, 'yellow')
    ];

    return logElements.join(' ');
});

module.exports = apiLogger;

