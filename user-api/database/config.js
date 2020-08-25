module.exports = {
    'development': {
        'url': process.env.DEV_DATABASE_URL,
        'dialect': 'postgres'
    },
    'test': {
        'url': process.env.TEST_DATABASE_URL,
        'dialect': 'postgres'
    },
    'production': {
        'username': 'root',
        'password': null,
        'database': 'database_production',
        'host': '127.0.0.1',
        'dialect': 'postgres'
    }
}

