import base32Encode from "base32-encode";
import  {v4 as uuidv4}  from "uuid";
import crypto from 'crypto'


function calculateChecksum(bytes: Buffer): number {
    const intValue: bigint = BigInt(`0x${bytes.toString('hex')}`);
    return Number(intValue % BigInt(37));
}

function getChecksumCharacter(checksumValue: number): string {
    const alphabet: string = '0123456789ABCDEFG' + 'HJKMNPQRSTVWXYZ*~$=U';
    return alphabet[Math.abs(checksumValue)]
}

// Генерация уникального id пользователя
export function generateBase32EncodedUuid(): string {
    const b: Buffer = Buffer.alloc(16)
    uuidv4(null, b)
    const checksum: number = calculateChecksum(b)
    const checksumChar: string = getChecksumCharacter(checksum)
    return base32Encode(b, "Crockford") + checksumChar
}

// Кодирование строкового типа данных в SHA256
export function encode_string(lines: string): string {
    const hash: crypto.Hash = crypto.createHash('sha256');
    for (let i = 0; i < lines.length; i++) {
        const line: string = lines[i].trim();
        if (line === '') continue;
        hash.write(line);
    }
    return hash.digest('base64')
}


// const a = encode_string("Hello world")
// console.log(a)

// const g = generateBase32EncodedUuid()
// console.log(g)

// Минимизация использования глобальных переменных. 
// Данный метод заключается в использование локальных переменных внутри функций.


// Использование слабой ссылки сможет предотвратить утечки памяти. 
// Она препятствует сборке объекта






