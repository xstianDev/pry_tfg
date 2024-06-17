// TODO mover al servidor
type Check = {
    reg: RegExp,
    err: string
}

const passChecks: Check[] = [
    {
        reg: /(?=.{8,})/,
        err: 'Tener al menos 8 caracteres' 
    },
    {
        reg: /(?=.*[a-zA-Z])/,
        err: 'Contener mayúsculas y minúsculas'
    },
    {
        reg: /(?=.*[0-9])/,
        err: 'Incluir un número'
    },
    {
        reg: /(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~])/,
        err: 'Incluir un carácter especial'
    },
];

const emailChecks: Check[] = [
    {
        reg: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        err: 'Tu email no es correcto'
    }
];

const check = (str: string, reg: RegExp, err: string) => !reg.test(str) ? err : null;

const runChecks = (str: string, checks: Check[]) => {
    const errors = [];

    for (const regex of checks) {
        const { reg, err } = regex;
        const error = check(str, reg, err);
        
        if (error) errors.push(error);
    }

    return errors;
};

export const checkPassword = (password: string) => runChecks(password, passChecks);

export const checkEmail = (email: string) => runChecks(email, emailChecks);