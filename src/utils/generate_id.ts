import base32Encode from "base32-encode";
import  {v4 as uuidv4}  from "uuid";


function calculateChecksum(bytes: Buffer): number {
    const intValue: bigint = BigInt(`0x${bytes.toString('hex')}`);
    return Number(intValue % BigInt(37));
}

function getChecksumCharacter(checksumValue: number): string {
    const alphabet: string = '0123456789ABCDEFG' + 'HJKMNPQRSTVWXYZ*~$=U';
    return alphabet[Math.abs(checksumValue)]
}

export function generateBase32EncodedUuid(): string {
    const b: Buffer = Buffer.alloc(16)
    uuidv4(null, b)
    const checksum: number = calculateChecksum(b)
    const checksumChar: string = getChecksumCharacter(checksum)
    return base32Encode(b, "Crockford") + checksumChar
}


