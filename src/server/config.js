module.exports = {
    IS_PRODUCTION: process.env.NODE_ENV === 'production',
    PORT: process.env.PORT || 3000,
    MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/scuffed-dofus-database',
    SECRET_JWT_PASSPHRASE: 'TWLom9RDbmGYBtkHHPe4m8pKswyUY',
    CLOUDINARY_NAME: 'daxtmz9ci',
    CLOUDINARY_KEY: '853482771188881',
    CLOUDINARY_SECRET: 'C6ZNuoFdRKiHIM_t7555kQYHsxY',
}
