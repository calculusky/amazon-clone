exports.mongoDBUrl = process.env.MONGO_DB_URL || 'mongodb://localhost:27017/amazon';
exports.port = process.env.PORT || 8080;
exports.jwtSecret = process.env.JWT_SECRET || 'someformofsecret';