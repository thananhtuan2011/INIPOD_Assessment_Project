# INIPOD_Assessment_Project
INIPOD_Assessment_Project

---

##  Công nghệ sử dụng

### Backend (NestJS)
-  NestJS
-  PostgreSQL
-  JWT Authentication
-  TypeORM
-  npm install --force 
-  npm run start:dev
-  DB mình dùng database live free của render bạn có thể đổi lại local
-  npm run migration:generate để migration
-  npm run migration:run để update vào database


### Frontend (Angular)
-  Angular 17+
-  TailwindCSS / SCSS
-  Interceptor & Auth Guard
-  RxJS, Angular Material
-  npm install --force 
-  npm start
-  Có 2 hướng đi là dùng standalone và quản lý theo module cách nào cũng có ưu nhước điểm những dự án lớn thì thường dùng theo  module để dễ mantain nên mình dùng module
---

## Cài đặt

### Yêu cầu:
- Node.js >= 20
- PostgreSQL >= 16
- Yarn hoặc npm

##  Các chức năng đã hoàn thành
•   Basic user authentication (signup/ login) with JWT by username/ password
•	Implement a responsive layout with Header, Menu or Navigator, Footer, and a main content section
•	Create a home page with:
o	A carousel featuring 4 Pokémon-related YouTube video trailers. 
o	A section displaying 10 Pokémon (first on database) with images and names (5 per row)
•	Implement a Pokémon list page with:
o	Button to import the csv file, which include the list of Pokémon (attached on email)
o	A search bar with 300ms debounce time for filtering Pokémon by name
o	Advanced search feature with filters (type, legendary status, speed ranges).
o	Pagination (default 20 Pokémon per page) with a dropdown to change the number of visible Pokémon (10, 20, 50, 100).
o	Ability to filter Pokémon with query params in the URL.
•	Create a Pokémon detail modal/ dialog:
o	Display a detailed view modal with the Pokémon's image and comprehensive information upon clicking on item of list.
o	Add a favorite Pokémon feature, allowing users to mark/unmark favorite Pokémon by click to heart icon.


