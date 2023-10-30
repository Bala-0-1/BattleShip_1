import java.io.BufferedReader;
import java.io.IOException;
import java.util.HashMap;

import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;



@WebServlet("/ServletTest")
public class ServletTest extends HttpServlet {
    private static final long serialVersionUID = 1L;

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        HashMap<String, String> jsonData = new HashMap<>();
        String str = "hello";
        jsonData.put(str, str);
        StringBuilder requestBody = new StringBuilder();
        BufferedReader reader = request.getReader();
        String line;
        while ((line = reader.readLine()) != null) {
            requestBody.append(line);
        }

        System.out.println("(GET) Received JSON data: " + requestBody.toString());

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        response.getWriter().write(jsonData.toString());
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {

        StringBuilder requestBody = new StringBuilder();
        BufferedReader reader = request.getReader();
        String line;
        while ((line = reader.readLine()) != null) {
            requestBody.append(line);
        }


        System.out.println("Received JSON data: " + requestBody.toString());
        String responseData = "200";

        response.setContentType("text/plain");
        response.setCharacterEncoding("UTF-8");

        response.getWriter().write(responseData);
    }
}







