<?php

require("db.php");
$comando = $_GET['q'];


//  Obtener enlaces desde la base de datos y mostrarlos
$sql = "SELECT nombre FROM urls";
$result = mysqli_query($conn, $sql);
$enlace = "";

while ($row = $result->fetch_array()) {
  $enlace .= mostrarEnlaces($row['nombre']);
}

$arr = ["enlace" => $enlace];
mysqli_close($conn);
echo json_encode($arr);


function mostrarEnlaces($nombre) {
  $enlace = <<<_END
  <article class="enlaces">
          <h5 class="btnEnlace">$nombre</h5>
          <svg
            id="btnEliminar"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="30"
            height="30"
            viewBox="0 0 172 172"
            style="fill: #000000"
            
          >
            <g
              fill="none"
              fill-rule="nonzero"
              stroke="none"
              stroke-width="1"
              stroke-linecap="butt"
              stroke-linejoin="miter"
              stroke-miterlimit="10"
              stroke-dasharray=""
              stroke-dashoffset="0"
              font-family="none"
              font-weight="none"
              font-size="none"
              text-anchor="none"
              style="mix-blend-mode: normal"
            >
              <path d="M0,172v-172h172v172z" fill="none"></path>
              <g fill="#ffffff">
                <path
                  d="M74.53333,17.2c-1.53406,-0.02082 -3.01249,0.574 -4.10468,1.65146c-1.09219,1.07746 -1.70703,2.54767 -1.70704,4.08187h-34.32161c-2.06765,-0.02924 -3.99087,1.05709 -5.03322,2.843c-1.04236,1.78592 -1.04236,3.99474 0,5.78066c1.04236,1.78592 2.96558,2.87225 5.03322,2.843h103.2c2.06765,0.02924 3.99087,-1.05709 5.03322,-2.843c1.04236,-1.78592 1.04236,-3.99474 0,-5.78066c-1.04236,-1.78592 -2.96558,-2.87225 -5.03322,-2.843h-34.32161c-0.00001,-1.53421 -0.61486,-3.00442 -1.70704,-4.08187c-1.09219,-1.07746 -2.57061,-1.67228 -4.10468,-1.65146zM34.4,45.86667v91.73333c0,6.33533 5.13133,11.46667 11.46667,11.46667h80.26667c6.33533,0 11.46667,-5.13133 11.46667,-11.46667v-91.73333z"
                ></path>
              </g>
            </g>
          </svg>
        </article>
  _END;

  return $enlace;
}

?>