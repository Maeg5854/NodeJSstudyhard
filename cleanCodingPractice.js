/**
 * 군인 식당 과일 디저트 물품 구매 요청서
 * Written : 2022.06.11.
 * Writer : 김혜지
 * Todo : 과일 개수 올림 구현하기
 */

const order_month = 3;                // 요청 월
const order_month_day = 30;                 // 해당 월이 며칠로 구성되어 있는가.
const cafeteria_customer_count = 70;   // 군인 식당 이용자수

let strawberry_count = 0;                           // 딸기 제공 수량
let watermelon_count = 0;                           // 수박 제공 수량
let pear_count = 0;                                 // 배 제공 수량
let apple_count = 0;                                // 사과 제공 수량

const strawberry_provision_per_customer = 5;        // 딸기 인당 제공 수량
const watermelon_provision_per_customer = 0.1;      // 수박 인당 제공 수량
const apple_provision_per_customer = 1;             // 사과 인당 제공 수량
const pear_provision_per_customer = 0.5;            // 배 인당 제공 수량


// 과일 종류를 체크하고 제공될 과일 개수 반환
const checkFruitThenCalculateFruitCount = (fruit_code, customer_count) => {
    let fruit_count = 0;
    
    switch (fruit_code) {
        case 'SB' :
            fruit_count = customer_count * strawberry_provision_per_customer;
            break;
        case 'WM' :
            fruit_count = customer_count * watermelon_provision_per_customer;
            break;
        case 'AP' : 
            fruit_count = customer_count * apple_provision_per_customer;
            break;
        case 'PE' :
            fruit_count = customer_count * pear_provision_per_customer;
            break;
    }
    
    return fruit_count;
    
}

// 날짜에 따라 제공될 과일코드 설정 (ex checkFruitForDay(3) => 'WM')
const getFruitOfDay = (day) => {
    const day_end = day % 10;
    switch(day_end) {
        case 1 : return 'SB';
        case 3 : return 'WM';
        case 5 : return 'AP';
        case 7 : return 'PE';
    }
    return '';
}

// 과일의 한국어 이름 반환
const getKrNameOfFruit = (fruit_code) => {
    switch (fruit_code) {
        case 'SB' :
            return '딸기';
        case 'WM' :
            return '수박';
        case 'AP' : 
            return '사과';
        case 'PE' :
            return '배';
    }
}


// 구매내역서 헤더 작성
let order = '';
order += `${order_month}월 디저트 구매 내역서 (총 ${cafeteria_customer_count}명)`;
order += '\n\n';

// 구매내역서 본문 작성
for(let i=1; i <= order_month_day; i++) {
    const fruitcode_of_day = getFruitOfDay(i);
    
    //과일이 제공되는 날일 경우
    if (fruitcode_of_day !== '') {
        const fruit_name_kr = getKrNameOfFruit(fruitcode_of_day);
        const fruit_count_of_day = checkFruitThenCalculateFruitCount(fruitcode_of_day, cafeteria_customer_count);
        // 출력 : '?월 ?일 : [과일종류] [과일개수]개' 
        order += `${order_month}월 ${i}일: `;                   
        order += `${fruit_name_kr} ${fruit_count_of_day}개`;    
        order += '\n';
    } else {
        // 출력 : '?월 ?일 : - ' 
        order += `${order_month}월 ${i}일: - `;
        order += '\n';
    }
}

console.log(order);