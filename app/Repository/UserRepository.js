const { db } = require('../../bootstrap/DB')
const { FormatDate } = require('../Helpers/FormatDate')
const { Hash } = require('../Helpers/Hash')

class UserRepository {
    static all() {
        return new Promise(async (resolve, reject) => {
            const { rows } = await db.query('SELECT * from users ORDER BY id ASC')
            resolve(rows)
        })
    }

    static find(id, with_password) {
        return new Promise(async (resolve, reject) => {
            if (with_password) {
                const { rows } = await db.query(`SELECT id, name, email, password, created_at, updated_at from users where id = ${id}`)
                resolve(rows)   
            }
            else {
                const { rows } = await db.query(`SELECT id, name, email, created_at, updated_at from users where id = ${id}`)
                resolve(rows)   
            }
        })
    }

    static create(user) {
        return new Promise(async (resolve, reject) => {
            let new_user_id = 0
            await this.all().then((users) => {
                new_user_id = parseInt((users[(users.length)-1].id))+1
            });
            let today = FormatDate.formatForDb()
            let password = Hash.hashPassword(user.password)
            let query = 'INSERT INTO users(id, name, email, password, created_at, updated_at) VALUES($1, $2, $3, $4, $5, $6) RETURNING id, name, email, created_at, updated_at'
            let values = [new_user_id, user.name, user.email, password, today, today]
            const { rows } = await db.query(query, values)
            resolve(rows);
        })
    }
    
    static update(user, user_id) {
        return new Promise(async (resolve, reject) => {
            let today = FormatDate.formatForDb()
            let query = 'UPDATE users SET name=$1, email=$2, password=$3, updated_at= $4 WHERE id=$5 RETURNING id, name, email, created_at, updated_at'
            let values = [user.name, user.email, user.password, today, user_id]
            const { rows } = await db.query(query, values)
            resolve(rows);
        })
    }

    
    static destroy(user_id) {
        return new Promise(async (resolve, reject) => {
            const { rows } = await db.query(`DELETE FROM users WHERE id=${user_id}`)
            resolve(rows);
        })
    }
}

module.exports = {
    UserRepository,
}