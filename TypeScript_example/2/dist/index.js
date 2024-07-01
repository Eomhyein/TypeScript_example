"use strict";
// 2. (Student)학생 타입의 객체를 받아서 평균을 계산하는 함수(calculateAverage)
function calculateAverage(student) {
    const sum = student.scores.korean + student.scores.math + student.scores.society + student.scores.science + student.scores.english;
    // const average = sum / 5;
    const average = sum / Object.keys(student.scores).length; // Object.keys() 함수 : 특정 속성을 이루는 키 값들을 배열로 반환
    return average;
}
// 3. 평균 점수에 따라 학점 부여하는 함수
function assignGrade(average) {
    if (average >= 90) {
        return 'A';
    }
    else if (average >= 80) {
        return 'B';
    }
    else if (average >= 70) {
        return 'C';
    }
    else if (average >= 60) {
        return 'D';
    }
    else {
        return 'F';
    }
}
// 4. Student 생성하는 함수
function createStudent(name, age, korean, math, society, science, english) {
    return {
        name,
        age,
        scores: {
            korean,
            math,
            society,
            science,
            english,
        },
    };
}
// 5. 성적을 출력하는 함수(printResult 함수)
function printResult(student) {
    const average = calculateAverage(student);
    const grade = assignGrade(average);
    console.log(`${student.name} (${student.age}세) - 평균: ${average.toFixed(2)}, 학점: ${grade}`);
}
// 6. 메인 함수 
function main() {
    const spartan = createStudent('Spartan', 30, 95, 89, 76, 90, 97);
    printResult(spartan);
}
main(); // main 함수 호출
