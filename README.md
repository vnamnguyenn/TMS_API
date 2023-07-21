## _TMS_BE_

## Requirements

-   Nodejs version: >=19.8.1
-   npm verson: >=9.5.1

## Cấu trúc thư mục

    ├── dist                       # Thư mục được biên dịch từ thư mục src dùng để chạy ứng dụng
    ├── src                        # Chứa code typescript của dự án
    │   ├── application            # Tầng trung gian giữa tầng Domain và tầng Presentation chứa các use case dùng để xử lý nghiệp vụ của ứng dụng
    │   ├── domain                 # Chứa các đối tượng (object) mô hình hóa cho ứng dụng, và định nghĩa các interface và các logic xử lý nghiệp vụ của ứng dụng
    |   |   ├── entities           # Chứa các đối tượng thực thể của ứng dụng
    |   |   ├── repositories       # Chứa các interface, interface này định nghĩa các hành vi mà một repository cần hỗ trợ
    |   |   ├── models             # Chứa các interface, interface này định nghĩa các hành vi mà một repository cần hỗ trợ
    │   ├── infrastructure         # Chứa các đối tượng thực thi các interface của tầng Domain như: cơ sở dữ liệu, các API bên ngoài, các tệp tin..
    |   |   ├── database
    |   |   |   ├── DBconnection   # Dùng để cấu hình kết nối từ nodejs đến cơ sở dữ liệu
    |   |   |   ├── migration      # Dùng để cấu hình kết nối từ nodejs đến cơ sở dữ liệu
    |   |   ├── repositories       # Thực thi các interface từ tầng domain và thao tác với database
    │   ├── presentation           # Xử lý các request từ client
    │   │   ├── controllers        # điều hướng các request từ client
    │   │   ├── middleware         # xử lý các yêu cầu trước khi đến controllers
    │   │   ├── routes             # cấu hình các đường dẫn URL
    │   │   ├── dtos               # Chuyển đổi dữ liệu giữa 2 tầng application và presentation
    │   ├── shared                 # Chứa các thành phần chung, tái sử dụng giữa các tầng của ứng dụng
    ├── test                       # Kiểm soát chất lượng phần mềm
    ├── .env.sample                # lưu các biến môi trường như: port, database, password. Khi sử dụng cần đổi tên sang .env
    ├── .app.ts                    # chứa các cầu hình cho ứng dụng Express như: middleware, router và các cài đặt khác cho ứng dụng
    ├── .server.ts                 # Dùng để khởi động ứng dụng
    ├── .tsconfig.json             # Cấu hình TypeScript cho dự án
    └── ...
