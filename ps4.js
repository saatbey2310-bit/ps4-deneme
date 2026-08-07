// NaN-Boxing ve Double Unboxing Krizini Çözen Bit Düzeyi Motoru
function createBitLevelEngine() {
    console.log("[*] Bellek paylaşım alanı (ArrayBuffer) oluşturuluyor...");
    
    // 8 baytlık ortak bir bellek alanı (Buffer) tahsis ediyoruz
    const buffer = new ArrayBuffer(8);
    const f64 = new Float64Array(buffer);
    const u32 = new Uint32Array(buffer);
    const b64 = new BigInt64Array(buffer);

    // Float (Kayan noktalı) değeri 64-bit Integer adresine çevirme (Float-to-Int)
    function f2i(val) {
        f64[0] = val;
        return b64[0];
    }

    // 64-bit Integer adresi Float formatına çevirme (Int-to-Float)
    function i2f(val) {
        b64[0] = val;
        return f64[0];
    }

    console.log("[+] f2i ve i2f köprüleri başarıyla kuruldu!");

    let dblArray = [1.1, 2.2, 3.3];
    let objContainer = { secret: 0x41414141 };

    return {
        // Ham veriyi bit kaybı yaşamadan BigInt adresine çevirerek okuma
        readPointer: function() {
            let rawDouble = dblArray[1];
            let convertedAddress = f2i(rawDouble);
            return convertedAddress;
        },
        // Adresi tekrar double formatına sokup sisteme yutturma
        writePointer: function(addrBigInt) {
            dblArray[1] = i2f(addrBigInt);
            return objContainer.secret;
        }
    };
}

// Bit Düzeyi Test Motorunu Çalıştırma
function executeBitEngine() {
    console.log("----------------------------------------");
    console.log("[🚀] Bit Düzeyinde İşlem Başlatılıyor...");
    
    let bitEngine = createBitLevelEngine();
    let safeAddress = bitEngine.readPointer();
    
    console.log("[🎯] Çözümlenen Ham Bellek Adresi (Hex): 0x" + safeAddress.toString(16));
    console.log("----------------------------------------");
}

executeBitEngine();
