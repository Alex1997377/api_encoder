// Сборщик мусора 
export class DataManipulation {

    private _info_str: string;
    private _weakMap = new WeakMap();
    private _obj: { id: string; };

    constructor (info_str: string) {
        this._info_str = info_str
        this._obj = {id: this._info_str}
    }

    // добавляем данные в объект
    // выводим значение добаленного объекта
    addData(): string {
        this._weakMap.set(this._obj, true);
        return this._info_str
    }

    // сразу после вывод удаляем объект из памяти
    ClearData(): void {
        this._weakMap.delete(this._obj)
    }

    // Проверка на наличие объекта в памяти (удален/не удален)
    Has_object(): boolean {
        return this._weakMap.has(this._obj)
    }
}

// Пример использования
// const dataManipulation = new DataManipulation('Hello Alex')
// dataManipulation.addData()
// dataManipulation.ClearData()
// console.log(dataManipulation.Has_object()) // false | true
// при выводе значения false мы можем понять что объект удален из памяти





// позже добавлю в логику


        // let add_id_user = new DataManipulation(user_1.id_user)
        // user_id.id_user = add_id_user.addData()
        // add_id_user.ClearData()
        // if (add_id_user.Has_object() === false) {
        //     console.log("information has been succefull added")
        // }

        // let add_firstname = new DataManipulation(user_1.firstName)
        // user_id.id_user = add_id_user.addData()
        // add_id_user.ClearData()
        // if (add_id_user.Has_object() === false) {
        //     console.log("information has been succefull added")
        // }
