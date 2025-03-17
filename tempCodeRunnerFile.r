# Cài đặt thư viện nếu chưa có
install.packages("stargazer")  

# Gọi thư viện
library(stargazer)

# Tạo dữ liệu giả lập (thay bằng dữ liệu của bạn)
data <- data.frame(
  X1 = c(2.5, 3.4, 3.5, 3.6, 3.4, 3.3, 3.6, 3.5, 2.5, 3.1, 3.2, 3.1, 3.5, 3.5, 3.4, 3.2, 2.5, 2.7),
  X2 = c(30, 30, 45, 40, 40, 45, 40, 40, 30, 45, 40, 45, 45, 40, 30, 30, 30, 30),
  Y  = c(19.3, 22.4, 24.5, 26.9, 25.3, 22.7, 25.6, 27.2, 21.6, 25.6, 24, 24.3, 27.3, 27.5, 21.2, 16.7, 18.4, 19.6)
)

# Chạy hồi quy tuyến tính
model_linear <- lm(Y ~ X1 + X2, data = data)

# Xuất kết quả đẹp với `stargazer`
stargazer(model_linear, type = "text", title = "📌 Kết quả hồi quy tuyến tính", 
          digits = 4, single.row = TRUE)
