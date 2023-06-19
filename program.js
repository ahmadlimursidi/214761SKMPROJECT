// Function to solve a linear system of equations using Gauss-Jordan elimination
function solveLinearSystem(A, B) {
    var N = B.length;
    var augmentedMatrix = augmentMatrix(A, B);
  
    for (var k = 0; k < N; k++) {
      var pivotRow = selectPivotRow(augmentedMatrix, k);
      swapRows(augmentedMatrix, k, pivotRow);
  
      var pivotElement = augmentedMatrix[k][k];
      multiplyRow(augmentedMatrix, k, 1.0 / pivotElement);
  
      for (var i = 0; i < N; i++) {
        if (i !== k) {
          var factor = augmentedMatrix[i][k];
          subtractRows(augmentedMatrix, k, i, factor);
        }
      }
    }
  
    var solution = [];
    for (var i = 0; i < N; i++) {
      solution.push(augmentedMatrix[i][N]);
    }
  
    return solution;
  }
  
  function augmentMatrix(A, B) {
    var N = B.length;
    var augmentedMatrix = [];
  
    for (var i = 0; i < N; i++) {
      var row = A[i].slice();
      row.push(B[i]);
      augmentedMatrix.push(row);
    }
  
    return augmentedMatrix;
  }
  
  function selectPivotRow(matrix, col) {
    var maxRow = col;
    var maxVal = Math.abs(matrix[col][col]);
  
    for (var i = col + 1; i < matrix.length; i++) {
      if (Math.abs(matrix[i][col]) > maxVal) {
        maxRow = i;
        maxVal = Math.abs(matrix[i][col]);
      }
    }
  
    return maxRow;
  }
  
  function swapRows(matrix, row1, row2) {
    var temp = matrix[row1];
    matrix[row1] = matrix[row2];
    matrix[row2] = temp;
  }
  
  function multiplyRow(matrix, row, factor) {
    var M = matrix[row].length;
  
    for (var j = 0; j < M; j++) {
      matrix[row][j] *= factor;
    }
  }
  
  function subtractRows(matrix, sourceRow, targetRow, factor) {
    var M = matrix[sourceRow].length;
  
    for (var j = 0; j < M; j++) {
      matrix[targetRow][j] -= factor * matrix[sourceRow][j];
    }
  }
  
  // Function to calculate the inverse of a matrix using Gaussian elimination
function calculateInverseMatrix(matrix) {
    var n = matrix.length;
    var identityMatrix = createIdentityMatrix(n);
    var augmentedMatrix = augmentMatrix(matrix, identityMatrix);
  
    for (var i = 0; i < n; i++) {
      var pivot = augmentedMatrix[i][i];
  
      for (var j = 0; j < 2 * n; j++) {
        augmentedMatrix[i][j] /= pivot;
      }
  
      for (var k = 0; k < n; k++) {
        if (k !== i) {
          var factor = augmentedMatrix[k][i];
  
          for (var j = 0; j < 2 * n; j++) {
            augmentedMatrix[k][j] -= factor * augmentedMatrix[i][j];
          }
        }
      }
    }
  
    var inverseMatrix = [];
    for (var i = 0; i < n; i++) {
      inverseMatrix.push(augmentedMatrix[i].slice(n));
    }
  
    return inverseMatrix;
  }
  
  // Function to create an identity matrix of size n
  function createIdentityMatrix(n) {
    var identityMatrix = [];
  
    for (var i = 0; i < n; i++) {
      var row = [];
  
      for (var j = 0; j < n; j++) {
        row.push(i === j ? 1 : 0);
      }
  
      identityMatrix.push(row);
    }
  
    return identityMatrix;
  }
  
  // Function to augment a matrix A with another matrix B
  function augmentMatrix(A, B) {
    var augmentedMatrix = [];
  
    for (var i = 0; i < A.length; i++) {
      var row = A[i].concat(B[i]);
      augmentedMatrix.push(row);
    }
  
    return augmentedMatrix;
  }
  
  function addEquationInput() {
    var equationsContainer = document.getElementById("equationsContainer");
    var equationInput = document.createElement("div");
    equationInput.className = "equation-input";
  
    var coefficients = [" x ", " y ", " z "];
    for (var i = 0; i < coefficients.length; i++) {
      var coefficientInput = document.createElement("input");
      coefficientInput.className = "in";
      coefficientInput.type = "number";
      coefficientInput.placeholder = "Coefficient";
      equationInput.appendChild(coefficientInput);
  
      var coefficientLabel = document.createElement("span");
      coefficientLabel.textContent = coefficients[i];
      equationInput.appendChild(coefficientLabel);
    }
  
    equationInput.appendChild(document.createTextNode(" = "));
  
    var constantInput = document.createElement("input");
    constantInput.className = "in";
    constantInput.type = "number";
    constantInput.placeholder = "Constant";
    equationInput.appendChild(constantInput);
  
    equationsContainer.appendChild(equationInput);
  }
  
  document.getElementById("linearSystemForm").addEventListener("submit", function (event) {
    event.preventDefault();
  
    var equationsContainer = document.getElementById("equationsContainer");
    var equationInputs = equationsContainer.getElementsByClassName("equation-input");
  
    var A = [];
    var B = [];
  
    for (var i = 0; i < equationInputs.length; i++) {
      var equationInput = equationInputs[i];
      var coefficientInputs = equationInput.getElementsByTagName("input");
      var coefficients = [];
  
      for (var j = 0; j < coefficientInputs.length - 1; j++) {
        var coefficient = parseFloat(coefficientInputs[j].value);
        coefficients.push(coefficient);
      }
  
      var constant = parseFloat(coefficientInputs[coefficientInputs.length - 1].value);
  
      A.push(coefficients);
      B.push(constant);
    }
  
    var solution = solveLinearSystem(A, B);
  
    // Display the solution
    var solutionDiv = document.getElementById("linearSystemSolution");
    solutionDiv.innerHTML = "<h3>Linear System Solution:</h3>";
    for (var i = 0; i < solution.length; i++) {
      solutionDiv.innerHTML += "x" + (i + 1) + " = " + solution[i] + "<br>";
    }
  });
  
  document.getElementById("inverseMatrixForm").addEventListener("submit", function (event) {
    event.preventDefault();
  
    var matrixContainer = document.getElementById("matrixContainer");
    var matrixRows = matrixContainer.getElementsByClassName("matrix-row");
  
    var matrix = [];
    for (var i = 0; i < matrixRows.length; i++) {
      var matrixRow = matrixRows[i];
      var matrixInputs = matrixRow.getElementsByClassName("matrix-input");
      var row = [];
  
      for (var j = 0; j < matrixInputs.length; j++) {
        var element = parseFloat(matrixInputs[j].value);
        row.push(element);
      }
  
      matrix.push(row);
    }
  
    var inverseMatrix = calculateInverseMatrix(matrix);
  
    // Display the inverse matrix
    var inverseMatrixDiv = document.getElementById("inverseMatrixSolution");
    inverseMatrixDiv.innerHTML = "<h3>Inverse Matrix:</h3>";
    for (var i = 0; i < inverseMatrix.length; i++) {
        for (var j = 0; j < inverseMatrix[i].length; j++) {
            inverseMatrixDiv.innerHTML += '<span class="matrix-element">' + inverseMatrix[i][j].toFixed(2) + '</span>';
        }
        inverseMatrixDiv.innerHTML += "<br>";
    }
  });
  