"use strict";
//1-4. 어드민이 만든 음료들의 목록 관리, 고객이 주문한 내용 관리
let beverages = [];
let orders = [];
/*2. 별다방 프로그램 코딩 - 함수 구현하기 */
// 2-1. 어드민 권한 체크 함수
function isAdmin(user) {
    return user.role === "admin";
}
// 2-1. 고객 권한 체크 함수
function isCustomer(user) {
    return user.role === "customer";
}
// 2-2. 음료 등록 기능 - 어드민
function addBeverage(user, name, price) {
    if (!isAdmin(user)) {
        console.log("권한이 없습니다.");
        return;
    }
    const newBeverage = { name, price };
    beverages.push(newBeverage);
}
// 2-3. 음료 삭제 기능 - 어드민
function removeBeverage(user, beverageName) {
    if (!isAdmin(user)) {
        console.log("권한이 없습니다.");
        return;
    }
    beverages = beverages.filter((beverage) => beverage.name !== beverageName);
}
// 2-4. 음료 조회 기능 - 어드민, 고객
function getBeverages(user) {
    if (!user) {
        return [];
    }
    return beverages;
}
// 2-5. 음료 찾기 함수
// 고객이 음료 주문 시 판매하지 않는 음료를 사는 것을 방지하기 위해
function findBeverage(beverageName) {
    return beverages.find((beverage) => beverage.name === beverageName);
}
// 2-6. 음료 주문 기능 - 고객
// 엉뚱한 커피 주문 막기, 주문 ID 리턴
function placeOrder(user, beverageName) {
    if (!isCustomer(user)) {
        console.log("권한이 없습니다.");
        return -1;
    }
    const beverage = findBeverage(beverageName);
    if (!beverage) {
        console.log("해당 음료를 찾을 수 없습니다.");
        return -1;
    }
    const newOrder = {
        orderId: orders.length + 1,
        customerId: user.id,
        customerName: user.name,
        beverageName,
        status: "placed",
    };
    orders.push(newOrder);
    return newOrder.orderId;
}
// 2-7. 음료 준비 완료 기능 - 어드민
// 고객이 주문한 음료가 준비가 완료되었다는 동작을 담당하는 함수 
function completeOrder(user, orderId) {
    if (!isAdmin(user)) {
        console.log("권한이 없습니다.");
        return;
    }
    const order = orders.find((order) => order.orderId === orderId);
    if (order) {
        order.status = "completed"; // 단순히 주문의 상태만 바꾸고 끝!
        console.log(`[고객 메시지] ${order.customerName}님~ 주문하신 ${order.beverageName} 1잔 나왔습니다~`);
    }
}
// 2-8. 음료 수령하는 기능 - 고객
function pickUpOrder(user, orderId) {
    if (!isCustomer(user)) {
        console.log("권한이 없습니다.");
        return;
    }
    const order = orders.find((order) => order.orderId === orderId && order.customerId === user.id);
    if (order && order.status === "completed") {
        order.status = "picked-up";
        console.log(`[어드민 메시지] 고객 ID[${order.customerId}]님이 주문 ID[${orderId}]을 수령했습니다.`);
    }
}
/* 3. 테스트 코드 포함*/
function main() {
    const admin = {
        id: 1,
        name: "바리스타",
        role: "admin",
    };
    // 유저 생성
    const member1 = {
        id: 2,
        name: "르탄이",
        role: "customer",
    };
    const member2 = {
        id: 3,
        name: "꿈꾸는개발자",
        role: "customer",
    };
    // 음료 등록
    addBeverage(admin, "아메리카노", 4000);
    addBeverage(admin, "카페라떼", 4500);
    addBeverage(admin, "에스프레소", 3000);
    // 음료 삭제
    removeBeverage(admin, "에스프레소");
    console.log(`안녕하세요~ ${member1.name} 고객님! 별다방에 오신 것을 환영합니다. 저희는 ${JSON.stringify(getBeverages(member1))}를 판매하고 있습니다.`);
    // 음료 주문
    const orderId1 = placeOrder(member1, "아메리카노");
    if (orderId1 > 0) {
        setTimeout(() => {
            // 음료 제작 완료
            completeOrder(admin, orderId1);
            // 음료 수령
            pickUpOrder(member1, orderId1);
        }, 1000);
    }
    console.log(`안녕하세요~ ${member2.name} 고객님! 별다방에 오신 것을 환영합니다. 저희는 ${JSON.stringify(getBeverages(member2))}를 판매하고 있습니다.`);
    // 음료 주문
    const orderId2 = placeOrder(member2, "카페라떼");
    if (orderId2 > 0) {
        setTimeout(() => {
            // 음료 제작 완료
            completeOrder(admin, orderId2);
            // 음료 수령
            pickUpOrder(member2, orderId2);
        }, 3000);
    }
}
main();
