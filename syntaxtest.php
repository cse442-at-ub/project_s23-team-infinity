<?php
echo "Hello World";
for ($i=1;$i<=10; $i++) {
    echo $i;
}
function checkgreaterthan10($number1,$number2) {
    $total = $number1 + $number2;
    if ($total > 10) {
        echo "yes";
    }
    else{
        echo "no";
    }
}

checkgreaterthan10(3,4);
checkgreaterthan10(5,6);