module.exports.catchAsyncError = (fn) => {
    return (req, res, next) => {
        console.log('local Middleware');
        fn(req, res).catch(err => next(err));
    }
}