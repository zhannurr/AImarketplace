## How to Run the Project

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/zhannurr/MongoProject.git
   cd StayMate
   ```
2. **Create .env file with this variables**:
   ```bash
    MONGODB_URI=mongodb+srv://username:db_password@clustername.yfrdd.mongodb.net/?retryWrites=true&w=majority&appName=AppName
   ```
3. **Build the programm from the root directory**:
   ```bash
   go build -o main cmd/main.go
   ```

4. **Start the Server**:
   ```bash
   ./main
   ```