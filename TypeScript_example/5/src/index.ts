/*1. 도서관 프로그래밍 코딩 */
// 1-1. Role이라는 enum 정의
// 1-1. 역할 enum
enum Role {
  LIBRARIAN, // 사서
  MEMBER, // 멤버
}

// 1-2. User 추상 클래스
// : name, age라는 인자를 받고 geRole이라는 추상 함수를 포함한다
abstract class User {
  constructor(public name: string, public age: number) {}
  abstract getRole(): Role;
}

// 1-3. Member 이라는 클래스 정의
// : Member는 User를 상속받는다.
class Member extends User {
  constructor(name: string, age: number) {
    super(name, age);
  }
  getRole(): Role {
    return Role.MEMBER;
  }
}
// 1-4. 사서 클래스
// Librarian라는 클래스 정의
// Member와 다를게 없지만 Role만 다름
class Librarian extends User {
  constructor(name: string, age: number) {
    super(name, age);
  }
  getRole(): Role {
    return Role.LIBRARIAN;
  }
}

// 1-5. Book 클래스 정의
// 책은 이름, 저자, 출판일로 구성되어진다.
class Book {
  constructor(
    public title: string,
    public author: string,
    public publishedDate: Date
  ) {}
}

// 1-6. 도서관이 꼭 갖추어야 할 기능을 정의한 명세서
// RentManager 인터페이스
interface RentManager {
  getBooks(): Book[]; // 도서관의 현재 도서 목록을 확인하는 함수
  addBook(user: User, book: Book): void; // 사서가 도서관에 새로운 도서를 입고할 때 호출하는 함수
  removeBook(user: User, book: Book): void; // 사서가 도서관에서 도서를 폐기할 때 호출하는 함수 
  rentBook(user: Member, book: Book): void; // 사용자가 책을 빌릴때 반화하는 함수
  returnBook(user: Member, book: Book): void; // 사용자가 책을 반납할 때 반환하는 함수
}

// 1-7. 도서관 클래스 구현
class Library implements RentManager {
  private books: Book[] = [];
  private rentedBooks: Map<string, Book> = new Map<string, Book>();

  // 1-7-1. getBooks 함수는 books를 깊은 복사해서 던진다.
  getBooks(): Book[] {
    // 깊은 복사를 하여 외부에서 books를 수정하는 것을 방지합니다.
    return JSON.parse(JSON.stringify(this.books));
  }

  // 1-7-2. - addBook는 사서만 호출할 수 있다
  addBook(user: User, book: Book): void {
    if (user.getRole() !== Role.LIBRARIAN) {
      console.log("사서만 도서를 추가할 수 있습니다.");
      return;
    }

    this.books.push(book);
  }
  // 1-7-3. removeBook는 사서만 호출할 수 있다
  removeBook(user: User, book: Book): void {
    if (user.getRole() !== Role.LIBRARIAN) {
      console.log("사서만 도서를 삭제할 수 있습니다.");
      return;
    }

    const index = this.books.indexOf(book);
    if (index !== -1) {
      this.books.splice(index, 1);
    }
  }

  // 1-7-4. rentBook는 유저만 호출 할 수 있다.
  // - returnBook에서는 책을 빌린 사람들만 반납할 수 있다.
  rentBook(user: User, book: Book): void {
    if (user.getRole() !== Role.MEMBER) {
      console.log("유저만 도서를 대여할 수 있습니다.");
      return;
    }

    if (this.rentedBooks.has(user.name)) {
      console.log(
        `${user.name}님은 이미 다른 책을 대여중이라 빌릴 수 없습니다.`
      );
    } else {
      this.rentedBooks.set(user.name, book);
      console.log(`${user.name}님이 [${book.title}] 책을 빌렸습니다.`);
    }
  }
  
  // 1-7-5. rentBook에서는 다른 책을 대여한 유저는 책을 대여할 수 없어야 한다.
  returnBook(user: User, book: Book): void {
    if (user.getRole() !== Role.MEMBER) {
      console.log("유저만 도서를 반납할 수 있습니다.");
      return;
    }

    if (this.rentedBooks.get(user.name) === book) {
      this.rentedBooks.delete(user.name);
      console.log(`${user.name}님이 [${book.title}] 책을 반납했어요!`);
    } else {
      console.log(`${user.name}님은 [${book.title}] 책을 빌린적이 없어요!`);
    }
  }
}

/* 2. 테스트 코드*/
function main() {
  const myLibrary = new Library();
  const librarian = new Librarian("르탄이", 30);
  const member1 = new Member("예비개발자", 30);
  const member2 = new Member("독서광", 28);

  const book = new Book("TypeScript 문법 종합반", "강창민", new Date());
  const book2 = new Book("금쪽이 훈육하기", "오은영", new Date());
  const book3 = new Book("요식업은 이렇게!", "백종원", new Date());

  myLibrary.addBook(librarian, book);
  myLibrary.addBook(librarian, book2);
  myLibrary.addBook(librarian, book3);
  const books = myLibrary.getBooks();
  console.log("대여할 수 있는 도서 목록:", books);

  myLibrary.rentBook(member1, book);
  myLibrary.rentBook(member2, book2);

  myLibrary.returnBook(member1, book);
  myLibrary.returnBook(member2, book2);
}

main();