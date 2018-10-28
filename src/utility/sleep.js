const ONE_SECOND = 1000;

function sleep(seconds = 1) {
    return new Promise((resolve) =>
        setTimeout(resolve, seconds * ONE_SECOND));
}

module.exports = sleep;
