const returnPromiseFunction = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => { resolve('I resolved!') }, 1000);
    });
};

const prom = returnPromiseFunction();
console.log(prom);