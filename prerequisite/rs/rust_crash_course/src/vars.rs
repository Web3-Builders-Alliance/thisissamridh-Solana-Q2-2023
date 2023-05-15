// Variables hold primitive data or references to data
// Variables are inmutable by default
// Rust is a block-scoped language

pub fn run() {
    let name = "samviR";
    let mut age = 36;
    println!("My name is {} and I am {}", name, age);
    age = 37;
    println!("My name is {} and I am {}", name, age);

    // Define constant
    const ID: i32 = 001;
    println!("ID: {}", ID);

    // Assing multiple vars
    let (my_name, my_age) = ("samviR", 36);
    println!("{} is {}", my_name, my_age);
}
