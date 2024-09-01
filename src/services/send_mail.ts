import { Encryption } from "../utils/encryption_info.js";
import { generateBase32EncodedUuid } from "../utils/generate_id.js";
import { GarbageCollector } from "../utils/garbage_collector.js";
import { env } from '../types/env.js'  
import moment from 'moment';


enum Gender_of_the_person {
    MAN = 'man',
    WOOMAN = 'wooman'
}

export class SendMail {

    private mail = {
        user_id: "",
        first_name: "",
        last_name: "",
        age: "",
        sex: Gender_of_the_person.MAN,
        date_added: new Date(),
        salt: env.SALT,
    }
    
    first_name: string
    last_name: string
    age: number
    sex: Gender_of_the_person

    constructor(first_name: string, last_name: string, age: number, sex: Gender_of_the_person) {
        this.first_name = first_name
        this.last_name = last_name
        this.age = age
        this.sex = sex
    }

    salt: string = env.SALT;

    encrypt_info_add <U extends string | number> (value: U, _special_obj: string, _obj: any): void {
        const _special_obj_add: GarbageCollector = new GarbageCollector(_special_obj) ;

        _obj[value] = _special_obj_add.addData();
        console.log(`${value} has been added in mail`)

        _special_obj_add.ClearData()
        if (_special_obj_add.Has_object() === false) {
            console.log('The cache has been deleted from memory')
        } else {
            throw new Error('The cache has not been deleted from memory!')
        }   
    }

    mail_append(): object {

        // user_id
        this.encrypt_info_add('user_id', generateBase32EncodedUuid(), this.mail)

        // first_name
        const first_name_encrypted = Encryption(this.first_name)
        this.encrypt_info_add('first_name', first_name_encrypted, this.mail)

        // last_name
        const last_name_encrypted = Encryption(this.last_name)
        this.encrypt_info_add('last_name', last_name_encrypted, this.mail)

        // age
        let age_encrypted = Encryption(this.age)
        this.encrypt_info_add('age', age_encrypted, this.mail)
        
        // gender
        if (this.sex === Gender_of_the_person.MAN) {
            const sex_encrypted = Encryption(this.sex)
            this.encrypt_info_add('sex', sex_encrypted, this.mail)
        } else {
            const sex_encrypted = Encryption(this.sex)
            this.encrypt_info_add('sex', sex_encrypted, this.mail)
        }

        // date
        let date_added: string = moment().format('YYYY-MM-DD HH:mm:ss')
        this.encrypt_info_add('date_added', date_added, this.mail)

        // salt
        this.encrypt_info_add('salt', this.salt, this.mail)
     
        return this.mail
    }
}

export let user = new SendMail("Alex", "Tarasenko", 44, Gender_of_the_person.MAN)
