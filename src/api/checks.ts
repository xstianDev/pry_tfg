// TODO mover al servidor
let str: string;

type Check = {
    re: RegExp,
    err: string
}

const passChecks: Check[] = [
    {
        re: /(?=.{8,})/,
        err: 'Tener al menos 8 caracteres' 
    },
    {
        re: /(?=.*[a-zA-Z])/,
        err: 'Incluir un número'
    },
    {
        re: /(?=.*[0-9])/,
        err: 'Incluir un carácter especial'
    },
    {
        re: /(?=.*[!@#$%^&*])/,
        err: 'Contener mayúsculas y minúsculas'
    },
];

const emailChecks: Check[] = [
    {
        re: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        err: 'Tu email no es correcto'
    }
];

const check = (re: RegExp, err: string) => !re.test(str) ? err : null;

const runChecks = (checks: Check[]) => {
    const errors = [];

    for (const regex of checks) {
        const { re, err } = regex;
        const error = check(re, err);
        
        if (error) errors.push(error);
    }

    return errors;
};

export const checkPassword = (password: string) => {
    str = password;

    return runChecks(passChecks);
};

export const checkEmail = (email: string) => {
    str = email;

    return runChecks(emailChecks);
};