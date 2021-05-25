//사용자에게 텍스트 입력받기
function printName()  {
  const name = document.getElementById('name').value;
    console.log(document.getElementById('name').value);
  document.getElementById("result").innerText = name;
}
