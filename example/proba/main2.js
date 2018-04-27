class Cat  {
	constructor(length, age)
	{
		this.length = length;
		this.age = age;
	}
	eat()
	{

	}
}
function Cat2(length,age) {
	this.length = length;
	this.age = age;

	this.eat=function () {

	}

}

var cat1=new Cat(2,1);
console.log(cat1);

var cat2=new Cat2(3,3);
console.log(cat2);
let text=document.querySelector('.item');
console.log(text);
document.write(text.style);