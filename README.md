Phùng Viết Tùng 
Lớp HTTT	 MSV: 16150290

        Dùng kĩ thuật caching server để giải quyết performance hệ thống

Cài đặt project
Điều kiện : 
	- Cài đặt nodejs, npm : https://nodejs.org/en/
	- Cài đặt Redis : https://redis.io/topics/quickstart (Port mặc định và dùng trong bài là 6379)
	- Cài đặt Mysql 
		+ Khởi tạo csdl mới mang tên : test
+ Chạy script 
create table product (
	id INT(6) unsigned auto_increment primary key,
	name VARCHAR(30) NOT NULL,
	description VARCHAR(30) NOT NULL,
	status enum('1','0') default NULL
)
insert into product(name, description, status)
values ('product 1', 'description product 1', '1'),
('product 2', 'description product 2', '0')
Sửa cấu hình kết nối mysql ở file index.js trong project clone về 

Cài đặt
B1: Clone project trên github : 
B2: Chuyển đến thư mục gốc chạy lệnh 
- npm install
- node index.js 
B3: Thực hiện Get request : http://localhost:3000/product?id=1 
	
Quan sát thấy , lần đầu tiên thời gian thực hiện request là 33ms (chưa lưu kết quả lên Redis)
Trong khoảng thời gian 2 phút sau lần đầu tiên thực hiện request , chúng ta có thể thấy tốc độ request nhanh hơn do dùng kĩ thuật caching bằng Redis (lúc này là 4ms)

