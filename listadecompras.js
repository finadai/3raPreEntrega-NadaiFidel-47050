const alcoholList=[];
alert("Bienvenido a la taberna de Moe, ¿que va a querer?");
function showList(){
  
while (true) {
  const newItem = prompt("Ingrese el alcohol que desea comprar (si está satisfecho, presione en cancelar para finalizar la operación):");
  
  if (newItem === null) {
    break; // 
  } 
  else {
    alcoholList.push(newItem);
    alert(`"${newItem}" ha sido añadido a la lista.`);
  }
}

if (alcoholList.length > 0) {
  const formattedList = alcoholList.join("\n");
  alert("Operación finalizada, usted compró lo siguiente:\n" + formattedList);
} 
else {
  alert("La lista de compra está vacía amigo.");
}
}

