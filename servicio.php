<?php  
if ($_SERVER["REQUEST_METHOD"] == "GET") {
echo file_get_contents("data-1.json");
}
if($_SERVER["REQUEST_METHOD"] == "POST") {

	$ciudad = $_POST["Ciudad"];
	$tipo = $_POST["Tipo"];
	$min = (int) $_POST["Min"];
	$max = (int) $_POST["Max"];

	$json = file_get_contents("data-1.json");
	$jsonArray = json_decode($json, false);
	$jsonArrayLength = count($jsonArray);
	$answer = array();

	for ($i=0; $i < $jsonArrayLength; $i++) { 
		$jsonOBJ = $jsonArray[$i];
		$city = $jsonOBJ->Ciudad;
		$type = $jsonOBJ->Tipo;
		$price = $jsonOBJ->Precio;
		$minPrice = substr($price,1,2);
		$maxPrice = substr($price,-3);
		$totalPrice = $minPrice.$maxPrice;
		if($city == $ciudad && $type == $tipo && $totalPrice > $min && $totalPrice < $max){
			array_push($answer, $jsonOBJ);
		}
	}
echo json_encode($answer);
}
?>