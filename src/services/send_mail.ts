import { Encryption } from "../utils/encryption_info.js";
import { generateBase32EncodedUuid } from "../utils/generate_id.js";
import { GarbageCollector } from "../utils/garbage_collector.js";
import { env } from '../types/env.js'  
import moment from 'moment';


enum Gender_of_the_person {
    MAN = 'man',
    WOOMAN = 'wooman'
}

interface User_info {
    user_id?: string;
    first_name: string;
    last_name: string;
    age: number;
    sex: Gender_of_the_person;
    date_added?: Date;
    salt?: string;
}

export class SendMail {

    private mail: User_info = {
        user_id: "",
        first_name: "",
        last_name: "",
        age: 27,
        sex: Gender_of_the_person.MAN,
        date_added: new Date(),
        salt: env.SALT,
    }
    
    first_name: string
    last_name: string
    age: number
    sex: Gender_of_the_person

    constructor(user: User_info) {
        this.first_name = user.first_name
        this.last_name = user.last_name
        this.age = user.age
        this.sex = user.sex
    }

    salt: string = env.SALT;

    mail_append() {
        // user_id
        const user_id = generateBase32EncodedUuid()
        const user_id_add = new GarbageCollector(user_id)
        this.mail.user_id = user_id_add.addData()
        console.log('User_id has been added in mail')
        user_id_add.ClearData()
        if (user_id_add.Has_object() === false) {
            console.log('The cache has been deleted from memory')
        } else {
            throw new Error('The cache has not been deleted from memory!')
        }

        // first_name
        const first_name_encrypted = Encryption(this.first_name)
        const first_name_encrypted_add = new GarbageCollector(first_name_encrypted)
        this.mail.first_name = first_name_encrypted_add.addData()
        console.log('First name has been added in mail')
        first_name_encrypted_add.ClearData()
        if (first_name_encrypted_add.Has_object() === false) {
            console.log('The cache has been deleted from memory')
        } else {
            throw new Error('The cache has not been deleted from memory!')
        }

        // last_name
        const last_name_encrypted = Encryption(this.last_name)
        const last_name_encrypted_add = new GarbageCollector(last_name_encrypted)
        this.mail.last_name = last_name_encrypted_add.addData()
        console.log('Last name has been added in mail')
        last_name_encrypted_add.ClearData()
        if (last_name_encrypted_add.Has_object() === false) {
            console.log('The cache has been deleted from memory')
        } else {
            throw new Error('The cache has not been deleted from memory!')
        }

        // age
        let age_encrypted = Encryption(this.age)
        const age_encrypted_add = new GarbageCollector(age_encrypted)
        this.mail.last_name = age_encrypted_add.addData()
        console.log('Age name has been added in mail')
        age_encrypted_add.ClearData()
        if (age_encrypted_add.Has_object() === false) {
            console.log('The cache has been deleted from memory')
        } else {
            throw new Error('The cache has not been deleted from memory!')
        }

        // gender
        if (this.sex === Gender_of_the_person.MAN) {
            const sex_encrypted = Encryption(this.sex)
            const sex_encrypted_add = new GarbageCollector(sex_encrypted)
            this.mail.last_name = sex_encrypted_add.addData()
            console.log('Gender of person has been added in mail')
            sex_encrypted_add.ClearData()
            if (sex_encrypted_add.Has_object() === false) {
                console.log('The cache has been deleted from memory')
            } else {
                throw new Error('The cache has not been deleted from memory!')
            } 
        } else {
            const sex_encrypted = Encryption(this.sex)
            const sex_encrypted_add = new GarbageCollector(sex_encrypted)
            this.mail.last_name = sex_encrypted_add.addData()
            console.log('Gender of person has been added in mail')
            sex_encrypted_add.ClearData()
            if (sex_encrypted_add.Has_object() === false) {
                console.log('The cache has been deleted from memory')
            } else {
                throw new Error('The cache has not been deleted from memory!')
            } 
        }

        // date
        let today: string = moment().format('YYYY-MM-DD HH:mm:ss')
        const date_add = new GarbageCollector(today)
        this.mail.last_name = date_add.addData()
        console.log('Date has been added in mail')
        date_add.ClearData()
        if (date_add.Has_object() === false) {
            console.log('The cache has been deleted from memory')
        } else {
            throw new Error('The cache has not been deleted from memory!')
        }

        // salt
        let salt_add = new GarbageCollector(this.salt)
        this.mail.last_name = salt_add.addData()
        console.log('Salt has been added in mail')
        salt_add.ClearData()
        if (salt_add.Has_object() === false) {
            console.log('The cache has been deleted from memory')
        } else {
            throw new Error('The cache has not been deleted from memory!')
        }
     
        return this.mail
    }
}

export let user = new SendMail({
    first_name: "Alex",
    last_name: "Freeman",
    age: 27,
    sex: Gender_of_the_person.MAN
})
