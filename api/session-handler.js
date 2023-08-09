import { randomBytes, pbkdf2Sync } from 'crypto'

const eggiePW = {
    salt: '7kMCE5muIcnbCfa8jQXnFUoNpkN1lL4Ss/x+1bDrGDC086Gi/dTIRmFwj0wzWwRWuNyT6hA2NyKvNxaRKgN9C7ZcX+5kwG7zfCKKA5J++Lf8aewOltBNsnw4K5jLBJWjf9QdgXNyH57pYacUPVG+BKOYJx7bNERKgo3q8fP5tSY=',
    iterations: 10000,
    keylen: 64,
    digest: 'sha256',
    hash: 'TD/XBCj3p88Ob/wpJQBDsGn8sifOne+djPwjtdYP0fz0JDRwahZ40QmfsHWKel7bE0k0AsohPxI/Z0ulUX/6TA=='
}

const login = (username, password) => {
	if (username != "eggie") throw 'only eggie can log in!'

    const { salt, iterations, keylen, digest } = eggiePW
    const hash = pbkdf2Sync(password, salt, iterations, keylen, digest)
        .toString('base64')

    if (hash != eggiePW.hash) throw 'invalid password'

    return 'TODO: generate jwt token'
}

const logout = 'TODO: implement logout'

export { login, logout }
