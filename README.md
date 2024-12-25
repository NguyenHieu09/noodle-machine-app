
# Project Mát phát mì tự động

## 1. Kiến trúc tổng thể
- Frontend: Sử dụng typescript react native để tạo giao diện người dùng.
- Backend: Sử dụng firebase.

## 2. Chức năng người dùng
- **Đăng nhập bằng cách quét mã QR**: đăng nhập sử dụng thư viện react-native-camera để quét mã QR, giúp thu thập thông tin cá nhân của người dùng. Sau khi quét, dữ liệu sẽ được đối chiếu với Firebase.
- **Hiển thị thông tin người dùng và chọn số lượng mì**: Sau khi xác thực, ứng dụng hiển thị thông tin cá nhân và số lượng mì còn lại. Người dùng có thể chọn số mì muốn nhận, và dữ liệu sẽ tự động cập nhật và lưu trữ ở Firebase.
## Công nghệ sử dụng
React native, Expo, Firebase, Redux

## Yêu Cầu Hệ Thống  

- Node.js 
- Expo CLI  

## Cài Đặt  

1. Đảm bảo bạn đã cài đặt Node.js và Expo CLI.  
2. Clone dự án về máy của bạn:  
   ```bash  
   git clone https://github.com/NguyenHieu09/noodle-machine-app.git  
3. Chuyển vào thư mục dự án:
    ```bash
    cd [tên thư mục]  
4. Cài đặt các gói cần thiết:
    ```bash
    npm install 
5. Run
    ```bash
    npx expo start

## QR Code for test
![alt text](image.png)


## Video demo

![Demo Video](./assets/video.gif)

## Authors

- [@NguyenHieu09](https://github.com/NguyenHieu09) - Full stack

