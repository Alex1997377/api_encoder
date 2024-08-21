export class GarbageCollector {
 
    
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





