const isReachable = require('is-reachable');

module.exports.checkInternet = async () => {
    try {
        const online = await isReachable('https://www.google.com');
        if (online) {
            console.log('Internet is available');
            
        } else {
            console.log('Internet is not available');
        }
        return online;
    } catch (error) {
        console.error('Error checking internet connectivity:', error);
    }
};
