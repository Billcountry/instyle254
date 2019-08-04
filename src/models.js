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
        this.key = user_id
        this.name = name
        this.email = email
        this.user_id = user_id
    }
}

export class Gallery extends db.Model {
    constructor(title, price, description, quantity, meta_data) {
        super({
            title: db.stringField(),
            price: db.numberField(),
            description: db.stringField(),
            quantity: db.numberField({ default: 1000001 }),
            meta_data: db.objectField(),
            published: db.datetimeField({ default: db.currentTimestamp }),
            images: db.listField(db.stringField()),
        })

        this.title = title
        this.price = price
        this.description = description
        this.quantity = quantity
        this.meta_data = meta_data
    }
}
