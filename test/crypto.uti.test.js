const enc = require('../utils/crypto-util')

test('Encrypt', () => {
    const val = enc.encrypt('test');
    console.log(val);
    const dval = enc.decrypt(val);
    console.log(dval);
})