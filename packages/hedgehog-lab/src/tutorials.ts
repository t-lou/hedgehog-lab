const matrixSource = `
//1. Initialize matrix with a 2D array.
A = mat([[1,2,3],[4,5,6],[7,8,9]]);
print("Matrix a is: \\n" + A);

//2. You could also create an N-by-1 matrix with 1D array
print("Another matrix is: \\n" + mat([1,2,3,4]));

//3. A matrix can be initialized by a string in CSV format
B = csv2mat(\`1,2
3,4\`);
print("Creating a matrix from csv: \\n" + B);

//4. Also there are some useful built-in functions to create different kinds of matrix
print("Creating a 3-by-3 eye matrix:\\n" + eye(3));
print("Creating a random 2-by-3 matrix:\\n" + random(2,3));
print("Creating a matrix of ones:\\n" + ones(2));
print("Creating a matrix of zeros:\\n" + zeros(2));

//5. You can also create a sequence of number starting with 1 ending with 20 and increasing with step 3, then reshape it as a 3-by-3 matrix
print("Matrix c is:\\n" + range(1,20,3).reshape(3,3));
`;

const operatorsSource = `// Operator overloads are available for Mat class.
// Right operator could be Mat object, 2D or 1D array or number

let A = mat([[1,2],[3,4]]);
let B = mat([[3,4],[5,6]]);

print("A+B=\\n" + (A+B));
print("A-B=\\n" + (A-B));
print("A*B=\\n" + (A*B));
print("A/B=\\n" + (A/B));
print("A^3=\\n" + (A^3));
print("A^(-1)=\\n" + (A^(-1)));
print("A + [[1,1],[1,1]]=\\n" + (A + [[1,1],[1,1]]));

// If the right operands are scalar, operator will do element-wise operation (or "dot operation" in Matlab)
print("A+1=\\n" + (A+1));
print("A-1=\\n" + (A-1));
print("A*3=\\n" + (A*3));
print("A/2=\\n" + (A/2));

// For element-wise multiplication (the same as A.*B in Matlab), use operator '**' instead
print("A**A=\\n" + (A**A))

// and if the right operand of operator "**" is a number N, it will generate an element-wise
// power of N to the left operand matrix (the same as A.^N in Matlab)
print("A**2=\\n" + A**2);

// Also operator '===' can also be used to compare if two matrix are the same at element-wise
let A1 = mat([[1,2],[3,4]]);
if (A1 === A) {
    print("A1 equals to A");
}
else {
    print("A1 does not equal to A");
}

// Also you can use both of them as an expression in Matlab-style
let C = ( A.T()* B ) + ( B * 4 - A + 1 ) * ( B^(-1) );
print("Matrix C (A'*B + (B*4 - A + 1) * (B^(-1)) is\\n" + C);
`;

const gpuAccelerationSource = `//Create a 1000-by-1000 matrix
var x = random(1000,1000);

// do a 1000*1000 matrix multiplication without GPU acceleration
print("Without GPU acceleration...");
tic();
var z1 = x*x;
toc();

//set mode as 'gpu', which will enable GPU acceleration
print("With GPU acceleration...");
tic();
x.mode = 'gpu'
var z2 = x*x;
toc();

`;

const buildInFunctionsSource = `/*
There are many built-in functions which support matrix, including
sin, cos, abs, acos, acosh, sign,
sqrt, trunc, floor, ceil, exp, log,
asin, asinh, atan, atanh, tan, tanh,
pow, round
*/

let A = mat([[1,2],[3,4]]);

// Show the output matrix in fixed-point format with 5 digits
A.digits = 5;

print(sin(A));
print(log(A));  // log A with base e
print(log(A,2));  // log A with base 2

//More functions are on the way...
`;

const insertTexSource = `let A = mat([[7,2],[2,1]]);

// a short introduction
tex("\\\\text{Cholesky decomposition is a classical matrix decomposition algorithm in this form:}")
formulaTex("A=LL^{T},")


// let's  calculate the cholesky now
let L = chol(A).L;

// and keep 5 digits
L.digits = 5
tex("\\\\text{where A is a positive-definite and symmetric matrix.} \\\\\\\\ \\\\text{For example, we have } A = " + A.toTex() + "\\\\text{, and the decomposed matrix L is }" + L.toTex())


// The \`toTex()\` method can be automatically called in formulaTex function. You can embed functions inside \${} to execute while rendering TeX formular or text..
formulaTex\`
  B = \${B= mat([[1,2],[3,4]])}
  \\\\\\\\
  C = \${C = mat([[-1,-2],[0,2]])}
  \\\\\\\\
  CBC^{-1} + BB^{T} = \${C*B*(C^(-1)) + B*B.T()}
\`
`;

const graphicsSource = `// generate 2D points as vectors of x and y
let x = range(-10,10,0.1);
let y = sin(x) + random(1,x.cols);

// plot x and y as scatter
plot2D(x,y);

// ploy x and y as line
plot2DLine(x,y);

// generate 3D points as vectors of x, y and z
let size = 30;
x = zeros(size);
for (let i=0;i<size;i++) {for (let j=0;j<size;j++){x.val[i][j] = i-size/2;}}
y = x.T();
let z = x**2 + y**2;

// plot x,y,z as scatter in 3D
plot3D(x,y,z);

// mesh of x,y,z
plot3DMesh(x,y,z)

/* For more advanced features and different kinds of charts,
   please check the official website plotly.js https://plotly.com/javascript/
   and use built-in function draw(data, layout) instead.
*/
`;
const symbolicSource = `//define symbol x
let x = sym('x')

//write expression
let fx = ( x^2 ) + exp(x)

//print f(x)
formulaTex\`f(x) = \${fx}\`

//print f'(x)
formulaTex\`f'(x) = \${diff(fx,x)}\`

//print integrate of f(x)
formulaTex\`\\int{f(x)dx} = \${integrate(fx,x)}\`


//define g(x)
let gx = fx + 1/fx + cos(x)

//print g(x)
formulaTex\`g(x) = \${gx}\`

//print g'(x)
formulaTex\`g'(x) = \${diff(gx,x)}\`

//print integrate of g(x)
formulaTex\`\\int{g(x)dx} = \${integrate(gx,x)}\`

//define another two symbols
let w = sym('w');
let y = sym('y');

//write another expression with three variables: x,y,w
let W = (x^w) + sin(w+y) + (y^-2) + 1/w

// W
formulaTex\`W(x,y,w) = \${W}\`

// dW / dx
formulaTex\`\\frac{dW(x,y,w)}{dx} = \${diff(W,x)}\`

// dW / dy
formulaTex\`\\frac{dW(x,y,w)}{dy} = \${diff(W,y)}\`

// integral W on x
formulaTex\`\\int{W(x,y,w)dx} = \${integrate(W,w)}\`
`;

const markdownSource = `markdown(\`
# Hedgehog Lab Markdown Example

## Plain Text

This is an example for **plain text** in [Hedgehog Lab](https://github.com/lidangzzz/hedgehog-lab)

## Code Example

\\\`\\\`\\\`js
let matrixA = mat([[1,2,3],[4,5,6],[7,8,9]]);
let matrixB = matrixA * matrixA.T();
print(matrixB);
\\\`\\\`\\\`

## Feel free to arrange any TeX, plotting and Markdown blocks in Hedgehog Lab!
\`)

formulaTex\`A = \${range(1,26).reshape(5,5)}\`

let x = sym('x')
let fx = sin(x) + cos(x) + 1/x;

tex\`\\text{Let's define a function in hedgehog lab as: }f(x) = \${fx} \\text{, and the derivative of the function is:}\`
formulaTex\`f'(x) = \${diff(fx,x)}\`

let X = range(1,10,0.01);
let Y = sin(X);
plot2DLine(X.toArray(), Y.toArray());

markdown(\`
---------------

This document is created and maintained by Hedgehog Lab Community. The markdown feature is supported by [react-markdown](https://github.com/rexxars/react-markdown). Fork our project at [https://github.com/lidangzzz/hedgehog-lab](https://github.com/lidangzzz/hedgehog-lab)
\`)


`;

const moduleSource = `
// import any HHS file on the web from URL
*import https://gist.githubusercontent.com/lidangzzz/86c78163bf7838220224530d6e36aec9/raw/da89c75d4b6671dc0936240a62d483bf67e2b9ef/fibonacci.hs


// then use it.
print(fibonacci(5))

// You can also use or create any package at https://github.com/Hedgehog-Computing/Hedgehog-Package-Manager
*import std: magic
print(magic(7))
`;

const tableSource = `
showTable(new Table([
  ['Test','A'],
  ['2','3'],
  ['2','3'],
  ['2','3'],
  ['2','3'],
  ['2','3'],
  ['2','3'],
  ['2','3'],
  ['2','3'],
  ['2','3'],
  ['2','3'],
  ['2','3'],
  ['2','3'],
  ['2','3'],
  ['2','3'],
  ['7','7'],
  ['2','3'],
  ['2','3'],
  ['2','3'],
  ['2','3'],
  ['2','3'],
  ['2','3'],
  ['2','3'],
  ['2','3'],
  ['2','3'],
  ['2','3'],
  ['2','3'],
  ['2','3'],
  ['2','3'],
  ['2','3'],
  ['2','3'],
  ['2','3'],
  ['2','3'],
  ['2','3'],
  ['2','3'],
  ['2','3'],
  ['2','3'],
  ['2','3'],
  ['2','3'],
  ['2','3'],
  ['2','3'],
  ['2','3'],
  ['2','3'],
  ['2','3'],
  ['2','3'],
  ['2','3'],
  ['2','3'],
  ['6','6'],
  ['2','3'],
  ['2','3'],
],{header:true,rows:45}))
`

export const tutorials = [
    {
        description: 'Empty',
        source: ''
    },
    {
        description: 'Matrix',
        source: matrixSource
    },
    {
        description: 'Operators',
        source: operatorsSource
    },
    {
        description: 'GPU Acceleration',
        source: gpuAccelerationSource
    },
    {
        description: 'Built-in Functions',
        source: buildInFunctionsSource
    },
    {
        description: 'TeX',
        source: insertTexSource
    },
    {
        description: 'Figures',
        source: graphicsSource
    },
    {
        description: 'Symbolic Computing',
        source: symbolicSource
    },
    {
        description: 'Markdown',
        source: markdownSource
    },
    {
        description: 'Module',
        source: moduleSource
    },
    {
        description: 'Table',
        source: tableSource
    }
];
