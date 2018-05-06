function multiplication(a, b) {
  console.log(a * b)
}

var multiply2 = multiplication.bind(this, 2)
multiply2(3)
multiply2(4)
