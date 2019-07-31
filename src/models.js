import { db } from "firebase-orient"

export class User extends db.Model {
    constructor(name, email, user_id) {
        super({
            user_id: db.stringField(),
            name: db.stringField(),
            email: db.stringField(),
            phone: db.listField(db.stringField()), // Allow multiple phone numbers
            addresses: db.listField(db.stringField()),
        })
        this.name = name
        this.email = email
        this.user_id = user_id
    }
}
