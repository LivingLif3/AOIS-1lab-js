const SHIFT = 127
const EXPONENT_END_INDEX = 9
const MANTISSA_LENGTH = 23

const bin_to_int = (number) => {
    let res = 0
    for(let i = 1; i < number.length; i++) {
         if(number[i] == 1) {
            res += 2**(number.length - 1 - i)
        }
    }
    if(number[0] === 1) {
        res *= -1
    }
    return res
}
const int_to_bin = (number, a) => {
    let b = Math.floor(a);
    a = Math.floor(a)
    a = Math.abs(a)
    while (Math.abs(a) > 1) {
        number.push(a % 2)
        a = Math.floor(a / 2)
    }
    number.push(1)
    number.reverse()
    if(b < 0) {
        number.unshift(1)
    } else {
        number.unshift(0)
    }
    return number
}
const num_to_bin = (number, a) => {
    let b = Math.floor(a)
    let sch = 0
    number = int_to_bin(number, b)
    number.push('.');
    a = Math.abs(a - b)
    if(a === 0) {
        return number
    }
    a *= 2
    while(a != 0.0 && sch < 11) {
        if(a >= 1) {
            number.push(1)
            a -= 1
        } else if (a < 1) {
            number.push(0)
        }
        a *= 2
        sch++
    }
    return number
}

const bin_to_num = (number) => {
    let ans = 0
    let intPart = []
    let i = 0
    while(number[i] !== '.') {
        intPart.push(number[i])
        i++
    }
    ans = bin_to_int(intPart)
    let degree = -1
    for (let j = number.indexOf('.') + 1; j < number.length; j++) {
        ans += (number[j]) * 2**degree;
        degree--;
    }
    return ans;
}

// Sum

const add_zeroes = (number1, number2) => {
    number1.indexOf('.') === -1 && number1.push('.')
    number2.indexOf('.') === -1 && number2.push('.')
    let index1 = number1.indexOf('.')
    let index2 = number2.indexOf('.')
    let n = Math.abs(index1 - index2)
    if(number1.indexOf('.') < number2.indexOf('.')) {
        for(let i = 0; i < n; i++) {
            number1.splice(1, 0, 0);
        }
    } else {
        for(let i = 0; i < n; i++) {
            number2.splice(1, 0, 0);
        }
    }
    let maxLength = number1.length > number2.length ? number1.length : number2.length
    let minArr = maxLength === number1.length ? number2 : number1
    while(minArr.length !== maxLength) {
        minArr.push(0)
    }
    return {number1, number2: minArr}
}

const sumBinForm = (number1, number2, raz) => {
    let ost = 0, pointIndex
    let numbers = add_zeroes(number1, number2)
    number1 = numbers.number1
    number2 = numbers.number2
    number1.indexOf('.') === -1 ? pointIndex = number1.length - 1 : pointIndex = number1.indexOf('.') - 1
    let ans = []
    for(let i = number1.length - 1; i > 0; i--) {
        if(number1[i] + number2[i] == 2) {
            if(ost != 0) {
                ans.unshift(1)
            } else {
                ans.unshift(0)
                ost++
            }
        } else if(number1[i] + number2[i] <= 1) {
            if(ost != 0) {
                if((number1[i] + number2[i] + 1) % 2 == 0) {
                    ans.unshift(0)
                } else if(number1[i] + number2[i] + 1 == 1) {
                    ans.unshift(1)
                    ost--
                }
            } else {
                if(number1[i] + number2[i] == 1) {
                    ans.unshift(1)
                } else if(number1[i] + number2[i] == 0) {
                    ans.unshift(0)
                }
            }
        }
    }
    if(raz) {
        for(let i = 0; i < ost; i++) {
            ans.unshift(1)
            pointIndex++
        }
    }
    ans.splice(pointIndex, 0, '.')
    number1[0] == 0 ? ans.unshift(0) : ans.unshift(1)
    return ans
}
const sum = (num1, num2) => {
    let number1 = num_to_bin([], num1)
    let number2 = num_to_bin([], num2)
    let numbers = add_zeroes(number1, number2)
    number1 = numbers.number1
    number2 = numbers.number2
    let ans = sumBinForm(number1, number2, true)
    console.log(ans.join(''))
    return bin_to_num(ans)
}
//Difference with additional code

const invert = (num) => {
    for(let i = 1; i < num.length; i++) {
        if(num[i] !== '.') {
            num[i] = Number(!num[i])
        }
    }
    return num
}
const transform_to_additional_code = (num1, num2) => {
    let {number1, number2} = add_zeroes(num1, num2)
    number2 = invert(number2)
    let one = int_to_bin([], 1)
    let numbers = add_zeroes(number2, one)
    let copyNumber2 = numbers.number1
    let copyOne = numbers.number2
    let res = sumBinForm(copyNumber2, copyOne, false)
    return res
}
const difference_double = (num1, num2, arr) => {
    let tmpAns = []
    let number1 = num1.slice(0)
    let number2 = num2.slice(0)
    let res = transform_to_additional_code(num1, num2)
    tmpAns = sumBinForm(num1, res, false)
    if(Math.abs(bin_to_num(number2)) > Math.abs(bin_to_num(number1))) {
        if(Math.abs(bin_to_num(num2)) > Math.abs(bin_to_num(num1))) {
            tmpAns[0] = 1
        } else {
            tmpAns[0] = 0
        }
        tmpAns = invert(tmpAns)
        let one = int_to_bin([], 1)
        let ans = sumBinForm(tmpAns, one, true)
        if(Math.abs(bin_to_num(number2)) > Math.abs(bin_to_num(number1))) {
            ans[0] = 1
        } else {
            console.log(Math.abs(bin_to_num(num2)), Math.abs(bin_to_num(num1)))
            ans[0] = 0
        }
        for(let i = 0; i < tmpAns.length; i++) {
            arr.push(tmpAns[i])
        }
        console.log(ans.join(''))
        return bin_to_num(ans)
    }
    for(let i = 0; i < tmpAns.length; i++) {
        arr.push(tmpAns[i])
    }
    console.log(tmpAns.join(''))
    return bin_to_num(tmpAns)
}

const difference = (a, b) => {
    let num1 = num_to_bin([], a)
    let num2 = num_to_bin([], b)
    return difference_double(num1, num2, [])
}

// Multiplication

const multiplication = (num1, num2) => {
    let ans = []
    for(let i = 0; i < num1.length + num2.length + 1; i++) {
        ans.push(0)
    }
    let rankLength = 0
    for(let i = num2.length - 2; i > 0; i--) {
        let resTwoNum = []
        let storage = []

        for(let j = num1.length - 2; j > 0; j--) {
            resTwoNum.unshift(num1[j]*num2[i])
        }
        for(let k = 0; k < rankLength; k++) {
            resTwoNum.push(0)
        }
        resTwoNum.unshift(0)
        let length1 = resTwoNum.length - 1
        let length2 = ans.length - 1

        storage = sumBinForm(resTwoNum, ans, true)
        for(let k = 0; k < storage.length; k++) {
            ans[k] = storage[k]
        }

        rankLength++
    }

    return bin_to_num(ans)
}

const multiplication_wrapper = (num1, num2) => {
    let number1 = num_to_bin([], num1)
    let number2 = num_to_bin([], num2)
    return multiplication(number1, number2)
}

// Division

const division = (num1, num2) => {
    let sch = 0
    let residualResult = []
    let copyNum2 = num2.slice(0)
    let ans = []
    while(bin_to_num(num1) >= bin_to_num(num2)) {
        difference_double(num1, num2, residualResult)
        num1 = residualResult;
        num2 = copyNum2.slice(0)
        residualResult = []
        sch++
    }
    console.log(num_to_bin([], sch).join(''))
    return sch
}

const division_wrapper = (num1, num2) => {
    let number1 = num_to_bin([], num1)
    let number2 = num_to_bin([], num2)
    return division(number1, number2)
}

// Mantissa

const double_to_variable_binary = (num, a) => {
    let exp = []
    let m = []
    if(a < 0) {
        num.push(1)
    } else {
        num.push(0)
    }
    a = Math.abs(a)
    let begin, end
    for(let i = 0; i < a; i++) {
        if(2**i >= a) {
            end = i;
            break
        }
    }
    for(let i = end - 1; i >= -100; i--) {
        if(2**i <= a) {
            begin = i
            break
        }
    }
    let coefficient = (a - 2**begin) / (2**end - 2**begin)
    let M = Math.floor(2**MANTISSA_LENGTH * coefficient)
    let E = begin + SHIFT
    return prepare_to_standart(num, exp, m, E, M)
}

const prepare_to_standart = (num, exp, m, E, M) => {
    int_to_bin_for_mantis(exp, E)
    while(exp.length !== 8) {
        exp.unshift(0)
    }
    int_to_bin_for_mantis(m, M)
    for(let i = 0; i < exp.length; i++) {
        num.push(exp[i])
    }
    while(m.length !== MANTISSA_LENGTH) {
        m.unshift(0)
    }
    for(let i = 0; i < m.length; i++) {
        num.push(m[i])
    }

    return num
}

const int_to_bin_for_mantis = (num, a) => {
    let temp = []
    a = Math.abs(a)
    while(a > 1) {
        temp.push(a % 2)
        a = Math.floor(a / 2)
    }
    num.push(1)
    for(let i = temp.length - 1; i >= 0; i--) {
        num.push(temp[i])
    }
}

const transform_mantis_to_num = (number) => {
    let s = (-1)**number[0]
    let exp = [], mantis = []
    for(let i = 1; i <= 8; i++) {
        exp.push(number[i])
    }
    for(let i = EXPONENT_END_INDEX; i <= number.length - 1; i++) {
        mantis.push(number[i])
    }
    exp.unshift(0)
    mantis.unshift(0)
    let E = bin_to_int(exp), M = bin_to_int(mantis)
    return s*(2**(E - SHIFT))*(1 + M/(2**MANTISSA_LENGTH))
}

const transform_to_mantis = (num) => {
    let number = num_to_bin([], num), ans = []
    let exp = SHIFT, m = []
    number.shift()
    let pointIndex = number.indexOf('.')
    if(num > 1) {
        let firstOneIndex = 0
        for(let i = 0; i < pointIndex; i++) {
            if(number[i] === 1) {
                firstOneIndex = i
                break
            }
        }
        exp += pointIndex - firstOneIndex
        for(let i = pointIndex + 1; i < number.length; i++) {
            m.push(number[i])
        }
        if(m.length > MANTISSA_LENGTH) {
            m.length = MANTISSA_LENGTH
        } else {
            while(m.length !== MANTISSA_LENGTH) {
                m.push(0)
            }
        }
        exp = int_to_bin([], exp)
        exp.shift()
    }
    if(num < 0) {
        ans.push(1)
    } else {
        ans.push(0)
    }
    ans = ans.concat(exp)
    ans = ans.concat(m)
    return ans
}

const set_exp = (newExp, number) => {
    for(let i = 1; i <= 8; i++) {
        number[i] = newExp[i - 1]
    }
}

const set_mantis = (newMantis, number) => {
    for(let i = EXPONENT_END_INDEX; i <= number.length - 1; i++) {
        number[i] = newMantis[i - EXPONENT_END_INDEX]
    }
}

const get_mantis = (number) => {
    let ans = []
    for(let i = EXPONENT_END_INDEX; i <= number.length - 1; i++) {
        ans.push(number[i])
    }
    return ans
}

const get_exp = (number) => {
    let ans = []
    for(let i = 1; i <= 8; i++) {
        ans.push(number[i])
    }
    return ans
}

//Mantis sum

const sum_mantis_sec = (number1, number2, raz) => {
    let exp1 = get_exp(number1), exp2 = get_exp(number2)
    let mantissa1 = get_mantis(number1), mantissa2 = get_mantis(number2)

    let copyExp1 = exp1.slice(0)
    let copyExp2 = exp2.slice(0)

    copyExp1.unshift(0)
    copyExp2.unshift(0)

    let E1 = bin_to_int(copyExp1), E2 = bin_to_int(copyExp2), maxExp = E1;

    let shiftMant = 0

    if(E1 > E2) {
        maxExp = E1
        shiftMant = {num: 2, shift: E1 - E2}
    } else if(E2 > E1) {
        maxExp = E2
        shiftMant = {num: 1, shift: E2 - E1}
    }

    let mantisWithShift = sumMantis(mantissa1, mantissa2, shiftMant, raz)

    let shift = mantisWithShift.shift

    maxExp += shift

    return prepareAnsManissa(number1, mantisWithShift, maxExp)
}

const prepareAnsManissa = (number1, mantisWithShift, maxExp) => {
    let ansMantissa = mantisWithShift.mantis

    let ansExp = num_to_bin([], maxExp)

    ansExp.shift()
    ansExp.pop()

    while(ansExp.length !== 8) {
        ansExp.unshift(0)
    }

    let sign = 0

    if(number1[0] === 1) {
        sign = 1
    }

    let answer = []

    answer.push(sign)
    answer = answer.concat(ansExp)
    answer = answer.concat(ansMantissa)

    return answer
}

const sumMantis = (m1, m2, shiftNum, raz) => {
    let mantis1 = m1.slice(0),
         mantis2 = m2.slice(0)

    if(shiftNum.num === 1) {
        let pointIndex = 1
        mantis1.unshift(1)
        for(let i = 0; i < shiftNum.shift; i++) {
            mantis1.unshift(0)
            mantis1.pop()
        }
        mantis1.splice(pointIndex, 0, '.')
        mantis2.unshift('.')
        mantis2.unshift(1)
    } else if(shiftNum.num === 2) {
        let pointIndex = 1
        mantis2.unshift(1)
        for(let i = 0; i < shiftNum.shift; i++) {
            mantis2.unshift(0)
            mantis2.pop()
        }
        mantis2.splice(pointIndex, 0, '.')
        mantis1.unshift('.')
        mantis1.unshift(1)
        //mantis1.unshift(0)
    } else if(!shiftNum) {
        let pointIndex = 1
        mantis2.unshift(1)
        mantis1.unshift(1)
        mantis2.splice(pointIndex, 0, '.')
        mantis1.splice(pointIndex, 0, '.')
    }

    mantis1.unshift(0)
    mantis2.unshift(0)

    return transformation_sum_mantiss(mantis1, mantis2)
}

const transformation_sum_mantiss = (mantis1, mantis2) => {
    let ans = sumBinForm(mantis1, mantis2, true)

    ans.shift()

    let point = ans.indexOf('.')

    let shift = 0, firstOne = 0

    for(let i = 0; i <= point; i++) {
        if(ans[i] === 1) {
            firstOne = i
            shift = point - i - 1
            break;
        }
    }

    ans.splice(point, 1)

    let newMantis = []

    for(let i = firstOne + 1; i < ans.length; i++) {
        if(newMantis.length < MANTISSA_LENGTH) {
            newMantis.push(ans[i])
        }
    }

    while(newMantis.length !== MANTISSA_LENGTH) {
        newMantis.push(0)
    }

    return {mantis: newMantis, shift}
}

const sum_with_negative_mantissa = (number1, number2) => {
    let ans = []
    difference_double(number1, number2, ans)
    return ans
}

//Finish Form

const finish_sum = (a, b) => {
    let ans = 0
    console.log(`(${a}) + (${b})`)
    if(a > 0 && b > 0) {
        ans = sum(a, b)
        return ans
    } else if(a < 0 && b < 0) {
        ans = sum(a, b)
        return ans
    } else if(b < 0 && a > 0) {
        if(Math.abs(b) > a) {
            ans = -1 * difference(a, Math.abs(b))
            return ans
        } else {
            ans = difference(a, Math.abs(b))
            return ans
        }
    } else if(a < 0 && b > 0) {
        if(Math.abs(a) > b) {
            ans = -1 * difference(b, Math.abs(a))
            return ans
        } else {
            ans = difference(b, Math.abs(a))
            return ans
        }
    }
}

const finish_diff = (a, b) => {
    console.log(`(${a}) - (${b})`)
    if(a > 0 && b > 0) {
        if(Math.abs(b) > a) {
            return -1 * difference(a, Math.abs(b))
        } else {
            return difference(a, Math.abs(b))
        }
    } else if(a < 0 && b < 0) {
        if(Math.abs(b) > Math.abs(a)) {
            return difference(Math.abs(b), Math.abs(a))
        } else {
            return -1 * difference(Math.abs(a), Math.abs(b))
        }
    } else if(a > 0 && b < 0) {
        return sum(a, Math.abs(b))
    } else if(a < 0 && b > 0) {
        return sum(a, b)
    }
}

const finish_multiplication = (num1, num2) => {
    console.log(`(${num1}) * (${num2})`)
    if((num1 < 0 && num2 < 0) || (num1 > 0 && num2 > 0)) {
        return multiplication_wrapper(num1, num2)
    } else {
        return -1 * multiplication_wrapper(num1, num2)
    }
}

const division_multiplication = (num1, num2) => {
    console.log(`(${num1}) / (${num2})`)
    if((num1 < 0 && num2 < 0) || (num1 > 0 && num2 > 0)) {
        return division_wrapper(Math.abs(num1), Math.abs(num2))
    } else {
        return -1 * division_wrapper(Math.abs(num1), Math.abs(num2))
    }
}

const finish_sum_mantisses = (num1, num2) => {
    console.log(`${num1} + ${num2}`)
    let a = double_to_variable_binary([], num1)
    let b = double_to_variable_binary([], num2)

    let ans = sum_mantis_sec(a, b, false)

    console.log(ans.join(''))

    return transform_mantis_to_num(ans)
}
//let a = double_to_variable_binary([], 5.0) //2.1 not working  //2.1 + 5.34
//let b = double_to_variable_binary([], 2.0)

//console.log(a.join(''))
//console.log(b.join(''))
/*console.log(num3.join(''))
console.log(num4.join(''))*/
/*
let a = transform_to_mantis(403.5)
console.log(a.join(''))*/
// let ans = sum_mantis_sec(a, b, false)
// console.log(ans.join(''))
// //console.log(finish_sum(4.5, 1.5))
// console.log(transform_mantis_to_num(ans))


//console.log(finish_sum(5, -12))
//console.log(finish_diff(5, 10))
//console.log(finish_multiplication(11, 2))
//console.log(division_multiplication(11, 2))
console.log(finish_sum_mantisses(0.5, 17.125)) //6.33321, 41.42
