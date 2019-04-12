function getData({ key, value }) {
    let obj = {
        name: '李鹏',
        age: 22
    }
    return {
        ...obj,
        [key]: value
    }
}
let result = getData({
    key: 'name',
    value: '杨超'
});

const sum = (a, b) => a + b;
console.log(sum(9, 5))