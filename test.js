function a(hhh, ggg) {
  console.log(hhh, ggg)
  console.log(this);
}

// const b = a.bind({g: 1}, 1, 2)
a.call({gggq: 2}, 1, 3)
// b()